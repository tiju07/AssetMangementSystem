import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation, forwardRef } from '@angular/core';
import { PrimeTemplate, SharedModule } from 'primeng/api';
import { DomHandler } from 'primeng/dom';
import { ChevronLeftIcon } from 'primeng/icons/chevronleft';
import { ChevronRightIcon } from 'primeng/icons/chevronright';
import { TimesIcon } from 'primeng/icons/times';
import { RippleModule } from 'primeng/ripple';
import { TooltipModule } from 'primeng/tooltip';
import { UniqueComponentId } from 'primeng/utils';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common";
import * as i2 from "primeng/tooltip";
import * as i3 from "primeng/ripple";
/**
 * TabPanel is a helper component for TabView component.
 * @group Components
 */
export class TabPanel {
    el;
    viewContainer;
    cd;
    /**
     * Defines if tab can be removed.
     * @group Props
     */
    closable = false;
    /**
     * Inline style of the tab header.
     * @group Props
     */
    get headerStyle() {
        return this._headerStyle;
    }
    set headerStyle(headerStyle) {
        this._headerStyle = headerStyle;
        this.tabView.cd.markForCheck();
    }
    /**
     * Style class of the tab header.
     * @group Props
     */
    get headerStyleClass() {
        return this._headerStyleClass;
    }
    set headerStyleClass(headerStyleClass) {
        this._headerStyleClass = headerStyleClass;
        this.tabView.cd.markForCheck();
    }
    /**
     * Whether a lazy loaded panel should avoid getting loaded again on reselection.
     * @group Props
     */
    cache = true;
    /**
     * Advisory information to display in a tooltip on hover.
     * @group Props
     */
    tooltip;
    /**
     * Position of the tooltip.
     * @group Props
     */
    tooltipPosition = 'top';
    /**
     * Type of CSS position.
     * @group Props
     */
    tooltipPositionStyle = 'absolute';
    /**
     * Style class of the tooltip.
     * @group Props
     */
    tooltipStyleClass;
    /**
     * Defines if tab is active.
     * @defaultValue false
     * @group Props
     */
    get selected() {
        return !!this._selected;
    }
    set selected(val) {
        this._selected = val;
        if (!this.loaded) {
            this.cd.detectChanges();
        }
        if (val)
            this.loaded = true;
    }
    /**
     * When true, tab cannot be activated.
     * @defaultValue false
     * @group Props
     */
    get disabled() {
        return !!this._disabled;
    }
    set disabled(disabled) {
        this._disabled = disabled;
        this.tabView.cd.markForCheck();
    }
    /**
     * Title of the tabPanel.
     * @group Props
     */
    get header() {
        return this._header;
    }
    set header(header) {
        this._header = header;
        // We have to wait for the rendering and then retrieve the actual size element from the DOM.
        // in future `Promise.resolve` can be changed to `queueMicrotask` (if ie11 support will be dropped)
        Promise.resolve().then(() => {
            this.tabView.updateInkBar();
            this.tabView.cd.markForCheck();
        });
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `lefticon` template instead.
     */
    get leftIcon() {
        return this._leftIcon;
    }
    set leftIcon(leftIcon) {
        this._leftIcon = leftIcon;
        this.tabView.cd.markForCheck();
    }
    /**
     * Left icon of the tabPanel.
     * @group Props
     * @deprecated since v15.4.2, use `righticon` template instead.
     */
    get rightIcon() {
        return this._rightIcon;
    }
    set rightIcon(rightIcon) {
        this._rightIcon = rightIcon;
        this.tabView.cd.markForCheck();
    }
    templates;
    closed = false;
    view = null;
    _headerStyle;
    _headerStyleClass;
    _selected;
    _disabled;
    _header;
    _leftIcon;
    _rightIcon = undefined;
    loaded = false;
    id;
    contentTemplate;
    headerTemplate;
    leftIconTemplate;
    rightIconTemplate;
    closeIconTemplate;
    tabView;
    constructor(tabView, el, viewContainer, cd) {
        this.el = el;
        this.viewContainer = viewContainer;
        this.cd = cd;
        this.tabView = tabView;
        this.id = UniqueComponentId();
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'righticon':
                    this.rightIconTemplate = item.template;
                    break;
                case 'lefticon':
                    this.leftIconTemplate = item.template;
                    break;
                case 'closeicon':
                    this.closeIconTemplate = item.template;
                    break;
                default:
                    this.contentTemplate = item.template;
                    break;
            }
        });
    }
    ngOnDestroy() {
        this.view = null;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabPanel, deps: [{ token: forwardRef(() => TabView) }, { token: i0.ElementRef }, { token: i0.ViewContainerRef }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TabPanel, selector: "p-tabPanel", inputs: { closable: "closable", headerStyle: "headerStyle", headerStyleClass: "headerStyleClass", cache: "cache", tooltip: "tooltip", tooltipPosition: "tooltipPosition", tooltipPositionStyle: "tooltipPositionStyle", tooltipStyleClass: "tooltipStyleClass", selected: "selected", disabled: "disabled", header: "header", leftIcon: "leftIcon", rightIcon: "rightIcon" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i1.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i1.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabPanel, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tabPanel',
                    template: `
        <div
            *ngIf="!closed"
            class="p-tabview-panel"
            role="tabpanel"
            [hidden]="!selected"
            [attr.id]="tabView.getTabContentId(id)"
            [attr.aria-hidden]="!selected"
            [attr.aria-labelledby]="tabView.getTabHeaderActionId(id)"
            [attr.data-pc-name]="'tabpanel'"
        >
            <ng-content></ng-content>
            <ng-container *ngIf="contentTemplate && (cache ? loaded : selected)">
                <ng-container *ngTemplateOutlet="contentTemplate"></ng-container>
            </ng-container>
        </div>
    `,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: TabView, decorators: [{
                    type: Inject,
                    args: [forwardRef(() => TabView)]
                }] }, { type: i0.ElementRef }, { type: i0.ViewContainerRef }, { type: i0.ChangeDetectorRef }], propDecorators: { closable: [{
                type: Input
            }], headerStyle: [{
                type: Input
            }], headerStyleClass: [{
                type: Input
            }], cache: [{
                type: Input
            }], tooltip: [{
                type: Input
            }], tooltipPosition: [{
                type: Input
            }], tooltipPositionStyle: [{
                type: Input
            }], tooltipStyleClass: [{
                type: Input
            }], selected: [{
                type: Input
            }], disabled: [{
                type: Input
            }], header: [{
                type: Input
            }], leftIcon: [{
                type: Input
            }], rightIcon: [{
                type: Input
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
/**
 * TabView is a container component to group content with tabs.
 * @group Components
 */
export class TabView {
    platformId;
    el;
    cd;
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
     * Whether tab close is controlled at onClose event or not.
     * @defaultValue false
     * @group Props
     */
    controlClose;
    /**
     * When enabled displays buttons at each side of the tab headers to scroll the tab list.
     * @defaultValue false
     * @group Props
     */
    scrollable;
    /**
     * Index of the active tab to change selected tab programmatically.
     * @group Props
     */
    get activeIndex() {
        return this._activeIndex;
    }
    set activeIndex(val) {
        this._activeIndex = val;
        if (this.preventActiveIndexPropagation) {
            this.preventActiveIndexPropagation = false;
            return;
        }
        if (this.tabs && this.tabs.length && this._activeIndex != null && this.tabs.length > this._activeIndex) {
            this.findSelectedTab().selected = false;
            this.tabs[this._activeIndex].selected = true;
            this.tabChanged = true;
            this.updateScrollBar(val);
        }
    }
    /**
     * When enabled, the focused tab is activated.
     * @group Props
     */
    selectOnFocus = false;
    /**
     * Used to define a string aria label attribute the forward navigation button.
     * @group Props
     */
    nextButtonAriaLabel;
    /**
     * Used to define a string aria label attribute the backward navigation button.
     * @group Props
     */
    prevButtonAriaLabel;
    /**
     * When activated, navigation buttons will automatically hide or show based on the available space within the container.
     * @group Props
     */
    autoHideButtons = true;
    /**
     * Index of the element in tabbing order.
     * @group Props
     */
    tabindex = 0;
    /**
     * Callback to invoke on tab change.
     * @param {TabViewChangeEvent} event - Custom tab change event
     * @group Emits
     */
    onChange = new EventEmitter();
    /**
     * Callback to invoke on tab close.
     * @param {TabViewCloseEvent} event - Custom tab close event
     * @group Emits
     */
    onClose = new EventEmitter();
    /**
     * Callback to invoke on the active tab change.
     * @param {number} index - New active index
     * @group Emits
     */
    activeIndexChange = new EventEmitter();
    content;
    navbar;
    prevBtn;
    nextBtn;
    inkbar;
    tabPanels;
    templates;
    initialized;
    tabs;
    _activeIndex;
    preventActiveIndexPropagation;
    tabChanged;
    backwardIsDisabled = true;
    forwardIsDisabled = false;
    tabChangesSubscription;
    nextIconTemplate;
    previousIconTemplate;
    resizeObserver;
    container;
    list;
    buttonVisible;
    elementToObserve;
    constructor(platformId, el, cd, renderer) {
        this.platformId = platformId;
        this.el = el;
        this.cd = cd;
        this.renderer = renderer;
    }
    ngAfterContentInit() {
        this.initTabs();
        this.tabChangesSubscription = this.tabPanels.changes.subscribe((_) => {
            this.initTabs();
            this.refreshButtonState();
        });
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'previousicon':
                    this.previousIconTemplate = item.template;
                    break;
                case 'nexticon':
                    this.nextIconTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.autoHideButtons) {
                this.bindResizeObserver();
            }
        }
    }
    bindResizeObserver() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        this.resizeObserver = new ResizeObserver(() => {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.detectChanges();
        });
        this.resizeObserver.observe(this.container);
    }
    unbindResizeObserver() {
        this.resizeObserver.unobserve(this.elementToObserve.nativeElement);
        this.resizeObserver = null;
    }
    ngAfterViewChecked() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.tabChanged) {
                this.updateInkBar();
                this.tabChanged = false;
            }
        }
    }
    ngOnDestroy() {
        if (this.tabChangesSubscription) {
            this.tabChangesSubscription.unsubscribe();
        }
        if (this.resizeObserver) {
            this.unbindResizeObserver();
        }
    }
    getTabHeaderActionId(tabId) {
        return `${tabId}_header_action`;
    }
    getTabContentId(tabId) {
        return `${tabId}_content`;
    }
    initTabs() {
        this.tabs = this.tabPanels.toArray();
        let selectedTab = this.findSelectedTab();
        if (!selectedTab && this.tabs.length) {
            if (this.activeIndex != null && this.tabs.length > this.activeIndex)
                this.tabs[this.activeIndex].selected = true;
            else
                this.tabs[0].selected = true;
            this.tabChanged = true;
        }
        this.cd.markForCheck();
    }
    onTabKeyDown(event, tab) {
        switch (event.code) {
            case 'ArrowLeft':
                this.onTabArrowLeftKey(event);
                break;
            case 'ArrowRight':
                this.onTabArrowRightKey(event);
                break;
            case 'Home':
                this.onTabHomeKey(event);
                break;
            case 'End':
                this.onTabEndKey(event);
                break;
            case 'PageDown':
                this.onTabEndKey(event);
                break;
            case 'PageUp':
                this.onTabHomeKey(event);
                break;
            case 'Enter':
            case 'Space':
                this.open(event, tab);
                break;
            default:
                break;
        }
    }
    onTabArrowLeftKey(event) {
        const prevHeaderAction = this.findPrevHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(prevHeaderAction, 'data-pc-index');
        prevHeaderAction ? this.changeFocusedTab(event, prevHeaderAction, index) : this.onTabEndKey(event);
        event.preventDefault();
    }
    onTabArrowRightKey(event) {
        const nextHeaderAction = this.findNextHeaderAction(event.target.parentElement);
        const index = DomHandler.getAttribute(nextHeaderAction, 'data-pc-index');
        nextHeaderAction ? this.changeFocusedTab(event, nextHeaderAction, index) : this.onTabHomeKey(event);
        event.preventDefault();
    }
    onTabHomeKey(event) {
        const firstHeaderAction = this.findFirstHeaderAction();
        const index = DomHandler.getAttribute(firstHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, firstHeaderAction, index);
        event.preventDefault();
    }
    onTabEndKey(event) {
        const lastHeaderAction = this.findLastHeaderAction();
        const index = DomHandler.getAttribute(lastHeaderAction, 'data-pc-index');
        this.changeFocusedTab(event, lastHeaderAction, index);
        event.preventDefault();
    }
    changeFocusedTab(event, element, index) {
        if (element) {
            DomHandler.focus(element);
            element.scrollIntoView({ block: 'nearest' });
            if (this.selectOnFocus) {
                const tab = this.tabs[index];
                this.open(event, tab);
            }
        }
    }
    findNextHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.nextElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findNextHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findPrevHeaderAction(tabElement, selfCheck = false) {
        const headerElement = selfCheck ? tabElement : tabElement.previousElementSibling;
        return headerElement
            ? DomHandler.getAttribute(headerElement, 'data-p-disabled') || DomHandler.getAttribute(headerElement, 'data-pc-section') === 'inkbar'
                ? this.findPrevHeaderAction(headerElement)
                : DomHandler.findSingle(headerElement, '[data-pc-section="headeraction"]')
            : null;
    }
    findFirstHeaderAction() {
        const firstEl = this.navbar.nativeElement.firstElementChild;
        return this.findNextHeaderAction(firstEl, true);
    }
    findLastHeaderAction() {
        const lastEl = this.navbar.nativeElement.lastElementChild;
        const lastHeaderAction = DomHandler.getAttribute(lastEl, 'data-pc-section') === 'inkbar' ? lastEl.previousElementSibling : lastEl;
        return this.findPrevHeaderAction(lastHeaderAction, true);
    }
    open(event, tab) {
        if (tab.disabled) {
            if (event) {
                event.preventDefault();
            }
            return;
        }
        if (!tab.selected) {
            let selectedTab = this.findSelectedTab();
            if (selectedTab) {
                selectedTab.selected = false;
            }
            this.tabChanged = true;
            tab.selected = true;
            let selectedTabIndex = this.findTabIndex(tab);
            this.preventActiveIndexPropagation = true;
            this.activeIndexChange.emit(selectedTabIndex);
            this.onChange.emit({ originalEvent: event, index: selectedTabIndex });
            this.updateScrollBar(selectedTabIndex);
        }
        if (event) {
            event.preventDefault();
        }
    }
    close(event, tab) {
        if (this.controlClose) {
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab),
                close: () => {
                    this.closeTab(tab);
                }
            });
        }
        else {
            this.closeTab(tab);
            this.onClose.emit({
                originalEvent: event,
                index: this.findTabIndex(tab)
            });
        }
    }
    closeTab(tab) {
        if (tab.disabled) {
            return;
        }
        if (tab.selected) {
            this.tabChanged = true;
            tab.selected = false;
            for (let i = 0; i < this.tabs.length; i++) {
                let tabPanel = this.tabs[i];
                if (!tabPanel.closed && !tab.disabled) {
                    tabPanel.selected = true;
                    break;
                }
            }
        }
        tab.closed = true;
    }
    findSelectedTab() {
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i].selected) {
                return this.tabs[i];
            }
        }
        return null;
    }
    findTabIndex(tab) {
        let index = -1;
        for (let i = 0; i < this.tabs.length; i++) {
            if (this.tabs[i] == tab) {
                index = i;
                break;
            }
        }
        return index;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    updateInkBar() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.navbar) {
                const tabHeader = DomHandler.findSingle(this.navbar.nativeElement, 'li.p-highlight');
                if (!tabHeader) {
                    return;
                }
                this.inkbar.nativeElement.style.width = DomHandler.getWidth(tabHeader) + 'px';
                this.inkbar.nativeElement.style.left = DomHandler.getOffset(tabHeader).left - DomHandler.getOffset(this.navbar.nativeElement).left + 'px';
            }
        }
    }
    updateScrollBar(index) {
        let tabHeader = this.navbar.nativeElement.children[index];
        if (tabHeader) {
            tabHeader.scrollIntoView({ block: 'nearest' });
        }
    }
    updateButtonState() {
        const content = this.content.nativeElement;
        const { scrollLeft, scrollWidth } = content;
        const width = DomHandler.getWidth(content);
        this.backwardIsDisabled = scrollLeft === 0;
        this.forwardIsDisabled = Math.round(scrollLeft) === scrollWidth - width;
    }
    refreshButtonState() {
        this.container = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="navcontent"]');
        this.list = DomHandler.findSingle(this.el.nativeElement, '[data-pc-section="nav"]');
        if (this.list.offsetWidth >= this.container.offsetWidth) {
            if (this.list.offsetWidth >= this.container.offsetWidth) {
                this.buttonVisible = true;
            }
            else {
                this.buttonVisible = false;
            }
            this.updateButtonState();
            this.cd.markForCheck();
        }
    }
    onScroll(event) {
        this.scrollable && this.updateButtonState();
        event.preventDefault();
    }
    getVisibleButtonWidths() {
        return [this.prevBtn?.nativeElement, this.nextBtn?.nativeElement].reduce((acc, el) => (el ? acc + DomHandler.getWidth(el) : acc), 0);
    }
    navBackward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft - width;
        content.scrollLeft = pos <= 0 ? 0 : pos;
    }
    navForward() {
        const content = this.content.nativeElement;
        const width = DomHandler.getWidth(content) - this.getVisibleButtonWidths();
        const pos = content.scrollLeft + width;
        const lastPos = content.scrollWidth - width;
        content.scrollLeft = pos >= lastPos ? lastPos : pos;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabView, deps: [{ token: PLATFORM_ID }, { token: i0.ElementRef }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TabView, selector: "p-tabView", inputs: { style: "style", styleClass: "styleClass", controlClose: "controlClose", scrollable: "scrollable", activeIndex: "activeIndex", selectOnFocus: "selectOnFocus", nextButtonAriaLabel: "nextButtonAriaLabel", prevButtonAriaLabel: "prevButtonAriaLabel", autoHideButtons: "autoHideButtons", tabindex: "tabindex" }, outputs: { onChange: "onChange", onClose: "onClose", activeIndexChange: "activeIndexChange" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "tabPanels", predicate: TabPanel }, { propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "content", first: true, predicate: ["content"], descendants: true }, { propertyName: "navbar", first: true, predicate: ["navbar"], descendants: true }, { propertyName: "prevBtn", first: true, predicate: ["prevBtn"], descendants: true }, { propertyName: "nextBtn", first: true, predicate: ["nextBtn"], descendants: true }, { propertyName: "inkbar", first: true, predicate: ["inkbar"], descendants: true }, { propertyName: "elementToObserve", first: true, predicate: ["elementToObserve"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i1.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i1.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i2.Tooltip), selector: "[pTooltip]", inputs: ["tooltipPosition", "tooltipEvent", "appendTo", "positionStyle", "tooltipStyleClass", "tooltipZIndex", "escape", "showDelay", "hideDelay", "life", "positionTop", "positionLeft", "autoHide", "fitContent", "hideOnEscape", "pTooltip", "tooltipDisabled", "tooltipOptions"] }, { kind: "directive", type: i0.forwardRef(() => i3.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronLeftIcon), selector: "ChevronLeftIcon" }, { kind: "component", type: i0.forwardRef(() => ChevronRightIcon), selector: "ChevronRightIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabView, decorators: [{
            type: Component,
            args: [{ selector: 'p-tabView', template: `
        <div [ngClass]="{ 'p-tabview p-component': true, 'p-tabview-scrollable': scrollable }" [ngStyle]="style" [class]="styleClass" [attr.data-pc-name]="'tabview'">
            <div #elementToObserve class="p-tabview-nav-container">
                <button
                    *ngIf="scrollable && !backwardIsDisabled && autoHideButtons"
                    #prevBtn
                    class="p-tabview-nav-prev p-tabview-nav-btn p-link"
                    (click)="navBackward()"
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="prevButtonAriaLabel"
                    type="button"
                    pRipple
                >
                    <ChevronLeftIcon *ngIf="!previousIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="previousIconTemplate"></ng-template>
                </button>
                <div #content class="p-tabview-nav-content" (scroll)="onScroll($event)" [attr.data-pc-section]="'navcontent'">
                    <ul #navbar class="p-tabview-nav" role="tablist" [attr.data-pc-section]="'nav'">
                        <ng-template ngFor let-tab [ngForOf]="tabs" let-i="index">
                            <li role="presentation" [ngClass]="{ 'p-highlight': tab.selected, 'p-disabled': tab.disabled }" [attr.data-p-disabled]="tab.disabled" [ngStyle]="tab.headerStyle" [class]="tab.headerStyleClass" *ngIf="!tab.closed">
                                <a
                                    role="tab"
                                    class="p-tabview-nav-link"
                                    [pTooltip]="tab.tooltip"
                                    [tooltipPosition]="tab.tooltipPosition"
                                    [positionStyle]="tab.tooltipPositionStyle"
                                    [tooltipStyleClass]="tab.tooltipStyleClass"
                                    [attr.id]="getTabHeaderActionId(tab.id)"
                                    [attr.aria-controls]="getTabContentId(tab.id)"
                                    [attr.aria-selected]="tab.selected"
                                    [attr.tabindex]="tab.disabled || !tab.selected ? '-1' : tabindex"
                                    [attr.aria-disabled]="tab.disabled"
                                    [attr.data-pc-index]="i"
                                    [attr.data-pc-section]="'headeraction'"
                                    (click)="open($event, tab)"
                                    (keydown)="onTabKeyDown($event, tab)"
                                    pRipple
                                >
                                    <ng-container *ngIf="!tab.headerTemplate">
                                        <span class="p-tabview-left-icon" [ngClass]="tab.leftIcon" *ngIf="tab.leftIcon && !tab.leftIconTemplate"></span>
                                        <span *ngIf="tab.leftIconTemplate" class="p-tabview-left-icon">
                                            <ng-template *ngTemplateOutlet="tab.leftIconTemplate"></ng-template>
                                        </span>
                                        <span class="p-tabview-title">{{ tab.header }}</span>
                                        <span class="p-tabview-right-icon" [ngClass]="tab.rightIcon" *ngIf="tab.rightIcon && !tab.rightIconTemplate"></span>
                                        <span *ngIf="tab.rightIconTemplate" class="p-tabview-right-icon">
                                            <ng-template *ngTemplateOutlet="tab.rightIconTemplate"></ng-template>
                                        </span>
                                    </ng-container>
                                    <ng-container *ngTemplateOutlet="tab.headerTemplate"></ng-container>
                                    <ng-container *ngIf="tab.closable">
                                        <TimesIcon *ngIf="!tab.closeIconTemplate" [styleClass]="'p-tabview-close'" (click)="close($event, tab)" />
                                        <span class="tab.closeIconTemplate" *ngIf="tab.closeIconTemplate"></span>
                                        <ng-template *ngTemplateOutlet="tab.closeIconTemplate"></ng-template>
                                    </ng-container>
                                </a>
                            </li>
                        </ng-template>
                        <li #inkbar class="p-tabview-ink-bar" role="presentation" aria-hidden="true" [attr.data-pc-section]="'inkbar'"></li>
                    </ul>
                </div>
                <button
                    *ngIf="scrollable && !forwardIsDisabled && buttonVisible"
                    #nextBtn
                    [attr.tabindex]="tabindex"
                    [attr.aria-label]="nextButtonAriaLabel"
                    class="p-tabview-nav-next p-tabview-nav-btn p-link"
                    (click)="navForward()"
                    type="button"
                    pRipple
                >
                    <ChevronRightIcon *ngIf="!nextIconTemplate" [attr.aria-hidden]="true" />
                    <ng-template *ngTemplateOutlet="nextIconTemplate"></ng-template>
                </button>
            </div>
            <div class="p-tabview-panels">
                <ng-content></ng-content>
            </div>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-tabview-nav-container{position:relative}.p-tabview-scrollable .p-tabview-nav-container{overflow:hidden}.p-tabview-nav-content{overflow-x:auto;overflow-y:hidden;scroll-behavior:smooth;scrollbar-width:none;overscroll-behavior:contain auto}.p-tabview-nav{display:inline-flex;min-width:100%;margin:0;padding:0;list-style-type:none;flex:1 1 auto}.p-tabview-nav-link{cursor:pointer;-webkit-user-select:none;user-select:none;display:flex;align-items:center;position:relative;text-decoration:none;overflow:hidden}.p-tabview-ink-bar{display:none;z-index:1}.p-tabview-nav-link:focus{z-index:1}.p-tabview-title{line-height:1;white-space:nowrap}.p-tabview-nav-btn{position:absolute;top:0;z-index:2;height:100%;display:flex;align-items:center;justify-content:center}.p-tabview-nav-prev{left:0}.p-tabview-nav-next{right:0}.p-tabview-nav-content::-webkit-scrollbar{display:none}.p-tabview-close{z-index:1}}\n"] }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.ElementRef }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }], propDecorators: { style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], controlClose: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], activeIndex: [{
                type: Input
            }], selectOnFocus: [{
                type: Input
            }], nextButtonAriaLabel: [{
                type: Input
            }], prevButtonAriaLabel: [{
                type: Input
            }], autoHideButtons: [{
                type: Input
            }], tabindex: [{
                type: Input
            }], onChange: [{
                type: Output
            }], onClose: [{
                type: Output
            }], activeIndexChange: [{
                type: Output
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], navbar: [{
                type: ViewChild,
                args: ['navbar']
            }], prevBtn: [{
                type: ViewChild,
                args: ['prevBtn']
            }], nextBtn: [{
                type: ViewChild,
                args: ['nextBtn']
            }], inkbar: [{
                type: ViewChild,
                args: ['inkbar']
            }], tabPanels: [{
                type: ContentChildren,
                args: [TabPanel]
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], elementToObserve: [{
                type: ViewChild,
                args: ['elementToObserve']
            }] } });
export class TabViewModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabViewModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: TabViewModule, declarations: [TabView, TabPanel], imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon], exports: [TabView, TabPanel, SharedModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabViewModule, imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon, SharedModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TabViewModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, SharedModule, TooltipModule, RippleModule, TimesIcon, ChevronLeftIcon, ChevronRightIcon],
                    exports: [TabView, TabPanel, SharedModule],
                    declarations: [TabView, TabPanel]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFidmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy90YWJ2aWV3L3RhYnZpZXcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFHZixZQUFZLEVBQ1osTUFBTSxFQUNOLEtBQUssRUFDTCxRQUFRLEVBRVIsTUFBTSxFQUNOLFdBQVcsRUFJWCxTQUFTLEVBRVQsaUJBQWlCLEVBQ2pCLFVBQVUsRUFFYixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWUsYUFBYSxFQUFFLFlBQVksRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN2RSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUM1RCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzlDLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUdoRCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxlQUFlLENBQUM7Ozs7O0FBR2xEOzs7R0FHRztBQXdCSCxNQUFNLE9BQU8sUUFBUTtJQWdLdUQ7SUFBdUI7SUFBd0M7SUEvSnZJOzs7T0FHRztJQUNNLFFBQVEsR0FBd0IsS0FBSyxDQUFDO0lBQy9DOzs7T0FHRztJQUNILElBQWEsV0FBVztRQUNwQixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7SUFDN0IsQ0FBQztJQUNELElBQUksV0FBVyxDQUFDLFdBQXdEO1FBQ3BFLElBQUks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TyxFQUFFLFFBQVEsQ0FBQztpQkFDcEMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUsIGlzUGxhdGZvcm1Ccm93c2VyIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdDaGVja2VkLFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFbWJlZGRlZFZpZXdSZWYsXG4gICAgRXZlbnRFbWl0dGVyLFxuICAgIEluamVjdCxcbiAgICBJbnB1dCxcbiAgICBOZ01vZHVsZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT3V0cHV0LFxuICAgIFBMQVRGT1JNX0lELFxuICAgIFF1ZXJ5TGlzdCxcbiAgICBSZW5kZXJlcjIsXG4gICAgVGVtcGxhdGVSZWYsXG4gICAgVmlld0NoaWxkLFxuICAgIFZpZXdDb250YWluZXJSZWYsXG4gICAgVmlld0VuY2Fwc3VsYXRpb24sXG4gICAgZm9yd2FyZFJlZixcbiAgICBzaWduYWxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCbG9ja2FibGVVSSwgUHJpbWVUZW1wbGF0ZSwgU2hhcmVkTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IENoZXZyb25MZWZ0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbmxlZnQnO1xuaW1wb3J0IHsgQ2hldnJvblJpZ2h0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvY2hldnJvbnJpZ2h0JztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVG9vbHRpcE1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvdG9vbHRpcCc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IFRhYlZpZXdDaGFuZ2VFdmVudCwgVGFiVmlld0Nsb3NlRXZlbnQgfSBmcm9tICcuL3RhYnZpZXcuaW50ZXJmYWNlJztcbmltcG9ydCB7IFVuaXF1ZUNvbXBvbmVudElkIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBOdWxsYWJsZSB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5cbi8qKlxuICogVGFiUGFuZWwgaXMgYSBoZWxwZXIgY29tcG9uZW50IGZvciBUYWJWaWV3IGNvbXBvbmVudC5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC10YWJQYW5lbCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdlxuICAgICAgICAgICAgKm5nSWY9XCIhY2xvc2VkXCJcbiAgICAgICAgICAgIGNsYXNzPVwicC10YWJ2aWV3LXBhbmVsXCJcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJwYW5lbFwiXG4gICAgICAgICAgICBbaGlkZGVuXT1cIiFzZWxlY3RlZFwiXG4gICAgICAgICAgICBbYXR0ci5pZF09XCJ0YWJWaWV3LmdldFRhYkNvbnRlbnRJZChpZClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1oaWRkZW5dPVwiIXNlbGVjdGVkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxsZWRieV09XCJ0YWJWaWV3LmdldFRhYkhlYWRlckFjdGlvbklkKGlkKVwiXG4gICAgICAgICAgICBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ3RhYnBhbmVsJ1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJjb250ZW50VGVtcGxhdGUgJiYgKGNhY2hlID8gbG9hZGVkIDogc2VsZWN0ZWQpXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbnRlbnRUZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYlBhbmVsIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIGlmIHRhYiBjYW4gYmUgcmVtb3ZlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjbG9zYWJsZTogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgdGFiIGhlYWRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgaGVhZGVyU3R5bGUoKTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9oZWFkZXJTdHlsZTtcbiAgICB9XG4gICAgc2V0IGhlYWRlclN0eWxlKGhlYWRlclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlclN0eWxlID0gaGVhZGVyU3R5bGU7XG4gICAgICAgIHRoaXMudGFiVmlldy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIHRhYiBoZWFkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhlYWRlclN0eWxlQ2xhc3MoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hlYWRlclN0eWxlQ2xhc3M7XG4gICAgfVxuICAgIHNldCBoZWFkZXJTdHlsZUNsYXNzKGhlYWRlclN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9oZWFkZXJTdHlsZUNsYXNzID0gaGVhZGVyU3R5bGVDbGFzcztcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGEgbGF6eSBsb2FkZWQgcGFuZWwgc2hvdWxkIGF2b2lkIGdldHRpbmcgbG9hZGVkIGFnYWluIG9uIHJlc2VsZWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNhY2hlOiBib29sZWFuIHwgdW5kZWZpbmVkID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBZHZpc29yeSBpbmZvcm1hdGlvbiB0byBkaXNwbGF5IGluIGEgdG9vbHRpcCBvbiBob3Zlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0b29sdGlwOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogUG9zaXRpb24gb2YgdGhlIHRvb2x0aXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdG9vbHRpcFBvc2l0aW9uOiAndG9wJyB8ICdib3R0b20nIHwgJ2xlZnQnIHwgJ3JpZ2h0JyB8IHVuZGVmaW5lZCA9ICd0b3AnO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgQ1NTIHBvc2l0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBQb3NpdGlvblN0eWxlOiBzdHJpbmcgfCB1bmRlZmluZWQgPSAnYWJzb2x1dGUnO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0b29sdGlwLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHRvb2x0aXBTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiB0YWIgaXMgYWN0aXZlLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0ZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX3NlbGVjdGVkO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0ZWQodmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGVkID0gdmFsO1xuXG4gICAgICAgIGlmICghdGhpcy5sb2FkZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHZhbCkgdGhpcy5sb2FkZWQgPSB0cnVlO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHRhYiBjYW5ub3QgYmUgYWN0aXZhdGVkLlxuICAgICAqIEBkZWZhdWx0VmFsdWUgZmFsc2VcbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuX2Rpc2FibGVkO1xuICAgIH1cbiAgICBzZXQgZGlzYWJsZWQoZGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5fZGlzYWJsZWQgPSBkaXNhYmxlZDtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBUaXRsZSBvZiB0aGUgdGFiUGFuZWwuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGhlYWRlcigpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5faGVhZGVyO1xuICAgIH1cbiAgICBzZXQgaGVhZGVyKGhlYWRlcjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2hlYWRlciA9IGhlYWRlcjtcblxuICAgICAgICAvLyBXZSBoYXZlIHRvIHdhaXQgZm9yIHRoZSByZW5kZXJpbmcgYW5kIHRoZW4gcmV0cmlldmUgdGhlIGFjdHVhbCBzaXplIGVsZW1lbnQgZnJvbSB0aGUgRE9NLlxuICAgICAgICAvLyBpbiBmdXR1cmUgYFByb21pc2UucmVzb2x2ZWAgY2FuIGJlIGNoYW5nZWQgdG8gYHF1ZXVlTWljcm90YXNrYCAoaWYgaWUxMSBzdXBwb3J0IHdpbGwgYmUgZHJvcHBlZClcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcudXBkYXRlSW5rQmFyKCk7XG4gICAgICAgICAgICB0aGlzLnRhYlZpZXcuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZWZ0IGljb24gb2YgdGhlIHRhYlBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNS40LjIsIHVzZSBgbGVmdGljb25gIHRlbXBsYXRlIGluc3RlYWQuXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IGxlZnRJY29uKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sZWZ0SWNvbjtcbiAgICB9XG4gICAgc2V0IGxlZnRJY29uKGxlZnRJY29uOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fbGVmdEljb24gPSBsZWZ0SWNvbjtcbiAgICAgICAgdGhpcy50YWJWaWV3LmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBMZWZ0IGljb24gb2YgdGhlIHRhYlBhbmVsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHNpbmNlIHYxNS40LjIsIHVzZSBgcmlnaHRpY29uYCB0ZW1wbGF0ZSBpbnN0ZWFkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByaWdodEljb24oKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0SWNvbjtcbiAgICB9XG4gICAgc2V0IHJpZ2h0SWNvbihyaWdodEljb246IHN0cmluZyB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9yaWdodEljb24gPSByaWdodEljb247XG4gICAgICAgIHRoaXMudGFiVmlldy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+IHwgdW5kZWZpbmVkO1xuXG4gICAgY2xvc2VkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICB2aWV3OiBFbWJlZGRlZFZpZXdSZWY8YW55PiB8IG51bGwgPSBudWxsO1xuXG4gICAgX2hlYWRlclN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuXG4gICAgX2hlYWRlclN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIF9zZWxlY3RlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9kaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIF9oZWFkZXIhOiBzdHJpbmc7XG5cbiAgICBfbGVmdEljb24hOiBzdHJpbmc7XG5cbiAgICBfcmlnaHRJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG5cbiAgICBsb2FkZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIHB1YmxpYyBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY29udGVudFRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBsZWZ0SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcmlnaHRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjbG9zZUljb25UZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHRhYlZpZXc6IFRhYlZpZXc7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KGZvcndhcmRSZWYoKCkgPT4gVGFiVmlldykpIHRhYlZpZXc6IFRhYlZpZXcsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHZpZXdDb250YWluZXI6IFZpZXdDb250YWluZXJSZWYsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy50YWJWaWV3ID0gdGFiVmlldyBhcyBUYWJWaWV3O1xuICAgICAgICB0aGlzLmlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JpZ2h0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmlnaHRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2xlZnRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5sZWZ0SWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjbG9zZWljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy52aWV3ID0gbnVsbDtcbiAgICB9XG59XG4vKipcbiAqIFRhYlZpZXcgaXMgYSBjb250YWluZXIgY29tcG9uZW50IHRvIGdyb3VwIGNvbnRlbnQgd2l0aCB0YWJzLlxuICogQGdyb3VwIENvbXBvbmVudHNcbiAqL1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdwLXRhYlZpZXcnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXYgW25nQ2xhc3NdPVwieyAncC10YWJ2aWV3IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtdGFidmlldy1zY3JvbGxhYmxlJzogc2Nyb2xsYWJsZSB9XCIgW25nU3R5bGVdPVwic3R5bGVcIiBbY2xhc3NdPVwic3R5bGVDbGFzc1wiIFthdHRyLmRhdGEtcGMtbmFtZV09XCIndGFidmlldydcIj5cbiAgICAgICAgICAgIDxkaXYgI2VsZW1lbnRUb09ic2VydmUgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzY3JvbGxhYmxlICYmICFiYWNrd2FyZElzRGlzYWJsZWQgJiYgYXV0b0hpZGVCdXR0b25zXCJcbiAgICAgICAgICAgICAgICAgICAgI3ByZXZCdG5cbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LXByZXYgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkJhY2t3YXJkKClcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci50YWJpbmRleF09XCJ0YWJpbmRleFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwicHJldkJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvbkxlZnRJY29uICpuZ0lmPVwiIXByZXZpb3VzSWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInByZXZpb3VzSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICA8ZGl2ICNjb250ZW50IGNsYXNzPVwicC10YWJ2aWV3LW5hdi1jb250ZW50XCIgKHNjcm9sbCk9XCJvblNjcm9sbCgkZXZlbnQpXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIiduYXZjb250ZW50J1wiPlxuICAgICAgICAgICAgICAgICAgICA8dWwgI25hdmJhciBjbGFzcz1cInAtdGFidmlldy1uYXZcIiByb2xlPVwidGFibGlzdFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbmF2J1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIG5nRm9yIGxldC10YWIgW25nRm9yT2ZdPVwidGFic1wiIGxldC1pPVwiaW5kZXhcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgcm9sZT1cInByZXNlbnRhdGlvblwiIFtuZ0NsYXNzXT1cInsgJ3AtaGlnaGxpZ2h0JzogdGFiLnNlbGVjdGVkLCAncC1kaXNhYmxlZCc6IHRhYi5kaXNhYmxlZCB9XCIgW2F0dHIuZGF0YS1wLWRpc2FibGVkXT1cInRhYi5kaXNhYmxlZFwiIFtuZ1N0eWxlXT1cInRhYi5oZWFkZXJTdHlsZVwiIFtjbGFzc109XCJ0YWIuaGVhZGVyU3R5bGVDbGFzc1wiICpuZ0lmPVwiIXRhYi5jbG9zZWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LWxpbmtcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BUb29sdGlwXT1cInRhYi50b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0b29sdGlwUG9zaXRpb25dPVwidGFiLnRvb2x0aXBQb3NpdGlvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcG9zaXRpb25TdHlsZV09XCJ0YWIudG9vbHRpcFBvc2l0aW9uU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW3Rvb2x0aXBTdHlsZUNsYXNzXT1cInRhYi50b29sdGlwU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJnZXRUYWJIZWFkZXJBY3Rpb25JZCh0YWIuaWQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtY29udHJvbHNdPVwiZ2V0VGFiQ29udGVudElkKHRhYi5pZClcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuc2VsZWN0ZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwidGFiLmRpc2FibGVkIHx8ICF0YWIuc2VsZWN0ZWQgPyAnLTEnIDogdGFiaW5kZXhcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2F0dHIuZGF0YS1wYy1pbmRleF09XCJpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaGVhZGVyYWN0aW9uJ1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoY2xpY2spPVwib3BlbigkZXZlbnQsIHRhYilcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25UYWJLZXlEb3duKCRldmVudCwgdGFiKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhdGFiLmhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctbGVmdC1pY29uXCIgW25nQ2xhc3NdPVwidGFiLmxlZnRJY29uXCIgKm5nSWY9XCJ0YWIubGVmdEljb24gJiYgIXRhYi5sZWZ0SWNvblRlbXBsYXRlXCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtdGFidmlldy1sZWZ0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLmxlZnRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtdGFidmlldy10aXRsZVwiPnt7IHRhYi5oZWFkZXIgfX08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLXRhYnZpZXctcmlnaHQtaWNvblwiIFtuZ0NsYXNzXT1cInRhYi5yaWdodEljb25cIiAqbmdJZj1cInRhYi5yaWdodEljb24gJiYgIXRhYi5yaWdodEljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInRhYi5yaWdodEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC10YWJ2aWV3LXJpZ2h0LWljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwidGFiLnJpZ2h0SWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuaGVhZGVyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuY2xvc2FibGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8VGltZXNJY29uICpuZ0lmPVwiIXRhYi5jbG9zZUljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLXRhYnZpZXctY2xvc2UnXCIgKGNsaWNrKT1cImNsb3NlKCRldmVudCwgdGFiKVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIiAqbmdJZj1cInRhYi5jbG9zZUljb25UZW1wbGF0ZVwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0YWIuY2xvc2VJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSAjaW5rYmFyIGNsYXNzPVwicC10YWJ2aWV3LWluay1iYXJcIiByb2xlPVwicHJlc2VudGF0aW9uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidpbmtiYXInXCI+PC9saT5cbiAgICAgICAgICAgICAgICAgICAgPC91bD5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2Nyb2xsYWJsZSAmJiAhZm9yd2FyZElzRGlzYWJsZWQgJiYgYnV0dG9uVmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgICAgICNuZXh0QnRuXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cInRhYmluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJuZXh0QnV0dG9uQXJpYUxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLXRhYnZpZXctbmF2LW5leHQgcC10YWJ2aWV3LW5hdi1idG4gcC1saW5rXCJcbiAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cIm5hdkZvcndhcmQoKVwiXG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8Q2hldnJvblJpZ2h0SWNvbiAqbmdJZj1cIiFuZXh0SWNvblRlbXBsYXRlXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cIm5leHRJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC10YWJ2aWV3LXBhbmVsc1wiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgc3R5bGVVcmxzOiBbJy4vdGFidmlldy5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFiVmlldyBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIEFmdGVyVmlld0NoZWNrZWQsIE9uRGVzdHJveSwgQmxvY2thYmxlVUkge1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgY29tcG9uZW50LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGFiIGNsb3NlIGlzIGNvbnRyb2xsZWQgYXQgb25DbG9zZSBldmVudCBvciBub3QuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNvbnRyb2xDbG9zZTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQgZGlzcGxheXMgYnV0dG9ucyBhdCBlYWNoIHNpZGUgb2YgdGhlIHRhYiBoZWFkZXJzIHRvIHNjcm9sbCB0aGUgdGFiIGxpc3QuXG4gICAgICogQGRlZmF1bHRWYWx1ZSBmYWxzZVxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5kZXggb2YgdGhlIGFjdGl2ZSB0YWIgdG8gY2hhbmdlIHNlbGVjdGVkIHRhYiBwcm9ncmFtbWF0aWNhbGx5LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBhY3RpdmVJbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aXZlSW5kZXg7XG4gICAgfVxuICAgIHNldCBhY3RpdmVJbmRleCh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9hY3RpdmVJbmRleCA9IHZhbDtcbiAgICAgICAgaWYgKHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRhYnMgJiYgdGhpcy50YWJzLmxlbmd0aCAmJiB0aGlzLl9hY3RpdmVJbmRleCAhPSBudWxsICYmIHRoaXMudGFicy5sZW5ndGggPiB0aGlzLl9hY3RpdmVJbmRleCkge1xuICAgICAgICAgICAgKHRoaXMuZmluZFNlbGVjdGVkVGFiKCkgYXMgVGFiUGFuZWwpLnNlbGVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnRhYnNbdGhpcy5fYWN0aXZlSW5kZXhdLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMudXBkYXRlU2Nyb2xsQmFyKHZhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCB0aGUgZm9jdXNlZCB0YWIgaXMgYWN0aXZhdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNlbGVjdE9uRm9jdXM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBVc2VkIHRvIGRlZmluZSBhIHN0cmluZyBhcmlhIGxhYmVsIGF0dHJpYnV0ZSB0aGUgZm9yd2FyZCBuYXZpZ2F0aW9uIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBuZXh0QnV0dG9uQXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBkZWZpbmUgYSBzdHJpbmcgYXJpYSBsYWJlbCBhdHRyaWJ1dGUgdGhlIGJhY2t3YXJkIG5hdmlnYXRpb24gYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByZXZCdXR0b25BcmlhTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGFjdGl2YXRlZCwgbmF2aWdhdGlvbiBidXR0b25zIHdpbGwgYXV0b21hdGljYWxseSBoaWRlIG9yIHNob3cgYmFzZWQgb24gdGhlIGF2YWlsYWJsZSBzcGFjZSB3aXRoaW4gdGhlIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBhdXRvSGlkZUJ1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEluZGV4IG9mIHRoZSBlbGVtZW50IGluIHRhYmJpbmcgb3JkZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdGFiaW5kZXg6IG51bWJlciA9IDA7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHRhYiBjaGFuZ2UuXG4gICAgICogQHBhcmFtIHtUYWJWaWV3Q2hhbmdlRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHRhYiBjaGFuZ2UgZXZlbnRcbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxUYWJWaWV3Q2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJWaWV3Q2hhbmdlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHRhYiBjbG9zZS5cbiAgICAgKiBAcGFyYW0ge1RhYlZpZXdDbG9zZUV2ZW50fSBldmVudCAtIEN1c3RvbSB0YWIgY2xvc2UgZXZlbnRcbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25DbG9zZTogRXZlbnRFbWl0dGVyPFRhYlZpZXdDbG9zZUV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFiVmlld0Nsb3NlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHRoZSBhY3RpdmUgdGFiIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBOZXcgYWN0aXZlIGluZGV4XG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIGFjdGl2ZUluZGV4Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ/OiBFbGVtZW50UmVmPEhUTUxEaXZFbGVtZW50PjtcblxuICAgIEBWaWV3Q2hpbGQoJ25hdmJhcicpIG5hdmJhcj86IEVsZW1lbnRSZWY8SFRNTFVMaXN0RWxlbWVudD47XG5cbiAgICBAVmlld0NoaWxkKCdwcmV2QnRuJykgcHJldkJ0bj86IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCduZXh0QnRuJykgbmV4dEJ0bj86IEVsZW1lbnRSZWY7XG5cbiAgICBAVmlld0NoaWxkKCdpbmtiYXInKSBpbmtiYXI/OiBFbGVtZW50UmVmO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihUYWJQYW5lbCkgdGFiUGFuZWxzOiBRdWVyeUxpc3Q8VGFiUGFuZWw+IHwgdW5kZWZpbmVkO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIGluaXRpYWxpemVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgdGFicyE6IFRhYlBhbmVsW107XG5cbiAgICBfYWN0aXZlSW5kZXghOiBudW1iZXI7XG5cbiAgICBwcmV2ZW50QWN0aXZlSW5kZXhQcm9wYWdhdGlvbiE6IGJvb2xlYW47XG5cbiAgICB0YWJDaGFuZ2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgYmFja3dhcmRJc0Rpc2FibGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGZvcndhcmRJc0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBwcml2YXRlIHRhYkNoYW5nZXNTdWJzY3JpcHRpb24hOiBTdWJzY3JpcHRpb247XG5cbiAgICBuZXh0SWNvblRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHJldmlvdXNJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICByZXNpemVPYnNlcnZlcjogTnVsbGFibGU8UmVzaXplT2JzZXJ2ZXI+O1xuXG4gICAgY29udGFpbmVyOiBIVE1MRGl2RWxlbWVudCB8IHVuZGVmaW5lZDtcblxuICAgIGxpc3Q6IEhUTUxVTGlzdEVsZW1lbnQgfCB1bmRlZmluZWQ7XG5cbiAgICBidXR0b25WaXNpYmxlOiBib29sZWFuO1xuXG4gICAgQFZpZXdDaGlsZCgnZWxlbWVudFRvT2JzZXJ2ZScpIGVsZW1lbnRUb09ic2VydmU6IEVsZW1lbnRSZWY7XG5cbiAgICBjb25zdHJ1Y3RvcihASW5qZWN0KFBMQVRGT1JNX0lEKSBwcml2YXRlIHBsYXRmb3JtSWQ6IGFueSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcblxuICAgICAgICB0aGlzLnRhYkNoYW5nZXNTdWJzY3JpcHRpb24gPSAodGhpcy50YWJQYW5lbHMgYXMgUXVlcnlMaXN0PFRhYlBhbmVsPikuY2hhbmdlcy5zdWJzY3JpYmUoKF8pID0+IHtcbiAgICAgICAgICAgIHRoaXMuaW5pdFRhYnMoKTtcbiAgICAgICAgICAgIHRoaXMucmVmcmVzaEJ1dHRvblN0YXRlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdwcmV2aW91c2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnByZXZpb3VzSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICduZXh0aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubmV4dEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5hdXRvSGlkZUJ1dHRvbnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRSZXNpemVPYnNlcnZlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZFJlc2l6ZU9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibmF2Y29udGVudFwiXScpO1xuICAgICAgICB0aGlzLmxpc3QgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cIm5hdlwiXScpO1xuXG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBuZXcgUmVzaXplT2JzZXJ2ZXIoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMubGlzdC5vZmZzZXRXaWR0aCA+PSB0aGlzLmNvbnRhaW5lci5vZmZzZXRXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlzaWJsZSA9IHRydWU7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuYnV0dG9uVmlzaWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy51cGRhdGVCdXR0b25TdGF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5jb250YWluZXIpO1xuICAgIH1cblxuICAgIHVuYmluZFJlc2l6ZU9ic2VydmVyKCkge1xuICAgICAgICB0aGlzLnJlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLmVsZW1lbnRUb09ic2VydmUubmF0aXZlRWxlbWVudCk7XG4gICAgICAgIHRoaXMucmVzaXplT2JzZXJ2ZXIgPSBudWxsO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnRhYkNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUlua0JhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnRhYkNoYW5nZXNTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlc1N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzaXplT2JzZXJ2ZXIpIHtcbiAgICAgICAgICAgIHRoaXMudW5iaW5kUmVzaXplT2JzZXJ2ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFRhYkhlYWRlckFjdGlvbklkKHRhYklkKSB7XG4gICAgICAgIHJldHVybiBgJHt0YWJJZH1faGVhZGVyX2FjdGlvbmA7XG4gICAgfVxuXG4gICAgZ2V0VGFiQ29udGVudElkKHRhYklkKSB7XG4gICAgICAgIHJldHVybiBgJHt0YWJJZH1fY29udGVudGA7XG4gICAgfVxuXG4gICAgaW5pdFRhYnMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFicyA9ICh0aGlzLnRhYlBhbmVscyBhcyBRdWVyeUxpc3Q8VGFiUGFuZWw+KS50b0FycmF5KCk7XG4gICAgICAgIGxldCBzZWxlY3RlZFRhYjogVGFiUGFuZWwgPSB0aGlzLmZpbmRTZWxlY3RlZFRhYigpIGFzIFRhYlBhbmVsO1xuICAgICAgICBpZiAoIXNlbGVjdGVkVGFiICYmIHRoaXMudGFicy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFjdGl2ZUluZGV4ICE9IG51bGwgJiYgdGhpcy50YWJzLmxlbmd0aCA+IHRoaXMuYWN0aXZlSW5kZXgpIHRoaXMudGFic1t0aGlzLmFjdGl2ZUluZGV4XS5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICBlbHNlIHRoaXMudGFic1swXS5zZWxlY3RlZCA9IHRydWU7XG5cbiAgICAgICAgICAgIHRoaXMudGFiQ2hhbmdlZCA9IHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgIH1cblxuICAgIG9uVGFiS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgdGFiOiBUYWJQYW5lbCk6IHZvaWQge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LmNvZGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkFycm93TGVmdEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJBcnJvd1JpZ2h0S2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnSG9tZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbmQnOlxuICAgICAgICAgICAgICAgIHRoaXMub25UYWJFbmRLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdQYWdlRG93bic6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1BhZ2VVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vblRhYkhvbWVLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vcGVuKGV2ZW50LCB0YWIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25UYWJBcnJvd0xlZnRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgcHJldkhlYWRlckFjdGlvbiA9IHRoaXMuZmluZFByZXZIZWFkZXJBY3Rpb24oKDxIVE1MRWxlbWVudD5ldmVudC50YXJnZXQpLnBhcmVudEVsZW1lbnQpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKHByZXZIZWFkZXJBY3Rpb24sICdkYXRhLXBjLWluZGV4Jyk7XG5cbiAgICAgICAgcHJldkhlYWRlckFjdGlvbiA/IHRoaXMuY2hhbmdlRm9jdXNlZFRhYihldmVudCwgcHJldkhlYWRlckFjdGlvbiwgaW5kZXgpIDogdGhpcy5vblRhYkVuZEtleShldmVudCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25UYWJBcnJvd1JpZ2h0S2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGNvbnN0IG5leHRIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmROZXh0SGVhZGVyQWN0aW9uKCg8SFRNTEVsZW1lbnQ+ZXZlbnQudGFyZ2V0KS5wYXJlbnRFbGVtZW50KTtcbiAgICAgICAgY29uc3QgaW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShuZXh0SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIG5leHRIZWFkZXJBY3Rpb24gPyB0aGlzLmNoYW5nZUZvY3VzZWRUYWIoZXZlbnQsIG5leHRIZWFkZXJBY3Rpb24sIGluZGV4KSA6IHRoaXMub25UYWJIb21lS2V5KGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRhYkhvbWVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RIZWFkZXJBY3Rpb24gPSB0aGlzLmZpbmRGaXJzdEhlYWRlckFjdGlvbigpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGZpcnN0SGVhZGVyQWN0aW9uLCAnZGF0YS1wYy1pbmRleCcpO1xuXG4gICAgICAgIHRoaXMuY2hhbmdlRm9jdXNlZFRhYihldmVudCwgZmlyc3RIZWFkZXJBY3Rpb24sIGluZGV4KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvblRhYkVuZEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBjb25zdCBsYXN0SGVhZGVyQWN0aW9uID0gdGhpcy5maW5kTGFzdEhlYWRlckFjdGlvbigpO1xuICAgICAgICBjb25zdCBpbmRleCA9IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGxhc3RIZWFkZXJBY3Rpb24sICdkYXRhLXBjLWluZGV4Jyk7XG5cbiAgICAgICAgdGhpcy5jaGFuZ2VGb2N1c2VkVGFiKGV2ZW50LCBsYXN0SGVhZGVyQWN0aW9uLCBpbmRleCk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgY2hhbmdlRm9jdXNlZFRhYihldmVudDogS2V5Ym9hcmRFdmVudCwgZWxlbWVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmIChlbGVtZW50KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKGVsZW1lbnQpO1xuICAgICAgICAgICAgZWxlbWVudC5zY3JvbGxJbnRvVmlldyh7IGJsb2NrOiAnbmVhcmVzdCcgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdE9uRm9jdXMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCB0YWIgPSB0aGlzLnRhYnNbaW5kZXhdO1xuICAgICAgICAgICAgICAgIHRoaXMub3BlbihldmVudCwgdGFiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmROZXh0SGVhZGVyQWN0aW9uKHRhYkVsZW1lbnQ6IGFueSwgc2VsZkNoZWNrID0gZmFsc2UpIHtcbiAgICAgICAgY29uc3QgaGVhZGVyRWxlbWVudCA9IHNlbGZDaGVjayA/IHRhYkVsZW1lbnQgOiB0YWJFbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgcmV0dXJuIGhlYWRlckVsZW1lbnRcbiAgICAgICAgICAgID8gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcC1kaXNhYmxlZCcpIHx8IERvbUhhbmRsZXIuZ2V0QXR0cmlidXRlKGhlYWRlckVsZW1lbnQsICdkYXRhLXBjLXNlY3Rpb24nKSA9PT0gJ2lua2JhcidcbiAgICAgICAgICAgICAgICA/IHRoaXMuZmluZE5leHRIZWFkZXJBY3Rpb24oaGVhZGVyRWxlbWVudClcbiAgICAgICAgICAgICAgICA6IERvbUhhbmRsZXIuZmluZFNpbmdsZShoZWFkZXJFbGVtZW50LCAnW2RhdGEtcGMtc2VjdGlvbj1cImhlYWRlcmFjdGlvblwiXScpXG4gICAgICAgICAgICA6IG51bGw7XG4gICAgfVxuXG4gICAgZmluZFByZXZIZWFkZXJBY3Rpb24odGFiRWxlbWVudDogYW55LCBzZWxmQ2hlY2sgPSBmYWxzZSkge1xuICAgICAgICBjb25zdCBoZWFkZXJFbGVtZW50ID0gc2VsZkNoZWNrID8gdGFiRWxlbWVudCA6IHRhYkVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcblxuICAgICAgICByZXR1cm4gaGVhZGVyRWxlbWVudFxuICAgICAgICAgICAgPyBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShoZWFkZXJFbGVtZW50LCAnZGF0YS1wLWRpc2FibGVkJykgfHwgRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoaGVhZGVyRWxlbWVudCwgJ2RhdGEtcGMtc2VjdGlvbicpID09PSAnaW5rYmFyJ1xuICAgICAgICAgICAgICAgID8gdGhpcy5maW5kUHJldkhlYWRlckFjdGlvbihoZWFkZXJFbGVtZW50KVxuICAgICAgICAgICAgICAgIDogRG9tSGFuZGxlci5maW5kU2luZ2xlKGhlYWRlckVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwiaGVhZGVyYWN0aW9uXCJdJylcbiAgICAgICAgICAgIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RIZWFkZXJBY3Rpb24oKSB7XG4gICAgICAgIGNvbnN0IGZpcnN0RWwgPSB0aGlzLm5hdmJhci5uYXRpdmVFbGVtZW50LmZpcnN0RWxlbWVudENoaWxkO1xuICAgICAgICByZXR1cm4gdGhpcy5maW5kTmV4dEhlYWRlckFjdGlvbihmaXJzdEVsLCB0cnVlKTtcbiAgICB9XG5cbiAgICBmaW5kTGFzdEhlYWRlckFjdGlvbigpIHtcbiAgICAgICAgY29uc3QgbGFzdEVsID0gdGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudC5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICBjb25zdCBsYXN0SGVhZGVyQWN0aW9uID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUobGFzdEVsLCAnZGF0YS1wYy1zZWN0aW9uJykgPT09ICdpbmtiYXInID8gbGFzdEVsLnByZXZpb3VzRWxlbWVudFNpYmxpbmcgOiBsYXN0RWw7XG4gICAgICAgIHJldHVybiB0aGlzLmZpbmRQcmV2SGVhZGVyQWN0aW9uKGxhc3RIZWFkZXJBY3Rpb24sIHRydWUpO1xuICAgIH1cblxuICAgIG9wZW4oZXZlbnQ6IEV2ZW50LCB0YWI6IFRhYlBhbmVsKSB7XG4gICAgICAgIGlmICh0YWIuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgbGV0IHNlbGVjdGVkVGFiOiBUYWJQYW5lbCA9IHRoaXMuZmluZFNlbGVjdGVkVGFiKCkgYXMgVGFiUGFuZWw7XG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRUYWIpIHtcbiAgICAgICAgICAgICAgICBzZWxlY3RlZFRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnRhYkNoYW5nZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGFiLnNlbGVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIGxldCBzZWxlY3RlZFRhYkluZGV4ID0gdGhpcy5maW5kVGFiSW5kZXgodGFiKTtcbiAgICAgICAgICAgIHRoaXMucHJldmVudEFjdGl2ZUluZGV4UHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5hY3RpdmVJbmRleENoYW5nZS5lbWl0KHNlbGVjdGVkVGFiSW5kZXgpO1xuICAgICAgICAgICAgdGhpcy5vbkNoYW5nZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGluZGV4OiBzZWxlY3RlZFRhYkluZGV4IH0pO1xuXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNjcm9sbEJhcihzZWxlY3RlZFRhYkluZGV4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudCkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsb3NlKGV2ZW50OiBFdmVudCwgdGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGhpcy5jb250cm9sQ2xvc2UpIHtcbiAgICAgICAgICAgIHRoaXMub25DbG9zZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICBpbmRleDogdGhpcy5maW5kVGFiSW5kZXgodGFiKSxcbiAgICAgICAgICAgICAgICBjbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlVGFiKHRhYik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmNsb3NlVGFiKHRhYik7XG4gICAgICAgICAgICB0aGlzLm9uQ2xvc2UuZW1pdCh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgaW5kZXg6IHRoaXMuZmluZFRhYkluZGV4KHRhYilcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2xvc2VUYWIodGFiOiBUYWJQYW5lbCkge1xuICAgICAgICBpZiAodGFiLmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRhYi5zZWxlY3RlZCkge1xuICAgICAgICAgICAgdGhpcy50YWJDaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRhYi5zZWxlY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnRhYnMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBsZXQgdGFiUGFuZWwgPSB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICAgICAgaWYgKCF0YWJQYW5lbC5jbG9zZWQgJiYgIXRhYi5kaXNhYmxlZCkge1xuICAgICAgICAgICAgICAgICAgICB0YWJQYW5lbC5zZWxlY3RlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRhYi5jbG9zZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGZpbmRTZWxlY3RlZFRhYigpOiBUYWJQYW5lbCB8IG51bGwge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMudGFicy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHRoaXMudGFic1tpXS5zZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnRhYnNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZmluZFRhYkluZGV4KHRhYjogVGFiUGFuZWwpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy50YWJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAodGhpcy50YWJzW2ldID09IHRhYikge1xuICAgICAgICAgICAgICAgIGluZGV4ID0gaTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgdXBkYXRlSW5rQmFyKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMubmF2YmFyKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFiSGVhZGVyOiBIVE1MRWxlbWVudCB8IG51bGwgPSBEb21IYW5kbGVyLmZpbmRTaW5nbGUodGhpcy5uYXZiYXIubmF0aXZlRWxlbWVudCwgJ2xpLnAtaGlnaGxpZ2h0Jyk7XG5cbiAgICAgICAgICAgICAgICBpZiAoIXRhYkhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgKHRoaXMuaW5rYmFyIGFzIEVsZW1lbnRSZWYpLm5hdGl2ZUVsZW1lbnQuc3R5bGUud2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKHRhYkhlYWRlcikgKyAncHgnO1xuICAgICAgICAgICAgICAgICh0aGlzLmlua2JhciBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0YWJIZWFkZXIpLmxlZnQgLSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLm5hdmJhci5uYXRpdmVFbGVtZW50KS5sZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNjcm9sbEJhcihpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCB0YWJIZWFkZXIgPSAodGhpcy5uYXZiYXIgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudC5jaGlsZHJlbltpbmRleF07XG5cbiAgICAgICAgaWYgKHRhYkhlYWRlcikge1xuICAgICAgICAgICAgdGFiSGVhZGVyLnNjcm9sbEludG9WaWV3KHsgYmxvY2s6ICduZWFyZXN0JyB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUJ1dHRvblN0YXRlKCkge1xuICAgICAgICBjb25zdCBjb250ZW50ID0gKHRoaXMuY29udGVudCBhcyBFbGVtZW50UmVmKS5uYXRpdmVFbGVtZW50O1xuICAgICAgICBjb25zdCB7IHNjcm9sbExlZnQsIHNjcm9sbFdpZHRoIH0gPSBjb250ZW50O1xuICAgICAgICBjb25zdCB3aWR0aCA9IERvbUhhbmRsZXIuZ2V0V2lkdGgoY29udGVudCk7XG5cbiAgICAgICAgdGhpcy5iYWNrd2FyZElzRGlzYWJsZWQgPSBzY3JvbGxMZWZ0ID09PSAwO1xuICAgICAgICB0aGlzLmZvcndhcmRJc0Rpc2FibGVkID0gTWF0aC5yb3VuZChzY3JvbGxMZWZ0KSA9PT0gc2Nyb2xsV2lkdGggLSB3aWR0aDtcbiAgICB9XG5cbiAgICByZWZyZXNoQnV0dG9uU3RhdGUoKSB7XG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ1tkYXRhLXBjLXNlY3Rpb249XCJuYXZjb250ZW50XCJdJyk7XG4gICAgICAgIHRoaXMubGlzdCA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdbZGF0YS1wYy1zZWN0aW9uPVwibmF2XCJdJyk7XG4gICAgICAgIGlmICh0aGlzLmxpc3Qub2Zmc2V0V2lkdGggPj0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxpc3Qub2Zmc2V0V2lkdGggPj0gdGhpcy5jb250YWluZXIub2Zmc2V0V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1dHRvblZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblNjcm9sbChldmVudDogRXZlbnQpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxhYmxlICYmIHRoaXMudXBkYXRlQnV0dG9uU3RhdGUoKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIGdldFZpc2libGVCdXR0b25XaWR0aHMoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5wcmV2QnRuPy5uYXRpdmVFbGVtZW50LCB0aGlzLm5leHRCdG4/Lm5hdGl2ZUVsZW1lbnRdLnJlZHVjZSgoYWNjLCBlbCkgPT4gKGVsID8gYWNjICsgRG9tSGFuZGxlci5nZXRXaWR0aChlbCkgOiBhY2MpLCAwKTtcbiAgICB9XG5cbiAgICBuYXZCYWNrd2FyZCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9ICh0aGlzLmNvbnRlbnQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKGNvbnRlbnQpIC0gdGhpcy5nZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvbnRlbnQuc2Nyb2xsTGVmdCAtIHdpZHRoO1xuICAgICAgICBjb250ZW50LnNjcm9sbExlZnQgPSBwb3MgPD0gMCA/IDAgOiBwb3M7XG4gICAgfVxuXG4gICAgbmF2Rm9yd2FyZCgpIHtcbiAgICAgICAgY29uc3QgY29udGVudCA9ICh0aGlzLmNvbnRlbnQgYXMgRWxlbWVudFJlZikubmF0aXZlRWxlbWVudDtcbiAgICAgICAgY29uc3Qgd2lkdGggPSBEb21IYW5kbGVyLmdldFdpZHRoKGNvbnRlbnQpIC0gdGhpcy5nZXRWaXNpYmxlQnV0dG9uV2lkdGhzKCk7XG4gICAgICAgIGNvbnN0IHBvcyA9IGNvbnRlbnQuc2Nyb2xsTGVmdCArIHdpZHRoO1xuICAgICAgICBjb25zdCBsYXN0UG9zID0gY29udGVudC5zY3JvbGxXaWR0aCAtIHdpZHRoO1xuXG4gICAgICAgIGNvbnRlbnQuc2Nyb2xsTGVmdCA9IHBvcyA+PSBsYXN0UG9zID8gbGFzdFBvcyA6IHBvcztcbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgU2hhcmVkTW9kdWxlLCBUb29sdGlwTW9kdWxlLCBSaXBwbGVNb2R1bGUsIFRpbWVzSWNvbiwgQ2hldnJvbkxlZnRJY29uLCBDaGV2cm9uUmlnaHRJY29uXSxcbiAgICBleHBvcnRzOiBbVGFiVmlldywgVGFiUGFuZWwsIFNoYXJlZE1vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbVGFiVmlldywgVGFiUGFuZWxdXG59KVxuZXhwb3J0IGNsYXNzIFRhYlZpZXdNb2R1bGUge31cbiJdfQ==