declare namespace ts.server {
    enum LogLevel {
        terse = 0,
        normal = 1,
        requestTime = 2,
        verbose = 3,
    }
    const emptyArray: SortedReadonlyArray<never>;
    interface Logger {
        close(): void;
        hasLevel(level: LogLevel): boolean;
        loggingEnabled(): boolean;
        perftrc(s: string): void;
        info(s: string): void;
        startGroup(): void;
        endGroup(): void;
        msg(s: string, type?: Msg): void;
        getLogFileName(): string;
    }
    enum Msg {
        Err = "Err",
        Info = "Info",
        Perf = "Perf",
    }
    namespace Msg {
        type Types = Msg;
    }
    function createInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, cachePath?: string): DiscoverTypings;
    namespace Errors {
        function ThrowNoProject(): never;
        function ThrowProjectLanguageServiceDisabled(): never;
        function ThrowProjectDoesNotContainDocument(fileName: string, project: Project): never;
    }
    function getDefaultFormatCodeSettings(host: ServerHost): FormatCodeSettings;
    function mergeMapLikes(target: MapLike<any>, source: MapLike<any>): void;
    type NormalizedPath = string & {
        __normalizedPathTag: any;
    };
    function toNormalizedPath(fileName: string): NormalizedPath;
    function normalizedPathToPath(normalizedPath: NormalizedPath, currentDirectory: string, getCanonicalFileName: (f: string) => string): Path;
    function asNormalizedPath(fileName: string): NormalizedPath;
    interface NormalizedPathMap<T> {
        get(path: NormalizedPath): T;
        set(path: NormalizedPath, value: T): void;
        contains(path: NormalizedPath): boolean;
        remove(path: NormalizedPath): void;
    }
    function createNormalizedPathMap<T>(): NormalizedPathMap<T>;
    interface ProjectOptions {
        configHasExtendsProperty: boolean;
        configHasFilesProperty: boolean;
        configHasIncludeProperty: boolean;
        configHasExcludeProperty: boolean;
        files?: string[];
        wildcardDirectories?: Map<WatchDirectoryFlags>;
        compilerOptions?: CompilerOptions;
        typeAcquisition?: TypeAcquisition;
        compileOnSave?: boolean;
    }
    function isInferredProjectName(name: string): boolean;
    function makeInferredProjectName(counter: number): string;
    function createSortedArray<T>(): SortedArray<T>;
}
declare namespace ts.server {
    class ThrottledOperations {
        private readonly host;
        private readonly pendingTimeouts;
        private readonly logger?;
        constructor(host: ServerHost, logger: Logger);
        schedule(operationId: string, delay: number, cb: () => void): void;
        private static run(self, operationId, cb);
    }
    class GcTimer {
        private readonly host;
        private readonly delay;
        private readonly logger;
        private timerId;
        constructor(host: ServerHost, delay: number, logger: Logger);
        scheduleCollect(): void;
        private static run(self);
    }
    function getBaseConfigFileName(configFilePath: NormalizedPath): "tsconfig.json" | "jsconfig.json" | undefined;
    function removeSorted<T>(array: SortedArray<T>, remove: T, compare: Comparer<T>): void;
    function toSortedArray(arr: string[]): SortedArray<string>;
    function toSortedArray<T>(arr: T[], comparer: Comparer<T>): SortedArray<T>;
    function toDeduplicatedSortedArray(arr: string[]): SortedArray<string>;
    function enumerateInsertsAndDeletes<T>(newItems: SortedReadonlyArray<T>, oldItems: SortedReadonlyArray<T>, inserted: (newItem: T) => void, deleted: (oldItem: T) => void, comparer: Comparer<T>): void;
    function indent(str: string): string;
    function stringifyIndented(json: {}): string;
}
declare namespace ts.server.protocol {
    const enum CommandTypes {
        Brace = "brace",
        BraceFull = "brace-full",
        BraceCompletion = "braceCompletion",
        GetSpanOfEnclosingComment = "getSpanOfEnclosingComment",
        Change = "change",
        Close = "close",
        Completions = "completions",
        CompletionsFull = "completions-full",
        CompletionDetails = "completionEntryDetails",
        CompletionDetailsFull = "completionEntryDetails-full",
        CompileOnSaveAffectedFileList = "compileOnSaveAffectedFileList",
        CompileOnSaveEmitFile = "compileOnSaveEmitFile",
        Configure = "configure",
        Definition = "definition",
        DefinitionFull = "definition-full",
        DefinitionAndBoundSpan = "definitionAndBoundSpan",
        DefinitionAndBoundSpanFull = "definitionAndBoundSpan-full",
        Implementation = "implementation",
        ImplementationFull = "implementation-full",
        Exit = "exit",
        Format = "format",
        Formatonkey = "formatonkey",
        FormatFull = "format-full",
        FormatonkeyFull = "formatonkey-full",
        FormatRangeFull = "formatRange-full",
        Geterr = "geterr",
        GeterrForProject = "geterrForProject",
        SemanticDiagnosticsSync = "semanticDiagnosticsSync",
        SyntacticDiagnosticsSync = "syntacticDiagnosticsSync",
        SuggestionDiagnosticsSync = "suggestionDiagnosticsSync",
        NavBar = "navbar",
        NavBarFull = "navbar-full",
        Navto = "navto",
        NavtoFull = "navto-full",
        NavTree = "navtree",
        NavTreeFull = "navtree-full",
        Occurrences = "occurrences",
        DocumentHighlights = "documentHighlights",
        DocumentHighlightsFull = "documentHighlights-full",
        Open = "open",
        Quickinfo = "quickinfo",
        QuickinfoFull = "quickinfo-full",
        References = "references",
        ReferencesFull = "references-full",
        Reload = "reload",
        Rename = "rename",
        RenameInfoFull = "rename-full",
        RenameLocationsFull = "renameLocations-full",
        Saveto = "saveto",
        SignatureHelp = "signatureHelp",
        SignatureHelpFull = "signatureHelp-full",
        Status = "status",
        TypeDefinition = "typeDefinition",
        ProjectInfo = "projectInfo",
        ReloadProjects = "reloadProjects",
        Unknown = "unknown",
        OpenExternalProject = "openExternalProject",
        OpenExternalProjects = "openExternalProjects",
        CloseExternalProject = "closeExternalProject",
        SynchronizeProjectList = "synchronizeProjectList",
        ApplyChangedToOpenFiles = "applyChangedToOpenFiles",
        EncodedSemanticClassificationsFull = "encodedSemanticClassifications-full",
        Cleanup = "cleanup",
        OutliningSpans = "outliningSpans",
        TodoComments = "todoComments",
        Indentation = "indentation",
        DocCommentTemplate = "docCommentTemplate",
        CompilerOptionsDiagnosticsFull = "compilerOptionsDiagnostics-full",
        NameOrDottedNameSpan = "nameOrDottedNameSpan",
        BreakpointStatement = "breakpointStatement",
        CompilerOptionsForInferredProjects = "compilerOptionsForInferredProjects",
        GetCodeFixes = "getCodeFixes",
        GetCodeFixesFull = "getCodeFixes-full",
        GetCombinedCodeFix = "getCombinedCodeFix",
        GetCombinedCodeFixFull = "getCombinedCodeFix-full",
        ApplyCodeActionCommand = "applyCodeActionCommand",
        GetSupportedCodeFixes = "getSupportedCodeFixes",
        GetApplicableRefactors = "getApplicableRefactors",
        GetEditsForRefactor = "getEditsForRefactor",
        GetEditsForRefactorFull = "getEditsForRefactor-full",
        OrganizeImports = "organizeImports",
        OrganizeImportsFull = "organizeImports-full",
    }
    interface Message {
        seq: number;
        type: "request" | "response" | "event";
    }
    interface Request extends Message {
        type: "request";
        command: string;
        arguments?: any;
    }
    interface ReloadProjectsRequest extends Message {
        command: CommandTypes.ReloadProjects;
    }
    interface Event extends Message {
        type: "event";
        event: string;
        body?: any;
    }
    interface Response extends Message {
        type: "response";
        request_seq: number;
        success: boolean;
        command: string;
        message?: string;
        body?: any;
    }
    interface FileRequestArgs {
        file: string;
        projectFileName?: string;
    }
    interface StatusRequest extends Request {
        command: CommandTypes.Status;
    }
    interface StatusResponseBody {
        version: string;
    }
    interface StatusResponse extends Response {
        body: StatusResponseBody;
    }
    interface DocCommentTemplateRequest extends FileLocationRequest {
        command: CommandTypes.DocCommentTemplate;
    }
    interface DocCommandTemplateResponse extends Response {
        body?: TextInsertion;
    }
    interface TodoCommentRequest extends FileRequest {
        command: CommandTypes.TodoComments;
        arguments: TodoCommentRequestArgs;
    }
    interface TodoCommentRequestArgs extends FileRequestArgs {
        descriptors: TodoCommentDescriptor[];
    }
    interface TodoCommentsResponse extends Response {
        body?: TodoComment[];
    }
    interface SpanOfEnclosingCommentRequest extends FileLocationRequest {
        command: CommandTypes.GetSpanOfEnclosingComment;
        arguments: SpanOfEnclosingCommentRequestArgs;
    }
    interface SpanOfEnclosingCommentRequestArgs extends FileLocationRequestArgs {
        onlyMultiLine: boolean;
    }
    interface OutliningSpansRequest extends FileRequest {
        command: CommandTypes.OutliningSpans;
    }
    interface OutliningSpansResponse extends Response {
        body?: OutliningSpan[];
    }
    interface IndentationRequest extends FileLocationRequest {
        command: CommandTypes.Indentation;
        arguments: IndentationRequestArgs;
    }
    interface IndentationResponse extends Response {
        body?: IndentationResult;
    }
    interface IndentationResult {
        position: number;
        indentation: number;
    }
    interface IndentationRequestArgs extends FileLocationRequestArgs {
        options?: EditorSettings;
    }
    interface ProjectInfoRequestArgs extends FileRequestArgs {
        needFileNameList: boolean;
    }
    interface ProjectInfoRequest extends Request {
        command: CommandTypes.ProjectInfo;
        arguments: ProjectInfoRequestArgs;
    }
    interface CompilerOptionsDiagnosticsRequest extends Request {
        arguments: CompilerOptionsDiagnosticsRequestArgs;
    }
    interface CompilerOptionsDiagnosticsRequestArgs {
        projectFileName: string;
    }
    interface ProjectInfo {
        configFileName: string;
        fileNames?: string[];
        languageServiceDisabled?: boolean;
    }
    interface DiagnosticWithLinePosition {
        message: string;
        start: number;
        length: number;
        startLocation: Location;
        endLocation: Location;
        category: string;
        code: number;
    }
    interface ProjectInfoResponse extends Response {
        body?: ProjectInfo;
    }
    interface FileRequest extends Request {
        arguments: FileRequestArgs;
    }
    interface FileLocationRequestArgs extends FileRequestArgs {
        line: number;
        offset: number;
        position?: number;
    }
    type FileLocationOrRangeRequestArgs = FileLocationRequestArgs | FileRangeRequestArgs;
    interface GetApplicableRefactorsRequest extends Request {
        command: CommandTypes.GetApplicableRefactors;
        arguments: GetApplicableRefactorsRequestArgs;
    }
    type GetApplicableRefactorsRequestArgs = FileLocationOrRangeRequestArgs;
    interface GetApplicableRefactorsResponse extends Response {
        body?: ApplicableRefactorInfo[];
    }
    interface ApplicableRefactorInfo {
        name: string;
        description: string;
        inlineable?: boolean;
        actions: RefactorActionInfo[];
    }
    interface RefactorActionInfo {
        name: string;
        description: string;
    }
    interface GetEditsForRefactorRequest extends Request {
        command: CommandTypes.GetEditsForRefactor;
        arguments: GetEditsForRefactorRequestArgs;
    }
    type GetEditsForRefactorRequestArgs = FileLocationOrRangeRequestArgs & {
        refactor: string;
        action: string;
    };
    interface GetEditsForRefactorResponse extends Response {
        body?: RefactorEditInfo;
    }
    interface RefactorEditInfo {
        edits: FileCodeEdits[];
        renameLocation?: Location;
        renameFilename?: string;
    }
    interface OrganizeImportsRequest extends Request {
        command: CommandTypes.OrganizeImports;
        arguments: OrganizeImportsRequestArgs;
    }
    type OrganizeImportsScope = GetCombinedCodeFixScope;
    interface OrganizeImportsRequestArgs {
        scope: OrganizeImportsScope;
    }
    interface OrganizeImportsResponse extends Response {
        edits: ReadonlyArray<FileCodeEdits>;
    }
    interface CodeFixRequest extends Request {
        command: CommandTypes.GetCodeFixes;
        arguments: CodeFixRequestArgs;
    }
    interface GetCombinedCodeFixRequest extends Request {
        command: CommandTypes.GetCombinedCodeFix;
        arguments: GetCombinedCodeFixRequestArgs;
    }
    interface GetCombinedCodeFixResponse extends Response {
        body: CombinedCodeActions;
    }
    interface ApplyCodeActionCommandRequest extends Request {
        command: CommandTypes.ApplyCodeActionCommand;
        arguments: ApplyCodeActionCommandRequestArgs;
    }
    interface ApplyCodeActionCommandResponse extends Response {
    }
    interface FileRangeRequestArgs extends FileRequestArgs {
        startLine: number;
        startOffset: number;
        startPosition?: number;
        endLine: number;
        endOffset: number;
        endPosition?: number;
    }
    interface CodeFixRequestArgs extends FileRangeRequestArgs {
        errorCodes?: ReadonlyArray<number>;
    }
    interface GetCombinedCodeFixRequestArgs {
        scope: GetCombinedCodeFixScope;
        fixId: {};
    }
    interface GetCombinedCodeFixScope {
        type: "file";
        args: FileRequestArgs;
    }
    interface ApplyCodeActionCommandRequestArgs {
        command: {};
    }
    interface GetCodeFixesResponse extends Response {
        body?: CodeAction[];
    }
    interface FileLocationRequest extends FileRequest {
        arguments: FileLocationRequestArgs;
    }
    interface GetSupportedCodeFixesRequest extends Request {
        command: CommandTypes.GetSupportedCodeFixes;
    }
    interface GetSupportedCodeFixesResponse extends Response {
        body?: string[];
    }
    interface EncodedSemanticClassificationsRequest extends FileRequest {
        arguments: EncodedSemanticClassificationsRequestArgs;
    }
    interface EncodedSemanticClassificationsRequestArgs extends FileRequestArgs {
        start: number;
        length: number;
    }
    interface DocumentHighlightsRequestArgs extends FileLocationRequestArgs {
        filesToSearch: string[];
    }
    interface DefinitionRequest extends FileLocationRequest {
        command: CommandTypes.Definition;
    }
    interface TypeDefinitionRequest extends FileLocationRequest {
        command: CommandTypes.TypeDefinition;
    }
    interface ImplementationRequest extends FileLocationRequest {
        command: CommandTypes.Implementation;
    }
    interface Location {
        line: number;
        offset: number;
    }
    interface TextSpan {
        start: Location;
        end: Location;
    }
    interface FileSpan extends TextSpan {
        file: string;
    }
    interface DefinitionInfoAndBoundSpan {
        definitions: ReadonlyArray<FileSpan>;
        textSpan: TextSpan;
    }
    interface DefinitionResponse extends Response {
        body?: FileSpan[];
    }
    interface DefinitionInfoAndBoundSpanReponse extends Response {
        body?: DefinitionInfoAndBoundSpan;
    }
    interface TypeDefinitionResponse extends Response {
        body?: FileSpan[];
    }
    interface ImplementationResponse extends Response {
        body?: FileSpan[];
    }
    interface BraceCompletionRequest extends FileLocationRequest {
        command: CommandTypes.BraceCompletion;
        arguments: BraceCompletionRequestArgs;
    }
    interface BraceCompletionRequestArgs extends FileLocationRequestArgs {
        openingBrace: string;
    }
    interface OccurrencesRequest extends FileLocationRequest {
        command: CommandTypes.Occurrences;
    }
    interface OccurrencesResponseItem extends FileSpan {
        isWriteAccess: boolean;
        isInString?: true;
    }
    interface OccurrencesResponse extends Response {
        body?: OccurrencesResponseItem[];
    }
    interface DocumentHighlightsRequest extends FileLocationRequest {
        command: CommandTypes.DocumentHighlights;
        arguments: DocumentHighlightsRequestArgs;
    }
    interface HighlightSpan extends TextSpan {
        kind: HighlightSpanKind;
    }
    interface DocumentHighlightsItem {
        file: string;
        highlightSpans: HighlightSpan[];
    }
    interface DocumentHighlightsResponse extends Response {
        body?: DocumentHighlightsItem[];
    }
    interface ReferencesRequest extends FileLocationRequest {
        command: CommandTypes.References;
    }
    interface ReferencesResponseItem extends FileSpan {
        lineText: string;
        isWriteAccess: boolean;
        isDefinition: boolean;
    }
    interface ReferencesResponseBody {
        refs: ReferencesResponseItem[];
        symbolName: string;
        symbolStartOffset: number;
        symbolDisplayString: string;
    }
    interface ReferencesResponse extends Response {
        body?: ReferencesResponseBody;
    }
    interface RenameRequestArgs extends FileLocationRequestArgs {
        findInComments?: boolean;
        findInStrings?: boolean;
    }
    interface RenameRequest extends FileLocationRequest {
        command: CommandTypes.Rename;
        arguments: RenameRequestArgs;
    }
    interface RenameInfo {
        canRename: boolean;
        localizedErrorMessage?: string;
        displayName: string;
        fullDisplayName: string;
        kind: ScriptElementKind;
        kindModifiers: string;
    }
    interface SpanGroup {
        file: string;
        locs: TextSpan[];
    }
    interface RenameResponseBody {
        info: RenameInfo;
        locs: ReadonlyArray<SpanGroup>;
    }
    interface RenameResponse extends Response {
        body?: RenameResponseBody;
    }
    interface ExternalFile {
        fileName: string;
        scriptKind?: ScriptKindName | ts.ScriptKind;
        hasMixedContent?: boolean;
        content?: string;
    }
    interface ExternalProject {
        projectFileName: string;
        rootFiles: ExternalFile[];
        options: ExternalProjectCompilerOptions;
        typingOptions?: TypeAcquisition;
        typeAcquisition?: TypeAcquisition;
    }
    interface CompileOnSaveMixin {
        compileOnSave?: boolean;
    }
    type ExternalProjectCompilerOptions = CompilerOptions & CompileOnSaveMixin;
    interface ProjectVersionInfo {
        projectName: string;
        isInferred: boolean;
        version: number;
        options: ts.CompilerOptions;
        languageServiceDisabled: boolean;
        lastFileExceededProgramSize: string | undefined;
    }
    interface ProjectChanges {
        added: string[];
        removed: string[];
        updated: string[];
    }
    interface ProjectFiles {
        info?: ProjectVersionInfo;
        files?: string[];
        changes?: ProjectChanges;
    }
    interface ProjectFilesWithDiagnostics extends ProjectFiles {
        projectErrors: DiagnosticWithLinePosition[];
    }
    interface ChangedOpenFile {
        fileName: string;
        changes: ts.TextChange[];
    }
    interface ConfigureRequestArguments {
        hostInfo?: string;
        file?: string;
        formatOptions?: FormatCodeSettings;
        extraFileExtensions?: JsFileExtensionInfo[];
    }
    interface ConfigureRequest extends Request {
        command: CommandTypes.Configure;
        arguments: ConfigureRequestArguments;
    }
    interface ConfigureResponse extends Response {
    }
    interface OpenRequestArgs extends FileRequestArgs {
        fileContent?: string;
        scriptKindName?: ScriptKindName;
        projectRootPath?: string;
    }
    type ScriptKindName = "TS" | "JS" | "TSX" | "JSX";
    interface OpenRequest extends Request {
        command: CommandTypes.Open;
        arguments: OpenRequestArgs;
    }
    interface OpenExternalProjectRequest extends Request {
        command: CommandTypes.OpenExternalProject;
        arguments: OpenExternalProjectArgs;
    }
    type OpenExternalProjectArgs = ExternalProject;
    interface OpenExternalProjectsRequest extends Request {
        command: CommandTypes.OpenExternalProjects;
        arguments: OpenExternalProjectsArgs;
    }
    interface OpenExternalProjectsArgs {
        projects: ExternalProject[];
    }
    interface OpenExternalProjectResponse extends Response {
    }
    interface OpenExternalProjectsResponse extends Response {
    }
    interface CloseExternalProjectRequest extends Request {
        command: CommandTypes.CloseExternalProject;
        arguments: CloseExternalProjectRequestArgs;
    }
    interface CloseExternalProjectRequestArgs {
        projectFileName: string;
    }
    interface CloseExternalProjectResponse extends Response {
    }
    interface SynchronizeProjectListRequest extends Request {
        arguments: SynchronizeProjectListRequestArgs;
    }
    interface SynchronizeProjectListRequestArgs {
        knownProjects: protocol.ProjectVersionInfo[];
    }
    interface ApplyChangedToOpenFilesRequest extends Request {
        arguments: ApplyChangedToOpenFilesRequestArgs;
    }
    interface ApplyChangedToOpenFilesRequestArgs {
        openFiles?: ExternalFile[];
        changedFiles?: ChangedOpenFile[];
        closedFiles?: string[];
    }
    interface SetCompilerOptionsForInferredProjectsRequest extends Request {
        command: CommandTypes.CompilerOptionsForInferredProjects;
        arguments: SetCompilerOptionsForInferredProjectsArgs;
    }
    interface SetCompilerOptionsForInferredProjectsArgs {
        options: ExternalProjectCompilerOptions;
        projectRootPath?: string;
    }
    interface SetCompilerOptionsForInferredProjectsResponse extends Response {
    }
    interface ExitRequest extends Request {
        command: CommandTypes.Exit;
    }
    interface CloseRequest extends FileRequest {
        command: CommandTypes.Close;
    }
    interface CompileOnSaveAffectedFileListRequest extends FileRequest {
        command: CommandTypes.CompileOnSaveAffectedFileList;
    }
    interface CompileOnSaveAffectedFileListSingleProject {
        projectFileName: string;
        fileNames: string[];
        projectUsesOutFile: boolean;
    }
    interface CompileOnSaveAffectedFileListResponse extends Response {
        body: CompileOnSaveAffectedFileListSingleProject[];
    }
    interface CompileOnSaveEmitFileRequest extends FileRequest {
        command: CommandTypes.CompileOnSaveEmitFile;
        arguments: CompileOnSaveEmitFileRequestArgs;
    }
    interface CompileOnSaveEmitFileRequestArgs extends FileRequestArgs {
        forced?: boolean;
    }
    interface QuickInfoRequest extends FileLocationRequest {
        command: CommandTypes.Quickinfo;
    }
    interface QuickInfoResponseBody {
        kind: ScriptElementKind;
        kindModifiers: string;
        start: Location;
        end: Location;
        displayString: string;
        documentation: string;
        tags: JSDocTagInfo[];
    }
    interface QuickInfoResponse extends Response {
        body?: QuickInfoResponseBody;
    }
    interface FormatRequestArgs extends FileLocationRequestArgs {
        endLine: number;
        endOffset: number;
        endPosition?: number;
        options?: FormatCodeSettings;
    }
    interface FormatRequest extends FileLocationRequest {
        command: CommandTypes.Format;
        arguments: FormatRequestArgs;
    }
    interface CodeEdit {
        start: Location;
        end: Location;
        newText: string;
    }
    interface FileCodeEdits {
        fileName: string;
        textChanges: CodeEdit[];
    }
    interface CodeFixResponse extends Response {
        body?: CodeFixAction[];
    }
    interface CodeAction {
        description: string;
        changes: FileCodeEdits[];
        commands?: {}[];
    }
    interface CombinedCodeActions {
        changes: ReadonlyArray<FileCodeEdits>;
        commands?: ReadonlyArray<{}>;
    }
    interface CodeFixAction extends CodeAction {
        fixId?: {};
    }
    interface FormatResponse extends Response {
        body?: CodeEdit[];
    }
    interface FormatOnKeyRequestArgs extends FileLocationRequestArgs {
        key: string;
        options?: FormatCodeSettings;
    }
    interface FormatOnKeyRequest extends FileLocationRequest {
        command: CommandTypes.Formatonkey;
        arguments: FormatOnKeyRequestArgs;
    }
    interface CompletionsRequestArgs extends FileLocationRequestArgs {
        prefix?: string;
        includeExternalModuleExports: boolean;
        includeInsertTextCompletions: boolean;
    }
    interface CompletionsRequest extends FileLocationRequest {
        command: CommandTypes.Completions;
        arguments: CompletionsRequestArgs;
    }
    interface CompletionDetailsRequestArgs extends FileLocationRequestArgs {
        entryNames: (string | CompletionEntryIdentifier)[];
    }
    interface CompletionEntryIdentifier {
        name: string;
        source: string;
    }
    interface CompletionDetailsRequest extends FileLocationRequest {
        command: CommandTypes.CompletionDetails;
        arguments: CompletionDetailsRequestArgs;
    }
    interface SymbolDisplayPart {
        text: string;
        kind: string;
    }
    interface CompletionEntry {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        sortText: string;
        insertText?: string;
        replacementSpan?: TextSpan;
        hasAction?: true;
        source?: string;
        isRecommended?: true;
    }
    interface CompletionEntryDetails {
        name: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        displayParts: SymbolDisplayPart[];
        documentation: SymbolDisplayPart[];
        tags: JSDocTagInfo[];
        codeActions?: CodeAction[];
        source?: SymbolDisplayPart[];
    }
    interface CompletionsResponse extends Response {
        body?: CompletionEntry[];
    }
    interface CompletionDetailsResponse extends Response {
        body?: CompletionEntryDetails[];
    }
    interface SignatureHelpParameter {
        name: string;
        documentation: SymbolDisplayPart[];
        displayParts: SymbolDisplayPart[];
        isOptional: boolean;
    }
    interface SignatureHelpItem {
        isVariadic: boolean;
        prefixDisplayParts: SymbolDisplayPart[];
        suffixDisplayParts: SymbolDisplayPart[];
        separatorDisplayParts: SymbolDisplayPart[];
        parameters: SignatureHelpParameter[];
        documentation: SymbolDisplayPart[];
        tags: JSDocTagInfo[];
    }
    interface SignatureHelpItems {
        items: SignatureHelpItem[];
        applicableSpan: TextSpan;
        selectedItemIndex: number;
        argumentIndex: number;
        argumentCount: number;
    }
    interface SignatureHelpRequestArgs extends FileLocationRequestArgs {
    }
    interface SignatureHelpRequest extends FileLocationRequest {
        command: CommandTypes.SignatureHelp;
        arguments: SignatureHelpRequestArgs;
    }
    interface SignatureHelpResponse extends Response {
        body?: SignatureHelpItems;
    }
    interface SemanticDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SemanticDiagnosticsSync;
        arguments: SemanticDiagnosticsSyncRequestArgs;
    }
    interface SemanticDiagnosticsSyncRequestArgs extends FileRequestArgs {
        includeLinePosition?: boolean;
    }
    interface SemanticDiagnosticsSyncResponse extends Response {
        body?: Diagnostic[] | DiagnosticWithLinePosition[];
    }
    interface SuggestionDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SuggestionDiagnosticsSync;
        arguments: SuggestionDiagnosticsSyncRequestArgs;
    }
    type SuggestionDiagnosticsSyncRequestArgs = SemanticDiagnosticsSyncRequestArgs;
    type SuggestionDiagnosticsSyncResponse = SemanticDiagnosticsSyncResponse;
    interface SyntacticDiagnosticsSyncRequest extends FileRequest {
        command: CommandTypes.SyntacticDiagnosticsSync;
        arguments: SyntacticDiagnosticsSyncRequestArgs;
    }
    interface SyntacticDiagnosticsSyncRequestArgs extends FileRequestArgs {
        includeLinePosition?: boolean;
    }
    interface SyntacticDiagnosticsSyncResponse extends Response {
        body?: Diagnostic[] | DiagnosticWithLinePosition[];
    }
    interface GeterrForProjectRequestArgs {
        file: string;
        delay: number;
    }
    interface GeterrForProjectRequest extends Request {
        command: CommandTypes.GeterrForProject;
        arguments: GeterrForProjectRequestArgs;
    }
    interface GeterrRequestArgs {
        files: string[];
        delay: number;
    }
    interface GeterrRequest extends Request {
        command: CommandTypes.Geterr;
        arguments: GeterrRequestArgs;
    }
    type RequestCompletedEventName = "requestCompleted";
    interface RequestCompletedEvent extends Event {
        event: RequestCompletedEventName;
        body: RequestCompletedEventBody;
    }
    interface RequestCompletedEventBody {
        request_seq: number;
    }
    interface Diagnostic {
        start: Location;
        end: Location;
        text: string;
        category: string;
        code?: number;
        source?: string;
    }
    interface DiagnosticWithFileName extends Diagnostic {
        fileName: string;
    }
    interface DiagnosticEventBody {
        file: string;
        diagnostics: Diagnostic[];
    }
    type DiagnosticEventKind = "semanticDiag" | "syntaxDiag" | "suggestionDiag";
    interface DiagnosticEvent extends Event {
        body?: DiagnosticEventBody;
    }
    interface ConfigFileDiagnosticEventBody {
        triggerFile: string;
        configFile: string;
        diagnostics: DiagnosticWithFileName[];
    }
    interface ConfigFileDiagnosticEvent extends Event {
        body?: ConfigFileDiagnosticEventBody;
        event: "configFileDiag";
    }
    type ProjectLanguageServiceStateEventName = "projectLanguageServiceState";
    interface ProjectLanguageServiceStateEvent extends Event {
        event: ProjectLanguageServiceStateEventName;
        body?: ProjectLanguageServiceStateEventBody;
    }
    interface ProjectLanguageServiceStateEventBody {
        projectName: string;
        languageServiceEnabled: boolean;
    }
    type ProjectsUpdatedInBackgroundEventName = "projectsUpdatedInBackground";
    interface ProjectsUpdatedInBackgroundEvent extends Event {
        event: ProjectsUpdatedInBackgroundEventName;
        body: ProjectsUpdatedInBackgroundEventBody;
    }
    interface ProjectsUpdatedInBackgroundEventBody {
        openFiles: string[];
    }
    interface ReloadRequestArgs extends FileRequestArgs {
        tmpfile: string;
    }
    interface ReloadRequest extends FileRequest {
        command: CommandTypes.Reload;
        arguments: ReloadRequestArgs;
    }
    interface ReloadResponse extends Response {
    }
    interface SavetoRequestArgs extends FileRequestArgs {
        tmpfile: string;
    }
    interface SavetoRequest extends FileRequest {
        command: CommandTypes.Saveto;
        arguments: SavetoRequestArgs;
    }
    interface NavtoRequestArgs extends FileRequestArgs {
        searchValue: string;
        maxResultCount?: number;
        currentFileOnly?: boolean;
        projectFileName?: string;
    }
    interface NavtoRequest extends FileRequest {
        command: CommandTypes.Navto;
        arguments: NavtoRequestArgs;
    }
    interface NavtoItem {
        name: string;
        kind: ScriptElementKind;
        matchKind?: string;
        isCaseSensitive?: boolean;
        kindModifiers?: string;
        file: string;
        start: Location;
        end: Location;
        containerName?: string;
        containerKind?: ScriptElementKind;
    }
    interface NavtoResponse extends Response {
        body?: NavtoItem[];
    }
    interface ChangeRequestArgs extends FormatRequestArgs {
        insertString?: string;
    }
    interface ChangeRequest extends FileLocationRequest {
        command: CommandTypes.Change;
        arguments: ChangeRequestArgs;
    }
    interface BraceResponse extends Response {
        body?: TextSpan[];
    }
    interface BraceRequest extends FileLocationRequest {
        command: CommandTypes.Brace;
    }
    interface NavBarRequest extends FileRequest {
        command: CommandTypes.NavBar;
    }
    interface NavTreeRequest extends FileRequest {
        command: CommandTypes.NavTree;
    }
    interface NavigationBarItem {
        text: string;
        kind: ScriptElementKind;
        kindModifiers?: string;
        spans: TextSpan[];
        childItems?: NavigationBarItem[];
        indent: number;
    }
    interface NavigationTree {
        text: string;
        kind: ScriptElementKind;
        kindModifiers: string;
        spans: TextSpan[];
        childItems?: NavigationTree[];
    }
    type TelemetryEventName = "telemetry";
    interface TelemetryEvent extends Event {
        event: TelemetryEventName;
        body: TelemetryEventBody;
    }
    interface TelemetryEventBody {
        telemetryEventName: string;
        payload: any;
    }
    type TypesInstallerInitializationFailedEventName = "typesInstallerInitializationFailed";
    interface TypesInstallerInitializationFailedEvent extends Event {
        event: TypesInstallerInitializationFailedEventName;
        body: TypesInstallerInitializationFailedEventBody;
    }
    interface TypesInstallerInitializationFailedEventBody {
        message: string;
    }
    type TypingsInstalledTelemetryEventName = "typingsInstalled";
    interface TypingsInstalledTelemetryEventBody extends TelemetryEventBody {
        telemetryEventName: TypingsInstalledTelemetryEventName;
        payload: TypingsInstalledTelemetryEventPayload;
    }
    interface TypingsInstalledTelemetryEventPayload {
        installedPackages: string;
        installSuccess: boolean;
        typingsInstallerVersion: string;
    }
    type BeginInstallTypesEventName = "beginInstallTypes";
    type EndInstallTypesEventName = "endInstallTypes";
    interface BeginInstallTypesEvent extends Event {
        event: BeginInstallTypesEventName;
        body: BeginInstallTypesEventBody;
    }
    interface EndInstallTypesEvent extends Event {
        event: EndInstallTypesEventName;
        body: EndInstallTypesEventBody;
    }
    interface InstallTypesEventBody {
        eventId: number;
        packages: ReadonlyArray<string>;
    }
    interface BeginInstallTypesEventBody extends InstallTypesEventBody {
    }
    interface EndInstallTypesEventBody extends InstallTypesEventBody {
        success: boolean;
    }
    interface NavBarResponse extends Response {
        body?: NavigationBarItem[];
    }
    interface NavTreeResponse extends Response {
        body?: NavigationTree;
    }
    const enum IndentStyle {
        None = "None",
        Block = "Block",
        Smart = "Smart",
    }
    interface EditorSettings {
        baseIndentSize?: number;
        indentSize?: number;
        tabSize?: number;
        newLineCharacter?: string;
        convertTabsToSpaces?: boolean;
        indentStyle?: IndentStyle | ts.IndentStyle;
    }
    interface FormatCodeSettings extends EditorSettings {
        insertSpaceAfterCommaDelimiter?: boolean;
        insertSpaceAfterSemicolonInForStatements?: boolean;
        insertSpaceBeforeAndAfterBinaryOperators?: boolean;
        insertSpaceAfterConstructor?: boolean;
        insertSpaceAfterKeywordsInControlFlowStatements?: boolean;
        insertSpaceAfterFunctionKeywordForAnonymousFunctions?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyParenthesis?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBrackets?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingNonemptyBraces?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingTemplateStringBraces?: boolean;
        insertSpaceAfterOpeningAndBeforeClosingJsxExpressionBraces?: boolean;
        insertSpaceAfterTypeAssertion?: boolean;
        insertSpaceBeforeFunctionParenthesis?: boolean;
        placeOpenBraceOnNewLineForFunctions?: boolean;
        placeOpenBraceOnNewLineForControlBlocks?: boolean;
        insertSpaceBeforeTypeAnnotation?: boolean;
    }
    interface CompilerOptions {
        allowJs?: boolean;
        allowSyntheticDefaultImports?: boolean;
        allowUnreachableCode?: boolean;
        allowUnusedLabels?: boolean;
        alwaysStrict?: boolean;
        baseUrl?: string;
        charset?: string;
        checkJs?: boolean;
        declaration?: boolean;
        declarationDir?: string;
        disableSizeLimit?: boolean;
        downlevelIteration?: boolean;
        emitBOM?: boolean;
        emitDecoratorMetadata?: boolean;
        experimentalDecorators?: boolean;
        forceConsistentCasingInFileNames?: boolean;
        importHelpers?: boolean;
        inlineSourceMap?: boolean;
        inlineSources?: boolean;
        isolatedModules?: boolean;
        jsx?: JsxEmit | ts.JsxEmit;
        lib?: string[];
        locale?: string;
        mapRoot?: string;
        maxNodeModuleJsDepth?: number;
        module?: ModuleKind | ts.ModuleKind;
        moduleResolution?: ModuleResolutionKind | ts.ModuleResolutionKind;
        newLine?: NewLineKind | ts.NewLineKind;
        noEmit?: boolean;
        noEmitHelpers?: boolean;
        noEmitOnError?: boolean;
        noErrorTruncation?: boolean;
        noFallthroughCasesInSwitch?: boolean;
        noImplicitAny?: boolean;
        noImplicitReturns?: boolean;
        noImplicitThis?: boolean;
        noUnusedLocals?: boolean;
        noUnusedParameters?: boolean;
        noImplicitUseStrict?: boolean;
        noLib?: boolean;
        noResolve?: boolean;
        out?: string;
        outDir?: string;
        outFile?: string;
        paths?: MapLike<string[]>;
        plugins?: PluginImport[];
        preserveConstEnums?: boolean;
        preserveSymlinks?: boolean;
        project?: string;
        reactNamespace?: string;
        removeComments?: boolean;
        references?: ProjectReference[];
        rootDir?: string;
        rootDirs?: string[];
        skipLibCheck?: boolean;
        skipDefaultLibCheck?: boolean;
        sourceMap?: boolean;
        sourceRoot?: string;
        strict?: boolean;
        strictNullChecks?: boolean;
        suppressExcessPropertyErrors?: boolean;
        suppressImplicitAnyIndexErrors?: boolean;
        target?: ScriptTarget | ts.ScriptTarget;
        traceResolution?: boolean;
        types?: string[];
        typeRoots?: string[];
        [option: string]: CompilerOptionsValue | undefined;
    }
    const enum JsxEmit {
        None = "None",
        Preserve = "Preserve",
        ReactNative = "ReactNative",
        React = "React",
    }
    const enum ModuleKind {
        None = "None",
        CommonJS = "CommonJS",
        AMD = "AMD",
        UMD = "UMD",
        System = "System",
        ES6 = "ES6",
        ES2015 = "ES2015",
        ESNext = "ESNext",
    }
    const enum ModuleResolutionKind {
        Classic = "Classic",
        Node = "Node",
    }
    const enum NewLineKind {
        Crlf = "Crlf",
        Lf = "Lf",
    }
    const enum ScriptTarget {
        ES3 = "ES3",
        ES5 = "ES5",
        ES6 = "ES6",
        ES2015 = "ES2015",
        ES2016 = "ES2016",
        ES2017 = "ES2017",
        ESNext = "ESNext",
    }
}
declare namespace ts.server {
    const maxProgramSizeForNonTsFiles: number;
    const ProjectsUpdatedInBackgroundEvent = "projectsUpdatedInBackground";
    const ConfigFileDiagEvent = "configFileDiag";
    const ProjectLanguageServiceStateEvent = "projectLanguageServiceState";
    const ProjectInfoTelemetryEvent = "projectInfo";
    interface ProjectsUpdatedInBackgroundEvent {
        eventName: typeof ProjectsUpdatedInBackgroundEvent;
        data: {
            openFiles: string[];
        };
    }
    interface ConfigFileDiagEvent {
        eventName: typeof ConfigFileDiagEvent;
        data: {
            triggerFile: string;
            configFileName: string;
            diagnostics: ReadonlyArray<Diagnostic>;
        };
    }
    interface ProjectLanguageServiceStateEvent {
        eventName: typeof ProjectLanguageServiceStateEvent;
        data: {
            project: Project;
            languageServiceEnabled: boolean;
        };
    }
    interface ProjectInfoTelemetryEvent {
        readonly eventName: typeof ProjectInfoTelemetryEvent;
        readonly data: ProjectInfoTelemetryEventData;
    }
    interface ProjectInfoTelemetryEventData {
        readonly projectId: string;
        readonly fileStats: FileStats;
        readonly compilerOptions: CompilerOptions;
        readonly extends: boolean | undefined;
        readonly files: boolean | undefined;
        readonly include: boolean | undefined;
        readonly exclude: boolean | undefined;
        readonly compileOnSave: boolean;
        readonly typeAcquisition: ProjectInfoTypeAcquisitionData;
        readonly configFileName: "tsconfig.json" | "jsconfig.json" | "other";
        readonly projectType: "external" | "configured";
        readonly languageServiceEnabled: boolean;
        readonly version: string;
    }
    interface ProjectInfoTypeAcquisitionData {
        readonly enable: boolean;
        readonly include: boolean;
        readonly exclude: boolean;
    }
    interface FileStats {
        readonly js: number;
        readonly jsx: number;
        readonly ts: number;
        readonly tsx: number;
        readonly dts: number;
    }
    type ProjectServiceEvent = ProjectsUpdatedInBackgroundEvent | ConfigFileDiagEvent | ProjectLanguageServiceStateEvent | ProjectInfoTelemetryEvent;
    type ProjectServiceEventHandler = (event: ProjectServiceEvent) => void;
    interface SafeList {
        [name: string]: {
            match: RegExp;
            exclude?: (string | number)[][];
            types?: string[];
        };
    }
    interface TypesMapFile {
        typesMap: SafeList;
        simpleMap: {
            [libName: string]: string;
        };
    }
    function convertFormatOptions(protocolOptions: protocol.FormatCodeSettings): FormatCodeSettings;
    function convertCompilerOptions(protocolOptions: protocol.ExternalProjectCompilerOptions): CompilerOptions & protocol.CompileOnSaveMixin;
    function tryConvertScriptKindName(scriptKindName: protocol.ScriptKindName | ScriptKind): ScriptKind;
    function convertScriptKindName(scriptKindName: protocol.ScriptKindName): ScriptKind.Unknown | ScriptKind.JS | ScriptKind.JSX | ScriptKind.TS | ScriptKind.TSX;
    interface HostConfiguration {
        formatCodeOptions: FormatCodeSettings;
        hostInfo: string;
        extraFileExtensions?: JsFileExtensionInfo[];
    }
    interface OpenConfiguredProjectResult {
        configFileName?: NormalizedPath;
        configFileErrors?: ReadonlyArray<Diagnostic>;
    }
    const enum WatchType {
        ConfigFilePath = "Config file for the program",
        MissingFilePath = "Missing file from program",
        WildcardDirectories = "Wild card directory",
        ClosedScriptInfo = "Closed Script info",
        ConfigFileForInferredRoot = "Config file for the inferred project root",
        FailedLookupLocation = "Directory of Failed lookup locations in module resolution",
        TypeRoots = "Type root directory",
    }
    interface ConfigFileExistenceInfo {
        exists: boolean;
        openFilesImpactedByConfigFile: Map<boolean>;
        configFileWatcherForRootOfInferredProject?: FileWatcher;
    }
    interface ProjectServiceOptions {
        host: ServerHost;
        logger: Logger;
        cancellationToken: HostCancellationToken;
        useSingleInferredProject: boolean;
        useInferredProjectPerProjectRoot: boolean;
        typingsInstaller: ITypingsInstaller;
        eventHandler?: ProjectServiceEventHandler;
        throttleWaitMilliseconds?: number;
        globalPlugins?: ReadonlyArray<string>;
        pluginProbeLocations?: ReadonlyArray<string>;
        allowLocalPluginLoads?: boolean;
        typesMapLocation?: string;
    }
    type WatchFile = (host: ServerHost, file: string, cb: FileWatcherCallback, watchType: WatchType, project?: Project) => FileWatcher;
    type WatchFilePath = (host: ServerHost, file: string, cb: FilePathWatcherCallback, path: Path, watchType: WatchType, project?: Project) => FileWatcher;
    type WatchDirectory = (host: ServerHost, directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags, watchType: WatchType, project?: Project) => FileWatcher;
    class ProjectService {
        readonly typingsCache: TypingsCache;
        private readonly documentRegistry;
        private readonly filenameToScriptInfo;
        readonly realpathToScriptInfos: MultiMap<ScriptInfo> | undefined;
        private readonly externalProjectToConfiguredProjectMap;
        readonly externalProjects: ExternalProject[];
        readonly inferredProjects: InferredProject[];
        readonly configuredProjects: Map<ConfiguredProject>;
        readonly openFiles: Map<NormalizedPath>;
        private readonly openFilesWithNonRootedDiskPath;
        private compilerOptionsForInferredProjects;
        private compilerOptionsForInferredProjectsPerProjectRoot;
        private readonly projectToSizeMap;
        private readonly configFileExistenceInfoCache;
        private readonly throttledOperations;
        private readonly hostConfiguration;
        private safelist;
        private legacySafelist;
        private pendingProjectUpdates;
        pendingEnsureProjectForOpenFiles: boolean;
        readonly currentDirectory: string;
        readonly toCanonicalFileName: (f: string) => string;
        readonly host: ServerHost;
        readonly logger: Logger;
        readonly cancellationToken: HostCancellationToken;
        readonly useSingleInferredProject: boolean;
        readonly useInferredProjectPerProjectRoot: boolean;
        readonly typingsInstaller: ITypingsInstaller;
        readonly throttleWaitMilliseconds?: number;
        private readonly eventHandler?;
        readonly globalPlugins: ReadonlyArray<string>;
        readonly pluginProbeLocations: ReadonlyArray<string>;
        readonly allowLocalPluginLoads: boolean;
        readonly typesMapLocation: string | undefined;
        private readonly seenProjects;
        readonly watchFile: WatchFile;
        readonly watchFilePath: WatchFilePath;
        readonly watchDirectory: WatchDirectory;
        constructor(opts: ProjectServiceOptions);
        private createWatcherLog(watchType, project);
        toPath(fileName: string): Path;
        getExecutingFilePath(): string;
        getNormalizedAbsolutePath(fileName: string): string;
        ensureInferredProjectsUpToDate_TestOnly(): void;
        getCompilerOptionsForInferredProjects(): CompilerOptions;
        onUpdateLanguageServiceStateForProject(project: Project, languageServiceEnabled: boolean): void;
        private loadTypesMap();
        updateTypingsForProject(response: SetTypings | InvalidateCachedTypings | PackageInstalledResponse): void;
        private delayEnsureProjectForOpenFiles();
        private delayUpdateProjectGraph(project);
        hasPendingProjectUpdate(project: Project): boolean;
        private sendProjectsUpdatedInBackgroundEvent();
        delayUpdateProjectGraphAndEnsureProjectStructureForOpenFiles(project: Project): void;
        private delayUpdateProjectGraphs(projects);
        setCompilerOptionsForInferredProjects(projectCompilerOptions: protocol.ExternalProjectCompilerOptions, projectRootPath?: string): void;
        findProject(projectName: string): Project | undefined;
        getDefaultProjectForFile(fileName: NormalizedPath, ensureProject: boolean): Project;
        getScriptInfoEnsuringProjectsUptoDate(uncheckedFileName: string): ScriptInfo;
        private ensureProjectStructuresUptoDate();
        private updateProjectIfDirty(project);
        getFormatCodeOptions(file?: NormalizedPath): FormatCodeSettings;
        private onSourceFileChanged(fileName, eventKind);
        private handleDeletedFile(info);
        watchWildcardDirectory(directory: Path, flags: WatchDirectoryFlags, project: ConfiguredProject): FileWatcher;
        getConfigFileExistenceInfo(project: ConfiguredProject): ConfigFileExistenceInfo;
        private onConfigChangedForConfiguredProject(project, eventKind);
        private onConfigFileChangeForOpenScriptInfo(configFileName, eventKind);
        private removeProject(project);
        assignOrphanScriptInfoToInferredProject(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): InferredProject;
        private closeOpenFile(info);
        private deleteOrphanScriptInfoNotInAnyProject();
        private deleteScriptInfo(info);
        private configFileExists(configFileName, canonicalConfigFilePath, info);
        private setConfigFileExistenceByNewConfiguredProject(project);
        private configFileExistenceImpactsRootOfInferredProject(configFileExistenceInfo);
        private setConfigFileExistenceInfoByClosedConfiguredProject(closedProject);
        private logConfigFileWatchUpdate(configFileName, canonicalConfigFilePath, configFileExistenceInfo, status);
        private createConfigFileWatcherOfConfigFileExistence(configFileName, canonicalConfigFilePath, configFileExistenceInfo);
        private closeConfigFileWatcherOfConfigFileExistenceInfo(configFileExistenceInfo);
        private stopWatchingConfigFilesForClosedScriptInfo(info);
        startWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo, projectRootPath: NormalizedPath | undefined): void;
        stopWatchingConfigFilesForInferredProjectRoot(info: ScriptInfo): void;
        private forEachConfigFileLocation(info, action, projectRootPath?);
        private getConfigFileNameForFile(info, projectRootPath);
        private printProjects();
        private findConfiguredProjectByProjectName(configFileName);
        private getConfiguredProjectByCanonicalConfigFilePath(canonicalConfigFilePath);
        private findExternalProjectByProjectName(projectFileName);
        private convertConfigFileContentToProjectOptions(configFilename, cachedDirectoryStructureHost);
        private getFilenameForExceededTotalSizeLimitForNonTsFiles<T>(name, options, fileNames, propertyReader);
        private createExternalProject(projectFileName, files, options, typeAcquisition, excludedFiles);
        private sendProjectTelemetry(projectKey, project, projectOptions?);
        private addFilesToNonInferredProjectAndUpdateGraph<T>(project, files, propertyReader, typeAcquisition);
        private createConfiguredProject(configFileName);
        private updateNonInferredProjectFiles<T>(project, files, propertyReader);
        private updateNonInferredProject<T>(project, newUncheckedFiles, propertyReader, newOptions, newTypeAcquisition, compileOnSave);
        reloadFileNamesOfConfiguredProject(project: ConfiguredProject): boolean;
        reloadConfiguredProject(project: ConfiguredProject): void;
        private sendConfigFileDiagEvent(project, triggerFile);
        private getOrCreateInferredProjectForProjectRootPathIfEnabled(info, projectRootPath);
        private getOrCreateSingleInferredProjectIfEnabled();
        private createInferredProject(currentDirectory, isSingleInferredProject?, projectRootPath?);
        getOrCreateScriptInfoNotOpenedByClient(uncheckedFileName: string, currentDirectory: string, hostToQueryFileExistsOn: DirectoryStructureHost): ScriptInfo;
        getScriptInfo(uncheckedFileName: string): ScriptInfo;
        getSymlinkedProjects(info: ScriptInfo): MultiMap<Project> | undefined;
        private watchClosedScriptInfo(info);
        private stopWatchingScriptInfo(info);
        getOrCreateScriptInfoNotOpenedByClientForNormalizedPath(fileName: NormalizedPath, currentDirectory: string, scriptKind: ScriptKind | undefined, hasMixedContent: boolean | undefined, hostToQueryFileExistsOn: DirectoryStructureHost | undefined): ScriptInfo;
        getOrCreateScriptInfoOpenedByClientForNormalizedPath(fileName: NormalizedPath, currentDirectory: string, fileContent: string | undefined, scriptKind: ScriptKind | undefined, hasMixedContent: boolean | undefined): ScriptInfo;
        getOrCreateScriptInfoForNormalizedPath(fileName: NormalizedPath, openedByClient: boolean, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, hostToQueryFileExistsOn?: {
            fileExists(path: string): boolean;
        }): ScriptInfo;
        private getOrCreateScriptInfoWorker(fileName, currentDirectory, openedByClient, fileContent?, scriptKind?, hasMixedContent?, hostToQueryFileExistsOn?);
        getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo;
        getScriptInfoForPath(fileName: Path): ScriptInfo;
        setHostConfiguration(args: protocol.ConfigureRequestArguments): void;
        closeLog(): void;
        reloadProjects(): void;
        private delayReloadConfiguredProjectForFiles(configFileExistenceInfo, ignoreIfNotRootOfInferredProject);
        private reloadConfiguredProjectForFiles<T>(openFiles, delayReload, shouldReloadProjectFor);
        private removeRootOfInferredProjectIfNowPartOfOtherProject(info);
        private ensureProjectForOpenFiles();
        openClientFile(fileName: string, fileContent?: string, scriptKind?: ScriptKind, projectRootPath?: string): OpenConfiguredProjectResult;
        private findExternalProjetContainingOpenScriptInfo(info);
        openClientFileWithNormalizedPath(fileName: NormalizedPath, fileContent?: string, scriptKind?: ScriptKind, hasMixedContent?: boolean, projectRootPath?: NormalizedPath): OpenConfiguredProjectResult;
        closeClientFile(uncheckedFileName: string): void;
        private collectChanges(lastKnownProjectVersions, currentProjects, result);
        synchronizeProjectList(knownProjects: protocol.ProjectVersionInfo[]): ProjectFilesWithTSDiagnostics[];
        applyChangesInOpenFiles(openFiles: protocol.ExternalFile[], changedFiles: protocol.ChangedOpenFile[], closedFiles: string[]): void;
        applyChangesToFile(scriptInfo: ScriptInfo, changes: TextChange[]): void;
        private closeConfiguredProjectReferencedFromExternalProject(configFile);
        closeExternalProject(uncheckedFileName: string): void;
        openExternalProjects(projects: protocol.ExternalProject[]): void;
        private static readonly filenameEscapeRegexp;
        private static escapeFilenameForRegex(filename);
        resetSafeList(): void;
        applySafeList(proj: protocol.ExternalProject): NormalizedPath[];
        openExternalProject(proj: protocol.ExternalProject): void;
    }
}
declare namespace ts.server {
    interface ServerCancellationToken extends HostCancellationToken {
        setRequest(requestId: number): void;
        resetRequest(requestId: number): void;
    }
    const nullCancellationToken: ServerCancellationToken;
    interface PendingErrorCheck {
        fileName: NormalizedPath;
        project: Project;
    }
    type CommandNames = protocol.CommandTypes;
    const CommandNames: any;
    function formatMessage<T extends protocol.Message>(msg: T, logger: server.Logger, byteLength: (s: string, encoding: string) => number, newLine: string): string;
    type Event = <T extends object>(body: T, eventName: string) => void;
    interface EventSender {
        event: Event;
    }
    function toEvent(eventName: string, body: object): protocol.Event;
    interface SessionOptions {
        host: ServerHost;
        cancellationToken: ServerCancellationToken;
        useSingleInferredProject: boolean;
        useInferredProjectPerProjectRoot: boolean;
        typingsInstaller: ITypingsInstaller;
        byteLength: (buf: string, encoding?: string) => number;
        hrtime: (start?: number[]) => number[];
        logger: Logger;
        canUseEvents: boolean;
        eventHandler?: ProjectServiceEventHandler;
        throttleWaitMilliseconds?: number;
        globalPlugins?: ReadonlyArray<string>;
        pluginProbeLocations?: ReadonlyArray<string>;
        allowLocalPluginLoads?: boolean;
    }
    class Session implements EventSender {
        private readonly gcTimer;
        protected projectService: ProjectService;
        private changeSeq;
        private currentRequestId;
        private errorCheck;
        protected host: ServerHost;
        private readonly cancellationToken;
        protected readonly typingsInstaller: ITypingsInstaller;
        protected byteLength: (buf: string, encoding?: string) => number;
        private hrtime;
        protected logger: Logger;
        protected canUseEvents: boolean;
        private eventHandler;
        constructor(opts: SessionOptions);
        private sendRequestCompletedEvent(requestId);
        private defaultEventHandler(event);
        private projectsUpdatedInBackgroundEvent(openFiles);
        logError(err: Error, cmd: string): void;
        send(msg: protocol.Message): void;
        event<T extends object>(body: T, eventName: string): void;
        output(info: any, cmdName: string, reqSeq?: number, errorMsg?: string): void;
        private doOutput(info, cmdName, reqSeq, success, message?);
        private semanticCheck(file, project);
        private syntacticCheck(file, project);
        private infoCheck(file, project);
        private sendDiagnosticsEvent(file, project, diagnostics, kind);
        private updateErrorCheck(next, checkList, ms, requireOpen?);
        private cleanProjects(caption, projects);
        private cleanup();
        private getEncodedSemanticClassifications(args);
        private getProject(projectFileName);
        private getConfigFileAndProject(args);
        private getConfigFileDiagnostics(configFile, project, includeLinePosition);
        private convertToDiagnosticsWithLinePositionFromDiagnosticFile(diagnostics);
        private getCompilerOptionsDiagnostics(args);
        private convertToDiagnosticsWithLinePosition(diagnostics, scriptInfo);
        private getDiagnosticsWorker(args, isSemantic, selector, includeLinePosition);
        private getDefinition(args, simplifiedResult);
        private getDefinitionAndBoundSpan(args, simplifiedResult);
        private mapDefinitionInfo(definitions, project);
        private toFileSpan(fileName, textSpan, project);
        private getTypeDefinition(args);
        private getImplementation(args, simplifiedResult);
        private getOccurrences(args);
        private getSyntacticDiagnosticsSync(args);
        private getSemanticDiagnosticsSync(args);
        private getSuggestionDiagnosticsSync(args);
        private getDocumentHighlights(args, simplifiedResult);
        private setCompilerOptionsForInferredProjects(args);
        private getProjectInfo(args);
        private getProjectInfoWorker(uncheckedFileName, projectFileName, needFileNameList, excludeConfigFiles);
        private getRenameInfo(args);
        private getProjects(args);
        private getDefaultProject(args);
        private getRenameLocations(args, simplifiedResult);
        private getReferences(args, simplifiedResult);
        private openClientFile(fileName, fileContent?, scriptKind?, projectRootPath?);
        private getPosition(args, scriptInfo);
        private getPositionInFile(args, file);
        private getFileAndProject(args);
        private getFileAndLanguageServiceForSyntacticOperation(args);
        private getFileAndProjectWorker(uncheckedFileName, projectFileName);
        private getOutliningSpans(args);
        private getTodoComments(args);
        private getDocCommentTemplate(args);
        private getSpanOfEnclosingComment(args);
        private getIndentation(args);
        private getBreakpointStatement(args);
        private getNameOrDottedNameSpan(args);
        private isValidBraceCompletion(args);
        private getQuickInfoWorker(args, simplifiedResult);
        private getFormattingEditsForRange(args);
        private getFormattingEditsForRangeFull(args);
        private getFormattingEditsForDocumentFull(args);
        private getFormattingEditsAfterKeystrokeFull(args);
        private getFormattingEditsAfterKeystroke(args);
        private getCompletions(args, simplifiedResult);
        private getCompletionEntryDetails(args, simplifiedResult);
        private getCompileOnSaveAffectedFileList(args);
        private emitFile(args);
        private getSignatureHelpItems(args, simplifiedResult);
        private createCheckList(fileNames, defaultProject?);
        private getDiagnostics(next, delay, fileNames);
        private change(args);
        private reload(args, reqSeq);
        private saveToTmp(fileName, tempFileName);
        private closeClientFile(fileName);
        private mapLocationNavigationBarItems(items, scriptInfo);
        private getNavigationBarItems(args, simplifiedResult);
        private toLocationNavigationTree(tree, scriptInfo);
        private toLocationTextSpan(span, scriptInfo);
        private getNavigationTree(args, simplifiedResult);
        private getNavigateToItems(args, simplifiedResult);
        private getSupportedCodeFixes();
        private isLocation(locationOrSpan);
        private extractPositionAndRange(args, scriptInfo);
        private getApplicableRefactors(args);
        private getEditsForRefactor(args, simplifiedResult);
        private organizeImports({scope}, simplifiedResult);
        private getCodeFixes(args, simplifiedResult);
        private getCombinedCodeFix({scope, fixId}, simplifiedResult);
        private applyCodeActionCommand(args);
        private getStartAndEndPosition(args, scriptInfo);
        private mapCodeAction(project, {description, changes: unmappedChanges, commands, fixId});
        private mapTextChangesToCodeEdits(project, textChanges);
        private mapTextChangesToCodeEditsUsingScriptinfo(textChanges, scriptInfo);
        private convertTextChangeToCodeEdit(change, scriptInfo);
        private getBraceMatching(args, simplifiedResult);
        private getDiagnosticsForProject(next, delay, fileName);
        getCanonicalFileName(fileName: string): string;
        exit(): void;
        private notRequired();
        private requiredResponse(response);
        private handlers;
        addProtocolHandler(command: string, handler: (request: protocol.Request) => HandlerResponse): void;
        private setCurrentRequest(requestId);
        private resetCurrentRequest(requestId);
        executeWithRequestId<T>(requestId: number, f: () => T): T;
        executeCommand(request: protocol.Request): HandlerResponse;
        onMessage(message: string): void;
    }
    interface HandlerResponse {
        response?: {};
        responseRequired?: boolean;
    }
    function getLocationInNewDocument(oldText: string, renameFilename: string, renameLocation: number, edits: ReadonlyArray<FileTextChanges>): protocol.Location;
}
declare namespace ts.server {
    interface LineCollection {
        charCount(): number;
        lineCount(): number;
        isLeaf(): this is LineLeaf;
        walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void;
    }
    interface AbsolutePositionAndLineText {
        absolutePosition: number;
        lineText: string | undefined;
    }
    const enum CharRangeSection {
        PreStart = 0,
        Start = 1,
        Entire = 2,
        Mid = 3,
        End = 4,
        PostEnd = 5,
    }
    interface LineIndexWalker {
        goSubtree: boolean;
        done: boolean;
        leaf(relativeStart: number, relativeLength: number, lineCollection: LineLeaf): void;
        pre?(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineNode, nodeType: CharRangeSection): void;
        post?(relativeStart: number, relativeLength: number, lineCollection: LineCollection, parent: LineNode, nodeType: CharRangeSection): void;
    }
    class ScriptVersionCache {
        private changes;
        private readonly versions;
        private minVersion;
        private currentVersion;
        private static readonly changeNumberThreshold;
        private static readonly changeLengthThreshold;
        private static readonly maxVersions;
        private versionToIndex(version);
        private currentVersionToIndex();
        edit(pos: number, deleteLen: number, insertedText?: string): void;
        getSnapshot(): IScriptSnapshot;
        private _getSnapshot();
        getSnapshotVersion(): number;
        getLineInfo(line: number): AbsolutePositionAndLineText;
        lineOffsetToPosition(line: number, column: number): number;
        positionToLineOffset(position: number): protocol.Location;
        lineToTextSpan(line: number): TextSpan;
        getTextChangesBetweenVersions(oldVersion: number, newVersion: number): TextChangeRange;
        static fromString(script: string): ScriptVersionCache;
    }
    class LineIndex {
        root: LineNode;
        checkEdits: boolean;
        absolutePositionOfStartOfLine(oneBasedLine: number): number;
        positionToLineOffset(position: number): protocol.Location;
        private positionToColumnAndLineText(position);
        lineNumberToInfo(oneBasedLine: number): AbsolutePositionAndLineText;
        load(lines: string[]): void;
        walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void;
        getText(rangeStart: number, rangeLength: number): string;
        getLength(): number;
        every(f: (ll: LineLeaf, s: number, len: number) => boolean, rangeStart: number, rangeEnd?: number): boolean;
        edit(pos: number, deleteLength: number, newText?: string): LineIndex;
        private static buildTreeFromBottom(nodes);
        static linesFromText(text: string): {
            lines: string[];
            lineMap: number[];
        };
    }
    class LineNode implements LineCollection {
        private readonly children;
        totalChars: number;
        totalLines: number;
        constructor(children?: LineCollection[]);
        isLeaf(): boolean;
        updateCounts(): void;
        private execWalk(rangeStart, rangeLength, walkFns, childIndex, nodeType);
        private skipChild(relativeStart, relativeLength, childIndex, walkFns, nodeType);
        walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void;
        charOffsetToLineInfo(lineNumberAccumulator: number, relativePosition: number): {
            oneBasedLine: number;
            zeroBasedColumn: number;
            lineText: string | undefined;
        };
        lineNumberToInfo(relativeOneBasedLine: number, positionAccumulator: number): {
            position: number;
            leaf: LineLeaf | undefined;
        };
        private splitAfter(childIndex);
        remove(child: LineCollection): void;
        private findChildIndex(child);
        insertAt(child: LineCollection, nodes: LineCollection[]): LineNode[];
        add(collection: LineCollection): void;
        charCount(): number;
        lineCount(): number;
    }
    class LineLeaf implements LineCollection {
        text: string;
        constructor(text: string);
        isLeaf(): boolean;
        walk(rangeStart: number, rangeLength: number, walkFns: LineIndexWalker): void;
        charCount(): number;
        lineCount(): number;
    }
}
declare namespace ts.server {
    class TextStorage {
        private readonly host;
        private readonly fileName;
        private svc;
        private svcVersion;
        private text;
        private lineMap;
        private textVersion;
        isOpen: boolean;
        private ownFileText;
        private pendingReloadFromDisk;
        constructor(host: ServerHost, fileName: NormalizedPath);
        getVersion(): string;
        hasScriptVersionCache_TestOnly(): boolean;
        useScriptVersionCache_TestOnly(): void;
        useText(newText?: string): void;
        edit(start: number, end: number, newText: string): void;
        reload(newText: string): boolean;
        reloadWithFileText(tempFileName?: string): boolean;
        reloadFromDisk(): boolean;
        delayReloadFromFileIntoText(): void;
        getSnapshot(): IScriptSnapshot;
        getLineInfo(line: number): AbsolutePositionAndLineText;
        lineToTextSpan(line: number): TextSpan;
        lineOffsetToPosition(line: number, offset: number): number;
        positionToLineOffset(position: number): protocol.Location;
        private getFileText(tempFileName?);
        private switchToScriptVersionCache();
        private useScriptVersionCacheIfValidOrOpen();
        private getOrLoadText();
        private getLineMap();
    }
    function isDynamicFileName(fileName: NormalizedPath): boolean;
    class ScriptInfo {
        private readonly host;
        readonly fileName: NormalizedPath;
        readonly scriptKind: ScriptKind;
        readonly hasMixedContent: boolean;
        readonly path: Path;
        readonly containingProjects: Project[];
        private formatCodeSettings;
        fileWatcher: FileWatcher;
        private textStorage;
        readonly isDynamic: boolean;
        private realpath;
        constructor(host: ServerHost, fileName: NormalizedPath, scriptKind: ScriptKind, hasMixedContent: boolean, path: Path);
        isDynamicOrHasMixedContent(): boolean;
        isScriptOpen(): boolean;
        open(newText: string): void;
        close(fileExists?: boolean): void;
        getSnapshot(): IScriptSnapshot;
        private ensureRealPath();
        getRealpathIfDifferent(): Path | undefined;
        getFormatCodeSettings(): FormatCodeSettings;
        attachToProject(project: Project): boolean;
        isAttached(project: Project): boolean;
        detachFromProject(project: Project): void;
        detachAllProjects(): void;
        getDefaultProject(): Project;
        registerFileUpdate(): void;
        setFormatOptions(formatSettings: FormatCodeSettings): void;
        getLatestVersion(): string;
        saveTo(fileName: string): void;
        delayReloadNonMixedContentFile(): void;
        reloadFromFile(tempFileName?: NormalizedPath): void;
        getLineInfo(line: number): AbsolutePositionAndLineText;
        editContent(start: number, end: number, newText: string): void;
        markContainingProjectsAsDirty(): void;
        isOrphan(): boolean;
        lineToTextSpan(line: number): TextSpan;
        lineOffsetToPosition(line: number, offset: number): number;
        positionToLineOffset(position: number): protocol.Location;
        isJavaScript(): boolean;
    }
}
declare namespace ts.server {
    enum ProjectKind {
        Inferred = 0,
        Configured = 1,
        External = 2,
    }
    function countEachFileTypes(infos: ScriptInfo[]): FileStats;
    function allRootFilesAreJsOrDts(project: Project): boolean;
    function allFilesAreJsOrDts(project: Project): boolean;
    function hasNoTypeScriptSource(fileNames: string[]): boolean;
    interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
        projectErrors: ReadonlyArray<Diagnostic>;
    }
    class UnresolvedImportsMap {
        readonly perFileMap: Map<ReadonlyArray<string>>;
        private version;
        clear(): void;
        getVersion(): number;
        remove(path: Path): void;
        get(path: Path): ReadonlyArray<string>;
        set(path: Path, value: ReadonlyArray<string>): void;
    }
    interface PluginCreateInfo {
        project: Project;
        languageService: LanguageService;
        languageServiceHost: LanguageServiceHost;
        serverHost: ServerHost;
        config: any;
    }
    interface PluginModule {
        create(createInfo: PluginCreateInfo): LanguageService;
        getExternalFiles?(proj: Project): string[];
    }
    type PluginModuleFactory = (mod: {
        typescript: typeof ts;
    }) => PluginModule;
    type ProjectRoot = ScriptInfo | NormalizedPath;
    function isScriptInfo(value: ProjectRoot): value is ScriptInfo;
    abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
        readonly projectName: string;
        readonly projectKind: ProjectKind;
        readonly projectService: ProjectService;
        private documentRegistry;
        private compilerOptions;
        compileOnSaveEnabled: boolean;
        private rootFiles;
        private rootFilesMap;
        private program;
        private externalFiles;
        private missingFilesMap;
        private plugins;
        private cachedUnresolvedImportsPerFile;
        private lastCachedUnresolvedImportsList;
        private lastFileExceededProgramSize;
        protected languageService: LanguageService;
        languageServiceEnabled: boolean;
        readonly trace?: (s: string) => void;
        readonly realpath?: (path: string) => string;
        hasInvalidatedResolution: HasInvalidatedResolution;
        resolutionCache: ResolutionCache;
        private builderState;
        private updatedFileNames;
        private lastReportedFileNames;
        private lastReportedVersion;
        private projectStructureVersion;
        private projectStateVersion;
        dirty: boolean;
        hasChangedAutomaticTypeDirectiveNames: boolean;
        private typingFiles;
        private readonly cancellationToken;
        isNonTsProject(): boolean;
        isJsOnlyProject(): boolean;
        getCachedUnresolvedImportsPerFile_TestOnly(): UnresolvedImportsMap;
        static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void): {};
        readonly currentDirectory: string;
        directoryStructureHost: DirectoryStructureHost;
        constructor(projectName: string, projectKind: ProjectKind, projectService: ProjectService, documentRegistry: DocumentRegistry, hasExplicitListOfFiles: boolean, lastFileExceededProgramSize: string | undefined, compilerOptions: CompilerOptions, compileOnSaveEnabled: boolean, directoryStructureHost: DirectoryStructureHost, currentDirectory: string | undefined);
        isKnownTypesPackageName(name: string): boolean;
        installPackage(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
        private readonly typingsCache;
        getCompilationSettings(): CompilerOptions;
        getCompilerOptions(): CompilerOptions;
        getNewLine(): string;
        getProjectVersion(): string;
        getScriptFileNames(): string[];
        private getOrCreateScriptInfoAndAttachToProject(fileName);
        getScriptKind(fileName: string): ScriptKind;
        getScriptVersion(filename: string): string;
        getScriptSnapshot(filename: string): IScriptSnapshot;
        getCancellationToken(): HostCancellationToken;
        getCurrentDirectory(): string;
        getDefaultLibFileName(): string;
        useCaseSensitiveFileNames(): boolean;
        readDirectory(path: string, extensions?: ReadonlyArray<string>, exclude?: ReadonlyArray<string>, include?: ReadonlyArray<string>, depth?: number): string[];
        readFile(fileName: string): string | undefined;
        fileExists(file: string): boolean;
        resolveModuleNames(moduleNames: string[], containingFile: string, reusedNames?: string[]): ResolvedModuleFull[];
        resolveTypeReferenceDirectives(typeDirectiveNames: string[], containingFile: string): ResolvedTypeReferenceDirective[];
        directoryExists(path: string): boolean;
        getDirectories(path: string): string[];
        getCachedDirectoryStructureHost(): CachedDirectoryStructureHost;
        toPath(fileName: string): Path;
        watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onInvalidatedResolution(): void;
        watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
        onChangedAutomaticTypeDirectiveNames(): void;
        getGlobalCache(): string;
        writeLog(s: string): void;
        log(s: string): void;
        error(s: string): void;
        private setInternalCompilerOptionsForEmittingJsFiles();
        getGlobalProjectErrors(): ReadonlyArray<Diagnostic>;
        getAllProjectErrors(): ReadonlyArray<Diagnostic>;
        getLanguageService(ensureSynchronized?: boolean): LanguageService;
        private shouldEmitFile(scriptInfo);
        getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[];
        emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): boolean;
        enableLanguageService(): void;
        disableLanguageService(lastFileExceededProgramSize?: string): void;
        getProjectName(): string;
        abstract getTypeAcquisition(): TypeAcquisition;
        protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: TypeAcquisition): TypeAcquisition;
        getExternalFiles(): SortedReadonlyArray<string>;
        getSourceFile(path: Path): SourceFile;
        close(): void;
        private detachScriptInfoIfNotRoot(uncheckedFilename);
        isClosed(): boolean;
        hasRoots(): boolean;
        getRootFiles(): NormalizedPath[];
        getRootFilesMap(): Map<ProjectRoot>;
        getRootScriptInfos(): ScriptInfo[];
        getScriptInfos(): ScriptInfo[];
        getExcludedFiles(): ReadonlyArray<NormalizedPath>;
        getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean): NormalizedPath[];
        hasConfigFile(configFilePath: NormalizedPath): boolean;
        containsScriptInfo(info: ScriptInfo): boolean;
        containsFile(filename: NormalizedPath, requireOpen?: boolean): boolean;
        isRoot(info: ScriptInfo): boolean;
        addRoot(info: ScriptInfo): void;
        addMissingFileRoot(fileName: NormalizedPath): void;
        removeFile(info: ScriptInfo, fileExists: boolean, detachFromProject: boolean): void;
        registerFileUpdate(fileName: string): void;
        markAsDirty(): void;
        private extractUnresolvedImportsFromSourceFile(file, result, ambientModules);
        updateGraph(): boolean;
        getCurrentProgram(): Program;
        protected removeExistingTypings(include: string[]): string[];
        private updateGraphWorker();
        private detachScriptInfoFromProject(uncheckedFileName);
        private addMissingFileWatcher(missingFilePath);
        private isWatchedMissingFile(path);
        getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo;
        getScriptInfo(uncheckedFileName: string): ScriptInfo;
        filesToString(writeProjectFileNames: boolean): string;
        setCompilerOptions(compilerOptions: CompilerOptions): void;
        getChangesSinceVersion(lastKnownVersion?: number): ProjectFilesWithTSDiagnostics;
        protected removeRoot(info: ScriptInfo): void;
        protected enableGlobalPlugins(): void;
        protected enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[]): void;
        private enableProxy(pluginModuleFactory, configEntry);
    }
    class InferredProject extends Project {
        private static readonly newName;
        private _isJsInferredProject;
        toggleJsInferredProject(isJsInferredProject: boolean): void;
        setCompilerOptions(options?: CompilerOptions): void;
        readonly projectRootPath: string | undefined;
        constructor(projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions, projectRootPath: NormalizedPath | undefined, currentDirectory: string | undefined);
        addRoot(info: ScriptInfo): void;
        removeRoot(info: ScriptInfo): void;
        isProjectWithSingleRoot(): boolean;
        close(): void;
        getTypeAcquisition(): TypeAcquisition;
    }
    class ConfiguredProject extends Project {
        compileOnSaveEnabled: boolean;
        private typeAcquisition;
        configFileWatcher: FileWatcher;
        private directoriesWatchedForWildcards;
        readonly canonicalConfigFilePath: NormalizedPath;
        pendingReload: ConfigFileProgramReloadLevel;
        configFileSpecs: ConfigFileSpecs;
        private externalProjectRefCount;
        private projectErrors;
        constructor(configFileName: NormalizedPath, projectService: ProjectService, documentRegistry: DocumentRegistry, hasExplicitListOfFiles: boolean, compilerOptions: CompilerOptions, lastFileExceededProgramSize: string | undefined, compileOnSaveEnabled: boolean, cachedDirectoryStructureHost: CachedDirectoryStructureHost);
        updateGraph(): boolean;
        getCachedDirectoryStructureHost(): CachedDirectoryStructureHost;
        getConfigFilePath(): NormalizedPath;
        enablePlugins(): void;
        getGlobalProjectErrors(): ReadonlyArray<Diagnostic>;
        getAllProjectErrors(): ReadonlyArray<Diagnostic>;
        setProjectErrors(projectErrors: Diagnostic[]): void;
        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void;
        getTypeAcquisition(): TypeAcquisition;
        watchWildcards(wildcardDirectories: Map<WatchDirectoryFlags>): void;
        stopWatchingWildCards(): void;
        close(): void;
        addExternalProjectReference(): void;
        deleteExternalProjectReference(): void;
        hasOpenRef(): boolean;
        getEffectiveTypeRoots(): string[];
        updateErrorOnNoInputFiles(hasFileNames: boolean): void;
    }
    class ExternalProject extends Project {
        externalProjectName: string;
        compileOnSaveEnabled: boolean;
        excludedFiles: ReadonlyArray<NormalizedPath>;
        private typeAcquisition;
        constructor(externalProjectName: string, projectService: ProjectService, documentRegistry: DocumentRegistry, compilerOptions: CompilerOptions, lastFileExceededProgramSize: string | undefined, compileOnSaveEnabled: boolean, projectFilePath?: string);
        getExcludedFiles(): ReadonlyArray<NormalizedPath>;
        getTypeAcquisition(): TypeAcquisition;
        setTypeAcquisition(newTypeAcquisition: TypeAcquisition): void;
    }
}
declare namespace ts.server {
    interface InstallPackageOptionsWithProject extends InstallPackageOptions {
        projectName: string;
        projectRootPath: Path;
    }
    interface ITypingsInstaller {
        isKnownTypesPackageName(name: string): boolean;
        installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
        enqueueInstallTypingsRequest(p: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>): void;
        attach(projectService: ProjectService): void;
        onProjectClosed(p: Project): void;
        readonly globalTypingsCacheLocation: string;
    }
    const nullTypingsInstaller: ITypingsInstaller;
    class TypingsCache {
        private readonly installer;
        private readonly perProjectCache;
        constructor(installer: ITypingsInstaller);
        isKnownTypesPackageName(name: string): boolean;
        installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
        getTypingsForProject(project: Project, unresolvedImports: SortedReadonlyArray<string>, forceRefresh: boolean): SortedReadonlyArray<string>;
        updateTypingsForProject(projectName: string, compilerOptions: CompilerOptions, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, newTypings: string[]): void;
        deleteTypingsForProject(projectName: string): void;
        onProjectClosed(project: Project): void;
    }
}
declare namespace ts.server {
    interface SessionClientHost extends LanguageServiceHost {
        writeMessage(message: string): void;
    }
    function extractMessage(message: string): string;
    class SessionClient implements LanguageService {
        private host;
        private sequence;
        private lineMaps;
        private messages;
        private lastRenameEntry;
        constructor(host: SessionClientHost);
        onMessage(message: string): void;
        private writeMessage(message);
        private getLineMap(fileName);
        private lineOffsetToPosition(fileName, lineOffset, lineMap?);
        private positionToOneBasedLineOffset(fileName, position);
        private convertCodeEditsToTextChange(fileName, codeEdit);
        private processRequest<T>(command, args?);
        private processResponse<T>(request);
        openFile(file: string, fileContent?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
        closeFile(file: string): void;
        changeFile(fileName: string, start: number, end: number, insertString: string): void;
        getQuickInfoAtPosition(fileName: string, position: number): QuickInfo;
        getProjectInfo(file: string, needFileNameList: boolean): protocol.ProjectInfo;
        getCompletionsAtPosition(fileName: string, position: number, options: GetCompletionsAtPositionOptions | undefined): CompletionInfo;
        getCompletionEntryDetails(fileName: string, position: number, entryName: string, _options: FormatCodeOptions | FormatCodeSettings | undefined, source: string | undefined): CompletionEntryDetails;
        getCompletionEntrySymbol(_fileName: string, _position: number, _entryName: string): Symbol;
        getNavigateToItems(searchValue: string): NavigateToItem[];
        getFormattingEditsForRange(file: string, start: number, end: number, _options: FormatCodeOptions): ts.TextChange[];
        getFormattingEditsForDocument(fileName: string, options: FormatCodeOptions): ts.TextChange[];
        getFormattingEditsAfterKeystroke(fileName: string, position: number, key: string, _options: FormatCodeOptions): ts.TextChange[];
        getDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getDefinitionAndBoundSpan(fileName: string, position: number): DefinitionInfoAndBoundSpan;
        getTypeDefinitionAtPosition(fileName: string, position: number): DefinitionInfo[];
        getImplementationAtPosition(fileName: string, position: number): ImplementationLocation[];
        findReferences(_fileName: string, _position: number): ReferencedSymbol[];
        getReferencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getEmitOutput(_fileName: string): EmitOutput;
        getSyntacticDiagnostics(file: string): Diagnostic[];
        getSemanticDiagnostics(file: string): Diagnostic[];
        getSuggestionDiagnostics(file: string): Diagnostic[];
        private getDiagnostics(file, command);
        getCompilerOptionsDiagnostics(): Diagnostic[];
        getRenameInfo(fileName: string, position: number, findInStrings?: boolean, findInComments?: boolean): RenameInfo;
        findRenameLocations(fileName: string, position: number, findInStrings: boolean, findInComments: boolean): RenameLocation[];
        private decodeNavigationBarItems(items, fileName, lineMap);
        getNavigationBarItems(file: string): NavigationBarItem[];
        private decodeNavigationTree(tree, fileName, lineMap);
        getNavigationTree(file: string): NavigationTree;
        private decodeSpan(span);
        private decodeSpan(span, fileName, lineMap?);
        getNameOrDottedNameSpan(_fileName: string, _startPos: number, _endPos: number): TextSpan;
        getBreakpointStatementAtPosition(_fileName: string, _position: number): TextSpan;
        getSignatureHelpItems(fileName: string, position: number): SignatureHelpItems;
        getOccurrencesAtPosition(fileName: string, position: number): ReferenceEntry[];
        getDocumentHighlights(fileName: string, position: number, filesToSearch: string[]): DocumentHighlights[];
        getOutliningSpans(_fileName: string): OutliningSpan[];
        getTodoComments(_fileName: string, _descriptors: TodoCommentDescriptor[]): TodoComment[];
        getDocCommentTemplateAtPosition(_fileName: string, _position: number): TextInsertion;
        isValidBraceCompletionAtPosition(_fileName: string, _position: number, _openingBrace: number): boolean;
        getSpanOfEnclosingComment(_fileName: string, _position: number, _onlyMultiLine: boolean): TextSpan;
        getCodeFixesAtPosition(file: string, start: number, end: number, errorCodes: ReadonlyArray<number>): ReadonlyArray<CodeFixAction>;
        getCombinedCodeFix: typeof notImplemented;
        applyCodeActionCommand: typeof notImplemented;
        private createFileLocationOrRangeRequestArgs(positionOrRange, fileName);
        private createFileLocationRequestArgs(file, position);
        private createFileRangeRequestArgs(file, start, end);
        private createFileLocationRequestArgsWithEndLineAndOffset(file, start, end);
        getApplicableRefactors(fileName: string, positionOrRange: number | TextRange): ApplicableRefactorInfo[];
        getEditsForRefactor(fileName: string, _formatOptions: FormatCodeSettings, positionOrRange: number | TextRange, refactorName: string, actionName: string): RefactorEditInfo;
        organizeImports(_scope: OrganizeImportsScope, _formatOptions: FormatCodeSettings): ReadonlyArray<FileTextChanges>;
        private convertCodeEditsToTextChanges(edits);
        private convertChanges(changes, fileName);
        convertTextChangeToCodeEdit(change: protocol.CodeEdit, fileName: string): ts.TextChange;
        getBraceMatchingAtPosition(fileName: string, position: number): TextSpan[];
        getIndentationAtPosition(_fileName: string, _position: number, _options: EditorOptions): number;
        getSyntacticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getSemanticClassifications(_fileName: string, _span: TextSpan): ClassifiedSpan[];
        getEncodedSyntacticClassifications(_fileName: string, _span: TextSpan): Classifications;
        getEncodedSemanticClassifications(_fileName: string, _span: TextSpan): Classifications;
        getProgram(): Program;
        getNonBoundSourceFile(_fileName: string): SourceFile;
        getSourceFile(_fileName: string): SourceFile;
        cleanupSemanticCache(): void;
        dispose(): void;
    }
}
