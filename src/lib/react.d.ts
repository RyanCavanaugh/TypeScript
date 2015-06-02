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
    interface ReactElementInstance {
        ref?: primitive;
        key?: primitive;
    }

    interface DomEvents {
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
    interface HtmlElementAttributes extends DomEvents {
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

    interface SvgElementAttributes extends DomEvents {
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
}

declare module JSX {
    interface ElementClass {
        render(): any;
    }

    interface ElementAttributesProperty {
        props: any;
    }

    interface IntrinsicElements {
        a: React.HtmlElementAttributes;
        abbr: React.HtmlElementAttributes;
        address: React.HtmlElementAttributes;
        area: React.HtmlElementAttributes;
        article: React.HtmlElementAttributes;
        aside: React.HtmlElementAttributes;
        audio: React.HtmlElementAttributes;
        b: React.HtmlElementAttributes;
        base: React.HtmlElementAttributes;
        bdi: React.HtmlElementAttributes;
        bdo: React.HtmlElementAttributes;
        big: React.HtmlElementAttributes;
        blockquote: React.HtmlElementAttributes;
        body: React.HtmlElementAttributes;
        br: React.HtmlElementAttributes;
        button: React.HtmlElementAttributes;
        canvas: React.HtmlElementAttributes;
        caption: React.HtmlElementAttributes;
        cite: React.HtmlElementAttributes;
        code: React.HtmlElementAttributes;
        col: React.HtmlElementAttributes;
        colgroup: React.HtmlElementAttributes;
        data: React.HtmlElementAttributes;
        datalist: React.HtmlElementAttributes;
        dd: React.HtmlElementAttributes;
        del: React.HtmlElementAttributes;
        details: React.HtmlElementAttributes;
        dfn: React.HtmlElementAttributes;
        dialog: React.HtmlElementAttributes;
        div: React.HtmlElementAttributes;
        dl: React.HtmlElementAttributes;
        dt: React.HtmlElementAttributes;
        em: React.HtmlElementAttributes;
        embed: React.HtmlElementAttributes;
        fieldset: React.HtmlElementAttributes;
        figcaption: React.HtmlElementAttributes;
        figure: React.HtmlElementAttributes;
        footer: React.HtmlElementAttributes;
        form: React.HtmlElementAttributes;
        h1: React.HtmlElementAttributes;
        h2: React.HtmlElementAttributes;
        h3: React.HtmlElementAttributes;
        h4: React.HtmlElementAttributes;
        h5: React.HtmlElementAttributes;
        h6: React.HtmlElementAttributes;
        head: React.HtmlElementAttributes;
        header: React.HtmlElementAttributes;
        hr: React.HtmlElementAttributes;
        html: React.HtmlElementAttributes;
        i: React.HtmlElementAttributes;
        iframe: React.HtmlElementAttributes;
        img: React.HtmlElementAttributes;
        input: React.HtmlElementAttributes;
        ins: React.HtmlElementAttributes;
        kbd: React.HtmlElementAttributes;
        keygen: React.HtmlElementAttributes;
        label: React.HtmlElementAttributes;
        legend: React.HtmlElementAttributes;
        li: React.HtmlElementAttributes;
        link: React.HtmlElementAttributes;
        main: React.HtmlElementAttributes;
        map: React.HtmlElementAttributes;
        mark: React.HtmlElementAttributes;
        menu: React.HtmlElementAttributes;
        menuitem: React.HtmlElementAttributes;
        meta: React.HtmlElementAttributes;
        meter: React.HtmlElementAttributes;
        nav: React.HtmlElementAttributes;
        noscript: React.HtmlElementAttributes;
        object: React.HtmlElementAttributes;
        ol: React.HtmlElementAttributes;
        optgroup: React.HtmlElementAttributes;
        option: React.HtmlElementAttributes;
        output: React.HtmlElementAttributes;
        p: React.HtmlElementAttributes;
        param: React.HtmlElementAttributes;
        picture: React.HtmlElementAttributes;
        pre: React.HtmlElementAttributes;
        progress: React.HtmlElementAttributes;
        q: React.HtmlElementAttributes;
        rp: React.HtmlElementAttributes;
        rt: React.HtmlElementAttributes;
        ruby: React.HtmlElementAttributes;
        s: React.HtmlElementAttributes;
        samp: React.HtmlElementAttributes;
        script: React.HtmlElementAttributes;
        section: React.HtmlElementAttributes;
        select: React.HtmlElementAttributes;
        small: React.HtmlElementAttributes;
        source: React.HtmlElementAttributes;
        span: React.HtmlElementAttributes;
        strong: React.HtmlElementAttributes;
        style: React.HtmlElementAttributes;
        sub: React.HtmlElementAttributes;
        summary: React.HtmlElementAttributes;
        sup: React.HtmlElementAttributes;
        table: React.HtmlElementAttributes;
        tbody: React.HtmlElementAttributes;
        td: React.HtmlElementAttributes;
        textarea: React.HtmlElementAttributes;
        tfoot: React.HtmlElementAttributes;
        th: React.HtmlElementAttributes;
        thead: React.HtmlElementAttributes;
        time: React.HtmlElementAttributes;
        title: React.HtmlElementAttributes;
        tr: React.HtmlElementAttributes;
        track: React.HtmlElementAttributes;
        u: React.HtmlElementAttributes;
        ul: React.HtmlElementAttributes;
        'var': React.HtmlElementAttributes;
        video: React.HtmlElementAttributes;
        wbr: React.HtmlElementAttributes;

        circle: React.SvgElementAttributes;
        clipPath: React.SvgElementAttributes;
        defs: React.SvgElementAttributes;
        ellipse: React.SvgElementAttributes;
        g: React.SvgElementAttributes;
        line: React.SvgElementAttributes;
        linearGradient: React.SvgElementAttributes;
        mask: React.SvgElementAttributes;
        path: React.SvgElementAttributes;
        pattern: React.SvgElementAttributes;
        polygon: React.SvgElementAttributes;
        polyline: React.SvgElementAttributes;
        radialGradient: React.SvgElementAttributes;
        rect: React.SvgElementAttributes;
        stop: React.SvgElementAttributes;
        svg: React.SvgElementAttributes;
        text: React.SvgElementAttributes;
        tspan: React.SvgElementAttributes;
    }
}

// Stub these out in case we don't have the full lib.d.ts available (e.g. tests)
interface EventTarget { }
interface DataTransfer { }
interface Event { }
