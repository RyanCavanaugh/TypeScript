declare module React {
    // https://facebook.github.io/react/docs/events.html
    interface SyntheticEventData {
        bubbles: boolean;
        cancelable: boolean;
        currentTarget: EventTarget;
        defaultPrevented: boolean;
        eventPhase: number;
        isTrusted: boolean;
        nativeEvent: Event;
        preventDefault(): void;
        stopPropagation(): void;
        target: EventTarget;
        timeStamp: number;
        type: string;
    }

    interface ClipboardEventData extends SyntheticEventData {
        clipboardData: DataTransfer;
    }
    type ClipboardEvent = (data: ClipboardEventData) => any;

    interface KeyboardEventData extends SyntheticEventData {
        altKey: boolean;
        charCode: number;
        ctrlKey: boolean;
        getModifierState(key: any): any;
        key: string;
        keyCode: number;
        locale: string;
        location: number;
        metaKey: boolean;
        repeat: boolean;
        shiftKey: boolean;
        which: number;
    }
    type KeyboardEvent = (data: KeyboardEventData) => any;

    interface FocusEventData extends SyntheticEventData {
        relatedTarget: EventTarget;
    }
    type FocusEvent = (data: FocusEventData) => any;

    interface MouseEventData extends SyntheticEventData {
        altKey: boolean;
        button: number;
        buttons: number;
        clientX: number;
        clientY: number;
        ctrlKey: boolean;
        getModifierState(key: any): any;
        metaKey: boolean;
        pageX: number;
        pageY: number;
        relatedTarget: EventTarget;
        screenX: number;
        screenY: number;
        shiftKey: boolean;
    }
    type MouseEvent = (data: MouseEventData) => any;

    interface TouchEventData extends SyntheticEventData {
        altKey: boolean;
        changedTouches: any[];
        ctrlKey: boolean;
        getModifierState(key: any): any;
        metaKey: boolean;
        shiftKey: boolean;
        targetTouches: any[];
        touches: any[];
    }
    type TouchEvent = (data: TouchEventData) => any;

    interface UIEventData extends SyntheticEventData {
        detail: number;
        view: any;
    }
    type UIEvent = (data: UIEventData) => any;

    interface WheelEventData extends SyntheticEventData {
        deltaMode: number;
        deltaX: number;
        deltaY: number;
        deltaZ: number;
    }
    type WheelEvent = (data: WheelEventData) => any;

    type primitive = string|boolean|number;
    interface ReactInstance {
        ref?: primitive;
        key?: primitive;
    }

    interface ReactDomEvents {
        // Clipboard events
        onCopy?: ClipboardEvent;
        onCut?: ClipboardEvent;
        onPaste?: ClipboardEvent;
        onCopyCapture?: ClipboardEvent;
        onCutCapture?: ClipboardEvent;
        onPasteCapture?: ClipboardEvent;

        // Keyboard events
        onKeyDown?: KeyboardEvent;
        onKeyPress?: KeyboardEvent;
        onKeyUp?: KeyboardEvent;
        onKeyDownCapture?: KeyboardEvent;
        onKeyPressCapture?: KeyboardEvent;
        onKeyUpCapture?: KeyboardEvent;

        // Focus events
        onFocus?: FocusEvent;
        onBlur?: FocusEvent;
        onFocusCapture?: FocusEvent;
        onBlurCapture?: FocusEvent;

        // Mouse events
        onClick?: MouseEvent;
        onContextMenu?: MouseEvent;
        onDoubleClick?: MouseEvent;
        onDrag?: MouseEvent;
        onDragEnd?: MouseEvent;
        onDragEnter?: MouseEvent;
        onDragExit?: MouseEvent;
        onDragLeave?: MouseEvent;
        onDragOver?: MouseEvent;
        onDragStart?: MouseEvent;
        onDrop?: MouseEvent;
        onMouseDown?: MouseEvent;
        onMouseEnter?: MouseEvent;
        onMouseLeave?: MouseEvent;
        onMouseMove?: MouseEvent;
        onMouseOut?: MouseEvent;
        onMouseOver?: MouseEvent;
        onMouseUp?: MouseEvent;
        onClickCapture?: MouseEvent;
        onContextMenuCapture?: MouseEvent;
        onDoubleClickCapture?: MouseEvent;
        onDragCapture?: MouseEvent;
        onDragEndCapture?: MouseEvent;
        onDragEnterCapture?: MouseEvent;
        onDragExitCapture?: MouseEvent;
        onDragLeaveCapture?: MouseEvent;
        onDragOverCapture?: MouseEvent;
        onDragStartCapture?: MouseEvent;
        onDropCapture?: MouseEvent;
        onMouseDownCapture?: MouseEvent;
        onMouseEnterCapture?: MouseEvent;
        onMouseLeaveCapture?: MouseEvent;
        onMouseMoveCapture?: MouseEvent;
        onMouseOutCapture?: MouseEvent;
        onMouseOverCapture?: MouseEvent;
        onMouseUpCapture?: MouseEvent;

        // Touch events
        onTouchCancel?: TouchEvent;
        onTouchEnd?: TouchEvent;
        onTouchMove?: TouchEvent;
        onTouchStart?: TouchEvent;
        onTouchCancelCapture?: TouchEvent;
        onTouchEndCapture?: TouchEvent;
        onTouchMoveCapture?: TouchEvent;
        onTouchStartCapture?: TouchEvent;

        // UI Events
        onScroll?: UIEvent;
        onScrollCapture?: UIEvent;

        // Wheel events
        onWheel?: WheelEvent;
        onWheelCapture?: WheelEvent;
    }

    // https://facebook.github.io/react/docs/tags-and-attributes.html
    interface ReactHtmlElementAttributes extends ReactDomEvents {
        accept?: string;
        acceptCharset?: string;
        accessKey?: string;
        action?: string;
        allowFullScreen?: string;
        allowTransparency?: string;
        alt?: string;
        async?: string;
        autoComplete?: string;
        autoFocus?: string;
        autoPlay?: string;
        cellPadding?: string;
        cellSpacing?: string;
        charSet?: string;
        checked?: string;
        classID?: string;
        className?: string;
        colSpan?: string;
        cols?: string;
        content?: string;
        contentEditable?: string;
        contextMenu?: string;
        controls?: string;
        coords?: string;
        crossOrigin?: string;
        data?: string;
        dateTime?: string;
        defer?: string;
        dir?: string;
        disabled?: string;
        download?: string;
        draggable?: string;
        encType?: string;
        form?: string;
        formAction?: string;
        formEncType?: string;
        formMethod?: string;
        formNoValidate?: string;
        formTarget?: string;
        frameBorder?: string;
        headers?: string;
        height?: string;
        hidden?: string;
        high?: string;
        href?: string;
        hrefLang?: string;
        htmlFor?: string;
        httpEquiv?: string;
        icon?: string;
        id?: string;
        label?: string;
        lang?: string;
        list?: string;
        loop?: string;
        low?: string;
        manifest?: string;
        marginHeight?: string;
        marginWidth?: string;
        max?: string;
        maxLength?: string;
        media?: string;
        mediaGroup?: string;
        method?: string;
        min?: string;
        multiple?: string;
        muted?: string;
        name?: string;
        noValidate?: string;
        open?: string;
        optimum?: string;
        pattern?: string;
        placeholder?: string;
        poster?: string;
        preload?: string;
        radioGroup?: string;
        readOnly?: string;
        rel?: string;
        required?: string;
        role?: string;
        rowSpan?: string;
        rows?: string;
        sandbox?: string;
        scope?: string;
        scoped?: string;
        scrolling?: string;
        seamless?: string;
        selected?: string;
        shape?: string;
        size?: string;
        sizes?: string;
        span?: string;
        spellCheck?: string;
        src?: string;
        srcDoc?: string;
        srcSet?: string;
        start?: string;
        step?: string;
        style?: string;
        tabIndex?: string;
        target?: string;
        title?: string;
        type?: string;
        useMap?: string;
        value?: string;
        width?: string;
        wmode?: string;

        // Non-standard attributes for Mobile Safari
        autoCapitalize?: string;
        autoCorrect?: string;
        // Non-standard attributes for Open Graph
        property?: string;
        // Non-standard attributes for HTML5 microdata
        itemProp?: string;
        itemScope?: string;
        itemType?: string;
        itemRef?: string;
        itemID?: string;
        // Non-standard attributes for Internet Explorer
        unselectable?: string;

        // React-specific attributes
        dangerouslySetInnerHTML?: string;
    }

    interface HtmlElementInstance extends JSX.ElementClass {
        props: ReactHtmlElementAttributes;
    }

    interface HtmlElementConstructor {
        new (): HtmlElementInstance;
    }

    interface ReactSvgElementAttributes extends ReactDomEvents {
        clipPath?: string;
        cx?: string;
        cy?: string;
        d?: string;
        dx?: string;
        dy?: string;
        fill?: string;
        fillOpacity?: string;
        fontFamily?: string;
        fontSize?: string;
        fx?: string;
        fy?: string;
        gradientTransform?: string;
        gradientUnits?: string;
        markerEnd?: string;
        markerMid?: string;
        markerStart?: string;
        offset?: string;
        opacity?: string;
        patternContentUnits?: string;
        patternUnits?: string;
        points?: string;
        preserveAspectRatio?: string;
        r?: string;
        rx?: string;
        ry?: string;
        spreadMethod?: string;
        stopColor?: string;
        stopOpacity?: string;
        stroke?: string;
        strokeDasharray?: string;
        strokeLinecap?: string;
        strokeOpacity?: string;
        strokeWidth?: string;
        textAnchor?: string;
        transform?: string;
        version?: string;
        viewBox?: string;
        x1?: string;
        x2?: string;
        x?: string;
        y1?: string;
        y2?: string;
        y?: string;
    }

    interface SvgElementInstance extends JSX.ElementClass {
        props: ReactSvgElementAttributes;
    }

    interface SvgElementConstructor {
        new (): SvgElementInstance;
    }

}

