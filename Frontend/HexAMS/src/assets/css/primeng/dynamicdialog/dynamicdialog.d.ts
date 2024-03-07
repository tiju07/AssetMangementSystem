import { AnimationEvent } from '@angular/animations';
import { AfterViewInit, ChangeDetectorRef, ComponentRef, ElementRef, NgZone, OnDestroy, Renderer2, Type } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { Nullable, VoidListener } from 'primeng/ts-helpers';
import { DynamicDialogConfig } from './dynamicdialog-config';
import { DynamicDialogRef } from './dynamicdialog-ref';
import { DynamicDialogContent } from './dynamicdialogcontent';
import * as i0 from "@angular/core";
import * as i1 from "./dynamicdialogcontent";
import * as i2 from "@angular/common";
import * as i3 from "primeng/icons/windowmaximize";
import * as i4 from "primeng/icons/windowminimize";
import * as i5 from "primeng/icons/times";
import * as i6 from "primeng/api";
export declare class DynamicDialogComponent implements AfterViewInit, OnDestroy {
    private document;
    private platformId;
    private cd;
    renderer: Renderer2;
    config: DynamicDialogConfig;
    private dialogRef;
    zone: NgZone;
    primeNGConfig: PrimeNGConfig;
    private parentDialog;
    visible: boolean;
    componentRef: Nullable<ComponentRef<any>>;
    mask: Nullable<HTMLDivElement>;
    resizing: boolean | undefined;
    dragging: boolean | undefined;
    maximized: boolean | undefined;
    _style: any;
    originalStyle: any;
    lastPageX: number | undefined;
    lastPageY: number | undefined;
    ariaLabelledBy: string | undefined;
    id: string;
    styleElement: any;
    insertionPoint: Nullable<DynamicDialogContent>;
    maskViewChild: Nullable<ElementRef>;
    contentViewChild: Nullable<ElementRef>;
    headerViewChild: Nullable<ElementRef>;
    childComponentType: Nullable<Type<any>>;
    container: Nullable<HTMLDivElement>;
    wrapper: Nullable<HTMLElement>;
    documentKeydownListener: VoidListener;
    documentEscapeListener: VoidListener;
    maskClickListener: VoidListener;
    transformOptions: string;
    documentResizeListener: VoidListener;
    documentResizeEndListener: VoidListener;
    documentDragListener: VoidListener;
    documentDragEndListener: VoidListener;
    get minX(): number;
    get minY(): number;
    get keepInViewport(): boolean;
    get maximizable(): boolean;
    get maximizeIcon(): string;
    get minimizeIcon(): string;
    get style(): any;
    get position(): string;
    set style(value: any);
    get parent(): Element;
    get header(): string;
    get data(): any;
    get breakpoints(): any;
    get footerTemplate(): Type<any>;
    get headerTemplate(): Type<any>;
    get contentTemplate(): Type<any>;
    get minimizeIconTemplate(): Type<any>;
    get maximizeIconTemplate(): Type<any>;
    get closeIconTemplate(): Type<any>;
    constructor(document: Document, platformId: any, cd: ChangeDetectorRef, renderer: Renderer2, config: DynamicDialogConfig, dialogRef: DynamicDialogRef, zone: NgZone, primeNGConfig: PrimeNGConfig, parentDialog: DynamicDialogComponent);
    ngOnInit(): void;
    createStyle(): void;
    destroyStyle(): void;
    ngAfterViewInit(): void;
    getAriaLabelledBy(): string;
    loadChildComponent(componentType: Type<any>): void;
    moveOnTop(): void;
    onAnimationStart(event: AnimationEvent): void;
    onAnimationEnd(event: AnimationEvent): void;
    onContainerDestroy(): void;
    close(): void;
    hide(): void;
    enableModality(): void;
    disableModality(): void;
    onKeydown(event: KeyboardEvent): void;
    focus(): void;
    maximize(): void;
    initResize(event: MouseEvent): void;
    onResize(event: MouseEvent): void;
    resizeEnd(event: MouseEvent): void;
    initDrag(event: MouseEvent): void;
    onDrag(event: MouseEvent): void;
    endDrag(event: MouseEvent): void;
    resetPosition(): void;
    bindDocumentDragListener(): void;
    bindDocumentDragEndListener(): void;
    unbindDocumentDragEndListener(): void;
    unbindDocumentDragListener(): void;
    bindDocumentResizeListeners(): void;
    unbindDocumentResizeListeners(): void;
    bindGlobalListeners(): void;
    unbindGlobalListeners(): void;
    bindDocumentKeydownListener(): void;
    unbindDocumentKeydownListener(): void;
    bindDocumentEscapeListener(): void;
    unbindDocumentEscapeListener(): void;
    unbindMaskClickListener(): void;
    ngOnDestroy(): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicDialogComponent, [null, null, null, null, null, null, null, null, { optional: true; skipSelf: true; }]>;
    static ɵcmp: i0.ɵɵComponentDeclaration<DynamicDialogComponent, "p-dynamicDialog", never, {}, {}, never, never, false, never>;
}
export declare class DynamicDialogModule {
    static ɵfac: i0.ɵɵFactoryDeclaration<DynamicDialogModule, never>;
    static ɵmod: i0.ɵɵNgModuleDeclaration<DynamicDialogModule, [typeof DynamicDialogComponent, typeof i1.DynamicDialogContent], [typeof i2.CommonModule, typeof i3.WindowMaximizeIcon, typeof i4.WindowMinimizeIcon, typeof i5.TimesIcon, typeof i6.SharedModule], [typeof i6.SharedModule]>;
    static ɵinj: i0.ɵɵInjectorDeclaration<DynamicDialogModule>;
}