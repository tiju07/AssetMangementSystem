import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Inject, Input, NgModule, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
/**
 * ScrollPanel is a cross browser, lightweight and themable alternative to native browser scrollbar.
 * @group Components
 */
export class ScrollPanel {
    platformId;
    el;
    zone;
    cd;
    document;
    renderer;
    /**
     * Inline style of the component.
     * @group Props
     */
    style;
    /**
     * Style class of the component.
     * @group Props
     */
    styleClass;
    /**
     * Step factor to scroll the content while pressing the arrow keys.
     * @group Props
     */
    step = 5;
    containerViewChild;
    contentViewChild;
    xBarViewChild;
    yBarViewChild;
    templates;
    scrollYRatio;
    scrollXRatio;
    timeoutFrame = (fn) => setTimeout(fn, 0);
    initialized = false;
    lastPageY;
    lastPageX;
    isXBarClicked = false;
    isYBarClicked = false;
    contentTemplate;
    lastScrollLeft = 0;
    lastScrollTop = 0;
    orientation = 'vertical';
    timer;
    contentId;
    windowResizeListener;
    contentScrollListener;
    mouseEnterListener;
    xBarMouseDownListener;
    yBarMouseDownListener;
    documentMouseMoveListener;
    documentMouseUpListener;
    constructor(platformId, el, zone, cd, document, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.zone = zone;
        this.cd = cd;
        this.document = document;
        this.renderer = renderer;
        this.contentId = UniqueComponentId() + '_content';
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.moveBar();
                this.moveBar = this.moveBar.bind(this);
                this.onXBarMouseDown = this.onXBarMouseDown.bind(this);
                this.onYBarMouseDown = this.onYBarMouseDown.bind(this);
                this.onDocumentMouseMove = this.onDocumentMouseMove.bind(this);
                this.onDocumentMouseUp = this.onDocumentMouseUp.bind(this);
                this.windowResizeListener = this.renderer.listen(window, 'resize', this.moveBar);
                this.contentScrollListener = this.renderer.listen(this.contentViewChild.nativeElement, 'scroll', this.moveBar);
                this.mouseEnterListener = this.renderer.listen(this.contentViewChild.nativeElement, 'mouseenter', this.moveBar);
                this.xBarMouseDownListener = this.renderer.listen(this.xBarViewChild.nativeElement, 'mousedown', this.onXBarMouseDown);
                this.yBarMouseDownListener = this.renderer.listen(this.yBarViewChild.nativeElement, 'mousedown', this.onYBarMouseDown);
                this.calculateContainerHeight();
                this.initialized = true;
            });
        }
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    calculateContainerHeight() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        let xBar = this.xBarViewChild.nativeElement;
        const window = this.document.defaultView;
        let containerStyles = window.getComputedStyle(container), xBarStyles = window.getComputedStyle(xBar), pureContainerHeight = DomHandler.getHeight(container) - parseInt(xBarStyles['height'], 10);
        if (containerStyles['max-height'] != 'none' && pureContainerHeight == 0) {
            if (content.offsetHeight + parseInt(xBarStyles['height'], 10) > parseInt(containerStyles['max-height'], 10)) {
                container.style.height = containerStyles['max-height'];
            }
            else {
                container.style.height = content.offsetHeight + parseFloat(containerStyles.paddingTop) + parseFloat(containerStyles.paddingBottom) + parseFloat(containerStyles.borderTopWidth) + parseFloat(containerStyles.borderBottomWidth) + 'px';
            }
        }
    }
    moveBar() {
        let container = this.containerViewChild.nativeElement;
        let content = this.contentViewChild.nativeElement;
        /* horizontal scroll */
        let xBar = this.xBarViewChild.nativeElement;
        let totalWidth = content.scrollWidth;
        let ownWidth = content.clientWidth;
        let bottom = (container.clientHeight - xBar.clientHeight) * -1;
        this.scrollXRatio = ownWidth / totalWidth;
        /* vertical scroll */
        let yBar = this.yBarViewChild.nativeElement;
        let totalHeight = content.scrollHeight;
        let ownHeight = content.clientHeight;
        let right = (container.clientWidth - yBar.clientWidth) * -1;
        this.scrollYRatio = ownHeight / totalHeight;
        this.requestAnimationFrame(() => {
            if (this.scrollXRatio >= 1) {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(xBar, 'p-scrollpanel-hidden');
            }
            else {
                xBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(xBar, 'p-scrollpanel-hidden');
                const xBarWidth = Math.max(this.scrollXRatio * 100, 10);
                const xBarLeft = (content.scrollLeft * (100 - xBarWidth)) / (totalWidth - ownWidth);
                xBar.style.cssText = 'width:' + xBarWidth + '%; left:' + xBarLeft + '%;bottom:' + bottom + 'px;';
            }
            if (this.scrollYRatio >= 1) {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'true');
                DomHandler.addClass(yBar, 'p-scrollpanel-hidden');
            }
            else {
                yBar.setAttribute('data-p-scrollpanel-hidden', 'false');
                DomHandler.removeClass(yBar, 'p-scrollpanel-hidden');
                const yBarHeight = Math.max(this.scrollYRatio * 100, 10);
                const yBarTop = (content.scrollTop * (100 - yBarHeight)) / (totalHeight - ownHeight);
                yBar.style.cssText = 'height:' + yBarHeight + '%; top: calc(' + yBarTop + '% - ' + xBar.clientHeight + 'px);right:' + right + 'px;';
            }
        });
        this.cd.markForCheck();
    }
    onScroll(event) {
        if (this.lastScrollLeft !== event.target.scrollLeft) {
            this.lastScrollLeft = event.target.scrollLeft;
            this.orientation = 'horizontal';
        }
        else if (this.lastScrollTop !== event.target.scrollTop) {
            this.lastScrollTop = event.target.scrollTop;
            this.orientation = 'vertical';
        }
        this.moveBar();
    }
    onKeyDown(event) {
        if (this.orientation === 'vertical') {
            switch (event.code) {
                case 'ArrowDown': {
                    this.setTimer('scrollTop', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowUp': {
                    this.setTimer('scrollTop', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft':
                case 'ArrowRight': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
        else if (this.orientation === 'horizontal') {
            switch (event.code) {
                case 'ArrowRight': {
                    this.setTimer('scrollLeft', this.step);
                    event.preventDefault();
                    break;
                }
                case 'ArrowLeft': {
                    this.setTimer('scrollLeft', this.step * -1);
                    event.preventDefault();
                    break;
                }
                case 'ArrowDown':
                case 'ArrowUp': {
                    event.preventDefault();
                    break;
                }
                default:
                    //no op
                    break;
            }
        }
    }
    onKeyUp() {
        this.clearTimer();
    }
    repeat(bar, step) {
        this.contentViewChild.nativeElement[bar] += step;
        this.moveBar();
    }
    setTimer(bar, step) {
        this.clearTimer();
        this.timer = setTimeout(() => {
            this.repeat(bar, step);
        }, 40);
    }
    clearTimer() {
        if (this.timer) {
            clearTimeout(this.timer);
        }
    }
    bindDocumentMouseListeners() {
        if (!this.documentMouseMoveListener) {
            this.documentMouseMoveListener = (e) => {
                this.onDocumentMouseMove(e);
            };
            this.document.addEventListener('mousemove', this.documentMouseMoveListener);
        }
        if (!this.documentMouseUpListener) {
            this.documentMouseUpListener = (e) => {
                this.onDocumentMouseUp(e);
            };
            this.document.addEventListener('mouseup', this.documentMouseUpListener);
        }
    }
    unbindDocumentMouseListeners() {
        if (this.documentMouseMoveListener) {
            this.document.removeEventListener('mousemove', this.documentMouseMoveListener);
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            document.removeEventListener('mouseup', this.documentMouseUpListener);
            this.documentMouseUpListener = null;
        }
    }
    onYBarMouseDown(e) {
        this.isYBarClicked = true;
        this.yBarViewChild.nativeElement.focus();
        this.lastPageY = e.pageY;
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'true');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onXBarMouseDown(e) {
        this.isXBarClicked = true;
        this.xBarViewChild.nativeElement.focus();
        this.lastPageX = e.pageX;
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.addClass(this.document.body, 'p-scrollpanel-grabbed');
        this.bindDocumentMouseListeners();
        e.preventDefault();
    }
    onDocumentMouseMove(e) {
        if (this.isXBarClicked) {
            this.onMouseMoveForXBar(e);
        }
        else if (this.isYBarClicked) {
            this.onMouseMoveForYBar(e);
        }
        else {
            this.onMouseMoveForXBar(e);
            this.onMouseMoveForYBar(e);
        }
    }
    onMouseMoveForXBar(e) {
        let deltaX = e.pageX - this.lastPageX;
        this.lastPageX = e.pageX;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollLeft += deltaX / this.scrollXRatio;
        });
    }
    onMouseMoveForYBar(e) {
        let deltaY = e.pageY - this.lastPageY;
        this.lastPageY = e.pageY;
        this.requestAnimationFrame(() => {
            this.contentViewChild.nativeElement.scrollTop += deltaY / this.scrollYRatio;
        });
    }
    /**
     * Scrolls the top location to the given value.
     * @param scrollTop
     * @group Method
     */
    scrollTop(scrollTop) {
        let scrollableHeight = this.contentViewChild.nativeElement.scrollHeight - this.contentViewChild.nativeElement.clientHeight;
        scrollTop = scrollTop > scrollableHeight ? scrollableHeight : scrollTop > 0 ? scrollTop : 0;
        this.contentViewChild.nativeElement.scrollTop = scrollTop;
    }
    onFocus(event) {
        if (this.xBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'horizontal';
        }
        else if (this.yBarViewChild.nativeElement.isSameNode(event.target)) {
            this.orientation = 'vertical';
        }
    }
    onBlur() {
        if (this.orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
    }
    onDocumentMouseUp(e) {
        this.yBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.yBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.xBarViewChild.nativeElement.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.xBarViewChild.nativeElement, 'p-scrollpanel-grabbed');
        this.document.body.setAttribute('data-p-scrollpanel-grabbed', 'false');
        DomHandler.removeClass(this.document.body, 'p-scrollpanel-grabbed');
        this.unbindDocumentMouseListeners();
        this.isXBarClicked = false;
        this.isYBarClicked = false;
    }
    requestAnimationFrame(f) {
        let frame = window.requestAnimationFrame || this.timeoutFrame;
        frame(f);
    }
    unbindListeners() {
        if (this.windowResizeListener) {
            this.windowResizeListener();
            this.windowResizeListener = null;
        }
        if (this.contentScrollListener) {
            this.contentScrollListener();
            this.contentScrollListener = null;
        }
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
            this.mouseEnterListener = null;
        }
        if (this.xBarMouseDownListener) {
            this.xBarMouseDownListener();
            this.xBarMouseDownListener = null;
        }
        if (this.yBarMouseDownListener) {
            this.yBarMouseDownListener();
            this.yBarMouseDownListener = null;
        }
    }
    ngOnDestroy() {
        if (this.initialized) {
            this.unbindListeners();
        }
    }
    /**
     * Refreshes the position and size of the scrollbar.
     * @group Method
     */
    refresh() {
        this.moveBar();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanel, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: i0.ChangeDetectorRef }, { token: DOCUMENT }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: ScrollPanel, selector: "p-scrollPanel", inputs: { style: "style", styleClass: "styleClass", step: "step" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "contentViewChild", first: true, predicate: ["content"], descendants: true }, { propertyName: "xBarViewChild", first: true, predicate: ["xBar"], descendants: true }, { propertyName: "yBarViewChild", first: true, predicate: ["yBar"], descendants: true }], ngImport: i0, template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                [attr.aria-controls]="contentId"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                [attr.aria-controls]="contentId"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"], dependencies: [{ kind: "directive", type: i1.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i1.NgStyle, selector: "[ngStyle]", inputs: ["ngStyle"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanel, decorators: [{
            type: Component,
            args: [{ selector: 'p-scrollPanel', template: `
        <div #container [ngClass]="'p-scrollpanel p-component'" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'scrollpanel'">
            <div class="p-scrollpanel-wrapper" [attr.data-pc-section]="'wrapper'">
                <div #content class="p-scrollpanel-content" [attr.data-pc-section]="'content'" (mouseenter)="moveBar()" (scroll)="onScroll($event)">
                    <ng-content></ng-content>
                    <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
                </div>
            </div>
            <div
                #xBar
                class="p-scrollpanel-bar p-scrollpanel-bar-x"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'horizontal'"
                [attr.aria-valuenow]="lastScrollLeft"
                [attr.data-pc-section]="'barx'"
                [attr.aria-controls]="contentId"
                (mousedown)="onXBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
                (blur)="onBlur()"
            ></div>
            <div
                #yBar
                class="p-scrollpanel-bar p-scrollpanel-bar-y"
                tabindex="0"
                role="scrollbar"
                [attr.aria-orientation]="'vertical'"
                [attr.aria-valuenow]="lastScrollTop"
                [attr.data-pc-section]="'bary'"
                [attr.aria-controls]="contentId"
                (mousedown)="onYBarMouseDown($event)"
                (keydown)="onKeyDown($event)"
                (keyup)="onKeyUp()"
                (focus)="onFocus($event)"
            ></div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-scrollpanel-wrapper{overflow:hidden;width:100%;height:100%;position:relative;float:left}.p-scrollpanel-content{height:calc(100% + 18px);width:calc(100% + 18px);padding:0 18px 18px 0;position:relative;overflow:auto;box-sizing:border-box}.p-scrollpanel-bar{position:relative;background:#c1c1c1;border-radius:3px;cursor:pointer;opacity:0;transition:opacity .25s linear}.p-scrollpanel-bar-y{width:9px;top:0}.p-scrollpanel-bar-x{height:9px;bottom:0}.p-scrollpanel-hidden{visibility:hidden}.p-scrollpanel:hover .p-scrollpanel-bar,.p-scrollpanel:active .p-scrollpanel-bar{opacity:1}.p-scrollpanel-grabbed{-webkit-user-select:none;user-select:none}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: i0.ChangeDetectorRef }, { type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], step: [{
                type: Input
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], contentViewChild: [{
                type: ViewChild,
                args: ['content']
            }], xBarViewChild: [{
                type: ViewChild,
                args: ['xBar']
            }], yBarViewChild: [{
                type: ViewChild,
                args: ['yBar']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ScrollPanelModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanelModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanelModule, declarations: [ScrollPanel], imports: [CommonModule], exports: [ScrollPanel] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanelModule, imports: [CommonModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ScrollPanelModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule],
                    exports: [ScrollPanel],
                    declarations: [ScrollPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xscGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvc2Nyb2xscGFuZWwvc2Nyb2xscGFuZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBR0gsdUJBQXVCLEVBRXZCLFNBQVMsRUFDVCxlQUFlLEVBRWYsTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBR1IsV0FBVyxFQUlYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUM1QyxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBRXpDLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7O0FBRWxEOzs7R0FHRztBQWlESCxNQUFNLE9BQU8sV0FBVztJQXFFcUI7SUFBd0I7SUFBdUI7SUFBcUI7SUFBaUQ7SUFBNEI7SUFwRTFMOzs7T0FHRztJQUNNLEtBQUssQ0FBOEM7SUFDNUQ7OztPQUdHO0lBQ00sVUFBVSxDQUFxQjtJQUN4Qzs7O09BR0c7SUFDTSxJQUFJLEdBQVcsQ0FBQyxDQUFDO0lBRUYsa0JBQWtCLENBQXlCO0lBRTdDLGdCQUFnQixDQUF5QjtJQUU1QyxhQUFhLENBQXlCO0lBRXRDLGFBQWEsQ0FBeUI7SUFFekIsU0FBUyxDQUF1QztJQUVoRixZQUFZLENBQXFCO0lBRWpDLFlBQVksQ0FBcUI7SUFFakMsWUFBWSxHQUFRLENBQUMsRUFBZ0IsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU1RCxXQUFXLEdBQVksS0FBSyxDQUFDO0lBRTdCLFNBQVMsQ0FBcUI7SUFFOUIsU0FBUyxDQUFxQjtJQUU5QixhQUFh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OzJGQXJFM0ksV0FBVywwTEF5QkgsYUFBYSw0WkF2RXBCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXNDVDs7MkZBUVEsV0FBVztrQkFoRHZCLFNBQVM7K0JBQ0ksZUFBZSxZQUNmOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztLQXNDVCxtQkFDZ0IsdUJBQXVCLENBQUMsTUFBTSxpQkFDaEMsaUJBQWlCLENBQUMsSUFBSSxRQUUvQjt3QkFDRixLQUFLLEVBQUUsV0FBVztxQkFDckI7OzBCQXVFWSxNQUFNOzJCQUFDLFdBQVc7OzBCQUFzRyxNQUFNOzJCQUFDLFFBQVE7aUVBaEUzSSxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csVUFBVTtzQkFBbEIsS0FBSztnQkFLRyxJQUFJO3NCQUFaLEtBQUs7Z0JBRWtCLGtCQUFrQjtzQkFBekMsU0FBUzt1QkFBQyxXQUFXO2dCQUVBLGdCQUFnQjtzQkFBckMsU0FBUzt1QkFBQyxTQUFTO2dCQUVELGFBQWE7c0JBQS9CLFNBQVM7dUJBQUMsTUFBTTtnQkFFRSxhQUFhO3NCQUEvQixTQUFTO3VCQUFDLE1BQU07Z0JBRWUsU0FBUztzQkFBeEMsZUFBZTt1QkFBQyxhQUFhOztBQTJabEMsTUFBTSxPQUFPLGlCQUFpQjt1R0FBakIsaUJBQWlCO3dHQUFqQixpQkFBaUIsaUJBcGJqQixXQUFXLGFBZ2JWLFlBQVksYUFoYmIsV0FBVzt3R0FvYlgsaUJBQWlCLFlBSmhCLFlBQVk7OzJGQUliLGlCQUFpQjtrQkFMN0IsUUFBUTttQkFBQztvQkFDTixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7b0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLFdBQVcsQ0FBQztvQkFDdEIsWUFBWSxFQUFFLENBQUMsV0FBVyxDQUFDO2lCQUM5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSwgRE9DVU1FTlQsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBJbmplY3QsXG4gICAgSW5wdXQsXG4gICAgTmdNb2R1bGUsXG4gICAgTmdab25lLFxuICAgIE9uRGVzdHJveSxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFByaW1lVGVtcGxhdGUgfSBmcm9tICdwcmltZW5nL2FwaSc7XG5pbXBvcnQgeyBEb21IYW5kbGVyIH0gZnJvbSAncHJpbWVuZy9kb20nO1xuaW1wb3J0IHsgTnVsbGFibGUgfSBmcm9tICdwcmltZW5nL3RzLWhlbHBlcnMnO1xuaW1wb3J0IHsgVW5pcXVlQ29tcG9uZW50SWQgfSBmcm9tICdwcmltZW5nL3V0aWxzJztcblxuLyoqXG4gKiBTY3JvbGxQYW5lbCBpcyBhIGNyb3NzIGJyb3dzZXIsIGxpZ2h0d2VpZ2h0IGFuZCB0aGVtYWJsZSBhbHRlcm5hdGl2ZSB0byBuYXRpdmUgYnJvd3NlciBzY3JvbGxiYXIuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc2Nyb2xsUGFuZWwnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgI2NvbnRhaW5lciBbbmdDbGFzc109XCIncC1zY3JvbGxwYW5lbCBwLWNvbXBvbmVudCdcIiBbbmdTdHlsZV09XCJzdHlsZVwiIFtjbGFzc109XCJzdHlsZUNsYXNzXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidzY3JvbGxwYW5lbCdcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLXNjcm9sbHBhbmVsLXdyYXBwZXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ3dyYXBwZXInXCI+XG4gICAgICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtc2Nyb2xscGFuZWwtY29udGVudFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY29udGVudCdcIiAobW91c2VlbnRlcik9XCJtb3ZlQmFyKClcIiAoc2Nyb2xsKT1cIm9uU2Nyb2xsKCRldmVudClcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiY29udGVudFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAjeEJhclxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1zY3JvbGxwYW5lbC1iYXIgcC1zY3JvbGxwYW5lbC1iYXIteFwiXG4gICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICByb2xlPVwic2Nyb2xsYmFyXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLW9yaWVudGF0aW9uXT1cIidob3Jpem9udGFsJ1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS12YWx1ZW5vd109XCJsYXN0U2Nyb2xsTGVmdFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidiYXJ4J1wiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJjb250ZW50SWRcIlxuICAgICAgICAgICAgICAgIChtb3VzZWRvd24pPVwib25YQmFyTW91c2VEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5dXApPVwib25LZXlVcCgpXCJcbiAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgI3lCYXJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtc2Nyb2xscGFuZWwtYmFyIHAtc2Nyb2xscGFuZWwtYmFyLXlcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgcm9sZT1cInNjcm9sbGJhclwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1vcmllbnRhdGlvbl09XCIndmVydGljYWwnXCJcbiAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLXZhbHVlbm93XT1cImxhc3RTY3JvbGxUb3BcIlxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInYmFyeSdcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiY29udGVudElkXCJcbiAgICAgICAgICAgICAgICAobW91c2Vkb3duKT1cIm9uWUJhck1vdXNlRG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoa2V5ZG93bik9XCJvbktleURvd24oJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleXVwKT1cIm9uS2V5VXAoKVwiXG4gICAgICAgICAgICAgICAgKGZvY3VzKT1cIm9uRm9jdXMoJGV2ZW50KVwiXG4gICAgICAgICAgICA+PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi9zY3JvbGxwYW5lbC5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2Nyb2xsUGFuZWwgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0ZXAgZmFjdG9yIHRvIHNjcm9sbCB0aGUgY29udGVudCB3aGlsZSBwcmVzc2luZyB0aGUgYXJyb3cga2V5cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdGVwOiBudW1iZXIgPSA1O1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnRWaWV3Q2hpbGQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCd4QmFyJykgeEJhclZpZXdDaGlsZDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ3lCYXInKSB5QmFyVmlld0NoaWxkOiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIHNjcm9sbFlSYXRpbzogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgc2Nyb2xsWFJhdGlvOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICB0aW1lb3V0RnJhbWU6IGFueSA9IChmbjogVm9pZEZ1bmN0aW9uKSA9PiBzZXRUaW1lb3V0KGZuLCAwKTtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBsYXN0UGFnZVk6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGxhc3RQYWdlWDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgaXNYQmFyQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgaXNZQmFyQ2xpY2tlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgbGFzdFNjcm9sbExlZnQ6IG51bWJlciA9IDA7XG5cbiAgICBsYXN0U2Nyb2xsVG9wOiBudW1iZXIgPSAwO1xuXG4gICAgb3JpZW50YXRpb246IHN0cmluZyA9ICd2ZXJ0aWNhbCc7XG5cbiAgICB0aW1lcjogYW55O1xuXG4gICAgY29udGVudElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICB3aW5kb3dSZXNpemVMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnRlbnRTY3JvbGxMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIG1vdXNlRW50ZXJMaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHhCYXJNb3VzZURvd25MaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIHlCYXJNb3VzZURvd25MaXN0ZW5lcjogVm9pZEZ1bmN0aW9uIHwgbnVsbCB8IHVuZGVmaW5lZDtcblxuICAgIGRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXI6IE51bGxhYmxlPChldmVudD86IGFueSkgPT4gdm9pZD47XG5cbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogTnVsbGFibGU8KGV2ZW50PzogYW55KSA9PiB2b2lkPjtcblxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwdWJsaWMgZWw6IEVsZW1lbnRSZWYsIHB1YmxpYyB6b25lOiBOZ1pvbmUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgZG9jdW1lbnQ6IERvY3VtZW50LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICAgICAgdGhpcy5jb250ZW50SWQgPSBVbmlxdWVDb21wb25lbnRJZCgpICsgJ19jb250ZW50JztcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMubW92ZUJhciA9IHRoaXMubW92ZUJhci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgICAgIHRoaXMub25YQmFyTW91c2VEb3duID0gdGhpcy5vblhCYXJNb3VzZURvd24uYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9uWUJhck1vdXNlRG93biA9IHRoaXMub25ZQmFyTW91c2VEb3duLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlID0gdGhpcy5vbkRvY3VtZW50TW91c2VNb3ZlLmJpbmQodGhpcyk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkRvY3VtZW50TW91c2VVcCA9IHRoaXMub25Eb2N1bWVudE1vdXNlVXAuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgICAgIHRoaXMud2luZG93UmVzaXplTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih3aW5kb3csICdyZXNpemUnLCB0aGlzLm1vdmVCYXIpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFNjcm9sbExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAnc2Nyb2xsJywgdGhpcy5tb3ZlQmFyKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKCh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ21vdXNlZW50ZXInLCB0aGlzLm1vdmVCYXIpO1xuICAgICAgICAgICAgICAgIHRoaXMueEJhck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oKHRoaXMueEJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJywgdGhpcy5vblhCYXJNb3VzZURvd24pO1xuICAgICAgICAgICAgICAgIHRoaXMueUJhck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4oKHRoaXMueUJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJywgdGhpcy5vbllCYXJNb3VzZURvd24pO1xuICAgICAgICAgICAgICAgIHRoaXMuY2FsY3VsYXRlQ29udGFpbmVySGVpZ2h0KCk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY29udGVudCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29udGVudFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBjYWxjdWxhdGVDb250YWluZXJIZWlnaHQoKSB7XG4gICAgICAgIGxldCBjb250YWluZXIgPSAodGhpcy5jb250YWluZXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCB4QmFyID0gKHRoaXMueEJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB3aW5kb3cgPSB0aGlzLmRvY3VtZW50LmRlZmF1bHRWaWV3IGFzIFdpbmRvdztcblxuICAgICAgICBsZXQgY29udGFpbmVyU3R5bGVzOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShjb250YWluZXIpLFxuICAgICAgICAgICAgeEJhclN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHhCYXIpLFxuICAgICAgICAgICAgcHVyZUNvbnRhaW5lckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGVpZ2h0KGNvbnRhaW5lcikgLSBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApO1xuXG4gICAgICAgIGlmIChjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXSAhPSAnbm9uZScgJiYgcHVyZUNvbnRhaW5lckhlaWdodCA9PSAwKSB7XG4gICAgICAgICAgICBpZiAoY29udGVudC5vZmZzZXRIZWlnaHQgKyBwYXJzZUludCh4QmFyU3R5bGVzWydoZWlnaHQnXSwgMTApID4gcGFyc2VJbnQoY29udGFpbmVyU3R5bGVzWydtYXgtaGVpZ2h0J10sIDEwKSkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5zdHlsZS5oZWlnaHQgPSBjb250YWluZXJTdHlsZXNbJ21heC1oZWlnaHQnXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnN0eWxlLmhlaWdodCA9IGNvbnRlbnQub2Zmc2V0SGVpZ2h0ICsgcGFyc2VGbG9hdChjb250YWluZXJTdHlsZXMucGFkZGluZ1RvcCkgKyBwYXJzZUZsb2F0KGNvbnRhaW5lclN0eWxlcy5wYWRkaW5nQm90dG9tKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLmJvcmRlclRvcFdpZHRoKSArIHBhcnNlRmxvYXQoY29udGFpbmVyU3R5bGVzLmJvcmRlckJvdHRvbVdpZHRoKSArICdweCc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlQmFyKCkge1xuICAgICAgICBsZXQgY29udGFpbmVyID0gKHRoaXMuY29udGFpbmVyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICAgIGxldCBjb250ZW50ID0gKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuXG4gICAgICAgIC8qIGhvcml6b250YWwgc2Nyb2xsICovXG4gICAgICAgIGxldCB4QmFyID0gKHRoaXMueEJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBsZXQgdG90YWxXaWR0aCA9IGNvbnRlbnQuc2Nyb2xsV2lkdGg7XG4gICAgICAgIGxldCBvd25XaWR0aCA9IGNvbnRlbnQuY2xpZW50V2lkdGg7XG4gICAgICAgIGxldCBib3R0b20gPSAoY29udGFpbmVyLmNsaWVudEhlaWdodCAtIHhCYXIuY2xpZW50SGVpZ2h0KSAqIC0xO1xuXG4gICAgICAgIHRoaXMuc2Nyb2xsWFJhdGlvID0gb3duV2lkdGggLyB0b3RhbFdpZHRoO1xuXG4gICAgICAgIC8qIHZlcnRpY2FsIHNjcm9sbCAqL1xuICAgICAgICBsZXQgeUJhciA9ICh0aGlzLnlCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgbGV0IHRvdGFsSGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIGxldCBvd25IZWlnaHQgPSBjb250ZW50LmNsaWVudEhlaWdodDtcbiAgICAgICAgbGV0IHJpZ2h0ID0gKGNvbnRhaW5lci5jbGllbnRXaWR0aCAtIHlCYXIuY2xpZW50V2lkdGgpICogLTE7XG5cbiAgICAgICAgdGhpcy5zY3JvbGxZUmF0aW8gPSBvd25IZWlnaHQgLyB0b3RhbEhlaWdodDtcblxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAoKHRoaXMuc2Nyb2xsWFJhdGlvIGFzIG51bWJlcikgPj0gMSkge1xuICAgICAgICAgICAgICAgIHhCYXIuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtaGlkZGVuJywgJ3RydWUnKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHhCYXIsICdwLXNjcm9sbHBhbmVsLWhpZGRlbicpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB4QmFyLnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWhpZGRlbicsICdmYWxzZScpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIucmVtb3ZlQ2xhc3MoeEJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICAgICAgY29uc3QgeEJhcldpZHRoID0gTWF0aC5tYXgoKHRoaXMuc2Nyb2xsWFJhdGlvIGFzIG51bWJlcikgKiAxMDAsIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB4QmFyTGVmdCA9IChjb250ZW50LnNjcm9sbExlZnQgKiAoMTAwIC0geEJhcldpZHRoKSkgLyAodG90YWxXaWR0aCAtIG93bldpZHRoKTtcbiAgICAgICAgICAgICAgICB4QmFyLnN0eWxlLmNzc1RleHQgPSAnd2lkdGg6JyArIHhCYXJXaWR0aCArICclOyBsZWZ0OicgKyB4QmFyTGVmdCArICclO2JvdHRvbTonICsgYm90dG9tICsgJ3B4Oyc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICgodGhpcy5zY3JvbGxZUmF0aW8gYXMgbnVtYmVyKSA+PSAxKSB7XG4gICAgICAgICAgICAgICAgeUJhci5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1oaWRkZW4nLCAndHJ1ZScpO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoeUJhciwgJ3Atc2Nyb2xscGFuZWwtaGlkZGVuJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHlCYXIuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtaGlkZGVuJywgJ2ZhbHNlJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh5QmFyLCAncC1zY3JvbGxwYW5lbC1oaWRkZW4nKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5QmFySGVpZ2h0ID0gTWF0aC5tYXgoKHRoaXMuc2Nyb2xsWVJhdGlvIGFzIG51bWJlcikgKiAxMDAsIDEwKTtcbiAgICAgICAgICAgICAgICBjb25zdCB5QmFyVG9wID0gKGNvbnRlbnQuc2Nyb2xsVG9wICogKDEwMCAtIHlCYXJIZWlnaHQpKSAvICh0b3RhbEhlaWdodCAtIG93bkhlaWdodCk7XG4gICAgICAgICAgICAgICAgeUJhci5zdHlsZS5jc3NUZXh0ID0gJ2hlaWdodDonICsgeUJhckhlaWdodCArICclOyB0b3A6IGNhbGMoJyArIHlCYXJUb3AgKyAnJSAtICcgKyB4QmFyLmNsaWVudEhlaWdodCArICdweCk7cmlnaHQ6JyArIHJpZ2h0ICsgJ3B4Oyc7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uU2Nyb2xsKGV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmxhc3RTY3JvbGxMZWZ0ICE9PSBldmVudC50YXJnZXQuc2Nyb2xsTGVmdCkge1xuICAgICAgICAgICAgdGhpcy5sYXN0U2Nyb2xsTGVmdCA9IGV2ZW50LnRhcmdldC5zY3JvbGxMZWZ0O1xuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmxhc3RTY3JvbGxUb3AgIT09IGV2ZW50LnRhcmdldC5zY3JvbGxUb3ApIHtcbiAgICAgICAgICAgIHRoaXMubGFzdFNjcm9sbFRvcCA9IGV2ZW50LnRhcmdldC5zY3JvbGxUb3A7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgIH1cblxuICAgIG9uS2V5RG93bihldmVudCkge1xuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKCdzY3JvbGxUb3AnLCB0aGlzLnN0ZXApO1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1VwJzoge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFRpbWVyKCdzY3JvbGxUb3AnLCB0aGlzLnN0ZXAgKiAtMSk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG5cbiAgICAgICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0Jzoge1xuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvL25vIG9wXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcignc2Nyb2xsTGVmdCcsIHRoaXMuc3RlcCk7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6IHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRUaW1lcignc2Nyb2xsTGVmdCcsIHRoaXMuc3RlcCAqIC0xKTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcblxuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOiB7XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgIC8vbm8gb3BcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbktleVVwKCkge1xuICAgICAgICB0aGlzLmNsZWFyVGltZXIoKTtcbiAgICB9XG5cbiAgICByZXBlYXQoYmFyLCBzdGVwKSB7XG4gICAgICAgIHRoaXMuY29udGVudFZpZXdDaGlsZC5uYXRpdmVFbGVtZW50W2Jhcl0gKz0gc3RlcDtcbiAgICAgICAgdGhpcy5tb3ZlQmFyKCk7XG4gICAgfVxuXG4gICAgc2V0VGltZXIoYmFyLCBzdGVwKSB7XG4gICAgICAgIHRoaXMuY2xlYXJUaW1lcigpO1xuICAgICAgICB0aGlzLnRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnJlcGVhdChiYXIsIHN0ZXApO1xuICAgICAgICB9LCA0MCk7XG4gICAgfVxuXG4gICAgY2xlYXJUaW1lcigpIHtcbiAgICAgICAgaWYgKHRoaXMudGltZXIpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aGlzLnRpbWVyKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudE1vdXNlTGlzdGVuZXJzKCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUoZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gKGUpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwKGUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRNb3VzZUxpc3RlbmVycygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5kb2N1bWVudE1vdXNlVXBMaXN0ZW5lcik7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uWUJhck1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNZQmFyQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZS5wYWdlWTtcblxuICAgICAgICB0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ3RydWUnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcygodGhpcy55QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICd0cnVlJyk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5kb2N1bWVudC5ib2R5LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG4gICAgICAgIHRoaXMuYmluZERvY3VtZW50TW91c2VMaXN0ZW5lcnMoKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uWEJhck1vdXNlRG93bihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIHRoaXMuaXNYQmFyQ2xpY2tlZCA9IHRydWU7XG4gICAgICAgIHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VYID0gZS5wYWdlWDtcblxuICAgICAgICB0aGlzLnhCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ2RhdGEtcC1zY3JvbGxwYW5lbC1ncmFiYmVkJywgJ2ZhbHNlJyk7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3MoKHRoaXMueEJhclZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LCAncC1zY3JvbGxwYW5lbC1ncmFiYmVkJyk7XG5cbiAgICAgICAgdGhpcy5kb2N1bWVudC5ib2R5LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmRvY3VtZW50LmJvZHksICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcblxuICAgICAgICB0aGlzLmJpbmREb2N1bWVudE1vdXNlTGlzdGVuZXJzKCk7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRvY3VtZW50TW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNYQmFyQ2xpY2tlZCkge1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvclhCYXIoZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc1lCYXJDbGlja2VkKSB7XG4gICAgICAgICAgICB0aGlzLm9uTW91c2VNb3ZlRm9yWUJhcihlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25Nb3VzZU1vdmVGb3JYQmFyKGUpO1xuICAgICAgICAgICAgdGhpcy5vbk1vdXNlTW92ZUZvcllCYXIoZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbk1vdXNlTW92ZUZvclhCYXIoZTogTW91c2VFdmVudCkge1xuICAgICAgICBsZXQgZGVsdGFYID0gZS5wYWdlWCAtICh0aGlzLmxhc3RQYWdlWCBhcyBudW1iZXIpO1xuICAgICAgICB0aGlzLmxhc3RQYWdlWCA9IGUucGFnZVg7XG5cbiAgICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4ge1xuICAgICAgICAgICAgKHRoaXMuY29udGVudFZpZXdDaGlsZCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnNjcm9sbExlZnQgKz0gZGVsdGFYIC8gKHRoaXMuc2Nyb2xsWFJhdGlvIGFzIG51bWJlcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG9uTW91c2VNb3ZlRm9yWUJhcihlOiBNb3VzZUV2ZW50KSB7XG4gICAgICAgIGxldCBkZWx0YVkgPSBlLnBhZ2VZIC0gKHRoaXMubGFzdFBhZ2VZIGFzIG51bWJlcik7XG4gICAgICAgIHRoaXMubGFzdFBhZ2VZID0gZS5wYWdlWTtcblxuICAgICAgICB0aGlzLnJlcXVlc3RBbmltYXRpb25GcmFtZSgoKSA9PiB7XG4gICAgICAgICAgICAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wICs9IGRlbHRhWSAvICh0aGlzLnNjcm9sbFlSYXRpbyBhcyBudW1iZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU2Nyb2xscyB0aGUgdG9wIGxvY2F0aW9uIHRvIHRoZSBnaXZlbiB2YWx1ZS5cbiAgICAgKiBAcGFyYW0gc2Nyb2xsVG9wXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHNjcm9sbFRvcChzY3JvbGxUb3A6IG51bWJlcikge1xuICAgICAgICBsZXQgc2Nyb2xsYWJsZUhlaWdodCA9ICh0aGlzLmNvbnRlbnRWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5zY3JvbGxIZWlnaHQgLSAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICAgICAgICBzY3JvbGxUb3AgPSBzY3JvbGxUb3AgPiBzY3JvbGxhYmxlSGVpZ2h0ID8gc2Nyb2xsYWJsZUhlaWdodCA6IHNjcm9sbFRvcCA+IDAgPyBzY3JvbGxUb3AgOiAwO1xuICAgICAgICAodGhpcy5jb250ZW50Vmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG9wID0gc2Nyb2xsVG9wO1xuICAgIH1cblxuICAgIG9uRm9jdXMoZXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMueEJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLnlCYXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICAgICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZVVwKGU6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMueUJhclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50LnNldEF0dHJpYnV0ZSgnZGF0YS1wLXNjcm9sbHBhbmVsLWdyYWJiZWQnLCAnZmFsc2UnKTtcbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcygodGhpcy55QmFyVmlld0NoaWxkIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQsICdwLXNjcm9sbHBhbmVsLWdyYWJiZWQnKTtcbiAgICAgICAgdGhpcy54QmFyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICdmYWxzZScpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKCh0aGlzLnhCYXJWaWV3Q2hpbGQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudCwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuICAgICAgICB0aGlzLmRvY3VtZW50LmJvZHkuc2V0QXR0cmlidXRlKCdkYXRhLXAtc2Nyb2xscGFuZWwtZ3JhYmJlZCcsICdmYWxzZScpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZG9jdW1lbnQuYm9keSwgJ3Atc2Nyb2xscGFuZWwtZ3JhYmJlZCcpO1xuXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRNb3VzZUxpc3RlbmVycygpO1xuICAgICAgICB0aGlzLmlzWEJhckNsaWNrZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5pc1lCYXJDbGlja2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGY6IFZvaWRGdW5jdGlvbikge1xuICAgICAgICBsZXQgZnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lIHx8IHRoaXMudGltZW91dEZyYW1lO1xuICAgICAgICBmcmFtZShmKTtcbiAgICB9XG5cbiAgICB1bmJpbmRMaXN0ZW5lcnMoKSB7XG4gICAgICAgIGlmICh0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLndpbmRvd1Jlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmNvbnRlbnRTY3JvbGxMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50U2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGVudFNjcm9sbExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1vdXNlRW50ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5tb3VzZUVudGVyTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VFbnRlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnhCYXJNb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy54QmFyTW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMueEJhck1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnlCYXJNb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy55QmFyTW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMueUJhck1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgdGhpcy51bmJpbmRMaXN0ZW5lcnMoKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZWZyZXNoZXMgdGhlIHBvc2l0aW9uIGFuZCBzaXplIG9mIHRoZSBzY3JvbGxiYXIuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHJlZnJlc2goKSB7XG4gICAgICAgIHRoaXMubW92ZUJhcigpO1xuICAgIH1cbn1cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbQ29tbW9uTW9kdWxlXSxcbiAgICBleHBvcnRzOiBbU2Nyb2xsUGFuZWxdLFxuICAgIGRlY2xhcmF0aW9uczogW1Njcm9sbFBhbmVsXVxufSlcbmV4cG9ydCBjbGFzcyBTY3JvbGxQYW5lbE1vZHVsZSB7fVxuIl19