declare module JSX {
    interface ElementClass {
        render(): any;
    }

    interface ElementAttributesProperty {
        props: any;
    }

    interface IntrinsicElements {
        a: React.HtmlElementConstructor;
        abbr: React.HtmlElementConstructor;
        address: React.HtmlElementConstructor;
        area: React.HtmlElementConstructor;
        article: React.HtmlElementConstructor;
        aside: React.HtmlElementConstructor;
        audio: React.HtmlElementConstructor;
        b: React.HtmlElementConstructor;
        base: React.HtmlElementConstructor;
        bdi: React.HtmlElementConstructor;
        bdo: React.HtmlElementConstructor;
        big: React.HtmlElementConstructor;
        blockquote: React.HtmlElementConstructor;
        body: React.HtmlElementConstructor;
        br: React.HtmlElementConstructor;
        button: React.HtmlElementConstructor;
        canvas: React.HtmlElementConstructor;
        caption: React.HtmlElementConstructor;
        cite: React.HtmlElementConstructor;
        code: React.HtmlElementConstructor;
        col: React.HtmlElementConstructor;
        colgroup: React.HtmlElementConstructor;
        data: React.HtmlElementConstructor;
        datalist: React.HtmlElementConstructor;
        dd: React.HtmlElementConstructor;
        del: React.HtmlElementConstructor;
        details: React.HtmlElementConstructor;
        dfn: React.HtmlElementConstructor;
        dialog: React.HtmlElementConstructor;
        div: React.HtmlElementConstructor;
        dl: React.HtmlElementConstructor;
        dt: React.HtmlElementConstructor;
        em: React.HtmlElementConstructor;
        embed: React.HtmlElementConstructor;
        fieldset: React.HtmlElementConstructor;
        figcaption: React.HtmlElementConstructor;
        figure: React.HtmlElementConstructor;
        footer: React.HtmlElementConstructor;
        form: React.HtmlElementConstructor;
        h1: React.HtmlElementConstructor;
        h2: React.HtmlElementConstructor;
        h3: React.HtmlElementConstructor;
        h4: React.HtmlElementConstructor;
        h5: React.HtmlElementConstructor;
        h6: React.HtmlElementConstructor;
        head: React.HtmlElementConstructor;
        header: React.HtmlElementConstructor;
        hr: React.HtmlElementConstructor;
        html: React.HtmlElementConstructor;
        i: React.HtmlElementConstructor;
        iframe: React.HtmlElementConstructor;
        img: React.HtmlElementConstructor;
        input: React.HtmlElementConstructor;
        ins: React.HtmlElementConstructor;
        kbd: React.HtmlElementConstructor;
        keygen: React.HtmlElementConstructor;
        label: React.HtmlElementConstructor;
        legend: React.HtmlElementConstructor;
        li: React.HtmlElementConstructor;
        link: React.HtmlElementConstructor;
        main: React.HtmlElementConstructor;
        map: React.HtmlElementConstructor;
        mark: React.HtmlElementConstructor;
        menu: React.HtmlElementConstructor;
        menuitem: React.HtmlElementConstructor;
        meta: React.HtmlElementConstructor;
        meter: React.HtmlElementConstructor;
        nav: React.HtmlElementConstructor;
        noscript: React.HtmlElementConstructor;
        object: React.HtmlElementConstructor;
        ol: React.HtmlElementConstructor;
        optgroup: React.HtmlElementConstructor;
        option: React.HtmlElementConstructor;
        output: React.HtmlElementConstructor;
        p: React.HtmlElementConstructor;
        param: React.HtmlElementConstructor;
        picture: React.HtmlElementConstructor;
        pre: React.HtmlElementConstructor;
        progress: React.HtmlElementConstructor;
        q: React.HtmlElementConstructor;
        rp: React.HtmlElementConstructor;
        rt: React.HtmlElementConstructor;
        ruby: React.HtmlElementConstructor;
        s: React.HtmlElementConstructor;
        samp: React.HtmlElementConstructor;
        script: React.HtmlElementConstructor;
        section: React.HtmlElementConstructor;
        select: React.HtmlElementConstructor;
        small: React.HtmlElementConstructor;
        source: React.HtmlElementConstructor;
        span: React.HtmlElementConstructor;
        strong: React.HtmlElementConstructor;
        style: React.HtmlElementConstructor;
        sub: React.HtmlElementConstructor;
        summary: React.HtmlElementConstructor;
        sup: React.HtmlElementConstructor;
        table: React.HtmlElementConstructor;
        tbody: React.HtmlElementConstructor;
        td: React.HtmlElementConstructor;
        textarea: React.HtmlElementConstructor;
        tfoot: React.HtmlElementConstructor;
        th: React.HtmlElementConstructor;
        thead: React.HtmlElementConstructor;
        time: React.HtmlElementConstructor;
        title: React.HtmlElementConstructor;
        tr: React.HtmlElementConstructor;
        track: React.HtmlElementConstructor;
        u: React.HtmlElementConstructor;
        ul: React.HtmlElementConstructor;
        'var': React.HtmlElementConstructor;
        video: React.HtmlElementConstructor;
        wbr: React.HtmlElementConstructor;

        circle: React.SvgElementConstructor;
        clipPath: React.SvgElementConstructor;
        defs: React.SvgElementConstructor;
        ellipse: React.SvgElementConstructor;
        g: React.SvgElementConstructor;
        line: React.SvgElementConstructor;
        linearGradient: React.SvgElementConstructor;
        mask: React.SvgElementConstructor;
        path: React.SvgElementConstructor;
        pattern: React.SvgElementConstructor;
        polygon: React.SvgElementConstructor;
        polyline: React.SvgElementConstructor;
        radialGradient: React.SvgElementConstructor;
        rect: React.SvgElementConstructor;
        stop: React.SvgElementConstructor;
        svg: React.SvgElementConstructor;
        text: React.SvgElementConstructor;
        tspan: React.SvgElementConstructor;
    }
}

// Stub these out in case we don't have the full lib.d.ts available (e.g. tests)
interface EventTarget { }
interface DataTransfer { }
interface Event { }
