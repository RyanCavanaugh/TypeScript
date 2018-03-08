namespace ts {
    export function getNameFromIndexInfo(info: IndexInfo): string | undefined {
        return info.declaration ? declarationNameToString(info.declaration.parameters[0].name) : undefined;
    }

    // Return display name of an identifier
    // Computed property names will just be emitted as "[<expr>]", where <expr> is the source
    // text of the expression in the computed property.
    export function declarationNameToString(name: DeclarationName | QualifiedName) {
        return getFullWidth(name) === 0 ? "(Missing)" : getTextOfNode(name);
    }

    export function getStartPositionOfLine(line: number, sourceFile: SourceFileLike): number {
        Debug.assert(line >= 0);
        return getLineStarts(sourceFile)[line];
    }

    // This is a useful function for debugging purposes.
    export function nodePosToString(node: Node): string {
        const file = getSourceFileOfNode(node);
        const loc = getLineAndCharacterOfPosition(file, node.pos);
        return `${file.fileName}(${loc.line + 1},${loc.character + 1})`;
    }

    export function getEndLinePosition(line: number, sourceFile: SourceFileLike): number {
        Debug.assert(line >= 0);
        const lineStarts = getLineStarts(sourceFile);

        const lineIndex = line;
        const sourceText = sourceFile.text;
        if (lineIndex + 1 === lineStarts.length) {
            // last line - return EOF
            return sourceText.length - 1;
        }
        else {
            // current line start
            const start = lineStarts[lineIndex];
            // take the start position of the next line - 1 = it should be some line break
            let pos = lineStarts[lineIndex + 1] - 1;
            Debug.assert(isLineBreak(sourceText.charCodeAt(pos)));
            // walk backwards skipping line breaks, stop the the beginning of current line.
            // i.e:
            // <some text>
            // $ <- end of line for this position should match the start position
            while (start <= pos && isLineBreak(sourceText.charCodeAt(pos))) {
                pos--;
            }
            return pos;
        }
    }

    export function getTokenPosOfNode(node: Node, sourceFile?: SourceFileLike, includeJsDoc?: boolean): number {
        // With nodes that have no width (i.e. 'Missing' nodes), we actually *don't*
        // want to skip trivia because this will launch us forward to the next token.
        if (nodeIsMissing(node)) {
            return node.pos;
        }

        if (isJSDocNode(node)) {
            return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos, /*stopAfterLineBreak*/ false, /*stopAtComments*/ true);
        }

        if (includeJsDoc && hasJSDocNodes(node)) {
            return getTokenPosOfNode(node.jsDoc[0]);
        }

        // For a syntax list, it is possible that one of its children has JSDocComment nodes, while
        // the syntax list itself considers them as normal trivia. Therefore if we simply skip
        // trivia for the list, we may have skipped the JSDocComment as well. So we should process its
        // first child to determine the actual position of its first token.
        if (node.kind === SyntaxKind.SyntaxList && (<SyntaxList>node)._children.length > 0) {
            return getTokenPosOfNode((<SyntaxList>node)._children[0], sourceFile, includeJsDoc);
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.pos);
    }

    export function getNonDecoratorTokenPosOfNode(node: Node, sourceFile?: SourceFileLike): number {
        if (nodeIsMissing(node) || !node.decorators) {
            return getTokenPosOfNode(node, sourceFile);
        }

        return skipTrivia((sourceFile || getSourceFileOfNode(node)).text, node.decorators.end);
    }

    export function getSourceTextOfNodeFromSourceFile(sourceFile: SourceFile, node: Node, includeTrivia = false): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        const text = sourceFile.text;
        return text.substring(includeTrivia ? node.pos : skipTrivia(text, node.pos), node.end);
    }

    export function getTextOfNodeFromSourceText(sourceText: string, node: Node): string {
        if (nodeIsMissing(node)) {
            return "";
        }

        return sourceText.substring(skipTrivia(sourceText, node.pos), node.end);
    }

    export function getLiteralText(node: LiteralLikeNode, sourceFile: SourceFile) {
        // If we don't need to downlevel and we can reach the original source text using
        // the node's parent reference, then simply get the text as it was originally written.
        if (!nodeIsSynthesized(node) && node.parent && !(isNumericLiteral(node) && node.numericLiteralFlags & TokenFlags.ContainsSeparator)) {
            return getSourceTextOfNodeFromSourceFile(sourceFile, node);
        }

        const escapeText = getEmitFlags(node) & EmitFlags.NoAsciiEscaping ? escapeString : escapeNonAsciiString;

        // If we can't reach the original source text, use the canonical form if it's a number,
        // or a (possibly escaped) quoted form of the original text if it's string-like.
        switch (node.kind) {
            case SyntaxKind.StringLiteral:
                if ((<StringLiteral>node).singleQuote) {
                    return "'" + escapeText(node.text, CharacterCodes.singleQuote) + "'";
                }
                else {
                    return '"' + escapeText(node.text, CharacterCodes.doubleQuote) + '"';
                }
            case SyntaxKind.NoSubstitutionTemplateLiteral:
                return "`" + escapeText(node.text, CharacterCodes.backtick) + "`";
            case SyntaxKind.TemplateHead:
                // tslint:disable-next-line no-invalid-template-strings
                return "`" + escapeText(node.text, CharacterCodes.backtick) + "${";
            case SyntaxKind.TemplateMiddle:
                // tslint:disable-next-line no-invalid-template-strings
                return "}" + escapeText(node.text, CharacterCodes.backtick) + "${";
            case SyntaxKind.TemplateTail:
                return "}" + escapeText(node.text, CharacterCodes.backtick) + "`";
            case SyntaxKind.NumericLiteral:
            case SyntaxKind.RegularExpressionLiteral:
                return node.text;
        }

        Debug.fail(`Literal kind '${node.kind}' not accounted for.`);
    }

    export function getTextOfNode(node: Node, includeTrivia = false): string {
        return getSourceTextOfNodeFromSourceFile(getSourceFileOfNode(node), node, includeTrivia);
    }

    export function getSpanOfTokenAtPosition(sourceFile: SourceFile, pos: number): TextSpan {
        const scanner = createScanner(sourceFile.languageVersion, /*skipTrivia*/ true, sourceFile.languageVariant, sourceFile.text, /*onError:*/ undefined, pos);
        scanner.scan();
        const start = scanner.getTokenPos();
        return createTextSpanFromBounds(start, scanner.getTextPos());
    }

    function getErrorSpanForArrowFunction(sourceFile: SourceFile, node: ArrowFunction): TextSpan {
        const pos = skipTrivia(sourceFile.text, node.pos);
        if (node.body && node.body.kind === SyntaxKind.Block) {
            const { line: startLine } = getLineAndCharacterOfPosition(sourceFile, node.body.pos);
            const { line: endLine } = getLineAndCharacterOfPosition(sourceFile, node.body.end);
            if (startLine < endLine) {
                // The arrow function spans multiple lines,
                // make the error span be the first line, inclusive.
                return createTextSpan(pos, getEndLinePosition(startLine, sourceFile) - pos + 1);
            }
        }
        return createTextSpanFromBounds(pos, node.end);
    }

    export function getErrorSpanForNode(sourceFile: SourceFile, node: Node): TextSpan {
        let errorNode = node;
        switch (node.kind) {
            case SyntaxKind.SourceFile:
                const pos = skipTrivia(sourceFile.text, 0, /*stopAfterLineBreak*/ false);
                if (pos === sourceFile.text.length) {
                    // file is empty - return span for the beginning of the file
                    return createTextSpan(0, 0);
                }
                return getSpanOfTokenAtPosition(sourceFile, pos);
            // This list is a work in progress. Add missing node kinds to improve their error
            // spans.
            case SyntaxKind.VariableDeclaration:
            case SyntaxKind.BindingElement:
            case SyntaxKind.ClassDeclaration:
            case SyntaxKind.ClassExpression:
            case SyntaxKind.InterfaceDeclaration:
            case SyntaxKind.ModuleDeclaration:
            case SyntaxKind.EnumDeclaration:
            case SyntaxKind.EnumMember:
            case SyntaxKind.FunctionDeclaration:
            case SyntaxKind.FunctionExpression:
            case SyntaxKind.MethodDeclaration:
            case SyntaxKind.GetAccessor:
            case SyntaxKind.SetAccessor:
            case SyntaxKind.TypeAliasDeclaration:
                errorNode = (<NamedDeclaration>node).name;
                break;
            case SyntaxKind.ArrowFunction:
                return getErrorSpanForArrowFunction(sourceFile, <ArrowFunction>node);
        }

        if (errorNode === undefined) {
            // If we don't have a better node, then just set the error on the first token of
            // construct.
            return getSpanOfTokenAtPosition(sourceFile, node.pos);
        }

        const isMissing = nodeIsMissing(errorNode);
        const pos = isMissing
            ? errorNode.pos
            : skipTrivia(sourceFile.text, errorNode.pos);

        // These asserts should all be satisfied for a properly constructed `errorNode`.
        if (isMissing) {
            Debug.assert(pos === errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            Debug.assert(pos === errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        }
        else {
            Debug.assert(pos >= errorNode.pos, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
            Debug.assert(pos <= errorNode.end, "This failure could trigger https://github.com/Microsoft/TypeScript/issues/20809");
        }

        return createTextSpanFromBounds(pos, errorNode.end);
    }

    export function isExternalModuleAugmentation(node: Node): boolean {
        // external module augmentation is a ambient module declaration that is either:
        // - defined in the top level scope and source file is an external module
        // - defined inside ambient module declaration located in the top level scope and source file not an external module
        if (!node || !isAmbientModule(node)) {
            return false;
        }
        switch (node.parent.kind) {
            case SyntaxKind.SourceFile:
                return isExternalModule(<SourceFile>node.parent);
            case SyntaxKind.ModuleBlock:
                return isAmbientModule(node.parent.parent) && !isExternalModule(<SourceFile>node.parent.parent.parent);
        }
        return false;
    }

    export function isEffectiveExternalModule(node: SourceFile, compilerOptions: CompilerOptions) {
        return isExternalModule(node) || compilerOptions.isolatedModules || ((getEmitModuleKind(compilerOptions) === ModuleKind.CommonJS) && !!node.commonJsModuleIndicator);
    }

    // Returns true if this node contains a parse error anywhere underneath it.
    export function containsParseError(node: Node): boolean {
        aggregateChildData(node);
        return (node.flags & NodeFlags.ThisNodeOrAnySubNodesHasError) !== 0;
    }

    function aggregateChildData(node: Node): void {
        if (!(node.flags & NodeFlags.HasAggregatedChildData)) {
            // A node is considered to contain a parse error if:
            //  a) the parser explicitly marked that it had an error
            //  b) any of it's children reported that it had an error.
            const thisNodeOrAnySubNodesHasError = ((node.flags & NodeFlags.ThisNodeHasError) !== 0) ||
                forEachChild(node, containsParseError);

            // If so, mark ourselves accordingly.
            if (thisNodeOrAnySubNodesHasError) {
                node.flags |= NodeFlags.ThisNodeOrAnySubNodesHasError;
            }

            // Also mark that we've propagated the child information to this node.  This way we can
            // always consult the bit directly on this node without needing to check its children
            // again.
            node.flags |= NodeFlags.HasAggregatedChildData;
        }
    }

    export function entityNameToString(name: EntityNameOrEntityNameExpression): string {
        switch (name.kind) {
            case SyntaxKind.Identifier:
                return getFullWidth(name) === 0 ? idText(name) : getTextOfNode(name);
            case SyntaxKind.QualifiedName:
                return entityNameToString(name.left) + "." + entityNameToString(name.right);
            case SyntaxKind.PropertyAccessExpression:
                return entityNameToString(name.expression) + "." + entityNameToString(name.name);
        }
    }

    export function createDiagnosticForNode(node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const sourceFile = getSourceFileOfNode(node);
        return createDiagnosticForNodeInSourceFile(sourceFile, node, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeArray(sourceFile: SourceFile, nodes: NodeArray<Node>, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const start = skipTrivia(sourceFile.text, nodes.pos);
        return createFileDiagnostic(sourceFile, start, nodes.end - start, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeInSourceFile(sourceFile: SourceFile, node: Node, message: DiagnosticMessage, arg0?: string | number, arg1?: string | number, arg2?: string | number, arg3?: string | number): Diagnostic {
        const span = getErrorSpanForNode(sourceFile, node);
        return createFileDiagnostic(sourceFile, span.start, span.length, message, arg0, arg1, arg2, arg3);
    }

    export function createDiagnosticForNodeFromMessageChain(node: Node, messageChain: DiagnosticMessageChain): Diagnostic {
        const sourceFile = getSourceFileOfNode(node);
        const span = getErrorSpanForNode(sourceFile, node);
        return {
            file: sourceFile,
            start: span.start,
            length: span.length,
            code: messageChain.code,
            category: messageChain.category,
            messageText: messageChain.next ? messageChain : messageChain.messageText
        };
    }

    export function getLeadingCommentRangesOfNode(node: Node, sourceFileOfNode: SourceFile) {
        return node.kind !== SyntaxKind.JsxText ? getLeadingCommentRanges(sourceFileOfNode.text, node.pos) : undefined;
    }

    export function getJSDocCommentRanges(node: Node, text: string) {
        const commentRanges = (node.kind === SyntaxKind.Parameter ||
            node.kind === SyntaxKind.TypeParameter ||
            node.kind === SyntaxKind.FunctionExpression ||
            node.kind === SyntaxKind.ArrowFunction ||
            node.kind === SyntaxKind.ParenthesizedExpression) ?
            concatenate(getTrailingCommentRanges(text, node.pos), getLeadingCommentRanges(text, node.pos)) :
            getLeadingCommentRanges(text, node.pos);
        // True if the comment starts with '/**' but not if it is '/**/'
        return filter(commentRanges, comment =>
            text.charCodeAt(comment.pos + 1) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 2) === CharacterCodes.asterisk &&
            text.charCodeAt(comment.pos + 3) !== CharacterCodes.slash);
    }

        // Warning: This has the same semantics as the forEach family of functions,
    //          in that traversal terminates in the event that 'visitor' supplies a truthy value.
    export function forEachReturnStatement<T>(body: Block, visitor: (stmt: ReturnStatement) => T): T {

        return traverse(body);

        function traverse(node: Node): T {
            switch (node.kind) {
                case SyntaxKind.ReturnStatement:
                    return visitor(<ReturnStatement>node);
                case SyntaxKind.CaseBlock:
                case SyntaxKind.Block:
                case SyntaxKind.IfStatement:
                case SyntaxKind.DoStatement:
                case SyntaxKind.WhileStatement:
                case SyntaxKind.ForStatement:
                case SyntaxKind.ForInStatement:
                case SyntaxKind.ForOfStatement:
                case SyntaxKind.WithStatement:
                case SyntaxKind.SwitchStatement:
                case SyntaxKind.CaseClause:
                case SyntaxKind.DefaultClause:
                case SyntaxKind.LabeledStatement:
                case SyntaxKind.TryStatement:
                case SyntaxKind.CatchClause:
                    return forEachChild(node, traverse);
            }
        }
    }

    export function forEachYieldExpression(body: Block, visitor: (expr: YieldExpression) => void): void {

        return traverse(body);

        function traverse(node: Node): void {
            switch (node.kind) {
                case SyntaxKind.YieldExpression:
                    visitor(<YieldExpression>node);
                    const operand = (<YieldExpression>node).expression;
                    if (operand) {
                        traverse(operand);
                    }
                    return;
                case SyntaxKind.EnumDeclaration:
                case SyntaxKind.InterfaceDeclaration:
                case SyntaxKind.ModuleDeclaration:
                case SyntaxKind.TypeAliasDeclaration:
                case SyntaxKind.ClassDeclaration:
                case SyntaxKind.ClassExpression:
                    // These are not allowed inside a generator now, but eventually they may be allowed
                    // as local types. Regardless, any yield statements contained within them should be
                    // skipped in this traversal.
                    return;
                default:
                    if (isFunctionLike(node)) {
                        if (node.name && node.name.kind === SyntaxKind.ComputedPropertyName) {
                            // Note that we will not include methods/accessors of a class because they would require
                            // first descending into the class. This is by design.
                            traverse(node.name.expression);
                            return;
                        }
                    }
                    else if (!isPartOfTypeNode(node)) {
                        // This is the general case, which should include mostly expressions and statements.
                        // Also includes NodeArrays.
                        forEachChild(node, traverse);
                    }
            }
        }
    }

    export function isStringDoubleQuoted(str: StringLiteral, sourceFile: SourceFile): boolean {
        return getSourceTextOfNodeFromSourceFile(sourceFile, str).charCodeAt(0) === CharacterCodes.doubleQuote;
    }

    export function isStringANonContextualKeyword(name: string) {
        const token = stringToToken(name);
        return token !== undefined && isNonContextualKeyword(token);
    }

    export function createTextWriter(newLine: string): EmitTextWriter {
        let output: string;
        let indent: number;
        let lineStart: boolean;
        let lineCount: number;
        let linePos: number;

        function write(s: string) {
            if (s && s.length) {
                if (lineStart) {
                    output += getIndentString(indent);
                    lineStart = false;
                }
                output += s;
            }
        }

        function reset(): void {
            output = "";
            indent = 0;
            lineStart = true;
            lineCount = 0;
            linePos = 0;
        }

        function rawWrite(s: string) {
            if (s !== undefined) {
                if (lineStart) {
                    lineStart = false;
                }
                output += s;
            }
        }

        function writeLiteral(s: string) {
            if (s && s.length) {
                write(s);
                const lineStartsOfS = computeLineStarts(s);
                if (lineStartsOfS.length > 1) {
                    lineCount = lineCount + lineStartsOfS.length - 1;
                    linePos = output.length - s.length + lastOrUndefined(lineStartsOfS);
                }
            }
        }

        function writeLine() {
            if (!lineStart) {
                output += newLine;
                lineCount++;
                linePos = output.length;
                lineStart = true;
            }
        }

        function writeTextOfNode(text: string, node: Node) {
            write(getTextOfNodeFromSourceText(text, node));
        }

        reset();

        return {
            write,
            rawWrite,
            writeTextOfNode,
            writeLiteral,
            writeLine,
            increaseIndent: () => { indent++; },
            decreaseIndent: () => { indent--; },
            getIndent: () => indent,
            getTextPos: () => output.length,
            getLine: () => lineCount + 1,
            getColumn: () => lineStart ? indent * getIndentSize() + 1 : output.length - linePos + 1,
            getText: () => output,
            isAtStartOfLine: () => lineStart,
            clear: reset,
            reportInaccessibleThisError: noop,
            reportPrivateInBaseOfClassExpression: noop,
            reportInaccessibleUniqueSymbolError: noop,
            trackSymbol: noop,
            writeKeyword: write,
            writeOperator: write,
            writeParameter: write,
            writeProperty: write,
            writePunctuation: write,
            writeSpace: write,
            writeStringLiteral: write,
            writeSymbol: write
        };
    }

        /**
     * Gets the source files that are expected to have an emit output.
     *
     * Originally part of `forEachExpectedEmitFile`, this functionality was extracted to support
     * transformations.
     *
     * @param host An EmitHost.
     * @param targetSourceFile An optional target source file to emit.
     */
    export function getSourceFilesToEmit(host: EmitHost, targetSourceFile?: SourceFile): ReadonlyArray<SourceFile> {
        const options = host.getCompilerOptions();
        const isSourceFileFromExternalLibrary = (file: SourceFile) => host.isSourceFileFromExternalLibrary(file);
        if (options.outFile || options.out) {
            const moduleKind = getEmitModuleKind(options);
            const moduleEmitEnabled = moduleKind === ModuleKind.AMD || moduleKind === ModuleKind.System;
            // Can emit only sources that are not declaration file and are either non module code or module with --module or --target es6 specified
            return filter(host.getSourceFiles(), sourceFile =>
                (moduleEmitEnabled || !isExternalModule(sourceFile)) && sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary));
        }
        else {
            const sourceFiles = targetSourceFile === undefined ? host.getSourceFiles() : [targetSourceFile];
            return filter(sourceFiles, sourceFile => sourceFileMayBeEmitted(sourceFile, options, isSourceFileFromExternalLibrary));
        }
    }

    /** Don't call this for `--outFile`, just for `--outDir` or plain emit. `--outFile` needs additional checks. */
    export function sourceFileMayBeEmitted(sourceFile: SourceFile, options: CompilerOptions, isSourceFileFromExternalLibrary: (file: SourceFile) => boolean) {
        return !(options.noEmitForJsFiles && isSourceFileJavaScript(sourceFile)) && !sourceFile.isDeclarationFile && !isSourceFileFromExternalLibrary(sourceFile);
    }

    export function writeFile(host: EmitHost, diagnostics: DiagnosticCollection, fileName: string, data: string, writeByteOrderMark: boolean, sourceFiles?: ReadonlyArray<SourceFile>) {
        host.writeFile(fileName, data, writeByteOrderMark, hostErrorMessage => {
            diagnostics.add(createCompilerDiagnostic(Diagnostics.Could_not_write_file_0_Colon_1, fileName, hostErrorMessage));
        }, sourceFiles);
    }

    export function getLineOfLocalPosition(currentSourceFile: SourceFile, pos: number) {
        return getLineAndCharacterOfPosition(currentSourceFile, pos).line;
    }

    export function getLineOfLocalPositionFromLineMap(lineMap: ReadonlyArray<number>, pos: number) {
        return computeLineAndCharacterOfPosition(lineMap, pos).line;
    }

    export function emitNewLineBeforeLeadingComments(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, node: TextRange, leadingComments: ReadonlyArray<CommentRange>) {
        emitNewLineBeforeLeadingCommentsOfPosition(lineMap, writer, node.pos, leadingComments);
    }

    export function emitNewLineBeforeLeadingCommentsOfPosition(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, pos: number, leadingComments: ReadonlyArray<CommentRange>) {
        // If the leading comments start on different line than the start of node, write new line
        if (leadingComments && leadingComments.length && pos !== leadingComments[0].pos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, leadingComments[0].pos)) {
            writer.writeLine();
        }
    }

    export function emitNewLineBeforeLeadingCommentOfPosition(lineMap: ReadonlyArray<number>, writer: EmitTextWriter, pos: number, commentPos: number) {
        // If the leading comments start on different line than the start of node, write new line
        if (pos !== commentPos &&
            getLineOfLocalPositionFromLineMap(lineMap, pos) !== getLineOfLocalPositionFromLineMap(lineMap, commentPos)) {
            writer.writeLine();
        }
    }

    /**
     * Detached comment is a comment at the top of file or function body that is separated from
     * the next statement by space.
     */
    export function emitDetachedComments(text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter,
        writeComment: (text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) => void,
        node: TextRange, newLine: string, removeComments: boolean) {
        let leadingComments: CommentRange[];
        let currentDetachedCommentInfo: { nodePos: number, detachedCommentEndPos: number };
        if (removeComments) {
            // removeComments is true, only reserve pinned comment at the top of file
            // For example:
            //      /*! Pinned Comment */
            //
            //      var x = 10;
            if (node.pos === 0) {
                leadingComments = filter(getLeadingCommentRanges(text, node.pos), isPinnedCommentLocal);
            }
        }
        else {
            // removeComments is false, just get detached as normal and bypass the process to filter comment
            leadingComments = getLeadingCommentRanges(text, node.pos);
        }

        if (leadingComments) {
            const detachedComments: CommentRange[] = [];
            let lastComment: CommentRange;

            for (const comment of leadingComments) {
                if (lastComment) {
                    const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastComment.end);
                    const commentLine = getLineOfLocalPositionFromLineMap(lineMap, comment.pos);

                    if (commentLine >= lastCommentLine + 2) {
                        // There was a blank line between the last comment and this comment.  This
                        // comment is not part of the copyright comments.  Return what we have so
                        // far.
                        break;
                    }
                }

                detachedComments.push(comment);
                lastComment = comment;
            }

            if (detachedComments.length) {
                // All comments look like they could have been part of the copyright header.  Make
                // sure there is at least one blank line between it and the node.  If not, it's not
                // a copyright header.
                const lastCommentLine = getLineOfLocalPositionFromLineMap(lineMap, lastOrUndefined(detachedComments).end);
                const nodeLine = getLineOfLocalPositionFromLineMap(lineMap, skipTrivia(text, node.pos));
                if (nodeLine >= lastCommentLine + 2) {
                    // Valid detachedComments
                    emitNewLineBeforeLeadingComments(lineMap, writer, node, leadingComments);
                    emitComments(text, lineMap, writer, detachedComments, /*leadingSeparator*/ false, /*trailingSeparator*/ true, newLine, writeComment);
                    currentDetachedCommentInfo = { nodePos: node.pos, detachedCommentEndPos: lastOrUndefined(detachedComments).end };
                }
            }
        }

        return currentDetachedCommentInfo;

        function isPinnedCommentLocal(comment: CommentRange) {
            return isPinnedComment(text, comment);
        }

    }

    export function writeCommentRange(text: string, lineMap: ReadonlyArray<number>, writer: EmitTextWriter, commentPos: number, commentEnd: number, newLine: string) {
        if (text.charCodeAt(commentPos + 1) === CharacterCodes.asterisk) {
            const firstCommentLineAndCharacter = computeLineAndCharacterOfPosition(lineMap, commentPos);
            const lineCount = lineMap.length;
            let firstCommentLineIndent: number;
            for (let pos = commentPos, currentLine = firstCommentLineAndCharacter.line; pos < commentEnd; currentLine++) {
                const nextLineStart = (currentLine + 1) === lineCount
                    ? text.length + 1
                    : lineMap[currentLine + 1];

                if (pos !== commentPos) {
                    // If we are not emitting first line, we need to write the spaces to adjust the alignment
                    if (firstCommentLineIndent === undefined) {
                        firstCommentLineIndent = calculateIndent(text, lineMap[firstCommentLineAndCharacter.line], commentPos);
                    }

                    // These are number of spaces writer is going to write at current indent
                    const currentWriterIndentSpacing = writer.getIndent() * getIndentSize();

                    // Number of spaces we want to be writing
                    // eg: Assume writer indent
                    // module m {
                    //         /* starts at character 9 this is line 1
                    //    * starts at character pos 4 line                        --1  = 8 - 8 + 3
                    //   More left indented comment */                            --2  = 8 - 8 + 2
                    //     class c { }
                    // }
                    // module m {
                    //     /* this is line 1 -- Assume current writer indent 8
                    //      * line                                                --3 = 8 - 4 + 5
                    //            More right indented comment */                  --4 = 8 - 4 + 11
                    //     class c { }
                    // }
                    const spacesToEmit = currentWriterIndentSpacing - firstCommentLineIndent + calculateIndent(text, pos, nextLineStart);
                    if (spacesToEmit > 0) {
                        let numberOfSingleSpacesToEmit = spacesToEmit % getIndentSize();
                        const indentSizeSpaceString = getIndentString((spacesToEmit - numberOfSingleSpacesToEmit) / getIndentSize());

                        // Write indent size string ( in eg 1: = "", 2: "" , 3: string with 8 spaces 4: string with 12 spaces
                        writer.rawWrite(indentSizeSpaceString);

                        // Emit the single spaces (in eg: 1: 3 spaces, 2: 2 spaces, 3: 1 space, 4: 3 spaces)
                        while (numberOfSingleSpacesToEmit) {
                            writer.rawWrite(" ");
                            numberOfSingleSpacesToEmit--;
                        }
                    }
                    else {
                        // No spaces to emit write empty string
                        writer.rawWrite("");
                    }
                }

                // Write the comment line text
                writeTrimmedCurrentLine(text, commentEnd, writer, newLine, pos, nextLineStart);

                pos = nextLineStart;
            }
        }
        else {
            // Single line comment of style //....
            writer.write(text.substring(commentPos, commentEnd));
        }
    }

    function writeTrimmedCurrentLine(text: string, commentEnd: number, writer: EmitTextWriter, newLine: string, pos: number, nextLineStart: number) {
        const end = Math.min(commentEnd, nextLineStart - 1);
        const currentLineText = text.substring(pos, end).replace(/^\s+|\s+$/g, "");
        if (currentLineText) {
            // trimmed forward and ending spaces text
            writer.write(currentLineText);
            if (end !== commentEnd) {
                writer.writeLine();
            }
        }
        else {
            // Empty string - make sure we write empty line
            writer.writeLiteral(newLine);
        }
    }

    function calculateIndent(text: string, pos: number, end: number) {
        let currentLineIndent = 0;
        for (; pos < end && isWhiteSpaceSingleLine(text.charCodeAt(pos)); pos++) {
            if (text.charCodeAt(pos) === CharacterCodes.tab) {
                // Tabs = TabSize = indent size and go to next tabStop
                currentLineIndent += getIndentSize() - (currentLineIndent % getIndentSize());
            }
            else {
                // Single space
                currentLineIndent++;
            }
        }

        return currentLineIndent;
    }

    /**
     * Creates a new TextRange for a token at the provides start position.
     *
     * @param pos The start position.
     * @param token The token.
     */
    export function createTokenRange(pos: number, token: SyntaxKind): TextRange {
        return createRange(pos, pos + tokenToString(token).length);
    }

    export function rangeIsOnSingleLine(range: TextRange, sourceFile: SourceFile) {
        return rangeStartIsOnSameLineAsRangeEnd(range, range, sourceFile);
    }

    export function rangeStartPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), getStartPositionOfRange(range2, sourceFile), sourceFile);
    }

    export function rangeEndPositionsAreOnSameLine(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, range2.end, sourceFile);
    }

    export function rangeStartIsOnSameLineAsRangeEnd(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(getStartPositionOfRange(range1, sourceFile), range2.end, sourceFile);
    }

    export function rangeEndIsOnSameLineAsRangeStart(range1: TextRange, range2: TextRange, sourceFile: SourceFile) {
        return positionsAreOnSameLine(range1.end, getStartPositionOfRange(range2, sourceFile), sourceFile);
    }

    export function positionsAreOnSameLine(pos1: number, pos2: number, sourceFile: SourceFile) {
        return pos1 === pos2 ||
            getLineOfLocalPosition(sourceFile, pos1) === getLineOfLocalPosition(sourceFile, pos2);
    }

    export function getStartPositionOfRange(range: TextRange, sourceFile: SourceFile) {
        return positionIsSynthesized(range.pos) ? -1 : skipTrivia(sourceFile.text, range.pos);
    }

    /**
     * Checks to see if the locale is in the appropriate format,
     * and if it is, attempts to set the appropriate language.
     */
    export function validateLocaleAndSetLanguage(
        locale: string,
        sys: { getExecutingFilePath(): string, resolvePath(path: string): string, fileExists(fileName: string): boolean, readFile(fileName: string): string | undefined },
        errors?: Push<Diagnostic>) {
        const matchResult = /^([a-z]+)([_\-]([a-z]+))?$/.exec(locale.toLowerCase());

        if (!matchResult) {
            if (errors) {
                errors.push(createCompilerDiagnostic(Diagnostics.Locale_must_be_of_the_form_language_or_language_territory_For_example_0_or_1, "en", "ja-jp"));
            }
            return;
        }

        const language = matchResult[1];
        const territory = matchResult[3];

        // First try the entire locale, then fall back to just language if that's all we have.
        // Either ways do not fail, and fallback to the English diagnostic strings.
        if (!trySetLanguageAndTerritory(language, territory, errors)) {
            trySetLanguageAndTerritory(language, /*territory*/ undefined, errors);
        }

        // Set the UI locale for string collation
        setUILocale(locale);

        function trySetLanguageAndTerritory(language: string, territory: string, errors?: Push<Diagnostic>): boolean {
            const compilerFilePath = normalizePath(sys.getExecutingFilePath());
            const containingDirectoryPath = getDirectoryPath(compilerFilePath);

            let filePath = combinePaths(containingDirectoryPath, language);

            if (territory) {
                filePath = filePath + "-" + territory;
            }

            filePath = sys.resolvePath(combinePaths(filePath, "diagnosticMessages.generated.json"));

            if (!sys.fileExists(filePath)) {
                return false;
            }

            // TODO: Add codePage support for readFile?
            let fileContents = "";
            try {
                fileContents = sys.readFile(filePath);
            }
            catch (e) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Unable_to_open_file_0, filePath));
                }
                return false;
            }
            try {
                ts.localizedDiagnosticMessages = JSON.parse(fileContents);
            }
            catch (e) {
                if (errors) {
                    errors.push(createCompilerDiagnostic(Diagnostics.Corrupted_locale_file_0, filePath));
                }
                return false;
            }

            return true;
        }
    }
}
