declare module XmlElement {
    type primitive = string|boolean|number;

    interface JsxElement {
        ref?: primitive;
        key?: primitive;
    }

    interface JsxElementPrefix {
        'data-': primitive;
        'aria-': primitive;
    }

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

    interface JsxEvents {
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
    interface JsxHtmlElement extends JsxElement, JsxEvents {
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

    interface JsxSvgElement extends JsxElement, JsxEvents {
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

    module Intrinsics {
        interface a extends JsxHtmlElement { }
        interface abbr extends JsxHtmlElement { }
        interface address extends JsxHtmlElement { }
        interface area extends JsxHtmlElement { }
        interface article extends JsxHtmlElement { }
        interface aside extends JsxHtmlElement { }
        interface audio extends JsxHtmlElement { }
        interface b extends JsxHtmlElement { }
        interface base extends JsxHtmlElement { }
        interface bdi extends JsxHtmlElement { }
        interface bdo extends JsxHtmlElement { }
        interface big extends JsxHtmlElement { }
        interface blockquote extends JsxHtmlElement { }
        interface body extends JsxHtmlElement { }
        interface br extends JsxHtmlElement { }
        interface button extends JsxHtmlElement { }
        interface canvas extends JsxHtmlElement { }
        interface caption extends JsxHtmlElement { }
        interface cite extends JsxHtmlElement { }
        interface code extends JsxHtmlElement { }
        interface col extends JsxHtmlElement { }
        interface colgroup extends JsxHtmlElement { }
        interface data extends JsxHtmlElement { }
        interface datalist extends JsxHtmlElement { }
        interface dd extends JsxHtmlElement { }
        interface del extends JsxHtmlElement { }
        interface details extends JsxHtmlElement { }
        interface dfn extends JsxHtmlElement { }
        interface dialog extends JsxHtmlElement { }
        interface div extends JsxHtmlElement { }
        interface dl extends JsxHtmlElement { }
        interface dt extends JsxHtmlElement { }
        interface em extends JsxHtmlElement { }
        interface embed extends JsxHtmlElement { }
        interface fieldset extends JsxHtmlElement { }
        interface figcaption extends JsxHtmlElement { }
        interface figure extends JsxHtmlElement { }
        interface footer extends JsxHtmlElement { }
        interface form extends JsxHtmlElement { }
        interface h1 extends JsxHtmlElement { }
        interface h2 extends JsxHtmlElement { }
        interface h3 extends JsxHtmlElement { }
        interface h4 extends JsxHtmlElement { }
        interface h5 extends JsxHtmlElement { }
        interface h6 extends JsxHtmlElement { }
        interface head extends JsxHtmlElement { }
        interface header extends JsxHtmlElement { }
        interface hr extends JsxHtmlElement { }
        interface html extends JsxHtmlElement { }
        interface i extends JsxHtmlElement { }
        interface iframe extends JsxHtmlElement { }
        interface img extends JsxHtmlElement { }
        interface input extends JsxHtmlElement { }
        interface ins extends JsxHtmlElement { }
        interface kbd extends JsxHtmlElement { }
        interface keygen extends JsxHtmlElement { }
        interface label extends JsxHtmlElement { }
        interface legend extends JsxHtmlElement { }
        interface li extends JsxHtmlElement { }
        interface link extends JsxHtmlElement { }
        interface main extends JsxHtmlElement { }
        interface map extends JsxHtmlElement { }
        interface mark extends JsxHtmlElement { }
        interface menu extends JsxHtmlElement { }
        interface menuitem extends JsxHtmlElement { }
        interface meta extends JsxHtmlElement { }
        interface meter extends JsxHtmlElement { }
        interface nav extends JsxHtmlElement { }
        interface noscript extends JsxHtmlElement { }
        interface object extends JsxHtmlElement { }
        interface ol extends JsxHtmlElement { }
        interface optgroup extends JsxHtmlElement { }
        interface option extends JsxHtmlElement { }
        interface output extends JsxHtmlElement { }
        interface p extends JsxHtmlElement { }
        interface param extends JsxHtmlElement { }
        interface picture extends JsxHtmlElement { }
        interface pre extends JsxHtmlElement { }
        interface progress extends JsxHtmlElement { }
        interface q extends JsxHtmlElement { }
        interface rp extends JsxHtmlElement { }
        interface rt extends JsxHtmlElement { }
        interface ruby extends JsxHtmlElement { }
        interface s extends JsxHtmlElement { }
        interface samp extends JsxHtmlElement { }
        interface script extends JsxHtmlElement { }
        interface section extends JsxHtmlElement { }
        interface select extends JsxHtmlElement { }
        interface small extends JsxHtmlElement { }
        interface source extends JsxHtmlElement { }
        interface span extends JsxHtmlElement { }
        interface strong extends JsxHtmlElement { }
        interface style extends JsxHtmlElement { }
        interface sub extends JsxHtmlElement { }
        interface summary extends JsxHtmlElement { }
        interface sup extends JsxHtmlElement { }
        interface table extends JsxHtmlElement { }
        interface tbody extends JsxHtmlElement { }
        interface td extends JsxHtmlElement { }
        interface textarea extends JsxHtmlElement { }
        interface tfoot extends JsxHtmlElement { }
        interface th extends JsxHtmlElement { }
        interface thead extends JsxHtmlElement { }
        interface time extends JsxHtmlElement { }
        interface title extends JsxHtmlElement { }
        interface tr extends JsxHtmlElement { }
        interface track extends JsxHtmlElement { }
        interface u extends JsxHtmlElement { }
        interface ul extends JsxHtmlElement { }
        // TODO: What can we do about 'var' elements?
        // interface var extends JsxHtmlElement { }
        interface video extends JsxHtmlElement { }
        interface wbr extends JsxHtmlElement { }

        interface circle extends JsxSvgElement { }
        interface clipPath extends JsxSvgElement { }
        interface defs extends JsxSvgElement { }
        interface ellipse extends JsxSvgElement { }
        interface g extends JsxSvgElement { }
        interface line extends JsxSvgElement { }
        interface linearGradient extends JsxSvgElement { }
        interface mask extends JsxSvgElement { }
        interface path extends JsxSvgElement { }
        interface pattern extends JsxSvgElement { }
        interface polygon extends JsxSvgElement { }
        interface polyline extends JsxSvgElement { }
        interface radialGradient extends JsxSvgElement { }
        interface rect extends JsxSvgElement { }
        interface stop extends JsxSvgElement { }
        interface svg extends JsxSvgElement { }
        interface text extends JsxSvgElement { }
        interface tspan extends JsxSvgElement { }
    }
}

// Stub these out in case we don't have the full lib.d.ts available (e.g. tests)
interface EventTarget { }
interface DataTransfer { }
interface Event { }
