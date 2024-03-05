import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, HostListener, Inject, Injectable, Input, NgModule, Optional, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterMatchMode, FilterOperator, PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConnectedOverlayScrollHandler, DomHandler } from 'primeng/dom';
import { DropdownModule } from 'primeng/dropdown';
import { ArrowDownIcon } from 'primeng/icons/arrowdown';
import { ArrowUpIcon } from 'primeng/icons/arrowup';
import { CheckIcon } from 'primeng/icons/check';
import { FilterIcon } from 'primeng/icons/filter';
import { FilterSlashIcon } from 'primeng/icons/filterslash';
import { PlusIcon } from 'primeng/icons/plus';
import { SortAltIcon } from 'primeng/icons/sortalt';
import { SortAmountDownIcon } from 'primeng/icons/sortamountdown';
import { SortAmountUpAltIcon } from 'primeng/icons/sortamountupalt';
import { SpinnerIcon } from 'primeng/icons/spinner';
import { TrashIcon } from 'primeng/icons/trash';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { ScrollerModule } from 'primeng/scroller';
import { SelectButtonModule } from 'primeng/selectbutton';
import { TriStateCheckboxModule } from 'primeng/tristatecheckbox';
import { ObjectUtils, UniqueComponentId, ZIndexUtils } from 'primeng/utils';
import { Subject } from 'rxjs';
import * as i0 from "@angular/core";
import * as i1 from "primeng/api";
import * as i2 from "@angular/common";
import * as i3 from "primeng/paginator";
import * as i4 from "primeng/scroller";
import * as i5 from "primeng/dropdown";
import * as i6 from "@angular/forms";
import * as i7 from "primeng/button";
import * as i8 from "primeng/inputnumber";
import * as i9 from "primeng/inputtext";
import * as i10 from "primeng/calendar";
import * as i11 from "primeng/tristatecheckbox";
export class TableService {
    sortSource = new Subject();
    selectionSource = new Subject();
    contextMenuSource = new Subject();
    valueSource = new Subject();
    totalRecordsSource = new Subject();
    columnsSource = new Subject();
    sortSource$ = this.sortSource.asObservable();
    selectionSource$ = this.selectionSource.asObservable();
    contextMenuSource$ = this.contextMenuSource.asObservable();
    valueSource$ = this.valueSource.asObservable();
    totalRecordsSource$ = this.totalRecordsSource.asObservable();
    columnsSource$ = this.columnsSource.asObservable();
    onSort(sortMeta) {
        this.sortSource.next(sortMeta);
    }
    onSelectionChange() {
        this.selectionSource.next(null);
    }
    onContextMenu(data) {
        this.contextMenuSource.next(data);
    }
    onValueChange(value) {
        this.valueSource.next(value);
    }
    onTotalRecordsChange(value) {
        this.totalRecordsSource.next(value);
    }
    onColumnsChange(columns) {
        this.columnsSource.next(columns);
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
    static ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableService });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableService, decorators: [{
            type: Injectable
        }] });
/**
 * Table displays data in tabular format.
 * @group Components
 */
export class Table {
    document;
    platformId;
    renderer;
    el;
    zone;
    tableService;
    cd;
    filterService;
    overlayService;
    config;
    /**
     * An array of objects to represent dynamic columns that are frozen.
     * @group Props
     */
    frozenColumns;
    /**
     * An array of objects to display as frozen.
     * @group Props
     */
    frozenValue;
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
     * Inline style of the table.
     * @group Props
     */
    tableStyle;
    /**
     * Style class of the table.
     * @group Props
     */
    tableStyleClass;
    /**
     * When specified as true, enables the pagination.
     * @group Props
     */
    paginator;
    /**
     * Number of page links to display in paginator.
     * @group Props
     */
    pageLinks = 5;
    /**
     * Array of integer/object values to display inside rows per page dropdown of paginator
     * @group Props
     */
    rowsPerPageOptions;
    /**
     * Whether to show it even there is only one page.
     * @group Props
     */
    alwaysShowPaginator = true;
    /**
     * Position of the paginator, options are "top", "bottom" or "both".
     * @group Props
     */
    paginatorPosition = 'bottom';
    /**
     * Custom style class for paginator
     * @group Props
     */
    paginatorStyleClass;
    /**
     * Target element to attach the paginator dropdown overlay, valid values are "body" or a local ng-template variable of another element (note: use binding with brackets for template variables, e.g. [appendTo]="mydiv" for a div element having #mydiv as variable name).
     * @group Props
     */
    paginatorDropdownAppendTo;
    /**
     * Paginator dropdown height of the viewport in pixels, a scrollbar is defined if height of list exceeds this value.
     * @group Props
     */
    paginatorDropdownScrollHeight = '200px';
    /**
     * Template of the current page report element. Available placeholders are {currentPage},{totalPages},{rows},{first},{last} and {totalRecords}
     * @group Props
     */
    currentPageReportTemplate = '{currentPage} of {totalPages}';
    /**
     * Whether to display current page report.
     * @group Props
     */
    showCurrentPageReport;
    /**
     * Whether to display a dropdown to navigate to any page.
     * @group Props
     */
    showJumpToPageDropdown;
    /**
     * Whether to display a input to navigate to any page.
     * @group Props
     */
    showJumpToPageInput;
    /**
     * When enabled, icons are displayed on paginator to go first and last page.
     * @group Props
     */
    showFirstLastIcon = true;
    /**
     * Whether to show page links.
     * @group Props
     */
    showPageLinks = true;
    /**
     * Sort order to use when an unsorted column gets sorted by user interaction.
     * @group Props
     */
    defaultSortOrder = 1;
    /**
     * Defines whether sorting works on single column or on multiple columns.
     * @group Props
     */
    sortMode = 'single';
    /**
     * When true, resets paginator to first page after sorting. Available only when sortMode is set to single.
     * @group Props
     */
    resetPageOnSort = true;
    /**
     * Specifies the selection mode, valid values are "single" and "multiple".
     * @group Props
     */
    selectionMode;
    /**
     * When enabled with paginator and checkbox selection mode, the select all checkbox in the header will select all rows on the current page.
     * @group Props
     */
    selectionPageOnly;
    /**
     * Selected row with a context menu.
     * @group Props
     */
    contextMenuSelection;
    /**
     * Callback to invoke on context menu selection change.
     * @param {*} object - row data.
     * @group Emits
     */
    contextMenuSelectionChange = new EventEmitter();
    /**
     *  Defines the behavior of context menu selection, in "separate" mode context menu updates contextMenuSelection property whereas in joint mode selection property is used instead so that when row selection is enabled, both row selection and context menu selection use the same property.
     * @group Props
     */
    contextMenuSelectionMode = 'separate';
    /**
     * A property to uniquely identify a record in data.
     * @group Props
     */
    dataKey;
    /**
     * Defines whether metaKey should be considered for the selection. On touch enabled devices, metaKeySelection is turned off automatically.
     * @group Props
     */
    metaKeySelection = false;
    /**
     * Defines if the row is selectable.
     * @group Props
     */
    rowSelectable;
    /**
     * Function to optimize the dom operations by delegating to ngForTrackBy, default algorithm checks for object identity.
     * @group Props
     */
    rowTrackBy = (index, item) => item;
    /**
     * Defines if data is loaded and interacted with in lazy manner.
     * @group Props
     */
    lazy = false;
    /**
     * Whether to call lazy loading on initialization.
     * @group Props
     */
    lazyLoadOnInit = true;
    /**
     * Algorithm to define if a row is selected, valid values are "equals" that compares by reference and "deepEquals" that compares all fields.
     * @group Props
     */
    compareSelectionBy = 'deepEquals';
    /**
     * Character to use as the csv separator.
     * @group Props
     */
    csvSeparator = ',';
    /**
     * Name of the exported file.
     * @group Props
     */
    exportFilename = 'download';
    /**
     * An array of FilterMetadata objects to provide external filters.
     * @group Props
     */
    filters = {};
    /**
     * An array of fields as string to use in global filtering.
     * @group Props
     */
    globalFilterFields;
    /**
     * Delay in milliseconds before filtering the data.
     * @group Props
     */
    filterDelay = 300;
    /**
     * Locale to use in filtering. The default locale is the host environment's current locale.
     * @group Props
     */
    filterLocale;
    /**
     * Map instance to keep the expanded rows where key of the map is the data key of the row.
     * @group Props
     */
    expandedRowKeys = {};
    /**
     * Map instance to keep the rows being edited where key of the map is the data key of the row.
     * @group Props
     */
    editingRowKeys = {};
    /**
     * Whether multiple rows can be expanded at any time. Valid values are "multiple" and "single".
     * @group Props
     */
    rowExpandMode = 'multiple';
    /**
     * Enables scrollable tables.
     * @group Props
     */
    scrollable;
    /**
     * Orientation of the scrolling, options are "vertical", "horizontal" and "both".
     * @group Props
     * @deprecated Property is obselete since v14.2.0.
     */
    scrollDirection = 'vertical';
    /**
     * Type of the row grouping, valid values are "subheader" and "rowspan".
     * @group Props
     */
    rowGroupMode;
    /**
     * Height of the scroll viewport in fixed pixels or the "flex" keyword for a dynamic size.
     * @group Props
     */
    scrollHeight;
    /**
     * Whether the data should be loaded on demand during scroll.
     * @group Props
     */
    virtualScroll;
    /**
     * Height of a row to use in calculations of virtual scrolling.
     * @group Props
     */
    virtualScrollItemSize;
    /**
     * Whether to use the scroller feature. The properties of scroller component can be used like an object in it.
     * @group Props
     */
    virtualScrollOptions;
    /**
     * Threshold in milliseconds to delay lazy loading during scrolling.
     * @group Props
     */
    virtualScrollDelay = 250;
    /**
     * Width of the frozen columns container.
     * @group Props
     */
    frozenWidth;
    /**
     * Defines if the table is responsive.
     * @group Props
     * @deprecated table is always responsive with scrollable behavior.
     */
    get responsive() {
        return this._responsive;
    }
    set responsive(val) {
        this._responsive = val;
        console.warn('responsive property is deprecated as table is always responsive with scrollable behavior.');
    }
    _responsive;
    /**
     * Local ng-template varilable of a ContextMenu.
     * @group Props
     */
    contextMenu;
    /**
     * When enabled, columns can be resized using drag and drop.
     * @group Props
     */
    resizableColumns;
    /**
     * Defines whether the overall table width should change on column resize, valid values are "fit" and "expand".
     * @group Props
     */
    columnResizeMode = 'fit';
    /**
     * When enabled, columns can be reordered using drag and drop.
     * @group Props
     */
    reorderableColumns;
    /**
     * Displays a loader to indicate data load is in progress.
     * @group Props
     */
    loading;
    /**
     * The icon to show while indicating data load is in progress.
     * @group Props
     */
    loadingIcon;
    /**
     * Whether to show the loading mask when loading property is true.
     * @group Props
     */
    showLoader = true;
    /**
     * Adds hover effect to rows without the need for selectionMode. Note that tr elements that can be hovered need to have "p-selectable-row" class for rowHover to work.
     * @group Props
     */
    rowHover;
    /**
     * Whether to use the default sorting or a custom one using sortFunction.
     * @group Props
     */
    customSort;
    /**
     * Whether to use the initial sort badge or not.
     * @group Props
     */
    showInitialSortBadge = true;
    /**
     * Whether the cell widths scale according to their content or not.  Deprecated:  Table layout is always "auto".
     * @group Props
     */
    autoLayout;
    /**
     * Export function.
     * @group Props
     */
    exportFunction;
    /**
     * Custom export header of the column to be exported as CSV.
     * @group Props
     */
    exportHeader;
    /**
     * Unique identifier of a stateful table to use in state storage.
     * @group Props
     */
    stateKey;
    /**
     * Defines where a stateful table keeps its state, valid values are "session" for sessionStorage and "local" for localStorage.
     * @group Props
     */
    stateStorage = 'session';
    /**
     * Defines the editing mode, valid values are "cell" and "row".
     * @group Props
     */
    editMode = 'cell';
    /**
     * Field name to use in row grouping.
     * @group Props
     */
    groupRowsBy;
    /**
     * Order to sort when default row grouping is enabled.
     * @group Props
     */
    groupRowsByOrder = 1;
    /**
     * Defines the responsive mode, valid options are "stack" and "scroll".
     * @group Props
     */
    responsiveLayout = 'scroll';
    /**
     * The breakpoint to define the maximum width boundary when using stack responsive layout.
     * @group Props
     */
    breakpoint = '640px';
    /**
     * Locale to be used in paginator formatting.
     * @group Props
     */
    paginatorLocale;
    /**
     * An array of objects to display.
     * @group Props
     */
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
    }
    /**
     * An array of objects to represent dynamic columns.
     * @group Props
     */
    get columns() {
        return this._columns;
    }
    set columns(cols) {
        this._columns = cols;
    }
    /**
     * Index of the first row to be displayed.
     * @group Props
     */
    get first() {
        return this._first;
    }
    set first(val) {
        this._first = val;
    }
    /**
     * Number of rows to display per page.
     * @group Props
     */
    get rows() {
        return this._rows;
    }
    set rows(val) {
        this._rows = val;
    }
    /**
     * Number of total records, defaults to length of value when not defined.
     * @group Props
     */
    get totalRecords() {
        return this._totalRecords;
    }
    set totalRecords(val) {
        this._totalRecords = val;
        this.tableService.onTotalRecordsChange(this._totalRecords);
    }
    /**
     * Name of the field to sort data by default.
     * @group Props
     */
    get sortField() {
        return this._sortField;
    }
    set sortField(val) {
        this._sortField = val;
    }
    /**
     * Order to sort when default sorting is enabled.
     * @group Props
     */
    get sortOrder() {
        return this._sortOrder;
    }
    set sortOrder(val) {
        this._sortOrder = val;
    }
    /**
     * An array of SortMeta objects to sort the data by default in multiple sort mode.
     * @group Props
     */
    get multiSortMeta() {
        return this._multiSortMeta;
    }
    set multiSortMeta(val) {
        this._multiSortMeta = val;
    }
    /**
     * Selected row in single mode or an array of values in multiple mode.
     * @group Props
     */
    get selection() {
        return this._selection;
    }
    set selection(val) {
        this._selection = val;
    }
    /**
     * Whether all data is selected.
     * @group Props
     */
    get selectAll() {
        return this._selection;
    }
    set selectAll(val) {
        this._selection = val;
    }
    /**
     * Emits when the all of the items selected or unselected.
     * @param {TableSelectAllChangeEvent} event - custom  all selection change event.
     * @group Emits
     */
    selectAllChange = new EventEmitter();
    /**
     * Callback to invoke on selection changed.
     * @param {any | null} value - selected data.
     * @group Emits
     */
    selectionChange = new EventEmitter();
    /**
     * Callback to invoke when a row is selected.
     * @param {TableRowSelectEvent} event - custom select event.
     * @group Emits
     */
    onRowSelect = new EventEmitter();
    /**
     * Callback to invoke when a row is unselected.
     * @param {TableRowUnSelectEvent} event - custom unselect event.
     * @group Emits
     */
    onRowUnselect = new EventEmitter();
    /**
     * Callback to invoke when pagination occurs.
     * @param {TablePageEvent} event - custom pagination event.
     * @group Emits
     */
    onPage = new EventEmitter();
    /**
     * Callback to invoke when a column gets sorted.
     * @param {Object} object - sort meta.
     * @group Emits
     */
    onSort = new EventEmitter();
    /**
     * Callback to invoke when data is filtered.
     * @param {TableFilterEvent} event - custom filtering event.
     * @group Emits
     */
    onFilter = new EventEmitter();
    /**
     * Callback to invoke when paging, sorting or filtering happens in lazy mode.
     * @param {TableLazyLoadEvent} event - custom lazy loading event.
     * @group Emits
     */
    onLazyLoad = new EventEmitter();
    /**
     * Callback to invoke when a row is expanded.
     * @param {TableRowExpandEvent} event - custom row expand event.
     * @group Emits
     */
    onRowExpand = new EventEmitter();
    /**
     * Callback to invoke when a row is collapsed.
     * @param {TableRowCollapseEvent} event - custom row collapse event.
     * @group Emits
     */
    onRowCollapse = new EventEmitter();
    /**
     * Callback to invoke when a row is selected with right click.
     * @param {TableContextMenuSelectEvent} event - custom context menu select event.
     * @group Emits
     */
    onContextMenuSelect = new EventEmitter();
    /**
     * Callback to invoke when a column is resized.
     * @param {TableColResizeEvent} event - custom column resize event.
     * @group Emits
     */
    onColResize = new EventEmitter();
    /**
     * Callback to invoke when a column is reordered.
     * @param {TableColumnReorderEvent} event - custom column reorder event.
     * @group Emits
     */
    onColReorder = new EventEmitter();
    /**
     * Callback to invoke when a row is reordered.
     * @param {TableRowReorderEvent} event - custom row reorder event.
     * @group Emits
     */
    onRowReorder = new EventEmitter();
    /**
     * Callback to invoke when a cell switches to edit mode.
     * @param {TableEditInitEvent} event - custom edit init event.
     * @group Emits
     */
    onEditInit = new EventEmitter();
    /**
     * Callback to invoke when cell edit is completed.
     * @param {TableEditCompleteEvent} event - custom edit complete event.
     * @group Emits
     */
    onEditComplete = new EventEmitter();
    /**
     * Callback to invoke when cell edit is cancelled with escape key.
     * @param {TableEditCancelEvent} event - custom edit cancel event.
     * @group Emits
     */
    onEditCancel = new EventEmitter();
    /**
     * Callback to invoke when state of header checkbox changes.
     * @param {TableHeaderCheckboxToggleEvent} event - custom header checkbox event.
     * @group Emits
     */
    onHeaderCheckboxToggle = new EventEmitter();
    /**
     * A function to implement custom sorting, refer to sorting section for details.
     * @param {any} any - sort meta.
     * @group Emits
     */
    sortFunction = new EventEmitter();
    /**
     * Callback to invoke on pagination.
     * @param {number} number - first element.
     * @group Emits
     */
    firstChange = new EventEmitter();
    /**
     * Callback to invoke on rows change.
     * @param {number} number - Row count.
     * @group Emits
     */
    rowsChange = new EventEmitter();
    /**
     * Callback to invoke table state is saved.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateSave = new EventEmitter();
    /**
     * Callback to invoke table state is restored.
     * @param {TableState} object - table state.
     * @group Emits
     */
    onStateRestore = new EventEmitter();
    containerViewChild;
    resizeHelperViewChild;
    reorderIndicatorUpViewChild;
    reorderIndicatorDownViewChild;
    wrapperViewChild;
    tableViewChild;
    tableHeaderViewChild;
    tableFooterViewChild;
    scroller;
    templates;
    /**
     * Indicates the height of rows to be scrolled.
     * @group Props
     * @deprecated use virtualScrollItemSize property instead.
     */
    get virtualRowHeight() {
        return this._virtualRowHeight;
    }
    set virtualRowHeight(val) {
        this._virtualRowHeight = val;
        console.warn('The virtualRowHeight property is deprecated.');
    }
    _virtualRowHeight = 28;
    _value = [];
    _columns;
    _totalRecords = 0;
    _first = 0;
    _rows;
    filteredValue;
    headerTemplate;
    headerGroupedTemplate;
    bodyTemplate;
    loadingBodyTemplate;
    captionTemplate;
    footerTemplate;
    footerGroupedTemplate;
    summaryTemplate;
    colGroupTemplate;
    expandedRowTemplate;
    groupHeaderTemplate;
    groupFooterTemplate;
    frozenExpandedRowTemplate;
    frozenHeaderTemplate;
    frozenBodyTemplate;
    frozenFooterTemplate;
    frozenColGroupTemplate;
    emptyMessageTemplate;
    paginatorLeftTemplate;
    paginatorRightTemplate;
    paginatorDropdownItemTemplate;
    loadingIconTemplate;
    reorderIndicatorUpIconTemplate;
    reorderIndicatorDownIconTemplate;
    sortIconTemplate;
    checkboxIconTemplate;
    headerCheckboxIconTemplate;
    paginatorDropdownIconTemplate;
    paginatorFirstPageLinkIconTemplate;
    paginatorLastPageLinkIconTemplate;
    paginatorPreviousPageLinkIconTemplate;
    paginatorNextPageLinkIconTemplate;
    selectionKeys = {};
    lastResizerHelperX;
    reorderIconWidth;
    reorderIconHeight;
    draggedColumn;
    draggedRowIndex;
    droppedRowIndex;
    rowDragging;
    dropPosition;
    editingCell;
    editingCellData;
    editingCellField;
    editingCellRowIndex;
    selfClick;
    documentEditListener;
    _multiSortMeta;
    _sortField;
    _sortOrder = 1;
    preventSelectionSetterPropagation;
    _selection;
    _selectAll = null;
    anchorRowIndex;
    rangeRowIndex;
    filterTimeout;
    initialized;
    rowTouched;
    restoringSort;
    restoringFilter;
    stateRestored;
    columnOrderStateRestored;
    columnWidthsState;
    tableWidthState;
    overlaySubscription;
    resizeColumnElement;
    columnResizing = false;
    rowGroupHeaderStyleObject = {};
    id = UniqueComponentId();
    styleElement;
    responsiveStyleElement;
    window;
    constructor(document, platformId, renderer, el, zone, tableService, cd, filterService, overlayService, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.zone = zone;
        this.tableService = tableService;
        this.cd = cd;
        this.filterService = filterService;
        this.overlayService = overlayService;
        this.config = config;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        if (this.lazy && this.lazyLoadOnInit) {
            if (!this.virtualScroll) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            if (this.restoringFilter) {
                this.restoringFilter = false;
            }
        }
        if (this.responsiveLayout === 'stack') {
            this.createResponsiveStyle();
        }
        this.initialized = true;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'caption':
                    this.captionTemplate = item.template;
                    break;
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'headergrouped':
                    this.headerGroupedTemplate = item.template;
                    break;
                case 'body':
                    this.bodyTemplate = item.template;
                    break;
                case 'loadingbody':
                    this.loadingBodyTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'footergrouped':
                    this.footerGroupedTemplate = item.template;
                    break;
                case 'summary':
                    this.summaryTemplate = item.template;
                    break;
                case 'colgroup':
                    this.colGroupTemplate = item.template;
                    break;
                case 'rowexpansion':
                    this.expandedRowTemplate = item.template;
                    break;
                case 'groupheader':
                    this.groupHeaderTemplate = item.template;
                    break;
                case 'groupfooter':
                    this.groupFooterTemplate = item.template;
                    break;
                case 'frozenheader':
                    this.frozenHeaderTemplate = item.template;
                    break;
                case 'frozenbody':
                    this.frozenBodyTemplate = item.template;
                    break;
                case 'frozenfooter':
                    this.frozenFooterTemplate = item.template;
                    break;
                case 'frozencolgroup':
                    this.frozenColGroupTemplate = item.template;
                    break;
                case 'frozenrowexpansion':
                    this.frozenExpandedRowTemplate = item.template;
                    break;
                case 'emptymessage':
                    this.emptyMessageTemplate = item.template;
                    break;
                case 'paginatorleft':
                    this.paginatorLeftTemplate = item.template;
                    break;
                case 'paginatorright':
                    this.paginatorRightTemplate = item.template;
                    break;
                case 'paginatordropdownicon':
                    this.paginatorDropdownIconTemplate = item.template;
                    break;
                case 'paginatordropdownitem':
                    this.paginatorDropdownItemTemplate = item.template;
                    break;
                case 'paginatorfirstpagelinkicon':
                    this.paginatorFirstPageLinkIconTemplate = item.template;
                    break;
                case 'paginatorlastpagelinkicon':
                    this.paginatorLastPageLinkIconTemplate = item.template;
                    break;
                case 'paginatorpreviouspagelinkicon':
                    this.paginatorPreviousPageLinkIconTemplate = item.template;
                    break;
                case 'paginatornextpagelinkicon':
                    this.paginatorNextPageLinkIconTemplate = item.template;
                    break;
                case 'loadingicon':
                    this.loadingIconTemplate = item.template;
                    break;
                case 'reorderindicatorupicon':
                    this.reorderIndicatorUpIconTemplate = item.template;
                    break;
                case 'reorderindicatordownicon':
                    this.reorderIndicatorDownIconTemplate = item.template;
                    break;
                case 'sorticon':
                    this.sortIconTemplate = item.template;
                    break;
                case 'checkboxicon':
                    this.checkboxIconTemplate = item.template;
                    break;
                case 'headercheckboxicon':
                    this.headerCheckboxIconTemplate = item.template;
                    break;
            }
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isStateful() && this.resizableColumns) {
                this.restoreColumnWidths();
            }
        }
    }
    ngOnChanges(simpleChange) {
        if (simpleChange.value) {
            if (this.isStateful() && !this.stateRestored && isPlatformBrowser(this.platformId)) {
                this.restoreState();
            }
            this._value = simpleChange.value.currentValue;
            if (!this.lazy) {
                this.totalRecords = this._value ? this._value.length : 0;
                if (this.sortMode == 'single' && (this.sortField || this.groupRowsBy))
                    this.sortSingle();
                else if (this.sortMode == 'multiple' && (this.multiSortMeta || this.groupRowsBy))
                    this.sortMultiple();
                else if (this.hasFilter())
                    //sort already filters
                    this._filter();
            }
            this.tableService.onValueChange(simpleChange.value.currentValue);
        }
        if (simpleChange.columns) {
            this._columns = simpleChange.columns.currentValue;
            this.tableService.onColumnsChange(simpleChange.columns.currentValue);
            if (this._columns && this.isStateful() && this.reorderableColumns && !this.columnOrderStateRestored) {
                this.restoreColumnOrder();
            }
        }
        if (simpleChange.sortField) {
            this._sortField = simpleChange.sortField.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.groupRowsBy) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.sortOrder) {
            this._sortOrder = simpleChange.sortOrder.currentValue;
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.groupRowsByOrder) {
            //avoid triggering lazy load prior to lazy initialization at onInit
            if (!this.lazy || this.initialized) {
                if (this.sortMode === 'single') {
                    this.sortSingle();
                }
            }
        }
        if (simpleChange.multiSortMeta) {
            this._multiSortMeta = simpleChange.multiSortMeta.currentValue;
            if (this.sortMode === 'multiple' && (this.initialized || (!this.lazy && !this.virtualScroll))) {
                this.sortMultiple();
            }
        }
        if (simpleChange.selection) {
            this._selection = simpleChange.selection.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
            }
            this.preventSelectionSetterPropagation = false;
        }
        if (simpleChange.selectAll) {
            this._selectAll = simpleChange.selectAll.currentValue;
            if (!this.preventSelectionSetterPropagation) {
                this.updateSelectionKeys();
                this.tableService.onSelectionChange();
                if (this.isStateful()) {
                    this.saveState();
                }
            }
            this.preventSelectionSetterPropagation = false;
        }
    }
    get processedData() {
        return this.filteredValue || this.value || [];
    }
    _initialColWidths;
    dataToRender(data) {
        const _data = data || this.processedData;
        if (_data && this.paginator) {
            const first = this.lazy ? 0 : this.first;
            return _data.slice(first, first + this.rows);
        }
        return _data;
    }
    updateSelectionKeys() {
        if (this.dataKey && this._selection) {
            this.selectionKeys = {};
            if (Array.isArray(this._selection)) {
                for (let data of this._selection) {
                    this.selectionKeys[String(ObjectUtils.resolveFieldData(data, this.dataKey))] = 1;
                }
            }
            else {
                this.selectionKeys[String(ObjectUtils.resolveFieldData(this._selection, this.dataKey))] = 1;
            }
        }
    }
    onPageChange(event) {
        this.first = event.first;
        this.rows = event.rows;
        this.onPage.emit({
            first: this.first,
            rows: this.rows
        });
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        this.firstChange.emit(this.first);
        this.rowsChange.emit(this.rows);
        this.tableService.onValueChange(this.value);
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    sort(event) {
        let originalEvent = event.originalEvent;
        if (this.sortMode === 'single') {
            this._sortOrder = this.sortField === event.field ? this.sortOrder * -1 : this.defaultSortOrder;
            this._sortField = event.field;
            if (this.resetPageOnSort) {
                this._first = 0;
                this.firstChange.emit(this._first);
                if (this.scrollable) {
                    this.resetScrollTop();
                }
            }
            this.sortSingle();
        }
        if (this.sortMode === 'multiple') {
            let metaKey = originalEvent.metaKey || originalEvent.ctrlKey;
            let sortMeta = this.getSortMeta(event.field);
            if (sortMeta) {
                if (!metaKey) {
                    this._multiSortMeta = [{ field: event.field, order: sortMeta.order * -1 }];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                        if (this.scrollable) {
                            this.resetScrollTop();
                        }
                    }
                }
                else {
                    sortMeta.order = sortMeta.order * -1;
                }
            }
            else {
                if (!metaKey || !this.multiSortMeta) {
                    this._multiSortMeta = [];
                    if (this.resetPageOnSort) {
                        this._first = 0;
                        this.firstChange.emit(this._first);
                    }
                }
                this._multiSortMeta.push({ field: event.field, order: this.defaultSortOrder });
            }
            this.sortMultiple();
        }
        if (this.isStateful()) {
            this.saveState();
        }
        this.anchorRowIndex = null;
    }
    sortSingle() {
        let field = this.sortField || this.groupRowsBy;
        let order = this.sortField ? this.sortOrder : this.groupRowsByOrder;
        if (this.groupRowsBy && this.sortField && this.groupRowsBy !== this.sortField) {
            this._multiSortMeta = [this.getGroupRowsMeta(), { field: this.sortField, order: this.sortOrder }];
            this.sortMultiple();
            return;
        }
        if (field && order) {
            if (this.restoringSort) {
                this.restoringSort = false;
            }
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        field: field,
                        order: order
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        let value1 = ObjectUtils.resolveFieldData(data1, field);
                        let value2 = ObjectUtils.resolveFieldData(data2, field);
                        let result = null;
                        if (value1 == null && value2 != null)
                            result = -1;
                        else if (value1 != null && value2 == null)
                            result = 1;
                        else if (value1 == null && value2 == null)
                            result = 0;
                        else if (typeof value1 === 'string' && typeof value2 === 'string')
                            result = value1.localeCompare(value2);
                        else
                            result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;
                        return order * result;
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            let sortMeta = {
                field: field,
                order: order
            };
            this.onSort.emit(sortMeta);
            this.tableService.onSort(sortMeta);
        }
    }
    sortMultiple() {
        if (this.groupRowsBy) {
            if (!this._multiSortMeta)
                this._multiSortMeta = [this.getGroupRowsMeta()];
            else if (this.multiSortMeta[0].field !== this.groupRowsBy)
                this._multiSortMeta = [this.getGroupRowsMeta(), ...this._multiSortMeta];
        }
        if (this.multiSortMeta) {
            if (this.lazy) {
                this.onLazyLoad.emit(this.createLazyLoadMetadata());
            }
            else if (this.value) {
                if (this.customSort) {
                    this.sortFunction.emit({
                        data: this.value,
                        mode: this.sortMode,
                        multiSortMeta: this.multiSortMeta
                    });
                }
                else {
                    this.value.sort((data1, data2) => {
                        return this.multisortField(data1, data2, this.multiSortMeta, 0);
                    });
                    this._value = [...this.value];
                }
                if (this.hasFilter()) {
                    this._filter();
                }
            }
            this.onSort.emit({
                multisortmeta: this.multiSortMeta
            });
            this.tableService.onSort(this.multiSortMeta);
        }
    }
    multisortField(data1, data2, multiSortMeta, index) {
        const value1 = ObjectUtils.resolveFieldData(data1, multiSortMeta[index].field);
        const value2 = ObjectUtils.resolveFieldData(data2, multiSortMeta[index].field);
        if (ObjectUtils.compare(value1, value2, this.filterLocale) === 0) {
            return multiSortMeta.length - 1 > index ? this.multisortField(data1, data2, multiSortMeta, index + 1) : 0;
        }
        return this.compareValuesOnSort(value1, value2, multiSortMeta[index].order);
    }
    compareValuesOnSort(value1, value2, order) {
        return ObjectUtils.sort(value1, value2, order, this.filterLocale, this.sortOrder);
    }
    getSortMeta(field) {
        if (this.multiSortMeta && this.multiSortMeta.length) {
            for (let i = 0; i < this.multiSortMeta.length; i++) {
                if (this.multiSortMeta[i].field === field) {
                    return this.multiSortMeta[i];
                }
            }
        }
        return null;
    }
    isSorted(field) {
        if (this.sortMode === 'single') {
            return this.sortField && this.sortField === field;
        }
        else if (this.sortMode === 'multiple') {
            let sorted = false;
            if (this.multiSortMeta) {
                for (let i = 0; i < this.multiSortMeta.length; i++) {
                    if (this.multiSortMeta[i].field == field) {
                        sorted = true;
                        break;
                    }
                }
            }
            return sorted;
        }
    }
    handleRowClick(event) {
        let target = event.originalEvent.target;
        let targetNode = target.nodeName;
        let parentNode = target.parentElement && target.parentElement.nodeName;
        if (targetNode == 'INPUT' || targetNode == 'BUTTON' || targetNode == 'A' || parentNode == 'INPUT' || parentNode == 'BUTTON' || parentNode == 'A' || DomHandler.hasClass(event.originalEvent.target, 'p-clickable')) {
            return;
        }
        if (this.selectionMode) {
            let rowData = event.rowData;
            let rowIndex = event.rowIndex;
            this.preventSelectionSetterPropagation = true;
            if (this.isMultipleSelectionMode() && event.originalEvent.shiftKey && this.anchorRowIndex != null) {
                DomHandler.clearSelection();
                if (this.rangeRowIndex != null) {
                    this.clearSelectionRange(event.originalEvent);
                }
                this.rangeRowIndex = rowIndex;
                this.selectRange(event.originalEvent, rowIndex);
            }
            else {
                let selected = this.isSelected(rowData);
                if (!selected && !this.isRowSelectable(rowData, rowIndex)) {
                    return;
                }
                let metaSelection = this.rowTouched ? false : this.metaKeySelection;
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                this.anchorRowIndex = rowIndex;
                this.rangeRowIndex = rowIndex;
                if (metaSelection) {
                    let metaKey = event.originalEvent.metaKey || event.originalEvent.ctrlKey;
                    if (selected && metaKey) {
                        if (this.isSingleSelectionMode()) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(null);
                        }
                        else {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row' });
                    }
                    else {
                        if (this.isSingleSelectionMode()) {
                            this._selection = rowData;
                            this.selectionChange.emit(rowData);
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        else if (this.isMultipleSelectionMode()) {
                            if (metaKey) {
                                this._selection = this.selection || [];
                            }
                            else {
                                this._selection = [];
                                this.selectionKeys = {};
                            }
                            this._selection = [...this.selection, rowData];
                            this.selectionChange.emit(this.selection);
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                        this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                    }
                }
                else {
                    if (this.selectionMode === 'single') {
                        if (selected) {
                            this._selection = null;
                            this.selectionKeys = {};
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                        }
                        else {
                            this._selection = rowData;
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys = {};
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                    else if (this.selectionMode === 'multiple') {
                        if (selected) {
                            let selectionIndex = this.findIndexInSelection(rowData);
                            this._selection = this.selection.filter((val, i) => i != selectionIndex);
                            this.selectionChange.emit(this.selection);
                            this.onRowUnselect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                delete this.selectionKeys[dataKeyValue];
                            }
                        }
                        else {
                            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                            this.selectionChange.emit(this.selection);
                            this.onRowSelect.emit({ originalEvent: event.originalEvent, data: rowData, type: 'row', index: rowIndex });
                            if (dataKeyValue) {
                                this.selectionKeys[dataKeyValue] = 1;
                            }
                        }
                    }
                }
            }
            this.tableService.onSelectionChange();
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.rowTouched = false;
    }
    handleRowTouchEnd(event) {
        this.rowTouched = true;
    }
    handleRowRightClick(event) {
        if (this.contextMenu) {
            const rowData = event.rowData;
            const rowIndex = event.rowIndex;
            if (this.contextMenuSelectionMode === 'separate') {
                this.contextMenuSelection = rowData;
                this.contextMenuSelectionChange.emit(rowData);
                this.onContextMenuSelect.emit({ originalEvent: event.originalEvent, data: rowData, index: event.rowIndex });
                this.contextMenu.show(event.originalEvent);
                this.tableService.onContextMenu(rowData);
            }
            else if (this.contextMenuSelectionMode === 'joint') {
                this.preventSelectionSetterPropagation = true;
                let selected = this.isSelected(rowData);
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
                if (!selected) {
                    if (!this.isRowSelectable(rowData, rowIndex)) {
                        return;
                    }
                    if (this.isSingleSelectionMode()) {
                        this.selection = rowData;
                        this.selectionChange.emit(rowData);
                        if (dataKeyValue) {
                            this.selectionKeys = {};
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                    else if (this.isMultipleSelectionMode()) {
                        this._selection = this.selection ? [...this.selection, rowData] : [rowData];
                        this.selectionChange.emit(this.selection);
                        if (dataKeyValue) {
                            this.selectionKeys[dataKeyValue] = 1;
                        }
                    }
                }
                this.tableService.onSelectionChange();
                this.contextMenu.show(event.originalEvent);
                this.onContextMenuSelect.emit({ originalEvent: event, data: rowData, index: event.rowIndex });
            }
        }
    }
    selectRange(event, rowIndex) {
        let rangeStart, rangeEnd;
        if (this.anchorRowIndex > rowIndex) {
            rangeStart = rowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else if (this.anchorRowIndex < rowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = rowIndex;
        }
        else {
            rangeStart = rowIndex;
            rangeEnd = rowIndex;
        }
        if (this.lazy && this.paginator) {
            rangeStart -= this.first;
            rangeEnd -= this.first;
        }
        let rangeRowsData = [];
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.filteredValue ? this.filteredValue[i] : this.value[i];
            if (!this.isSelected(rangeRowData)) {
                if (!this.isRowSelectable(rangeRowData, rowIndex)) {
                    continue;
                }
                rangeRowsData.push(rangeRowData);
                this._selection = [...this.selection, rangeRowData];
                let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
                if (dataKeyValue) {
                    this.selectionKeys[dataKeyValue] = 1;
                }
            }
        }
        this.selectionChange.emit(this.selection);
        this.onRowSelect.emit({ originalEvent: event, data: rangeRowsData, type: 'row' });
    }
    clearSelectionRange(event) {
        let rangeStart, rangeEnd;
        let rangeRowIndex = this.rangeRowIndex;
        let anchorRowIndex = this.anchorRowIndex;
        if (rangeRowIndex > anchorRowIndex) {
            rangeStart = this.anchorRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        else if (rangeRowIndex < anchorRowIndex) {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.anchorRowIndex;
        }
        else {
            rangeStart = this.rangeRowIndex;
            rangeEnd = this.rangeRowIndex;
        }
        for (let i = rangeStart; i <= rangeEnd; i++) {
            let rangeRowData = this.value[i];
            let selectionIndex = this.findIndexInSelection(rangeRowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rangeRowData, this.dataKey)) : null;
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
            this.onRowUnselect.emit({ originalEvent: event, data: rangeRowData, type: 'row' });
        }
    }
    isSelected(rowData) {
        if (rowData && this.selection) {
            if (this.dataKey) {
                return this.selectionKeys[ObjectUtils.resolveFieldData(rowData, this.dataKey)] !== undefined;
            }
            else {
                if (Array.isArray(this.selection))
                    return this.findIndexInSelection(rowData) > -1;
                else
                    return this.equals(rowData, this.selection);
            }
        }
        return false;
    }
    findIndexInSelection(rowData) {
        let index = -1;
        if (this.selection && this.selection.length) {
            for (let i = 0; i < this.selection.length; i++) {
                if (this.equals(rowData, this.selection[i])) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    isRowSelectable(data, index) {
        if (this.rowSelectable && !this.rowSelectable({ data, index })) {
            return false;
        }
        return true;
    }
    toggleRowWithRadio(event, rowData) {
        this.preventSelectionSetterPropagation = true;
        if (this.selection != rowData) {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }
            this._selection = rowData;
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
            if (this.dataKey) {
                this.selectionKeys = {};
                this.selectionKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] = 1;
            }
        }
        else {
            this._selection = null;
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'radiobutton' });
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowWithCheckbox(event, rowData) {
        this.selection = this.selection || [];
        let selected = this.isSelected(rowData);
        let dataKeyValue = this.dataKey ? String(ObjectUtils.resolveFieldData(rowData, this.dataKey)) : null;
        this.preventSelectionSetterPropagation = true;
        if (selected) {
            let selectionIndex = this.findIndexInSelection(rowData);
            this._selection = this.selection.filter((val, i) => i != selectionIndex);
            this.selectionChange.emit(this.selection);
            this.onRowUnselect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                delete this.selectionKeys[dataKeyValue];
            }
        }
        else {
            if (!this.isRowSelectable(rowData, event.rowIndex)) {
                return;
            }
            this._selection = this.selection ? [...this.selection, rowData] : [rowData];
            this.selectionChange.emit(this.selection);
            this.onRowSelect.emit({ originalEvent: event.originalEvent, index: event.rowIndex, data: rowData, type: 'checkbox' });
            if (dataKeyValue) {
                this.selectionKeys[dataKeyValue] = 1;
            }
        }
        this.tableService.onSelectionChange();
        if (this.isStateful()) {
            this.saveState();
        }
    }
    toggleRowsWithCheckbox(event, check) {
        if (this._selectAll !== null) {
            this.selectAllChange.emit({ originalEvent: event, checked: check });
        }
        else {
            const data = this.selectionPageOnly ? this.dataToRender(this.processedData) : this.processedData;
            let selection = this.selectionPageOnly && this._selection ? this._selection.filter((s) => !data.some((d) => this.equals(s, d))) : [];
            if (check) {
                selection = this.frozenValue ? [...selection, ...this.frozenValue, ...data] : [...selection, ...data];
                selection = this.rowSelectable ? selection.filter((data, index) => this.rowSelectable({ data, index })) : selection;
            }
            this._selection = selection;
            this.preventSelectionSetterPropagation = true;
            this.updateSelectionKeys();
            this.selectionChange.emit(this._selection);
            this.tableService.onSelectionChange();
            this.onHeaderCheckboxToggle.emit({ originalEvent: event, checked: check });
            if (this.isStateful()) {
                this.saveState();
            }
        }
    }
    equals(data1, data2) {
        return this.compareSelectionBy === 'equals' ? data1 === data2 : ObjectUtils.equals(data1, data2, this.dataKey);
    }
    /* Legacy Filtering for custom elements */
    filter(value, field, matchMode) {
        if (this.filterTimeout) {
            clearTimeout(this.filterTimeout);
        }
        if (!this.isFilterBlank(value)) {
            this.filters[field] = field == 'global' ? { value: value, matchMode: matchMode } : [{ value: value, matchMode: matchMode }];
        }
        else if (this.filters[field]) {
            delete this.filters[field];
        }
        this.filterTimeout = setTimeout(() => {
            this._filter();
            this.filterTimeout = null;
        }, this.filterDelay);
        this.anchorRowIndex = null;
    }
    filterGlobal(value, matchMode) {
        this.filter(value, 'global', matchMode);
    }
    isFilterBlank(filter) {
        if (filter !== null && filter !== undefined) {
            if ((typeof filter === 'string' && filter.trim().length == 0) || (Array.isArray(filter) && filter.length == 0))
                return true;
            else
                return false;
        }
        return true;
    }
    _filter() {
        if (!this.restoringFilter) {
            this.first = 0;
            this.firstChange.emit(this.first);
        }
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            if (!this.value) {
                return;
            }
            if (!this.hasFilter()) {
                this.filteredValue = null;
                if (this.paginator) {
                    this.totalRecords = this.value ? this.value.length : 0;
                }
            }
            else {
                let globalFilterFieldsArray;
                if (this.filters['global']) {
                    if (!this.columns && !this.globalFilterFields)
                        throw new Error('Global filtering requires dynamic columns or globalFilterFields to be defined.');
                    else
                        globalFilterFieldsArray = this.globalFilterFields || this.columns;
                }
                this.filteredValue = [];
                for (let i = 0; i < this.value.length; i++) {
                    let localMatch = true;
                    let globalMatch = false;
                    let localFiltered = false;
                    for (let prop in this.filters) {
                        if (this.filters.hasOwnProperty(prop) && prop !== 'global') {
                            localFiltered = true;
                            let filterField = prop;
                            let filterMeta = this.filters[filterField];
                            if (Array.isArray(filterMeta)) {
                                for (let meta of filterMeta) {
                                    localMatch = this.executeLocalFilter(filterField, this.value[i], meta);
                                    if ((meta.operator === FilterOperator.OR && localMatch) || (meta.operator === FilterOperator.AND && !localMatch)) {
                                        break;
                                    }
                                }
                            }
                            else {
                                localMatch = this.executeLocalFilter(filterField, this.value[i], filterMeta);
                            }
                            if (!localMatch) {
                                break;
                            }
                        }
                    }
                    if (this.filters['global'] && !globalMatch && globalFilterFieldsArray) {
                        for (let j = 0; j < globalFilterFieldsArray.length; j++) {
                            let globalFilterField = globalFilterFieldsArray[j].field || globalFilterFieldsArray[j];
                            globalMatch = this.filterService.filters[this.filters['global'].matchMode](ObjectUtils.resolveFieldData(this.value[i], globalFilterField), this.filters['global'].value, this.filterLocale);
                            if (globalMatch) {
                                break;
                            }
                        }
                    }
                    let matches;
                    if (this.filters['global']) {
                        matches = localFiltered ? localFiltered && localMatch && globalMatch : globalMatch;
                    }
                    else {
                        matches = localFiltered && localMatch;
                    }
                    if (matches) {
                        this.filteredValue.push(this.value[i]);
                    }
                }
                if (this.filteredValue.length === this.value.length) {
                    this.filteredValue = null;
                }
                if (this.paginator) {
                    this.totalRecords = this.filteredValue ? this.filteredValue.length : this.value ? this.value.length : 0;
                }
            }
        }
        this.onFilter.emit({
            filters: this.filters,
            filteredValue: this.filteredValue || this.value
        });
        this.tableService.onValueChange(this.value);
        if (this.isStateful() && !this.restoringFilter) {
            this.saveState();
        }
        if (this.restoringFilter) {
            this.restoringFilter = false;
        }
        this.cd.markForCheck();
        if (this.scrollable) {
            this.resetScrollTop();
        }
    }
    executeLocalFilter(field, rowData, filterMeta) {
        let filterValue = filterMeta.value;
        let filterMatchMode = filterMeta.matchMode || FilterMatchMode.STARTS_WITH;
        let dataFieldValue = ObjectUtils.resolveFieldData(rowData, field);
        let filterConstraint = this.filterService.filters[filterMatchMode];
        return filterConstraint(dataFieldValue, filterValue, this.filterLocale);
    }
    hasFilter() {
        let empty = true;
        for (let prop in this.filters) {
            if (this.filters.hasOwnProperty(prop)) {
                empty = false;
                break;
            }
        }
        return !empty;
    }
    createLazyLoadMetadata() {
        return {
            first: this.first,
            rows: this.rows,
            sortField: this.sortField,
            sortOrder: this.sortOrder,
            filters: this.filters,
            globalFilter: this.filters && this.filters['global'] ? this.filters['global'].value : null,
            multiSortMeta: this.multiSortMeta,
            forceUpdate: () => this.cd.detectChanges()
        };
    }
    clear() {
        this._sortField = null;
        this._sortOrder = this.defaultSortOrder;
        this._multiSortMeta = null;
        this.tableService.onSort(null);
        this.clearFilterValues();
        this.filteredValue = null;
        this.first = 0;
        this.firstChange.emit(this.first);
        if (this.lazy) {
            this.onLazyLoad.emit(this.createLazyLoadMetadata());
        }
        else {
            this.totalRecords = this._value ? this._value.length : 0;
        }
    }
    clearFilterValues() {
        for (const [, filterMetadata] of Object.entries(this.filters)) {
            if (Array.isArray(filterMetadata)) {
                for (let filter of filterMetadata) {
                    filter.value = null;
                }
            }
            else if (filterMetadata) {
                filterMetadata.value = null;
            }
        }
    }
    reset() {
        this.clear();
    }
    getExportHeader(column) {
        return column[this.exportHeader] || column.header || column.field;
    }
    /**
     * Data export method.
     * @param {ExportCSVOptions} object - Export options.
     * @group Method
     */
    exportCSV(options) {
        let data;
        let csv = '';
        let columns = this.columns;
        if (options && options.selectionOnly) {
            data = this.selection || [];
        }
        else if (options && options.allValues) {
            data = this.value || [];
        }
        else {
            data = this.filteredValue || this.value;
            if (this.frozenValue) {
                data = data ? [...this.frozenValue, ...data] : this.frozenValue;
            }
        }
        const exportableColumns = columns.filter((column) => column.exportable !== false && column.field);
        //headers
        csv += exportableColumns.map((column) => '"' + this.getExportHeader(column) + '"').join(this.csvSeparator);
        //body
        const body = data
            .map((record) => exportableColumns
            .map((column) => {
            let cellData = ObjectUtils.resolveFieldData(record, column.field);
            if (cellData != null) {
                if (this.exportFunction) {
                    cellData = this.exportFunction({
                        data: cellData,
                        field: column.field
                    });
                }
                else
                    cellData = String(cellData).replace(/"/g, '""');
            }
            else
                cellData = '';
            return '"' + cellData + '"';
        })
            .join(this.csvSeparator))
            .join('\n');
        if (body.length) {
            csv += '\n' + body;
        }
        let blob = new Blob([new Uint8Array([0xef, 0xbb, 0xbf]), csv], {
            type: 'text/csv;charset=utf-8;'
        });
        let link = this.renderer.createElement('a');
        link.style.display = 'none';
        this.renderer.appendChild(this.document.body, link);
        if (link.download !== undefined) {
            link.setAttribute('href', URL.createObjectURL(blob));
            link.setAttribute('download', this.exportFilename + '.csv');
            link.click();
        }
        else {
            csv = 'data:text/csv;charset=utf-8,' + csv;
            this.window.open(encodeURI(csv));
        }
        this.renderer.removeChild(this.document.body, link);
    }
    onLazyItemLoad(event) {
        this.onLazyLoad.emit({
            ...this.createLazyLoadMetadata(),
            ...event,
            rows: event.last - event.first
        });
    }
    /**
     * Resets scroll to top.
     * @group Method
     */
    resetScrollTop() {
        if (this.virtualScroll)
            this.scrollToVirtualIndex(0);
        else
            this.scrollTo({ top: 0 });
    }
    /**
     * Scrolls to given index when using virtual scroll.
     * @param {number} index - index of the element.
     * @group Method
     */
    scrollToVirtualIndex(index) {
        this.scroller && this.scroller.scrollToIndex(index);
    }
    /**
     * Scrolls to given index.
     * @param {ScrollToOptions} options - scroll options.
     * @group Method
     */
    scrollTo(options) {
        if (this.virtualScroll) {
            this.scroller?.scrollTo(options);
        }
        else if (this.wrapperViewChild && this.wrapperViewChild.nativeElement) {
            if (this.wrapperViewChild.nativeElement.scrollTo) {
                this.wrapperViewChild.nativeElement.scrollTo(options);
            }
            else {
                this.wrapperViewChild.nativeElement.scrollLeft = options.left;
                this.wrapperViewChild.nativeElement.scrollTop = options.top;
            }
        }
    }
    updateEditingCell(cell, data, field, index) {
        this.editingCell = cell;
        this.editingCellData = data;
        this.editingCellField = field;
        this.editingCellRowIndex = index;
        this.bindDocumentEditListener();
    }
    isEditingCellValid() {
        return this.editingCell && DomHandler.find(this.editingCell, '.ng-invalid.ng-dirty').length === 0;
    }
    bindDocumentEditListener() {
        if (!this.documentEditListener) {
            this.documentEditListener = this.renderer.listen(this.document, 'click', (event) => {
                if (this.editingCell && !this.selfClick && this.isEditingCellValid()) {
                    DomHandler.removeClass(this.editingCell, 'p-cell-editing');
                    this.editingCell = null;
                    this.onEditComplete.emit({ field: this.editingCellField, data: this.editingCellData, originalEvent: event, index: this.editingCellRowIndex });
                    this.editingCellField = null;
                    this.editingCellData = null;
                    this.editingCellRowIndex = null;
                    this.unbindDocumentEditListener();
                    this.cd.markForCheck();
                    if (this.overlaySubscription) {
                        this.overlaySubscription.unsubscribe();
                    }
                }
                this.selfClick = false;
            });
        }
    }
    unbindDocumentEditListener() {
        if (this.documentEditListener) {
            this.documentEditListener();
            this.documentEditListener = null;
        }
    }
    initRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        this.editingRowKeys[dataKeyValue] = true;
    }
    saveRowEdit(rowData, rowElement) {
        if (DomHandler.find(rowElement, '.ng-invalid.ng-dirty').length === 0) {
            let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
            delete this.editingRowKeys[dataKeyValue];
        }
    }
    cancelRowEdit(rowData) {
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        delete this.editingRowKeys[dataKeyValue];
    }
    toggleRow(rowData, event) {
        if (!this.dataKey) {
            throw new Error('dataKey must be defined to use row expansion');
        }
        let dataKeyValue = String(ObjectUtils.resolveFieldData(rowData, this.dataKey));
        if (this.expandedRowKeys[dataKeyValue] != null) {
            delete this.expandedRowKeys[dataKeyValue];
            this.onRowCollapse.emit({
                originalEvent: event,
                data: rowData
            });
        }
        else {
            if (this.rowExpandMode === 'single') {
                this.expandedRowKeys = {};
            }
            this.expandedRowKeys[dataKeyValue] = true;
            this.onRowExpand.emit({
                originalEvent: event,
                data: rowData
            });
        }
        if (event) {
            event.preventDefault();
        }
        if (this.isStateful()) {
            this.saveState();
        }
    }
    isRowExpanded(rowData) {
        return this.expandedRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isRowEditing(rowData) {
        return this.editingRowKeys[String(ObjectUtils.resolveFieldData(rowData, this.dataKey))] === true;
    }
    isSingleSelectionMode() {
        return this.selectionMode === 'single';
    }
    isMultipleSelectionMode() {
        return this.selectionMode === 'multiple';
    }
    onColumnResizeBegin(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        this.resizeColumnElement = event.target.parentElement;
        this.columnResizing = true;
        this.lastResizerHelperX = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft;
        this.onColumnResize(event);
        event.preventDefault();
    }
    onColumnResize(event) {
        let containerLeft = DomHandler.getOffset(this.containerViewChild?.nativeElement).left;
        DomHandler.addClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
        this.resizeHelperViewChild.nativeElement.style.height = this.containerViewChild?.nativeElement.offsetHeight + 'px';
        this.resizeHelperViewChild.nativeElement.style.top = 0 + 'px';
        this.resizeHelperViewChild.nativeElement.style.left = event.pageX - containerLeft + this.containerViewChild?.nativeElement.scrollLeft + 'px';
        this.resizeHelperViewChild.nativeElement.style.display = 'block';
    }
    onColumnResizeEnd() {
        let delta = this.resizeHelperViewChild?.nativeElement.offsetLeft - this.lastResizerHelperX;
        let columnWidth = this.resizeColumnElement.offsetWidth;
        let newColumnWidth = columnWidth + delta;
        let minWidth = this.resizeColumnElement.style.minWidth.replace(/[^\d.]/g, '') || 15;
        if (newColumnWidth >= minWidth) {
            if (this.columnResizeMode === 'fit') {
                let nextColumn = this.resizeColumnElement.nextElementSibling;
                let nextColumnWidth = nextColumn.offsetWidth - delta;
                if (newColumnWidth > 15 && nextColumnWidth > 15) {
                    this.resizeTableCells(newColumnWidth, nextColumnWidth);
                }
            }
            else if (this.columnResizeMode === 'expand') {
                this._initialColWidths = this._totalTableWidth();
                let tableWidth = this.tableViewChild?.nativeElement.offsetWidth + delta;
                this.setResizeTableWidth(tableWidth + 'px');
                this.resizeTableCells(newColumnWidth, null);
            }
            this.onColResize.emit({
                element: this.resizeColumnElement,
                delta: delta
            });
            if (this.isStateful()) {
                this.saveState();
            }
        }
        this.resizeHelperViewChild.nativeElement.style.display = 'none';
        DomHandler.removeClass(this.containerViewChild?.nativeElement, 'p-unselectable-text');
    }
    _totalTableWidth() {
        let widths = [];
        const tableHead = DomHandler.findSingle(this.containerViewChild.nativeElement, '.p-datatable-thead');
        let headers = DomHandler.find(tableHead, 'tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
        return widths;
    }
    onColumnDragStart(event, columnElement) {
        this.reorderIconWidth = DomHandler.getHiddenElementOuterWidth(this.reorderIndicatorUpViewChild?.nativeElement);
        this.reorderIconHeight = DomHandler.getHiddenElementOuterHeight(this.reorderIndicatorDownViewChild?.nativeElement);
        this.draggedColumn = columnElement;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onColumnDragEnter(event, dropHeader) {
        if (this.reorderableColumns && this.draggedColumn && dropHeader) {
            event.preventDefault();
            let containerOffset = DomHandler.getOffset(this.containerViewChild?.nativeElement);
            let dropHeaderOffset = DomHandler.getOffset(dropHeader);
            if (this.draggedColumn != dropHeader) {
                let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
                let dropIndex = DomHandler.indexWithinGroup(dropHeader, 'preorderablecolumn');
                let targetLeft = dropHeaderOffset.left - containerOffset.left;
                let targetTop = containerOffset.top - dropHeaderOffset.top;
                let columnCenter = dropHeaderOffset.left + dropHeader.offsetWidth / 2;
                this.reorderIndicatorUpViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top - (this.reorderIconHeight - 1) + 'px';
                this.reorderIndicatorDownViewChild.nativeElement.style.top = dropHeaderOffset.top - containerOffset.top + dropHeader.offsetHeight + 'px';
                if (event.pageX > columnCenter) {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft + dropHeader.offsetWidth - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = 1;
                }
                else {
                    this.reorderIndicatorUpViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.reorderIndicatorDownViewChild.nativeElement.style.left = targetLeft - Math.ceil(this.reorderIconWidth / 2) + 'px';
                    this.dropPosition = -1;
                }
                this.reorderIndicatorUpViewChild.nativeElement.style.display = 'block';
                this.reorderIndicatorDownViewChild.nativeElement.style.display = 'block';
            }
            else {
                event.dataTransfer.dropEffect = 'none';
            }
        }
    }
    onColumnDragLeave(event) {
        if (this.reorderableColumns && this.draggedColumn) {
            event.preventDefault();
        }
    }
    onColumnDrop(event, dropColumn) {
        event.preventDefault();
        if (this.draggedColumn) {
            let dragIndex = DomHandler.indexWithinGroup(this.draggedColumn, 'preorderablecolumn');
            let dropIndex = DomHandler.indexWithinGroup(dropColumn, 'preorderablecolumn');
            let allowDrop = dragIndex != dropIndex;
            if (allowDrop && ((dropIndex - dragIndex == 1 && this.dropPosition === -1) || (dragIndex - dropIndex == 1 && this.dropPosition === 1))) {
                allowDrop = false;
            }
            if (allowDrop && dropIndex < dragIndex && this.dropPosition === 1) {
                dropIndex = dropIndex + 1;
            }
            if (allowDrop && dropIndex > dragIndex && this.dropPosition === -1) {
                dropIndex = dropIndex - 1;
            }
            if (allowDrop) {
                ObjectUtils.reorderArray(this.columns, dragIndex, dropIndex);
                this.onColReorder.emit({
                    dragIndex: dragIndex,
                    dropIndex: dropIndex,
                    columns: this.columns
                });
                if (this.isStateful()) {
                    this.zone.runOutsideAngular(() => {
                        setTimeout(() => {
                            this.saveState();
                        });
                    });
                }
            }
            if (this.resizableColumns && this.resizeColumnElement) {
                let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
                ObjectUtils.reorderArray(width, dragIndex + 1, dropIndex + 1);
                this.updateStyleElement(width, dragIndex, null, null);
            }
            this.reorderIndicatorUpViewChild.nativeElement.style.display = 'none';
            this.reorderIndicatorDownViewChild.nativeElement.style.display = 'none';
            this.draggedColumn.draggable = false;
            this.draggedColumn = null;
            this.dropPosition = null;
        }
    }
    resizeTableCells(newColumnWidth, nextColumnWidth) {
        let colIndex = DomHandler.index(this.resizeColumnElement);
        let width = this.columnResizeMode === 'expand' ? this._initialColWidths : this._totalTableWidth();
        this.updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth);
    }
    updateStyleElement(width, colIndex, newColumnWidth, nextColumnWidth) {
        this.destroyStyleElement();
        this.createStyleElement();
        let innerHTML = '';
        width.forEach((width, index) => {
            let colWidth = index === colIndex ? newColumnWidth : nextColumnWidth && index === colIndex + 1 ? nextColumnWidth : width;
            let style = `width: ${colWidth}px !important; max-width: ${colWidth}px !important;`;
            innerHTML += `
                #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                    ${style}
                }
            `;
        });
        this.renderer.setProperty(this.styleElement, 'innerHTML', innerHTML);
    }
    onRowDragStart(event, index) {
        this.rowDragging = true;
        this.draggedRowIndex = index;
        event.dataTransfer.setData('text', 'b'); // For firefox
    }
    onRowDragOver(event, index, rowElement) {
        if (this.rowDragging && this.draggedRowIndex !== index) {
            let rowY = DomHandler.getOffset(rowElement).top;
            let pageY = event.pageY;
            let rowMidY = rowY + DomHandler.getOuterHeight(rowElement) / 2;
            let prevRowElement = rowElement.previousElementSibling;
            if (pageY < rowMidY) {
                DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
                this.droppedRowIndex = index;
                if (prevRowElement)
                    DomHandler.addClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
            }
            else {
                if (prevRowElement)
                    DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
                else
                    DomHandler.addClass(rowElement, 'p-datatable-dragpoint-top');
                this.droppedRowIndex = index + 1;
                DomHandler.addClass(rowElement, 'p-datatable-dragpoint-bottom');
            }
        }
    }
    onRowDragLeave(event, rowElement) {
        let prevRowElement = rowElement.previousElementSibling;
        if (prevRowElement) {
            DomHandler.removeClass(prevRowElement, 'p-datatable-dragpoint-bottom');
        }
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-bottom');
        DomHandler.removeClass(rowElement, 'p-datatable-dragpoint-top');
    }
    onRowDragEnd(event) {
        this.rowDragging = false;
        this.draggedRowIndex = null;
        this.droppedRowIndex = null;
    }
    onRowDrop(event, rowElement) {
        if (this.droppedRowIndex != null) {
            let dropIndex = this.draggedRowIndex > this.droppedRowIndex ? this.droppedRowIndex : this.droppedRowIndex === 0 ? 0 : this.droppedRowIndex - 1;
            ObjectUtils.reorderArray(this.value, this.draggedRowIndex, dropIndex);
            if (this.virtualScroll) {
                // TODO: Check
                this._value = [...this._value];
            }
            this.onRowReorder.emit({
                dragIndex: this.draggedRowIndex,
                dropIndex: dropIndex
            });
        }
        //cleanup
        this.onRowDragLeave(event, rowElement);
        this.onRowDragEnd(event);
    }
    isEmpty() {
        let data = this.filteredValue || this.value;
        return data == null || data.length == 0;
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    getStorage() {
        if (isPlatformBrowser(this.platformId)) {
            switch (this.stateStorage) {
                case 'local':
                    return window.localStorage;
                case 'session':
                    return window.sessionStorage;
                default:
                    throw new Error(this.stateStorage + ' is not a valid value for the state storage, supported values are "local" and "session".');
            }
        }
        else {
            throw new Error('Browser storage is not available in the server side.');
        }
    }
    isStateful() {
        return this.stateKey != null;
    }
    saveState() {
        const storage = this.getStorage();
        let state = {};
        if (this.paginator) {
            state.first = this.first;
            state.rows = this.rows;
        }
        if (this.sortField) {
            state.sortField = this.sortField;
            state.sortOrder = this.sortOrder;
        }
        if (this.multiSortMeta) {
            state.multiSortMeta = this.multiSortMeta;
        }
        if (this.hasFilter()) {
            state.filters = this.filters;
        }
        if (this.resizableColumns) {
            this.saveColumnWidths(state);
        }
        if (this.reorderableColumns) {
            this.saveColumnOrder(state);
        }
        if (this.selection) {
            state.selection = this.selection;
        }
        if (Object.keys(this.expandedRowKeys).length) {
            state.expandedRowKeys = this.expandedRowKeys;
        }
        storage.setItem(this.stateKey, JSON.stringify(state));
        this.onStateSave.emit(state);
    }
    clearState() {
        const storage = this.getStorage();
        if (this.stateKey) {
            storage.removeItem(this.stateKey);
        }
    }
    restoreState() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        const dateFormat = /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/;
        const reviver = function (key, value) {
            if (typeof value === 'string' && dateFormat.test(value)) {
                return new Date(value);
            }
            return value;
        };
        if (stateString) {
            let state = JSON.parse(stateString, reviver);
            if (this.paginator) {
                if (this.first !== undefined) {
                    this.first = state.first;
                    this.firstChange.emit(this.first);
                }
                if (this.rows !== undefined) {
                    this.rows = state.rows;
                    this.rowsChange.emit(this.rows);
                }
            }
            if (state.sortField) {
                this.restoringSort = true;
                this._sortField = state.sortField;
                this._sortOrder = state.sortOrder;
            }
            if (state.multiSortMeta) {
                this.restoringSort = true;
                this._multiSortMeta = state.multiSortMeta;
            }
            if (state.filters) {
                this.restoringFilter = true;
                this.filters = state.filters;
            }
            if (this.resizableColumns) {
                this.columnWidthsState = state.columnWidths;
                this.tableWidthState = state.tableWidth;
            }
            if (state.expandedRowKeys) {
                this.expandedRowKeys = state.expandedRowKeys;
            }
            if (state.selection) {
                Promise.resolve(null).then(() => this.selectionChange.emit(state.selection));
            }
            this.stateRestored = true;
            this.onStateRestore.emit(state);
        }
    }
    saveColumnWidths(state) {
        let widths = [];
        let headers = DomHandler.find(this.containerViewChild?.nativeElement, '.p-datatable-thead > tr > th');
        headers.forEach((header) => widths.push(DomHandler.getOuterWidth(header)));
        state.columnWidths = widths.join(',');
        if (this.columnResizeMode === 'expand') {
            state.tableWidth = DomHandler.getOuterWidth(this.tableViewChild?.nativeElement);
        }
    }
    setResizeTableWidth(width) {
        this.tableViewChild.nativeElement.style.width = width;
        this.tableViewChild.nativeElement.style.minWidth = width;
    }
    restoreColumnWidths() {
        if (this.columnWidthsState) {
            let widths = this.columnWidthsState.split(',');
            if (this.columnResizeMode === 'expand' && this.tableWidthState) {
                this.setResizeTableWidth(this.tableWidthState + 'px');
            }
            if (ObjectUtils.isNotEmpty(widths)) {
                this.createStyleElement();
                let innerHTML = '';
                widths.forEach((width, index) => {
                    let style = `width: ${width}px !important; max-width: ${width}px !important`;
                    innerHTML += `
                        #${this.id}-table > .p-datatable-thead > tr > th:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tbody > tr > td:nth-child(${index + 1}),
                        #${this.id}-table > .p-datatable-tfoot > tr > td:nth-child(${index + 1}) {
                            ${style}
                        }
                    `;
                });
                this.styleElement.innerHTML = innerHTML;
            }
        }
    }
    saveColumnOrder(state) {
        if (this.columns) {
            let columnOrder = [];
            this.columns.map((column) => {
                columnOrder.push(column.field || column.key);
            });
            state.columnOrder = columnOrder;
        }
    }
    restoreColumnOrder() {
        const storage = this.getStorage();
        const stateString = storage.getItem(this.stateKey);
        if (stateString) {
            let state = JSON.parse(stateString);
            let columnOrder = state.columnOrder;
            if (columnOrder) {
                let reorderedColumns = [];
                columnOrder.map((key) => {
                    let col = this.findColumnByKey(key);
                    if (col) {
                        reorderedColumns.push(col);
                    }
                });
                this.columnOrderStateRestored = true;
                this.columns = reorderedColumns;
            }
        }
    }
    findColumnByKey(key) {
        if (this.columns) {
            for (let col of this.columns) {
                if (col.key === key || col.field === key)
                    return col;
                else
                    continue;
            }
        }
        else {
            return null;
        }
    }
    createStyleElement() {
        this.styleElement = this.renderer.createElement('style');
        this.styleElement.type = 'text/css';
        this.renderer.appendChild(this.document.head, this.styleElement);
    }
    getGroupRowsMeta() {
        return { field: this.groupRowsBy, order: this.groupRowsByOrder };
    }
    createResponsiveStyle() {
        if (isPlatformBrowser(this.platformId)) {
            if (!this.responsiveStyleElement) {
                this.responsiveStyleElement = this.renderer.createElement('style');
                this.responsiveStyleElement.type = 'text/css';
                this.renderer.appendChild(this.document.head, this.responsiveStyleElement);
                let innerHTML = `
    @media screen and (max-width: ${this.breakpoint}) {
        #${this.id}-table > .p-datatable-thead > tr > th,
        #${this.id}-table > .p-datatable-tfoot > tr > td {
            display: none !important;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td {
            display: flex;
            width: 100% !important;
            align-items: center;
            justify-content: space-between;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td:not(:last-child) {
            border: 0 none;
        }

        #${this.id}.p-datatable-gridlines > .p-datatable-wrapper > .p-datatable-table > .p-datatable-tbody > tr > td:last-child {
            border-top: 0;
            border-right: 0;
            border-left: 0;
        }

        #${this.id}-table > .p-datatable-tbody > tr > td > .p-column-title {
            display: block;
        }
    }
    `;
                this.renderer.setProperty(this.responsiveStyleElement, 'innerHTML', innerHTML);
            }
        }
    }
    destroyResponsiveStyle() {
        if (this.responsiveStyleElement) {
            this.renderer.removeChild(this.document.head, this.responsiveStyleElement);
            this.responsiveStyleElement = null;
        }
    }
    destroyStyleElement() {
        if (this.styleElement) {
            this.renderer.removeChild(this.document.head, this.styleElement);
            this.styleElement = null;
        }
    }
    ngOnDestroy() {
        this.unbindDocumentEditListener();
        this.editingCell = null;
        this.initialized = null;
        this.destroyStyleElement();
        this.destroyResponsiveStyle();
    }
    getPaginatorStyleClasses(className) {
        return [this.paginatorStyleClass, className]
            .filter((c) => !!c)
            .join(' ')
            .trim();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: Table, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i0.NgZone }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i1.FilterService }, { token: i1.OverlayService }, { token: i1.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: Table, selector: "p-table", inputs: { frozenColumns: "frozenColumns", frozenValue: "frozenValue", style: "style", styleClass: "styleClass", tableStyle: "tableStyle", tableStyleClass: "tableStyleClass", paginator: "paginator", pageLinks: "pageLinks", rowsPerPageOptions: "rowsPerPageOptions", alwaysShowPaginator: "alwaysShowPaginator", paginatorPosition: "paginatorPosition", paginatorStyleClass: "paginatorStyleClass", paginatorDropdownAppendTo: "paginatorDropdownAppendTo", paginatorDropdownScrollHeight: "paginatorDropdownScrollHeight", currentPageReportTemplate: "currentPageReportTemplate", showCurrentPageReport: "showCurrentPageReport", showJumpToPageDropdown: "showJumpToPageDropdown", showJumpToPageInput: "showJumpToPageInput", showFirstLastIcon: "showFirstLastIcon", showPageLinks: "showPageLinks", defaultSortOrder: "defaultSortOrder", sortMode: "sortMode", resetPageOnSort: "resetPageOnSort", selectionMode: "selectionMode", selectionPageOnly: "selectionPageOnly", contextMenuSelection: "contextMenuSelection", contextMenuSelectionMode: "contextMenuSelectionMode", dataKey: "dataKey", metaKeySelection: "metaKeySelection", rowSelectable: "rowSelectable", rowTrackBy: "rowTrackBy", lazy: "lazy", lazyLoadOnInit: "lazyLoadOnInit", compareSelectionBy: "compareSelectionBy", csvSeparator: "csvSeparator", exportFilename: "exportFilename", filters: "filters", globalFilterFields: "globalFilterFields", filterDelay: "filterDelay", filterLocale: "filterLocale", expandedRowKeys: "expandedRowKeys", editingRowKeys: "editingRowKeys", rowExpandMode: "rowExpandMode", scrollable: "scrollable", scrollDirection: "scrollDirection", rowGroupMode: "rowGroupMode", scrollHeight: "scrollHeight", virtualScroll: "virtualScroll", virtualScrollItemSize: "virtualScrollItemSize", virtualScrollOptions: "virtualScrollOptions", virtualScrollDelay: "virtualScrollDelay", frozenWidth: "frozenWidth", responsive: "responsive", contextMenu: "contextMenu", resizableColumns: "resizableColumns", columnResizeMode: "columnResizeMode", reorderableColumns: "reorderableColumns", loading: "loading", loadingIcon: "loadingIcon", showLoader: "showLoader", rowHover: "rowHover", customSort: "customSort", showInitialSortBadge: "showInitialSortBadge", autoLayout: "autoLayout", exportFunction: "exportFunction", exportHeader: "exportHeader", stateKey: "stateKey", stateStorage: "stateStorage", editMode: "editMode", groupRowsBy: "groupRowsBy", groupRowsByOrder: "groupRowsByOrder", responsiveLayout: "responsiveLayout", breakpoint: "breakpoint", paginatorLocale: "paginatorLocale", value: "value", columns: "columns", first: "first", rows: "rows", totalRecords: "totalRecords", sortField: "sortField", sortOrder: "sortOrder", multiSortMeta: "multiSortMeta", selection: "selection", selectAll: "selectAll", virtualRowHeight: "virtualRowHeight" }, outputs: { contextMenuSelectionChange: "contextMenuSelectionChange", selectAllChange: "selectAllChange", selectionChange: "selectionChange", onRowSelect: "onRowSelect", onRowUnselect: "onRowUnselect", onPage: "onPage", onSort: "onSort", onFilter: "onFilter", onLazyLoad: "onLazyLoad", onRowExpand: "onRowExpand", onRowCollapse: "onRowCollapse", onContextMenuSelect: "onContextMenuSelect", onColResize: "onColResize", onColReorder: "onColReorder", onRowReorder: "onRowReorder", onEditInit: "onEditInit", onEditComplete: "onEditComplete", onEditCancel: "onEditCancel", onHeaderCheckboxToggle: "onHeaderCheckboxToggle", sortFunction: "sortFunction", firstChange: "firstChange", rowsChange: "rowsChange", onStateSave: "onStateSave", onStateRestore: "onStateRestore" }, host: { classAttribute: "p-element" }, providers: [TableService], queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "containerViewChild", first: true, predicate: ["container"], descendants: true }, { propertyName: "resizeHelperViewChild", first: true, predicate: ["resizeHelper"], descendants: true }, { propertyName: "reorderIndicatorUpViewChild", first: true, predicate: ["reorderIndicatorUp"], descendants: true }, { propertyName: "reorderIndicatorDownViewChild", first: true, predicate: ["reorderIndicatorDown"], descendants: true }, { propertyName: "wrapperViewChild", first: true, predicate: ["wrapper"], descendants: true }, { propertyName: "tableViewChild", first: true, predicate: ["table"], descendants: true }, { propertyName: "tableHeaderViewChild", first: true, predicate: ["thead"], descendants: true }, { propertyName: "tableFooterViewChild", first: true, predicate: ["tfoot"], descendants: true }, { propertyName: "scroller", first: true, predicate: ["scroller"], descendants: true }], usesOnChanges: true, ngImport: i0, template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-top')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead role="rowgroup" #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            *ngIf="scrollerOptions.spacerStyle"
                            [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'"
                            class="p-datatable-scroller-spacer"
                        ></tbody>
                        <tfoot role="rowgroup" *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-bottom')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-icon-wrapper{display:inline}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:2}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit;z-index:1}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:2}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:3}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "component", type: i0.forwardRef(() => i3.Paginator), selector: "p-paginator", inputs: ["pageLinkSize", "style", "styleClass", "alwaysShow", "dropdownAppendTo", "templateLeft", "templateRight", "appendTo", "dropdownScrollHeight", "currentPageReportTemplate", "showCurrentPageReport", "showFirstLastIcon", "totalRecords", "rows", "rowsPerPageOptions", "showJumpToPageDropdown", "showJumpToPageInput", "showPageLinks", "locale", "dropdownItemTemplate", "first"], outputs: ["onPageChange"] }, { kind: "directive", type: i0.forwardRef(() => i1.PrimeTemplate), selector: "[pTemplate]", inputs: ["type", "pTemplate"] }, { kind: "component", type: i0.forwardRef(() => i4.Scroller), selector: "p-scroller", inputs: ["id", "style", "styleClass", "tabindex", "items", "itemSize", "scrollHeight", "scrollWidth", "orientation", "step", "delay", "resizeDelay", "appendOnly", "inline", "lazy", "disabled", "loaderDisabled", "columns", "showSpacer", "showLoader", "numToleratedItems", "loading", "autoSize", "trackBy", "options"], outputs: ["onLazyLoad", "onScroll", "onScrollIndexChange"] }, { kind: "component", type: i0.forwardRef(() => ArrowDownIcon), selector: "ArrowDownIcon" }, { kind: "component", type: i0.forwardRef(() => ArrowUpIcon), selector: "ArrowUpIcon" }, { kind: "component", type: i0.forwardRef(() => SpinnerIcon), selector: "SpinnerIcon" }, { kind: "component", type: i0.forwardRef(() => TableBody), selector: "[pTableBody]", inputs: ["pTableBody", "pTableBodyTemplate", "value", "frozen", "frozenRows", "scrollerOptions"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: Table, decorators: [{
            type: Component,
            args: [{ selector: 'p-table', template: `
        <div
            #container
            [ngStyle]="style"
            [class]="styleClass"
            [ngClass]="{ 'p-datatable p-component': true, 'p-datatable-hoverable-rows': rowHover || selectionMode, 'p-datatable-scrollable': scrollable, 'p-datatable-flex-scrollable': scrollable && scrollHeight === 'flex' }"
            [attr.id]="id"
        >
            <div class="p-datatable-loading-overlay p-component-overlay" *ngIf="loading && showLoader">
                <i *ngIf="loadingIcon" [class]="'p-datatable-loading-icon ' + loadingIcon"></i>
                <ng-container *ngIf="!loadingIcon">
                    <SpinnerIcon *ngIf="!loadingIconTemplate" [spin]="true" [styleClass]="'p-datatable-loading-icon'" />
                    <span *ngIf="loadingIconTemplate" class="p-datatable-loading-icon">
                        <ng-template *ngTemplateOutlet="loadingIconTemplate"></ng-template>
                    </span>
                </ng-container>
            </div>
            <div *ngIf="captionTemplate" class="p-datatable-header">
                <ng-container *ngTemplateOutlet="captionTemplate"></ng-container>
            </div>
            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'top' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-top')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div #wrapper class="p-datatable-wrapper" [ngStyle]="{ maxHeight: virtualScroll ? '' : scrollHeight }">
                <p-scroller
                    #scroller
                    *ngIf="virtualScroll"
                    [items]="processedData"
                    [columns]="columns"
                    [style]="{ height: scrollHeight !== 'flex' ? scrollHeight : undefined }"
                    [scrollHeight]="scrollHeight !== 'flex' ? undefined : '100%'"
                    [itemSize]="virtualScrollItemSize || _virtualRowHeight"
                    [step]="rows"
                    [delay]="lazy ? virtualScrollDelay : 0"
                    [inline]="true"
                    [lazy]="lazy"
                    (onLazyLoad)="onLazyItemLoad($event)"
                    [loaderDisabled]="true"
                    [showSpacer]="false"
                    [showLoader]="loadingBodyTemplate"
                    [options]="virtualScrollOptions"
                    [autoSize]="true"
                >
                    <ng-template pTemplate="content" let-items let-scrollerOptions="options">
                        <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: items, options: scrollerOptions }"></ng-container>
                    </ng-template>
                </p-scroller>
                <ng-container *ngIf="!virtualScroll">
                    <ng-container *ngTemplateOutlet="buildInTable; context: { $implicit: processedData, options: { columns } }"></ng-container>
                </ng-container>

                <ng-template #buildInTable let-items let-scrollerOptions="options">
                    <table
                        #table
                        role="table"
                        [ngClass]="{ 'p-datatable-table': true, 'p-datatable-scrollable-table': scrollable, 'p-datatable-resizable-table': resizableColumns, 'p-datatable-resizable-table-fit': resizableColumns && columnResizeMode === 'fit' }"
                        [class]="tableStyleClass"
                        [style]="tableStyle"
                        [attr.id]="id + '-table'"
                    >
                        <ng-container *ngTemplateOutlet="colGroupTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        <thead role="rowgroup" #thead class="p-datatable-thead">
                            <ng-container *ngTemplateOutlet="headerGroupedTemplate || headerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </thead>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody p-datatable-frozen-tbody"
                            *ngIf="frozenValue || frozenBodyTemplate"
                            [value]="frozenValue"
                            [frozenRows]="true"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="frozenBodyTemplate"
                            [frozen]="true"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            class="p-datatable-tbody"
                            [ngClass]="scrollerOptions.contentStyleClass"
                            [style]="scrollerOptions.contentStyle"
                            [value]="dataToRender(scrollerOptions.rows)"
                            [pTableBody]="scrollerOptions.columns"
                            [pTableBodyTemplate]="bodyTemplate"
                            [scrollerOptions]="scrollerOptions"
                        ></tbody>
                        <tbody
                            role="rowgroup"
                            *ngIf="scrollerOptions.spacerStyle"
                            [style]="'height: calc(' + scrollerOptions.spacerStyle.height + ' - ' + scrollerOptions.rows.length * scrollerOptions.itemSize + 'px);'"
                            class="p-datatable-scroller-spacer"
                        ></tbody>
                        <tfoot role="rowgroup" *ngIf="footerGroupedTemplate || footerTemplate" #tfoot class="p-datatable-tfoot">
                            <ng-container *ngTemplateOutlet="footerGroupedTemplate || footerTemplate; context: { $implicit: scrollerOptions.columns }"></ng-container>
                        </tfoot>
                    </table>
                </ng-template>
            </div>

            <p-paginator
                [rows]="rows"
                [first]="first"
                [totalRecords]="totalRecords"
                [pageLinkSize]="pageLinks"
                [alwaysShow]="alwaysShowPaginator"
                (onPageChange)="onPageChange($event)"
                [rowsPerPageOptions]="rowsPerPageOptions"
                *ngIf="paginator && (paginatorPosition === 'bottom' || paginatorPosition == 'both')"
                [templateLeft]="paginatorLeftTemplate"
                [templateRight]="paginatorRightTemplate"
                [dropdownAppendTo]="paginatorDropdownAppendTo"
                [dropdownScrollHeight]="paginatorDropdownScrollHeight"
                [currentPageReportTemplate]="currentPageReportTemplate"
                [showFirstLastIcon]="showFirstLastIcon"
                [dropdownItemTemplate]="paginatorDropdownItemTemplate"
                [showCurrentPageReport]="showCurrentPageReport"
                [showJumpToPageDropdown]="showJumpToPageDropdown"
                [showJumpToPageInput]="showJumpToPageInput"
                [showPageLinks]="showPageLinks"
                [styleClass]="getPaginatorStyleClasses('p-paginator-bottom')"
                [locale]="paginatorLocale"
            >
                <ng-template pTemplate="dropdownicon" *ngIf="paginatorDropdownIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorDropdownIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="firstpagelinkicon" *ngIf="paginatorFirstPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorFirstPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="previouspagelinkicon" *ngIf="paginatorPreviousPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorPreviousPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="lastpagelinkicon" *ngIf="paginatorLastPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorLastPageLinkIconTemplate"></ng-container>
                </ng-template>

                <ng-template pTemplate="nextpagelinkicon" *ngIf="paginatorNextPageLinkIconTemplate">
                    <ng-container *ngTemplateOutlet="paginatorNextPageLinkIconTemplate"></ng-container>
                </ng-template>
            </p-paginator>

            <div *ngIf="summaryTemplate" class="p-datatable-footer">
                <ng-container *ngTemplateOutlet="summaryTemplate"></ng-container>
            </div>

            <div #resizeHelper class="p-column-resizer-helper" style="display:none" *ngIf="resizableColumns"></div>
            <span #reorderIndicatorUp class="p-datatable-reorder-indicator-up" style="display: none;" *ngIf="reorderableColumns">
                <ArrowDownIcon *ngIf="!reorderIndicatorUpIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorUpIconTemplate"></ng-template>
            </span>
            <span #reorderIndicatorDown class="p-datatable-reorder-indicator-down" style="display: none;" *ngIf="reorderableColumns">
                <ArrowUpIcon *ngIf="!reorderIndicatorDownIconTemplate" />
                <ng-template *ngTemplateOutlet="reorderIndicatorDownIconTemplate"></ng-template>
            </span>
        </div>
    `, providers: [TableService], changeDetection: ChangeDetectionStrategy.Default, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-datatable{position:relative}.p-datatable>.p-datatable-wrapper{overflow:auto}.p-datatable-table{border-spacing:0px;width:100%}.p-datatable .p-sortable-column{cursor:pointer;-webkit-user-select:none;user-select:none}.p-datatable .p-sortable-column .p-column-title,.p-datatable .p-sortable-column .p-sortable-column-icon,.p-datatable .p-sortable-column .p-sortable-column-badge{vertical-align:middle}.p-datatable .p-sortable-column .p-icon-wrapper{display:inline}.p-datatable .p-sortable-column .p-sortable-column-badge{display:inline-flex;align-items:center;justify-content:center}.p-datatable-hoverable-rows .p-selectable-row{cursor:pointer}.p-datatable-scrollable>.p-datatable-wrapper{position:relative}.p-datatable-scrollable-table>.p-datatable-thead{position:sticky;top:0;z-index:2}.p-datatable-scrollable-table>.p-datatable-frozen-tbody{position:sticky;z-index:1}.p-datatable-scrollable-table>.p-datatable-tfoot{position:sticky;bottom:0;z-index:1}.p-datatable-scrollable .p-frozen-column{position:sticky;background:inherit;z-index:1}.p-datatable-scrollable th.p-frozen-column{z-index:1}.p-datatable-flex-scrollable{display:flex;flex-direction:column;height:100%}.p-datatable-flex-scrollable>.p-datatable-wrapper{display:flex;flex-direction:column;flex:1;height:100%}.p-datatable-scrollable-table>.p-datatable-tbody>.p-rowgroup-header{position:sticky;z-index:2}.p-datatable-resizable-table>.p-datatable-thead>tr>th,.p-datatable-resizable-table>.p-datatable-tfoot>tr>td,.p-datatable-resizable-table>.p-datatable-tbody>tr>td{overflow:hidden;white-space:nowrap}.p-datatable-resizable-table>.p-datatable-thead>tr>th.p-resizable-column:not(.p-frozen-column){background-clip:padding-box;position:relative}.p-datatable-resizable-table-fit>.p-datatable-thead>tr>th.p-resizable-column:last-child .p-column-resizer{display:none}.p-datatable .p-column-resizer{display:block;position:absolute!important;top:0;right:0;margin:0;width:.5rem;height:100%;padding:0;cursor:col-resize;border:1px solid transparent}.p-datatable .p-column-resizer-helper{width:1px;position:absolute;z-index:10;display:none}.p-datatable .p-row-editor-init,.p-datatable .p-row-editor-save,.p-datatable .p-row-editor-cancel,.p-datatable .p-row-toggler{display:inline-flex;align-items:center;justify-content:center;overflow:hidden;position:relative}.p-datatable-reorder-indicator-up,.p-datatable-reorder-indicator-down{position:absolute}.p-datatable-reorderablerow-handle,[pReorderableColumn]{cursor:move}.p-datatable .p-datatable-loading-overlay{position:absolute;display:flex;align-items:center;justify-content:center;z-index:3}.p-column-filter-row{display:flex;align-items:center;width:100%}.p-column-filter-menu{display:inline-flex}.p-column-filter-row p-columnfilterformelement{flex:1 1 auto;width:1%}.p-column-filter-menu-button,.p-column-filter-clear-button{display:inline-flex;justify-content:center;align-items:center;cursor:pointer;text-decoration:none;overflow:hidden;position:relative}.p-column-filter-overlay{position:absolute;top:0;left:0}.p-column-filter-row-items{margin:0;padding:0;list-style:none}.p-column-filter-row-item{cursor:pointer}.p-column-filter-add-button,.p-column-filter-remove-button{justify-content:center}.p-column-filter-add-button .p-button-label,.p-column-filter-remove-button .p-button-label{flex-grow:0}.p-column-filter-buttonbar{display:flex;align-items:center;justify-content:space-between}.p-column-filter-buttonbar .p-button{width:auto}.p-datatable-tbody>tr>td>.p-column-title{display:none}.p-datatable-scroller-spacer{display:flex}.p-datatable .p-scroller .p-scroller-loading{transform:none!important;min-height:0;position:sticky;top:0;left:0}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i0.NgZone }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i1.FilterService }, { type: i1.OverlayService }, { type: i1.PrimeNGConfig }], propDecorators: { frozenColumns: [{
                type: Input
            }], frozenValue: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], tableStyle: [{
                type: Input
            }], tableStyleClass: [{
                type: Input
            }], paginator: [{
                type: Input
            }], pageLinks: [{
                type: Input
            }], rowsPerPageOptions: [{
                type: Input
            }], alwaysShowPaginator: [{
                type: Input
            }], paginatorPosition: [{
                type: Input
            }], paginatorStyleClass: [{
                type: Input
            }], paginatorDropdownAppendTo: [{
                type: Input
            }], paginatorDropdownScrollHeight: [{
                type: Input
            }], currentPageReportTemplate: [{
                type: Input
            }], showCurrentPageReport: [{
                type: Input
            }], showJumpToPageDropdown: [{
                type: Input
            }], showJumpToPageInput: [{
                type: Input
            }], showFirstLastIcon: [{
                type: Input
            }], showPageLinks: [{
                type: Input
            }], defaultSortOrder: [{
                type: Input
            }], sortMode: [{
                type: Input
            }], resetPageOnSort: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], selectionPageOnly: [{
                type: Input
            }], contextMenuSelection: [{
                type: Input
            }], contextMenuSelectionChange: [{
                type: Output
            }], contextMenuSelectionMode: [{
                type: Input
            }], dataKey: [{
                type: Input
            }], metaKeySelection: [{
                type: Input
            }], rowSelectable: [{
                type: Input
            }], rowTrackBy: [{
                type: Input
            }], lazy: [{
                type: Input
            }], lazyLoadOnInit: [{
                type: Input
            }], compareSelectionBy: [{
                type: Input
            }], csvSeparator: [{
                type: Input
            }], exportFilename: [{
                type: Input
            }], filters: [{
                type: Input
            }], globalFilterFields: [{
                type: Input
            }], filterDelay: [{
                type: Input
            }], filterLocale: [{
                type: Input
            }], expandedRowKeys: [{
                type: Input
            }], editingRowKeys: [{
                type: Input
            }], rowExpandMode: [{
                type: Input
            }], scrollable: [{
                type: Input
            }], scrollDirection: [{
                type: Input
            }], rowGroupMode: [{
                type: Input
            }], scrollHeight: [{
                type: Input
            }], virtualScroll: [{
                type: Input
            }], virtualScrollItemSize: [{
                type: Input
            }], virtualScrollOptions: [{
                type: Input
            }], virtualScrollDelay: [{
                type: Input
            }], frozenWidth: [{
                type: Input
            }], responsive: [{
                type: Input
            }], contextMenu: [{
                type: Input
            }], resizableColumns: [{
                type: Input
            }], columnResizeMode: [{
                type: Input
            }], reorderableColumns: [{
                type: Input
            }], loading: [{
                type: Input
            }], loadingIcon: [{
                type: Input
            }], showLoader: [{
                type: Input
            }], rowHover: [{
                type: Input
            }], customSort: [{
                type: Input
            }], showInitialSortBadge: [{
                type: Input
            }], autoLayout: [{
                type: Input
            }], exportFunction: [{
                type: Input
            }], exportHeader: [{
                type: Input
            }], stateKey: [{
                type: Input
            }], stateStorage: [{
                type: Input
            }], editMode: [{
                type: Input
            }], groupRowsBy: [{
                type: Input
            }], groupRowsByOrder: [{
                type: Input
            }], responsiveLayout: [{
                type: Input
            }], breakpoint: [{
                type: Input
            }], paginatorLocale: [{
                type: Input
            }], value: [{
                type: Input
            }], columns: [{
                type: Input
            }], first: [{
                type: Input
            }], rows: [{
                type: Input
            }], totalRecords: [{
                type: Input
            }], sortField: [{
                type: Input
            }], sortOrder: [{
                type: Input
            }], multiSortMeta: [{
                type: Input
            }], selection: [{
                type: Input
            }], selectAll: [{
                type: Input
            }], selectAllChange: [{
                type: Output
            }], selectionChange: [{
                type: Output
            }], onRowSelect: [{
                type: Output
            }], onRowUnselect: [{
                type: Output
            }], onPage: [{
                type: Output
            }], onSort: [{
                type: Output
            }], onFilter: [{
                type: Output
            }], onLazyLoad: [{
                type: Output
            }], onRowExpand: [{
                type: Output
            }], onRowCollapse: [{
                type: Output
            }], onContextMenuSelect: [{
                type: Output
            }], onColResize: [{
                type: Output
            }], onColReorder: [{
                type: Output
            }], onRowReorder: [{
                type: Output
            }], onEditInit: [{
                type: Output
            }], onEditComplete: [{
                type: Output
            }], onEditCancel: [{
                type: Output
            }], onHeaderCheckboxToggle: [{
                type: Output
            }], sortFunction: [{
                type: Output
            }], firstChange: [{
                type: Output
            }], rowsChange: [{
                type: Output
            }], onStateSave: [{
                type: Output
            }], onStateRestore: [{
                type: Output
            }], containerViewChild: [{
                type: ViewChild,
                args: ['container']
            }], resizeHelperViewChild: [{
                type: ViewChild,
                args: ['resizeHelper']
            }], reorderIndicatorUpViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorUp']
            }], reorderIndicatorDownViewChild: [{
                type: ViewChild,
                args: ['reorderIndicatorDown']
            }], wrapperViewChild: [{
                type: ViewChild,
                args: ['wrapper']
            }], tableViewChild: [{
                type: ViewChild,
                args: ['table']
            }], tableHeaderViewChild: [{
                type: ViewChild,
                args: ['thead']
            }], tableFooterViewChild: [{
                type: ViewChild,
                args: ['tfoot']
            }], scroller: [{
                type: ViewChild,
                args: ['scroller']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], virtualRowHeight: [{
                type: Input
            }] } });
export class TableBody {
    dt;
    tableService;
    cd;
    el;
    columns;
    template;
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    frozen;
    frozenRows;
    scrollerOptions;
    subscription;
    _value;
    ngAfterViewInit() {
        if (this.frozenRows) {
            this.updateFrozenRowStickyPosition();
        }
        if (this.dt.scrollable && this.dt.rowGroupMode === 'subheader') {
            this.updateFrozenRowGroupHeaderStickyPosition();
        }
    }
    constructor(dt, tableService, cd, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.el = el;
        this.subscription = this.dt.tableService.valueSource$.subscribe(() => {
            if (this.dt.virtualScroll) {
                this.cd.detectChanges();
            }
        });
    }
    shouldRenderRowGroupHeader(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowGroupFooter(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowData = value[i + 1];
        if (nextRowData) {
            let nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== nextRowFieldData;
        }
        else {
            return true;
        }
    }
    shouldRenderRowspan(value, rowData, i) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let prevRowData = value[i - 1];
        if (prevRowData) {
            let previousRowFieldData = ObjectUtils.resolveFieldData(prevRowData, this.dt.groupRowsBy);
            return currentRowFieldData !== previousRowFieldData;
        }
        else {
            return true;
        }
    }
    calculateRowGroupSize(value, rowData, index) {
        let currentRowFieldData = ObjectUtils.resolveFieldData(rowData, this.dt.groupRowsBy);
        let nextRowFieldData = currentRowFieldData;
        let groupRowSpan = 0;
        while (currentRowFieldData === nextRowFieldData) {
            groupRowSpan++;
            let nextRowData = value[++index];
            if (nextRowData) {
                nextRowFieldData = ObjectUtils.resolveFieldData(nextRowData, this.dt.groupRowsBy);
            }
            else {
                break;
            }
        }
        return groupRowSpan === 1 ? null : groupRowSpan;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    updateFrozenRowStickyPosition() {
        this.el.nativeElement.style.top = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling) + 'px';
    }
    updateFrozenRowGroupHeaderStickyPosition() {
        if (this.el.nativeElement.previousElementSibling) {
            let tableHeaderHeight = DomHandler.getOuterHeight(this.el.nativeElement.previousElementSibling);
            this.dt.rowGroupHeaderStyleObject.top = tableHeaderHeight + 'px';
        }
    }
    getScrollerOption(option, options) {
        if (this.dt.virtualScroll) {
            options = options || this.scrollerOptions;
            return options ? options[option] : null;
        }
        return null;
    }
    getRowIndex(rowIndex) {
        const index = this.dt.paginator ? this.dt.first + rowIndex : rowIndex;
        const getItemOptions = this.getScrollerOption('getItemOptions');
        return getItemOptions ? getItemOptions(index).index : index;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableBody, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TableBody, selector: "[pTableBody]", inputs: { columns: ["pTableBody", "columns"], template: ["pTableBodyTemplate", "template"], value: "value", frozen: "frozen", frozenRows: "frozenRows", scrollerOptions: "scrollerOptions" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], changeDetection: i0.ChangeDetectionStrategy.Default, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableBody, decorators: [{
            type: Component,
            args: [{
                    selector: '[pTableBody]',
                    template: `
        <ng-container *ngIf="!dt.expandedRowTemplate">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="dt.groupHeaderTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupHeaderTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode !== 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="rowData ? template : dt.loadingBodyTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.rowGroupMode === 'rowspan'">
                    <ng-container
                        *ngTemplateOutlet="
                            rowData ? template : dt.loadingBodyTemplate;
                            context: {
                                $implicit: rowData,
                                rowIndex: getRowIndex(rowIndex),
                                columns: columns,
                                editing: dt.editMode === 'row' && dt.isRowEditing(rowData),
                                frozen: frozen,
                                rowgroup: shouldRenderRowspan(value, rowData, rowIndex),
                                rowspan: calculateRowGroupSize(value, rowData, rowIndex)
                            }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupFooterTemplate && !dt.virtualScroll && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, rowIndex)" role="row">
                    <ng-container
                        *ngTemplateOutlet="dt.groupFooterTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.expandedRowTemplate && !(frozen && dt.frozenExpandedRowTemplate)">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container *ngIf="!dt.groupHeaderTemplate">
                    <ng-container
                        *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.groupHeaderTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupHeader(value, rowData, getRowIndex(rowIndex))" role="row">
                    <ng-container
                        *ngTemplateOutlet="
                            dt.groupHeaderTemplate;
                            context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                        "
                    ></ng-container>
                </ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.expandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                    <ng-container *ngIf="dt.groupFooterTemplate && dt.rowGroupMode === 'subheader' && shouldRenderRowGroupFooter(value, rowData, getRowIndex(rowIndex))" role="row">
                        <ng-container
                            *ngTemplateOutlet="
                                dt.groupFooterTemplate;
                                context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }
                            "
                        ></ng-container>
                    </ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.frozenExpandedRowTemplate && frozen">
            <ng-template ngFor let-rowData let-rowIndex="index" [ngForOf]="value" [ngForTrackBy]="dt.rowTrackBy">
                <ng-container
                    *ngTemplateOutlet="template; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, expanded: dt.isRowExpanded(rowData), editing: dt.editMode === 'row' && dt.isRowEditing(rowData), frozen: frozen }"
                ></ng-container>
                <ng-container *ngIf="dt.isRowExpanded(rowData)">
                    <ng-container *ngTemplateOutlet="dt.frozenExpandedRowTemplate; context: { $implicit: rowData, rowIndex: getRowIndex(rowIndex), columns: columns, frozen: frozen }"></ng-container>
                </ng-container>
            </ng-template>
        </ng-container>
        <ng-container *ngIf="dt.loading">
            <ng-container *ngTemplateOutlet="dt.loadingBodyTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
        <ng-container *ngIf="dt.isEmpty() && !dt.loading">
            <ng-container *ngTemplateOutlet="dt.emptyMessageTemplate; context: { $implicit: columns, frozen: frozen }"></ng-container>
        </ng-container>
    `,
                    changeDetection: ChangeDetectionStrategy.Default,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }, { type: i0.ElementRef }], propDecorators: { columns: [{
                type: Input,
                args: ['pTableBody']
            }], template: [{
                type: Input,
                args: ['pTableBodyTemplate']
            }], value: [{
                type: Input
            }], frozen: [{
                type: Input
            }], frozenRows: [{
                type: Input
            }], scrollerOptions: [{
                type: Input
            }] } });
export class RowGroupHeader {
    dt;
    constructor(dt) {
        this.dt = dt;
    }
    get getFrozenRowGroupHeaderStickyPosition() {
        return this.dt.rowGroupHeaderStyleObject ? this.dt.rowGroupHeaderStyleObject.top : '';
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RowGroupHeader, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: RowGroupHeader, selector: "[pRowGroupHeader]", host: { properties: { "style.top": "getFrozenRowGroupHeaderStickyPosition" }, classAttribute: "p-rowgroup-header p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RowGroupHeader, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowGroupHeader]',
                    host: {
                        class: 'p-rowgroup-header p-element',
                        '[style.top]': 'getFrozenRowGroupHeaderStickyPosition'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }] });
export class FrozenColumn {
    el;
    get frozen() {
        return this._frozen;
    }
    set frozen(val) {
        this._frozen = val;
        Promise.resolve(null).then(() => this.updateStickyPosition());
    }
    alignFrozen = 'left';
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        setTimeout(() => {
            this.updateStickyPosition();
        }, 1000);
    }
    _frozen = true;
    updateStickyPosition() {
        if (this._frozen) {
            if (this.alignFrozen === 'right') {
                let right = 0;
                let next = this.el.nativeElement.nextElementSibling;
                if (next) {
                    right = DomHandler.getOuterWidth(next) + (parseFloat(next.style.right) || 0);
                }
                this.el.nativeElement.style.right = right + 'px';
            }
            else {
                let left = 0;
                let prev = this.el.nativeElement.previousElementSibling;
                if (prev) {
                    left = DomHandler.getOuterWidth(prev) + (parseFloat(prev.style.left) || 0);
                }
                this.el.nativeElement.style.left = left + 'px';
            }
            const filterRow = this.el.nativeElement?.parentElement?.nextElementSibling;
            if (filterRow) {
                let index = DomHandler.index(this.el.nativeElement);
                if (filterRow.children && filterRow.children[index]) {
                    filterRow.children[index].style.left = this.el.nativeElement.style.left;
                    filterRow.children[index].style.right = this.el.nativeElement.style.right;
                }
            }
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FrozenColumn, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: FrozenColumn, selector: "[pFrozenColumn]", inputs: { frozen: "frozen", alignFrozen: "alignFrozen" }, host: { properties: { "class.p-frozen-column": "frozen" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FrozenColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pFrozenColumn]',
                    host: {
                        class: 'p-element',
                        '[class.p-frozen-column]': 'frozen'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { frozen: [{
                type: Input
            }], alignFrozen: [{
                type: Input
            }] } });
export class SortableColumn {
    dt;
    field;
    pSortableColumnDisabled;
    sorted;
    sortOrder;
    subscription;
    constructor(dt) {
        this.dt = dt;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
                this.updateSortState();
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.updateSortState();
        }
    }
    updateSortState() {
        this.sorted = this.dt.isSorted(this.field);
        this.sortOrder = this.sorted ? (this.dt.sortOrder === 1 ? 'ascending' : 'descending') : 'none';
    }
    onClick(event) {
        if (this.isEnabled() && !this.isFilterElement(event.target)) {
            this.updateSortState();
            this.dt.sort({
                originalEvent: event,
                field: this.field
            });
            DomHandler.clearSelection();
        }
    }
    onEnterKey(event) {
        this.onClick(event);
        event.preventDefault();
    }
    isEnabled() {
        return this.pSortableColumnDisabled !== true;
    }
    isFilterElement(element) {
        return this.isFilterElementIconOrButton(element) || this.isFilterElementIconOrButton(element?.parentElement?.parentElement);
    }
    isFilterElementIconOrButton(element) {
        return DomHandler.hasClass(element, 'pi-filter-icon') || DomHandler.hasClass(element, 'p-column-filter-menu-button');
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SortableColumn, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: SortableColumn, selector: "[pSortableColumn]", inputs: { field: ["pSortableColumn", "field"], pSortableColumnDisabled: "pSortableColumnDisabled" }, host: { listeners: { "click": "onClick($event)", "keydown.space": "onEnterKey($event)", "keydown.enter": "onEnterKey($event)" }, properties: { "class.p-sortable-column": "isEnabled()", "class.p-highlight": "sorted", "attr.tabindex": "isEnabled() ? \"0\" : null", "attr.role": "\"columnheader\"", "attr.aria-sort": "sortOrder" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SortableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSortableColumn]',
                    host: {
                        class: 'p-element',
                        '[class.p-sortable-column]': 'isEnabled()',
                        '[class.p-highlight]': 'sorted',
                        '[attr.tabindex]': 'isEnabled() ? "0" : null',
                        '[attr.role]': '"columnheader"',
                        '[attr.aria-sort]': 'sortOrder'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }], propDecorators: { field: [{
                type: Input,
                args: ['pSortableColumn']
            }], pSortableColumnDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKey: [{
                type: HostListener,
                args: ['keydown.space', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }] } });
export class SortIcon {
    dt;
    cd;
    field;
    subscription;
    sortOrder;
    constructor(dt, cd) {
        this.dt = dt;
        this.cd = cd;
        this.subscription = this.dt.tableService.sortSource$.subscribe((sortMeta) => {
            this.updateSortState();
        });
    }
    ngOnInit() {
        this.updateSortState();
    }
    onClick(event) {
        event.preventDefault();
    }
    updateSortState() {
        if (this.dt.sortMode === 'single') {
            this.sortOrder = this.dt.isSorted(this.field) ? this.dt.sortOrder : 0;
        }
        else if (this.dt.sortMode === 'multiple') {
            let sortMeta = this.dt.getSortMeta(this.field);
            this.sortOrder = sortMeta ? sortMeta.order : 0;
        }
        this.cd.markForCheck();
    }
    getMultiSortMetaIndex() {
        let multiSortMeta = this.dt._multiSortMeta;
        let index = -1;
        if (multiSortMeta && this.dt.sortMode === 'multiple' && this.dt.showInitialSortBadge && multiSortMeta.length > 1) {
            for (let i = 0; i < multiSortMeta.length; i++) {
                let meta = multiSortMeta[i];
                if (meta.field === this.field || meta.field === this.field) {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
    getBadgeValue() {
        let index = this.getMultiSortMetaIndex();
        return this.dt.groupRowsBy && index > -1 ? index : index + 1;
    }
    isMultiSorted() {
        return this.dt.sortMode === 'multiple' && this.getMultiSortMetaIndex() > -1;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SortIcon, deps: [{ token: Table }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: SortIcon, selector: "p-sortIcon", inputs: { field: "field" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => SortAltIcon), selector: "SortAltIcon" }, { kind: "component", type: i0.forwardRef(() => SortAmountUpAltIcon), selector: "SortAmountUpAltIcon" }, { kind: "component", type: i0.forwardRef(() => SortAmountDownIcon), selector: "SortAmountDownIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SortIcon, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-sortIcon',
                    template: `
        <ng-container *ngIf="!dt.sortIconTemplate">
            <SortAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 0" />
            <SortAmountUpAltIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === 1" />
            <SortAmountDownIcon [styleClass]="'p-sortable-column-icon'" *ngIf="sortOrder === -1" />
        </ng-container>
        <span *ngIf="dt.sortIconTemplate" class="p-sortable-column-icon">
            <ng-template *ngTemplateOutlet="dt.sortIconTemplate; context: { $implicit: sortOrder }"></ng-template>
        </span>
        <span *ngIf="isMultiSorted()" class="p-sortable-column-badge">{{ getBadgeValue() }}</span>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ChangeDetectorRef }], propDecorators: { field: [{
                type: Input
            }] } });
export class SelectableRow {
    dt;
    tableService;
    el;
    data;
    index;
    pSelectableRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    setRowTabIndex() {
        if (this.dt.selectionMode === 'single' || this.dt.selectionMode === 'multiple') {
            return !this.dt.selection ? 0 : this.dt.anchorRowIndex === this.index ? 0 : -1;
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    onTouchEnd(event) {
        if (this.isEnabled()) {
            this.dt.handleRowTouchEnd(event);
        }
    }
    onKeyDown(event) {
        switch (event.code) {
            case 'ArrowDown':
                this.onArrowDownKey(event);
                break;
            case 'ArrowUp':
                this.onArrowUpKey(event);
                break;
            case 'Home':
                this.onHomeKey(event);
                break;
            case 'End':
                this.onEndKey(event);
                break;
            case 'Space':
                this.onSpaceKey(event);
                break;
            case 'Enter':
                this.onEnterKey(event);
                break;
            default:
                if (event.code === 'KeyA' && (event.metaKey || event.ctrlKey) && this.dt.selectionMode === 'multiple') {
                    const data = this.dt.dataToRender(this.dt.processedData);
                    this.dt.selection = [...data];
                    this.dt.selectRange(event, data.length - 1);
                    event.preventDefault();
                }
                break;
        }
    }
    onArrowDownKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const nextRow = this.findNextSelectableRow(row);
        if (nextRow) {
            nextRow.focus();
        }
        event.preventDefault();
    }
    onArrowUpKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        const row = event.currentTarget;
        const prevRow = this.findPrevSelectableRow(row);
        if (prevRow) {
            prevRow.focus();
        }
        event.preventDefault();
    }
    onEnterKey(event) {
        if (!this.isEnabled()) {
            return;
        }
        this.dt.handleRowClick({
            originalEvent: event,
            rowData: this.data,
            rowIndex: this.index
        });
    }
    onEndKey(event) {
        const lastRow = this.findLastSelectableRow();
        lastRow && this.focusRowChange(this.el.nativeElement, lastRow);
        if (event.ctrlKey && event.shiftKey) {
            const data = this.dt.dataToRender(this.dt.rows);
            const lastSelectableRowIndex = DomHandler.getAttribute(lastRow, 'index');
            this.dt.anchorRowIndex = lastSelectableRowIndex;
            this.dt.selection = data.slice(this.index, data.length);
            this.dt.selectRange(event, this.index);
        }
        event.preventDefault();
    }
    onHomeKey(event) {
        const firstRow = this.findFirstSelectableRow();
        firstRow && this.focusRowChange(this.el.nativeElement, firstRow);
        if (event.ctrlKey && event.shiftKey) {
            const data = this.dt.dataToRender(this.dt.rows);
            const firstSelectableRowIndex = DomHandler.getAttribute(firstRow, 'index');
            this.dt.anchorRowIndex = this.dt.anchorRowIndex || firstSelectableRowIndex;
            this.dt.selection = data.slice(0, this.index + 1);
            this.dt.selectRange(event, this.index);
        }
        event.preventDefault();
    }
    onSpaceKey(event) {
        const isInput = event.target instanceof HTMLInputElement || event.target instanceof HTMLSelectElement || event.target instanceof HTMLTextAreaElement;
        if (isInput) {
            return;
        }
        else {
            this.onEnterKey(event);
            if (event.shiftKey && this.dt.selection !== null) {
                const data = this.dt.dataToRender(this.dt.rows);
                let index;
                if (ObjectUtils.isNotEmpty(this.dt.selection) && this.dt.selection.length > 0) {
                    let firstSelectedRowIndex, lastSelectedRowIndex;
                    firstSelectedRowIndex = ObjectUtils.findIndexInList(this.dt.selection[0], data);
                    lastSelectedRowIndex = ObjectUtils.findIndexInList(this.dt.selection[this.dt.selection.length - 1], data);
                    index = this.index <= firstSelectedRowIndex ? lastSelectedRowIndex : firstSelectedRowIndex;
                }
                else {
                    index = ObjectUtils.findIndexInList(this.dt.selection, data);
                }
                this.dt.anchorRowIndex = index;
                this.dt.selection = index !== this.index ? data.slice(Math.min(index, this.index), Math.max(index, this.index) + 1) : [this.data];
                this.dt.selectRange(event, this.index);
            }
            event.preventDefault();
        }
    }
    focusRowChange(firstFocusableRow, currentFocusedRow) {
        firstFocusableRow.tabIndex = '-1';
        currentFocusedRow.tabIndex = '0';
        DomHandler.focus(currentFocusedRow);
    }
    findLastSelectableRow() {
        const rows = DomHandler.find(this.dt.el.nativeElement, '.p-selectable-row');
        return rows ? rows[rows.length - 1] : null;
    }
    findFirstSelectableRow() {
        const firstRow = DomHandler.findSingle(this.dt.el.nativeElement, '.p-selectable-row');
        return firstRow;
    }
    findNextSelectableRow(row) {
        let nextRow = row.nextElementSibling;
        if (nextRow) {
            if (DomHandler.hasClass(nextRow, 'p-selectable-row'))
                return nextRow;
            else
                return this.findNextSelectableRow(nextRow);
        }
        else {
            return null;
        }
    }
    findPrevSelectableRow(row) {
        let prevRow = row.previousElementSibling;
        if (prevRow) {
            if (DomHandler.hasClass(prevRow, 'p-selectable-row'))
                return prevRow;
            else
                return this.findPrevSelectableRow(prevRow);
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SelectableRow, deps: [{ token: Table }, { token: TableService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: SelectableRow, selector: "[pSelectableRow]", inputs: { data: ["pSelectableRow", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "click": "onClick($event)", "touchend": "onTouchEnd($event)", "keydown": "onKeyDown($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected", "attr.tabindex": "setRowTabIndex()", "attr.data-p-highlight": "selected", "attr.data-p-selectable-row": "true" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SelectableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRow]',
                    host: {
                        class: 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected',
                        '[attr.tabindex]': 'setRowTabIndex()',
                        '[attr.data-p-highlight]': 'selected',
                        '[attr.data-p-selectable-row]': 'true'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pSelectableRow']
            }], index: [{
                type: Input,
                args: ['pSelectableRowIndex']
            }], pSelectableRowDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onTouchEnd: [{
                type: HostListener,
                args: ['touchend', ['$event']]
            }], onKeyDown: [{
                type: HostListener,
                args: ['keydown', ['$event']]
            }] } });
export class SelectableRowDblClick {
    dt;
    tableService;
    data;
    index;
    pSelectableRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService) {
        this.dt = dt;
        this.tableService = tableService;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
                this.selected = this.dt.isSelected(this.data);
            });
        }
    }
    ngOnInit() {
        if (this.isEnabled()) {
            this.selected = this.dt.isSelected(this.data);
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.handleRowClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
        }
    }
    isEnabled() {
        return this.pSelectableRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SelectableRowDblClick, deps: [{ token: Table }, { token: TableService }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: SelectableRowDblClick, selector: "[pSelectableRowDblClick]", inputs: { data: ["pSelectableRowDblClick", "data"], index: ["pSelectableRowIndex", "index"], pSelectableRowDisabled: "pSelectableRowDisabled" }, host: { listeners: { "dblclick": "onClick($event)" }, properties: { "class.p-selectable-row": "isEnabled()", "class.p-highlight": "selected" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SelectableRowDblClick, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSelectableRowDblClick]',
                    host: {
                        class: 'p-element',
                        '[class.p-selectable-row]': 'isEnabled()',
                        '[class.p-highlight]': 'selected'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }], propDecorators: { data: [{
                type: Input,
                args: ['pSelectableRowDblClick']
            }], index: [{
                type: Input,
                args: ['pSelectableRowIndex']
            }], pSelectableRowDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['dblclick', ['$event']]
            }] } });
export class ContextMenuRow {
    dt;
    tableService;
    el;
    data;
    index;
    pContextMenuRowDisabled;
    selected;
    subscription;
    constructor(dt, tableService, el) {
        this.dt = dt;
        this.tableService = tableService;
        this.el = el;
        if (this.isEnabled()) {
            this.subscription = this.dt.tableService.contextMenuSource$.subscribe((data) => {
                this.selected = this.dt.equals(this.data, data);
            });
        }
    }
    onContextMenu(event) {
        if (this.isEnabled()) {
            this.dt.handleRowRightClick({
                originalEvent: event,
                rowData: this.data,
                rowIndex: this.index
            });
            this.el.nativeElement.focus();
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pContextMenuRowDisabled !== true;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ContextMenuRow, deps: [{ token: Table }, { token: TableService }, { token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: ContextMenuRow, selector: "[pContextMenuRow]", inputs: { data: ["pContextMenuRow", "data"], index: ["pContextMenuRowIndex", "index"], pContextMenuRowDisabled: "pContextMenuRowDisabled" }, host: { listeners: { "contextmenu": "onContextMenu($event)" }, properties: { "class.p-highlight-contextmenu": "selected", "attr.tabindex": "isEnabled() ? 0 : undefined" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ContextMenuRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pContextMenuRow]',
                    host: {
                        class: 'p-element',
                        '[class.p-highlight-contextmenu]': 'selected',
                        '[attr.tabindex]': 'isEnabled() ? 0 : undefined'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pContextMenuRow']
            }], index: [{
                type: Input,
                args: ['pContextMenuRowIndex']
            }], pContextMenuRowDisabled: [{
                type: Input
            }], onContextMenu: [{
                type: HostListener,
                args: ['contextmenu', ['$event']]
            }] } });
export class RowToggler {
    dt;
    data;
    pRowTogglerDisabled;
    constructor(dt) {
        this.dt = dt;
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.toggleRow(this.data, event);
            event.preventDefault();
        }
    }
    isEnabled() {
        return this.pRowTogglerDisabled !== true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RowToggler, deps: [{ token: Table }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: RowToggler, selector: "[pRowToggler]", inputs: { data: ["pRowToggler", "data"], pRowTogglerDisabled: "pRowTogglerDisabled" }, host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: RowToggler, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pRowToggler]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }], propDecorators: { data: [{
                type: Input,
                args: ['pRowToggler']
            }], pRowTogglerDisabled: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class ResizableColumn {
    document;
    platformId;
    renderer;
    dt;
    el;
    zone;
    pResizableColumnDisabled;
    resizer;
    resizerMouseDownListener;
    documentMouseMoveListener;
    documentMouseUpListener;
    constructor(document, platformId, renderer, dt, el, zone) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.isEnabled()) {
                DomHandler.addClass(this.el.nativeElement, 'p-resizable-column');
                this.resizer = this.renderer.createElement('span');
                this.renderer.addClass(this.resizer, 'p-column-resizer');
                this.renderer.appendChild(this.el.nativeElement, this.resizer);
                this.zone.runOutsideAngular(() => {
                    this.resizerMouseDownListener = this.renderer.listen(this.resizer, 'mousedown', this.onMouseDown.bind(this));
                });
            }
        }
    }
    bindDocumentEvents() {
        this.zone.runOutsideAngular(() => {
            this.documentMouseMoveListener = this.renderer.listen(this.document, 'mousemove', this.onDocumentMouseMove.bind(this));
            this.documentMouseUpListener = this.renderer.listen(this.document, 'mouseup', this.onDocumentMouseUp.bind(this));
        });
    }
    unbindDocumentEvents() {
        if (this.documentMouseMoveListener) {
            this.documentMouseMoveListener();
            this.documentMouseMoveListener = null;
        }
        if (this.documentMouseUpListener) {
            this.documentMouseUpListener();
            this.documentMouseUpListener = null;
        }
    }
    onMouseDown(event) {
        if (event.which === 1) {
            this.dt.onColumnResizeBegin(event);
            this.bindDocumentEvents();
        }
    }
    onDocumentMouseMove(event) {
        this.dt.onColumnResize(event);
    }
    onDocumentMouseUp(event) {
        this.dt.onColumnResizeEnd();
        this.unbindDocumentEvents();
    }
    isEnabled() {
        return this.pResizableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.resizerMouseDownListener) {
            this.resizerMouseDownListener();
            this.resizerMouseDownListener = null;
        }
        this.unbindDocumentEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ResizableColumn, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: ResizableColumn, selector: "[pResizableColumn]", inputs: { pResizableColumnDisabled: "pResizableColumnDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ResizableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pResizableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { pResizableColumnDisabled: [{
                type: Input
            }] } });
export class ReorderableColumn {
    platformId;
    renderer;
    dt;
    el;
    zone;
    pReorderableColumnDisabled;
    dragStartListener;
    dragOverListener;
    dragEnterListener;
    dragLeaveListener;
    mouseDownListener;
    constructor(platformId, renderer, dt, el, zone) {
        this.platformId = platformId;
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.bindEvents();
        }
    }
    bindEvents() {
        if (isPlatformBrowser(this.platformId)) {
            this.zone.runOutsideAngular(() => {
                this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
                this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
                this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));
                this.dragEnterListener = this.renderer.listen(this.el.nativeElement, 'dragenter', this.onDragEnter.bind(this));
                this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
            });
        }
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
        }
        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }
        if (this.dragEnterListener) {
            this.dragEnterListener();
            this.dragEnterListener = null;
        }
        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (event.target.nodeName === 'INPUT' || event.target.nodeName === 'TEXTAREA' || DomHandler.hasClass(event.target, 'p-column-resizer'))
            this.el.nativeElement.draggable = false;
        else
            this.el.nativeElement.draggable = true;
    }
    onDragStart(event) {
        this.dt.onColumnDragStart(event, this.el.nativeElement);
    }
    onDragOver(event) {
        event.preventDefault();
    }
    onDragEnter(event) {
        this.dt.onColumnDragEnter(event, this.el.nativeElement);
    }
    onDragLeave(event) {
        this.dt.onColumnDragLeave(event);
    }
    onDrop(event) {
        if (this.isEnabled()) {
            this.dt.onColumnDrop(event, this.el.nativeElement);
        }
    }
    isEnabled() {
        return this.pReorderableColumnDisabled !== true;
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableColumn, deps: [{ token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: ReorderableColumn, selector: "[pReorderableColumn]", inputs: { pReorderableColumnDisabled: "pReorderableColumnDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { pReorderableColumnDisabled: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
export class EditableColumn {
    dt;
    el;
    zone;
    data;
    field;
    rowIndex;
    pEditableColumnDisabled;
    pFocusCellSelector;
    overlayEventListener;
    constructor(dt, el, zone) {
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngOnChanges(changes) {
        if (this.el.nativeElement && !changes.data?.firstChange) {
            this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        }
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            DomHandler.addClass(this.el.nativeElement, 'p-editable-column');
        }
    }
    onClick(event) {
        if (this.isEnabled()) {
            this.dt.selfClick = true;
            if (this.dt.editingCell) {
                if (this.dt.editingCell !== this.el.nativeElement) {
                    if (!this.dt.isEditingCellValid()) {
                        return;
                    }
                    this.closeEditingCell(true, event);
                    this.openCell();
                }
            }
            else {
                this.openCell();
            }
        }
    }
    openCell() {
        this.dt.updateEditingCell(this.el.nativeElement, this.data, this.field, this.rowIndex);
        DomHandler.addClass(this.el.nativeElement, 'p-cell-editing');
        this.dt.onEditInit.emit({ field: this.field, data: this.data, index: this.rowIndex });
        this.zone.runOutsideAngular(() => {
            setTimeout(() => {
                let focusCellSelector = this.pFocusCellSelector || 'input, textarea, select';
                let focusableElement = DomHandler.findSingle(this.el.nativeElement, focusCellSelector);
                if (focusableElement) {
                    focusableElement.focus();
                }
            }, 50);
        });
        this.overlayEventListener = (e) => {
            if (this.el && this.el.nativeElement.contains(e.target)) {
                this.dt.selfClick = true;
            }
        };
        this.dt.overlaySubscription = this.dt.overlayService.clickObservable.subscribe(this.overlayEventListener);
    }
    closeEditingCell(completed, event) {
        const eventData = { field: this.dt.editingCellField, data: this.dt.editingCellData, originalEvent: event, index: this.dt.editingCellRowIndex };
        if (completed) {
            this.dt.onEditComplete.emit(eventData);
        }
        else {
            this.dt.onEditCancel.emit(eventData);
            this.dt.value.forEach((element) => {
                if (element[this.dt.editingCellField] === this.data) {
                    element[this.dt.editingCellField] = this.dt.editingCellData;
                }
            });
        }
        DomHandler.removeClass(this.dt.editingCell, 'p-cell-editing');
        this.dt.editingCell = null;
        this.dt.editingCellData = null;
        this.dt.editingCellField = null;
        this.dt.unbindDocumentEditListener();
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
    onEnterKeyDown(event) {
        if (this.isEnabled() && !event.shiftKey) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    }
    onTabKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(true, event);
            }
            event.preventDefault();
        }
    }
    onEscapeKeyDown(event) {
        if (this.isEnabled()) {
            if (this.dt.isEditingCellValid()) {
                this.closeEditingCell(false, event);
            }
            event.preventDefault();
        }
    }
    onShiftKeyDown(event) {
        if (this.isEnabled()) {
            if (event.shiftKey)
                this.moveToPreviousCell(event);
            else {
                this.moveToNextCell(event);
            }
        }
    }
    onArrowDown(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findNextEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowUp(event) {
        if (this.isEnabled()) {
            let currentCell = this.findCell(event.target);
            if (currentCell) {
                let cellIndex = DomHandler.index(currentCell);
                let targetCell = this.findPrevEditableColumnByIndex(currentCell, cellIndex);
                if (targetCell) {
                    if (this.dt.isEditingCellValid()) {
                        this.closeEditingCell(true, event);
                    }
                    DomHandler.invokeElementMethod(event.target, 'blur');
                    DomHandler.invokeElementMethod(targetCell, 'click');
                }
                event.preventDefault();
            }
        }
    }
    onArrowLeft(event) {
        if (this.isEnabled()) {
            this.moveToPreviousCell(event);
        }
    }
    onArrowRight(event) {
        if (this.isEnabled()) {
            this.moveToNextCell(event);
        }
    }
    findCell(element) {
        if (element) {
            let cell = element;
            while (cell && !DomHandler.hasClass(cell, 'p-cell-editing')) {
                cell = cell.parentElement;
            }
            return cell;
        }
        else {
            return null;
        }
    }
    moveToPreviousCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findPreviousEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
        }
    }
    moveToNextCell(event) {
        let currentCell = this.findCell(event.target);
        if (currentCell) {
            let targetCell = this.findNextEditableColumn(currentCell);
            if (targetCell) {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
                DomHandler.invokeElementMethod(event.target, 'blur');
                DomHandler.invokeElementMethod(targetCell, 'click');
                event.preventDefault();
            }
            else {
                if (this.dt.isEditingCellValid()) {
                    this.closeEditingCell(true, event);
                }
            }
        }
    }
    findPreviousEditableColumn(cell) {
        let prevCell = cell.previousElementSibling;
        if (!prevCell) {
            let previousRow = cell.parentElement?.previousElementSibling;
            if (previousRow) {
                prevCell = previousRow.lastElementChild;
            }
        }
        if (prevCell) {
            if (DomHandler.hasClass(prevCell, 'p-editable-column'))
                return prevCell;
            else
                return this.findPreviousEditableColumn(prevCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumn(cell) {
        let nextCell = cell.nextElementSibling;
        if (!nextCell) {
            let nextRow = cell.parentElement?.nextElementSibling;
            if (nextRow) {
                nextCell = nextRow.firstElementChild;
            }
        }
        if (nextCell) {
            if (DomHandler.hasClass(nextCell, 'p-editable-column'))
                return nextCell;
            else
                return this.findNextEditableColumn(nextCell);
        }
        else {
            return null;
        }
    }
    findNextEditableColumnByIndex(cell, index) {
        let nextRow = cell.parentElement?.nextElementSibling;
        if (nextRow) {
            let nextCell = nextRow.children[index];
            if (nextCell && DomHandler.hasClass(nextCell, 'p-editable-column')) {
                return nextCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    findPrevEditableColumnByIndex(cell, index) {
        let prevRow = cell.parentElement?.previousElementSibling;
        if (prevRow) {
            let prevCell = prevRow.children[index];
            if (prevCell && DomHandler.hasClass(prevCell, 'p-editable-column')) {
                return prevCell;
            }
            return null;
        }
        else {
            return null;
        }
    }
    isEnabled() {
        return this.pEditableColumnDisabled !== true;
    }
    ngOnDestroy() {
        if (this.dt.overlaySubscription) {
            this.dt.overlaySubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: EditableColumn, deps: [{ token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: EditableColumn, selector: "[pEditableColumn]", inputs: { data: ["pEditableColumn", "data"], field: ["pEditableColumnField", "field"], rowIndex: ["pEditableColumnRowIndex", "rowIndex"], pEditableColumnDisabled: "pEditableColumnDisabled", pFocusCellSelector: "pFocusCellSelector" }, host: { listeners: { "click": "onClick($event)", "keydown.enter": "onEnterKeyDown($event)", "keydown.tab": "onShiftKeyDown($event)", "keydown.escape": "onEscapeKeyDown($event)", "keydown.shift.tab": "onShiftKeyDown($event)", "keydown.meta.tab": "onShiftKeyDown($event)", "keydown.arrowdown": "onArrowDown($event)", "keydown.arrowup": "onArrowUp($event)", "keydown.arrowleft": "onArrowLeft($event)", "keydown.arrowright": "onArrowRight($event)" }, classAttribute: "p-element" }, usesOnChanges: true, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: EditableColumn, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableColumn]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { data: [{
                type: Input,
                args: ['pEditableColumn']
            }], field: [{
                type: Input,
                args: ['pEditableColumnField']
            }], rowIndex: [{
                type: Input,
                args: ['pEditableColumnRowIndex']
            }], pEditableColumnDisabled: [{
                type: Input
            }], pFocusCellSelector: [{
                type: Input
            }], onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }], onEnterKeyDown: [{
                type: HostListener,
                args: ['keydown.enter', ['$event']]
            }], onTabKeyDown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }], onEscapeKeyDown: [{
                type: HostListener,
                args: ['keydown.escape', ['$event']]
            }], onShiftKeyDown: [{
                type: HostListener,
                args: ['keydown.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.shift.tab', ['$event']]
            }, {
                type: HostListener,
                args: ['keydown.meta.tab', ['$event']]
            }], onArrowDown: [{
                type: HostListener,
                args: ['keydown.arrowdown', ['$event']]
            }], onArrowUp: [{
                type: HostListener,
                args: ['keydown.arrowup', ['$event']]
            }], onArrowLeft: [{
                type: HostListener,
                args: ['keydown.arrowleft', ['$event']]
            }], onArrowRight: [{
                type: HostListener,
                args: ['keydown.arrowright', ['$event']]
            }] } });
export class EditableRow {
    el;
    data;
    pEditableRowDisabled;
    constructor(el) {
        this.el = el;
    }
    isEnabled() {
        return this.pEditableRowDisabled !== true;
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: EditableRow, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: EditableRow, selector: "[pEditableRow]", inputs: { data: ["pEditableRow", "data"], pEditableRowDisabled: "pEditableRowDisabled" }, host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: EditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }], propDecorators: { data: [{
                type: Input,
                args: ['pEditableRow']
            }], pEditableRowDisabled: [{
                type: Input
            }] } });
export class InitEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.initRowEdit(this.editableRow.data);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: InitEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: InitEditableRow, selector: "[pInitEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: InitEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pInitEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class SaveEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.saveRowEdit(this.editableRow.data, this.editableRow.el.nativeElement);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SaveEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: SaveEditableRow, selector: "[pSaveEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: SaveEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pSaveEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class CancelEditableRow {
    dt;
    editableRow;
    constructor(dt, editableRow) {
        this.dt = dt;
        this.editableRow = editableRow;
    }
    onClick(event) {
        this.dt.cancelRowEdit(this.editableRow.data);
        event.preventDefault();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: CancelEditableRow, deps: [{ token: Table }, { token: EditableRow }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: CancelEditableRow, selector: "[pCancelEditableRow]", host: { listeners: { "click": "onClick($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: CancelEditableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pCancelEditableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableRow }], propDecorators: { onClick: [{
                type: HostListener,
                args: ['click', ['$event']]
            }] } });
export class CellEditor {
    dt;
    editableColumn;
    editableRow;
    templates;
    inputTemplate;
    outputTemplate;
    constructor(dt, editableColumn, editableRow) {
        this.dt = dt;
        this.editableColumn = editableColumn;
        this.editableRow = editableRow;
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'input':
                    this.inputTemplate = item.template;
                    break;
                case 'output':
                    this.outputTemplate = item.template;
                    break;
            }
        });
    }
    get editing() {
        return (this.dt.editingCell && this.editableColumn && this.dt.editingCell === this.editableColumn.el.nativeElement) || (this.editableRow && this.dt.editMode === 'row' && this.dt.isRowEditing(this.editableRow.data));
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: CellEditor, deps: [{ token: Table }, { token: EditableColumn, optional: true }, { token: EditableRow, optional: true }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: CellEditor, selector: "p-cellEditor", host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], ngImport: i0, template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: CellEditor, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-cellEditor',
                    template: `
        <ng-container *ngIf="editing">
            <ng-container *ngTemplateOutlet="inputTemplate"></ng-container>
        </ng-container>
        <ng-container *ngIf="!editing">
            <ng-container *ngTemplateOutlet="outputTemplate"></ng-container>
        </ng-container>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: EditableColumn, decorators: [{
                    type: Optional
                }] }, { type: EditableRow, decorators: [{
                    type: Optional
                }] }], propDecorators: { templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class TableRadioButton {
    dt;
    cd;
    disabled;
    value;
    index;
    inputId;
    name;
    ariaLabel;
    inputViewChild;
    checked;
    focused;
    subscription;
    constructor(dt, cd) {
        this.dt = dt;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectRow : this.dt.config.translation.aria.unselectRow) : undefined;
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithRadio({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
            this.inputViewChild?.nativeElement?.focus();
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableRadioButton, deps: [{ token: Table }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TableRadioButton, selector: "p-tableRadioButton", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, viewQueries: [{ propertyName: "inputViewChild", first: true, predicate: ["rb"], descendants: true }], ngImport: i0, template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" [tabindex]="disabled ? null : '0'" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableRadioButton, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableRadioButton',
                    template: `
        <div class="p-radiobutton p-component" [ngClass]="{ 'p-radiobutton-focused': focused, 'p-radiobutton-checked': checked, 'p-radiobutton-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #rb type="radio" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="disabled" [attr.aria-label]="ariaLabel" [tabindex]="disabled ? null : '0'" />
            </div>
            <div #box [ngClass]="{ 'p-radiobutton-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <div class="p-radiobutton-icon"></div>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], index: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }], inputViewChild: [{
                type: ViewChild,
                args: ['rb']
            }] } });
export class TableCheckbox {
    dt;
    tableService;
    cd;
    disabled;
    value;
    index;
    inputId;
    name;
    required;
    ariaLabel;
    checked;
    focused;
    subscription;
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.subscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.dt.isSelected(this.value);
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectRow : this.dt.config.translation.aria.unselectRow) : undefined;
            this.cd.markForCheck();
        });
    }
    ngOnInit() {
        this.checked = this.dt.isSelected(this.value);
    }
    onClick(event) {
        if (!this.disabled) {
            this.dt.toggleRowWithCheckbox({
                originalEvent: event,
                rowIndex: this.index
            }, this.value);
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TableCheckbox, selector: "p-tableCheckbox", inputs: { disabled: "disabled", value: "value", index: "index", inputId: "inputId", name: "name", required: "required", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    type="checkbox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [checked]="checked"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [disabled]="disabled"
                    [attr.required]="required"
                    [attr.aria-label]="ariaLabel"
                    [tabindex]="disabled ? null : '0'"
                />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableCheckbox',
                    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': disabled }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input
                    type="checkbox"
                    [attr.id]="inputId"
                    [attr.name]="name"
                    [checked]="checked"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    [disabled]="disabled"
                    [attr.required]="required"
                    [attr.aria-label]="ariaLabel"
                    [tabindex]="disabled ? null : '0'"
                />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box p-component': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': disabled }">
                <ng-container *ngIf="!dt.checkboxIconTemplate">
                    <CheckIcon [styleClass]="'p-checkbox-icon'" *ngIf="checked" />
                </ng-container>
                <span *ngIf="dt.checkboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.checkboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input
            }], value: [{
                type: Input
            }], index: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], required: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });
export class TableHeaderCheckbox {
    dt;
    tableService;
    cd;
    disabled;
    inputId;
    name;
    ariaLabel;
    checked;
    focused;
    selectionChangeSubscription;
    valueChangeSubscription;
    constructor(dt, tableService, cd) {
        this.dt = dt;
        this.tableService = tableService;
        this.cd = cd;
        this.valueChangeSubscription = this.dt.tableService.valueSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
            this.ariaLabel = this.ariaLabel || this.dt.config.translation.aria ? (this.checked ? this.dt.config.translation.aria.selectAll : this.dt.config.translation.aria.unselectAll) : undefined;
        });
        this.selectionChangeSubscription = this.dt.tableService.selectionSource$.subscribe(() => {
            this.checked = this.updateCheckedState();
        });
    }
    ngOnInit() {
        this.checked = this.updateCheckedState();
    }
    onClick(event) {
        if (!this.disabled) {
            if (this.dt.value && this.dt.value.length > 0) {
                this.dt.toggleRowsWithCheckbox(event, !this.checked);
            }
        }
        DomHandler.clearSelection();
    }
    onFocus() {
        this.focused = true;
    }
    onBlur() {
        this.focused = false;
    }
    isDisabled() {
        return this.disabled || !this.dt.value || !this.dt.value.length;
    }
    ngOnDestroy() {
        if (this.selectionChangeSubscription) {
            this.selectionChangeSubscription.unsubscribe();
        }
        if (this.valueChangeSubscription) {
            this.valueChangeSubscription.unsubscribe();
        }
    }
    updateCheckedState() {
        this.cd.markForCheck();
        if (this.dt._selectAll !== null) {
            return this.dt._selectAll;
        }
        else {
            const data = this.dt.selectionPageOnly ? this.dt.dataToRender(this.dt.processedData) : this.dt.processedData;
            const val = this.dt.frozenValue ? [...this.dt.frozenValue, ...data] : data;
            const selectableVal = this.dt.rowSelectable ? val.filter((data, index) => this.dt.rowSelectable({ data, index })) : val;
            return ObjectUtils.isNotEmpty(selectableVal) && ObjectUtils.isNotEmpty(this.dt.selection) && selectableVal.every((v) => this.dt.selection.some((s) => this.dt.equals(v, s)));
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableHeaderCheckbox, deps: [{ token: Table }, { token: TableService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: TableHeaderCheckbox, selector: "p-tableHeaderCheckbox", inputs: { disabled: "disabled", inputId: "inputId", name: "name", ariaLabel: "ariaLabel" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [tabindex]="disabled ? null : '0'" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => CheckIcon), selector: "CheckIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableHeaderCheckbox, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-tableHeaderCheckbox',
                    template: `
        <div class="p-checkbox p-component" [ngClass]="{ 'p-checkbox-focused': focused, 'p-checkbox-disabled': isDisabled() }" (click)="onClick($event)">
            <div class="p-hidden-accessible">
                <input #cb type="checkbox" [tabindex]="disabled ? null : '0'" [attr.id]="inputId" [attr.name]="name" [checked]="checked" (focus)="onFocus()" (blur)="onBlur()" [disabled]="isDisabled()" [attr.aria-label]="ariaLabel" />
            </div>
            <div #box [ngClass]="{ 'p-checkbox-box': true, 'p-highlight': checked, 'p-focus': focused, 'p-disabled': isDisabled() }">
                <ng-container *ngIf="!dt.headerCheckboxIconTemplate">
                    <CheckIcon *ngIf="checked" [styleClass]="'p-checkbox-icon'" />
                </ng-container>
                <span class="p-checkbox-icon" *ngIf="dt.headerCheckboxIconTemplate">
                    <ng-template *ngTemplateOutlet="dt.headerCheckboxIconTemplate; context: { $implicit: checked }"></ng-template>
                </span>
            </div>
        </div>
    `,
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: TableService }, { type: i0.ChangeDetectorRef }], propDecorators: { disabled: [{
                type: Input
            }], inputId: [{
                type: Input
            }], name: [{
                type: Input
            }], ariaLabel: [{
                type: Input
            }] } });
export class ReorderableRowHandle {
    el;
    constructor(el) {
        this.el = el;
    }
    ngAfterViewInit() {
        DomHandler.addClass(this.el.nativeElement, 'p-datatable-reorderablerow-handle');
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableRowHandle, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: ReorderableRowHandle, selector: "[pReorderableRowHandle]", host: { classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableRowHandle, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRowHandle]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.ElementRef }] });
export class ReorderableRow {
    renderer;
    dt;
    el;
    zone;
    index;
    pReorderableRowDisabled;
    mouseDownListener;
    dragStartListener;
    dragEndListener;
    dragOverListener;
    dragLeaveListener;
    dropListener;
    constructor(renderer, dt, el, zone) {
        this.renderer = renderer;
        this.dt = dt;
        this.el = el;
        this.zone = zone;
    }
    ngAfterViewInit() {
        if (this.isEnabled()) {
            this.el.nativeElement.droppable = true;
            this.bindEvents();
        }
    }
    bindEvents() {
        this.zone.runOutsideAngular(() => {
            this.mouseDownListener = this.renderer.listen(this.el.nativeElement, 'mousedown', this.onMouseDown.bind(this));
            this.dragStartListener = this.renderer.listen(this.el.nativeElement, 'dragstart', this.onDragStart.bind(this));
            this.dragEndListener = this.renderer.listen(this.el.nativeElement, 'dragend', this.onDragEnd.bind(this));
            this.dragOverListener = this.renderer.listen(this.el.nativeElement, 'dragover', this.onDragOver.bind(this));
            this.dragLeaveListener = this.renderer.listen(this.el.nativeElement, 'dragleave', this.onDragLeave.bind(this));
        });
    }
    unbindEvents() {
        if (this.mouseDownListener) {
            this.mouseDownListener();
            this.mouseDownListener = null;
        }
        if (this.dragStartListener) {
            this.dragStartListener();
            this.dragStartListener = null;
        }
        if (this.dragEndListener) {
            this.dragEndListener();
            this.dragEndListener = null;
        }
        if (this.dragOverListener) {
            this.dragOverListener();
            this.dragOverListener = null;
        }
        if (this.dragLeaveListener) {
            this.dragLeaveListener();
            this.dragLeaveListener = null;
        }
    }
    onMouseDown(event) {
        if (DomHandler.hasClass(event.target, 'p-datatable-reorderablerow-handle'))
            this.el.nativeElement.draggable = true;
        else
            this.el.nativeElement.draggable = false;
    }
    onDragStart(event) {
        this.dt.onRowDragStart(event, this.index);
    }
    onDragEnd(event) {
        this.dt.onRowDragEnd(event);
        this.el.nativeElement.draggable = false;
    }
    onDragOver(event) {
        this.dt.onRowDragOver(event, this.index, this.el.nativeElement);
        event.preventDefault();
    }
    onDragLeave(event) {
        this.dt.onRowDragLeave(event, this.el.nativeElement);
    }
    isEnabled() {
        return this.pReorderableRowDisabled !== true;
    }
    onDrop(event) {
        if (this.isEnabled() && this.dt.rowDragging) {
            this.dt.onRowDrop(event, this.el.nativeElement);
        }
        event.preventDefault();
    }
    ngOnDestroy() {
        this.unbindEvents();
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableRow, deps: [{ token: i0.Renderer2 }, { token: Table }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
    static ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "17.2.2", type: ReorderableRow, selector: "[pReorderableRow]", inputs: { index: ["pReorderableRow", "index"], pReorderableRowDisabled: "pReorderableRowDisabled" }, host: { listeners: { "drop": "onDrop($event)" }, classAttribute: "p-element" }, ngImport: i0 });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ReorderableRow, decorators: [{
            type: Directive,
            args: [{
                    selector: '[pReorderableRow]',
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: i0.Renderer2 }, { type: Table }, { type: i0.ElementRef }, { type: i0.NgZone }], propDecorators: { index: [{
                type: Input,
                args: ['pReorderableRow']
            }], pReorderableRowDisabled: [{
                type: Input
            }], onDrop: [{
                type: HostListener,
                args: ['drop', ['$event']]
            }] } });
/**
 * Column Filter element of Table.
 * @group Components
 */
export class ColumnFilter {
    document;
    el;
    dt;
    renderer;
    config;
    overlayService;
    cd;
    /**
     * Property represented by the column.
     * @group Props
     */
    field;
    /**
     * Type of the input.
     * @group Props
     */
    type = 'text';
    /**
     * Filter display.
     * @group Props
     */
    display = 'row';
    /**
     * Decides whether to display filter menu popup.
     * @group Props
     */
    showMenu = true;
    /**
     * Filter match mode.
     * @group Props
     */
    matchMode;
    /**
     * Filter operator.
     * @defaultValue 'AND'
     * @group Props
     */
    operator = FilterOperator.AND;
    /**
     * Decides whether to display filter operator.
     * @group Props
     */
    showOperator = true;
    /**
     * Decides whether to display clear filter button.
     * @group Props
     */
    showClearButton = true;
    /**
     * Decides whether to display apply filter button.
     * @group Props
     */
    showApplyButton = true;
    /**
     * Decides whether to display filter match modes.
     * @group Props
     */
    showMatchModes = true;
    /**
     * Decides whether to display add filter button.
     * @group Props
     */
    showAddButton = true;
    /**
     * Decides whether to close popup on clear button click.
     * @group Props
     */
    hideOnClear = false;
    /**
     * Filter placeholder.
     * @group Props
     */
    placeholder;
    /**
     * Filter match mode options.
     * @group Props
     */
    matchModeOptions;
    /**
     * Defines maximum amount of constraints.
     * @group Props
     */
    maxConstraints = 2;
    /**
     * Defines minimum fraction of digits.
     * @group Props
     */
    minFractionDigits;
    /**
     * Defines maximum fraction of digits.
     * @group Props
     */
    maxFractionDigits;
    /**
     * Defines prefix of the filter.
     * @group Props
     */
    prefix;
    /**
     * Defines suffix of the filter.
     * @group Props
     */
    suffix;
    /**
     * Defines filter locale.
     * @group Props
     */
    locale;
    /**
     * Defines filter locale matcher.
     * @group Props
     */
    localeMatcher;
    /**
     * Enables currency input.
     * @group Props
     */
    currency;
    /**
     * Defines the display of the currency input.
     * @group Props
     */
    currencyDisplay;
    /**
     * Defines if filter grouping will be enabled.
     * @group Props
     */
    useGrouping = true;
    /**
     * Defines the visibility of buttons.
     * @group Props
     */
    showButtons = true;
    icon;
    clearButtonViewChild;
    templates;
    overlaySubscription;
    headerTemplate;
    filterTemplate;
    footerTemplate;
    filterIconTemplate;
    removeRuleIconTemplate;
    addRuleIconTemplate;
    clearFilterIconTemplate;
    operatorOptions;
    overlayVisible;
    overlay;
    scrollHandler;
    documentClickListener;
    documentResizeListener;
    matchModes;
    translationSubscription;
    resetSubscription;
    selfClick;
    overlayEventListener;
    window;
    overlayId;
    get fieldConstraints() {
        return this.dt.filters ? this.dt.filters[this.field] : null;
    }
    get showRemoveIcon() {
        return this.fieldConstraints ? this.fieldConstraints.length > 1 : false;
    }
    get showMenuButton() {
        return this.showMenu && (this.display === 'row' ? this.type !== 'boolean' : true);
    }
    get isShowOperator() {
        return this.showOperator && this.type !== 'boolean';
    }
    get isShowAddConstraint() {
        return this.showAddButton && this.type !== 'boolean' && this.fieldConstraints && this.fieldConstraints.length < this.maxConstraints;
    }
    get showMenuButtonLabel() {
        return this.config.getTranslation(TranslationKeys.SHOW_FILTER_MENU);
    }
    get applyButtonLabel() {
        return this.config.getTranslation(TranslationKeys.APPLY);
    }
    get clearButtonLabel() {
        return this.config.getTranslation(TranslationKeys.CLEAR);
    }
    get addRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.ADD_RULE);
    }
    get removeRuleButtonLabel() {
        return this.config.getTranslation(TranslationKeys.REMOVE_RULE);
    }
    get noFilterLabel() {
        return this.config.getTranslation(TranslationKeys.NO_FILTER);
    }
    get filterMenuButtonAriaLabel() {
        return this.config.translation ? (this.overlayVisible ? this.config.translation.aria.hideFilterMenu : this.config.translation.aria.showFilterMenu) : undefined;
    }
    get removeRuleButtonAriaLabel() {
        return this.config.translation ? this.config.translation.removeRule : undefined;
    }
    get filterOperatorAriaLabel() {
        return this.config.translation ? this.config.translation.aria.filterOperator : undefined;
    }
    get filterConstraintAriaLabel() {
        return this.config.translation ? this.config.translation.aria.filterConstraint : undefined;
    }
    constructor(document, el, dt, renderer, config, overlayService, cd) {
        this.document = document;
        this.el = el;
        this.dt = dt;
        this.renderer = renderer;
        this.config = config;
        this.overlayService = overlayService;
        this.cd = cd;
        this.window = this.document.defaultView;
    }
    ngOnInit() {
        this.overlayId = UniqueComponentId();
        if (!this.dt.filters[this.field]) {
            this.initFieldFilterConstraint();
        }
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.generateMatchModeOptions();
            this.generateOperatorOptions();
        });
        this.generateMatchModeOptions();
        this.generateOperatorOptions();
    }
    generateMatchModeOptions() {
        this.matchModes =
            this.matchModeOptions ||
                this.config.filterMatchModeOptions[this.type]?.map((key) => {
                    return { label: this.config.getTranslation(key), value: key };
                });
    }
    generateOperatorOptions() {
        this.operatorOptions = [
            { label: this.config.getTranslation(TranslationKeys.MATCH_ALL), value: FilterOperator.AND },
            { label: this.config.getTranslation(TranslationKeys.MATCH_ANY), value: FilterOperator.OR }
        ];
    }
    ngAfterContentInit() {
        this.templates.forEach((item) => {
            switch (item.getType()) {
                case 'header':
                    this.headerTemplate = item.template;
                    break;
                case 'filter':
                    this.filterTemplate = item.template;
                    break;
                case 'footer':
                    this.footerTemplate = item.template;
                    break;
                case 'filtericon':
                    this.filterIconTemplate = item.template;
                    break;
                case 'clearfiltericon':
                    this.clearFilterIconTemplate = item.template;
                    break;
                case 'removeruleicon':
                    this.removeRuleIconTemplate = item.template;
                    break;
                case 'addruleicon':
                    this.addRuleIconTemplate = item.template;
                    break;
                default:
                    this.filterTemplate = item.template;
                    break;
            }
        });
    }
    initFieldFilterConstraint() {
        let defaultMatchMode = this.getDefaultMatchMode();
        this.dt.filters[this.field] = this.display == 'row' ? { value: null, matchMode: defaultMatchMode } : [{ value: null, matchMode: defaultMatchMode, operator: this.operator }];
    }
    onMenuMatchModeChange(value, filterMeta) {
        filterMeta.matchMode = value;
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    onRowMatchModeChange(matchMode) {
        this.dt.filters[this.field].matchMode = matchMode;
        this.dt._filter();
        this.hide();
    }
    onRowMatchModeKeyDown(event) {
        let item = event.target;
        switch (event.key) {
            case 'ArrowDown':
                var nextItem = this.findNextItem(item);
                if (nextItem) {
                    item.removeAttribute('tabindex');
                    nextItem.tabIndex = '0';
                    nextItem.focus();
                }
                event.preventDefault();
                break;
            case 'ArrowUp':
                var prevItem = this.findPrevItem(item);
                if (prevItem) {
                    item.removeAttribute('tabindex');
                    prevItem.tabIndex = '0';
                    prevItem.focus();
                }
                event.preventDefault();
                break;
        }
    }
    onRowClearItemClick() {
        this.clearFilter();
        this.hide();
    }
    isRowMatchModeSelected(matchMode) {
        return this.dt.filters[this.field].matchMode === matchMode;
    }
    addConstraint() {
        this.dt.filters[this.field].push({ value: null, matchMode: this.getDefaultMatchMode(), operator: this.getDefaultOperator() });
        DomHandler.focus(this.clearButtonViewChild.nativeElement);
    }
    removeConstraint(filterMeta) {
        this.dt.filters[this.field] = this.dt.filters[this.field].filter((meta) => meta !== filterMeta);
        this.dt._filter();
        DomHandler.focus(this.clearButtonViewChild.nativeElement);
    }
    onOperatorChange(value) {
        this.dt.filters[this.field].forEach((filterMeta) => {
            filterMeta.operator = value;
            this.operator = value;
        });
        if (!this.showApplyButton) {
            this.dt._filter();
        }
    }
    toggleMenu() {
        this.overlayVisible = !this.overlayVisible;
    }
    onToggleButtonKeyDown(event) {
        switch (event.key) {
            case 'Escape':
            case 'Tab':
                this.overlayVisible = false;
                break;
            case 'ArrowDown':
                if (this.overlayVisible) {
                    let focusable = DomHandler.getFocusableElements(this.overlay);
                    if (focusable) {
                        focusable[0].focus();
                    }
                    event.preventDefault();
                }
                else if (event.altKey) {
                    this.overlayVisible = true;
                    event.preventDefault();
                }
                break;
            case 'Enter':
                this.toggleMenu();
                event.preventDefault();
                break;
        }
    }
    onEscape() {
        this.overlayVisible = false;
        this.icon?.nativeElement.focus();
    }
    findNextItem(item) {
        let nextItem = item.nextElementSibling;
        if (nextItem)
            return DomHandler.hasClass(nextItem, 'p-column-filter-separator') ? this.findNextItem(nextItem) : nextItem;
        else
            return item.parentElement?.firstElementChild;
    }
    findPrevItem(item) {
        let prevItem = item.previousElementSibling;
        if (prevItem)
            return DomHandler.hasClass(prevItem, 'p-column-filter-separator') ? this.findPrevItem(prevItem) : prevItem;
        else
            return item.parentElement?.lastElementChild;
    }
    onContentClick() {
        this.selfClick = true;
    }
    onOverlayAnimationStart(event) {
        switch (event.toState) {
            case 'visible':
                this.overlay = event.element;
                this.renderer.appendChild(this.document.body, this.overlay);
                ZIndexUtils.set('overlay', this.overlay, this.config.zIndex.overlay);
                DomHandler.absolutePosition(this.overlay, this.icon?.nativeElement);
                this.bindDocumentClickListener();
                this.bindDocumentResizeListener();
                this.bindScrollListener();
                this.overlayEventListener = (e) => {
                    if (this.overlay && this.overlay.contains(e.target)) {
                        this.selfClick = true;
                    }
                };
                this.overlaySubscription = this.overlayService.clickObservable.subscribe(this.overlayEventListener);
                break;
            case 'void':
                this.onOverlayHide();
                if (this.overlaySubscription) {
                    this.overlaySubscription.unsubscribe();
                }
                break;
        }
    }
    onOverlayAnimationEnd(event) {
        switch (event.toState) {
            case 'visible':
                this.focusOnFirstElement();
                break;
            case 'void':
                ZIndexUtils.clear(event.element);
                break;
        }
    }
    focusOnFirstElement() {
        if (this.overlay) {
            DomHandler.focus(DomHandler.getFirstFocusableElement(this.overlay, ''));
        }
    }
    getDefaultMatchMode() {
        if (this.matchMode) {
            return this.matchMode;
        }
        else {
            if (this.type === 'text')
                return FilterMatchMode.STARTS_WITH;
            else if (this.type === 'numeric')
                return FilterMatchMode.EQUALS;
            else if (this.type === 'date')
                return FilterMatchMode.DATE_IS;
            else
                return FilterMatchMode.CONTAINS;
        }
    }
    getDefaultOperator() {
        return this.dt.filters ? this.dt.filters[this.field][0].operator : this.operator;
    }
    hasRowFilter() {
        return this.dt.filters[this.field] && !this.dt.isFilterBlank(this.dt.filters[this.field].value);
    }
    hasFilter() {
        let fieldFilter = this.dt.filters[this.field];
        if (fieldFilter) {
            if (Array.isArray(fieldFilter))
                return !this.dt.isFilterBlank(fieldFilter[0].value);
            else
                return !this.dt.isFilterBlank(fieldFilter.value);
        }
        return false;
    }
    isOutsideClicked(event) {
        return !(this.overlay?.isSameNode(event.target) ||
            this.overlay?.contains(event.target) ||
            this.icon?.nativeElement.isSameNode(event.target) ||
            this.icon?.nativeElement.contains(event.target) ||
            DomHandler.hasClass(event.target, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-add-button') ||
            DomHandler.hasClass(event.target, 'p-column-filter-remove-button') ||
            DomHandler.hasClass(event.target.parentElement, 'p-column-filter-remove-button'));
    }
    bindDocumentClickListener() {
        if (!this.documentClickListener) {
            const documentTarget = this.el ? this.el.nativeElement.ownerDocument : 'document';
            this.documentClickListener = this.renderer.listen(documentTarget, 'mousedown', (event) => {
                if (this.overlayVisible && this.isOutsideClicked(event)) {
                    this.hide();
                }
                this.selfClick = false;
            });
        }
    }
    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            this.documentClickListener();
            this.documentClickListener = null;
            this.selfClick = false;
        }
    }
    bindDocumentResizeListener() {
        if (!this.documentResizeListener) {
            this.documentResizeListener = this.renderer.listen(this.window, 'resize', (event) => {
                if (this.overlayVisible && !DomHandler.isTouchDevice()) {
                    this.hide();
                }
            });
        }
    }
    unbindDocumentResizeListener() {
        if (this.documentResizeListener) {
            this.documentResizeListener();
            this.documentResizeListener = null;
        }
    }
    bindScrollListener() {
        if (!this.scrollHandler) {
            this.scrollHandler = new ConnectedOverlayScrollHandler(this.icon?.nativeElement, () => {
                if (this.overlayVisible) {
                    this.hide();
                }
            });
        }
        this.scrollHandler.bindScrollListener();
    }
    unbindScrollListener() {
        if (this.scrollHandler) {
            this.scrollHandler.unbindScrollListener();
        }
    }
    hide() {
        this.overlayVisible = false;
        this.cd.markForCheck();
    }
    onOverlayHide() {
        this.unbindDocumentClickListener();
        this.unbindDocumentResizeListener();
        this.unbindScrollListener();
        this.overlay = null;
    }
    clearFilter() {
        this.initFieldFilterConstraint();
        this.dt._filter();
        if (this.hideOnClear)
            this.hide();
    }
    applyFilter() {
        this.dt._filter();
        this.hide();
    }
    ngOnDestroy() {
        if (this.overlay) {
            this.renderer.appendChild(this.el.nativeElement, this.overlay);
            ZIndexUtils.clear(this.overlay);
            this.onOverlayHide();
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
        if (this.resetSubscription) {
            this.resetSubscription.unsubscribe();
        }
        if (this.overlaySubscription) {
            this.overlaySubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ColumnFilter, deps: [{ token: DOCUMENT }, { token: i0.ElementRef }, { token: Table }, { token: i0.Renderer2 }, { token: i1.PrimeNGConfig }, { token: i1.OverlayService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: ColumnFilter, selector: "p-columnFilter", inputs: { field: "field", type: "type", display: "display", showMenu: "showMenu", matchMode: "matchMode", operator: "operator", showOperator: "showOperator", showClearButton: "showClearButton", showApplyButton: "showApplyButton", showMatchModes: "showMatchModes", showAddButton: "showAddButton", hideOnClear: "hideOnClear", placeholder: "placeholder", matchModeOptions: "matchModeOptions", maxConstraints: "maxConstraints", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping", showButtons: "showButtons" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "icon", first: true, predicate: ["icon"], descendants: true }, { propertyName: "clearButtonViewChild", first: true, predicate: ["clearBtn"], descendants: true }], ngImport: i0, template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-label]="filterMenuButtonAriaLabel"
                [attr.aria-controls]="overlayId"
                [attr.aria-expanded]="overlayVisible"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu()"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate" />
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel">
                <FilterSlashIcon *ngIf="!clearFilterIconTemplate" />
                <ng-template *ngTemplateOutlet="clearFilterIconTemplate"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                [id]="overlayId"
                [attr.aria-modal]="true"
                role="dialog"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button
                                    *ngIf="showRemoveIcon"
                                    type="button"
                                    pButton
                                    class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm"
                                    (click)="removeConstraint(fieldConstraint)"
                                    pRipple
                                    [attr.aria-label]="removeRuleButtonLabel"
                                    [label]="removeRuleButtonLabel"
                                >
                                    <TrashIcon *ngIf="!removeRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" [attr.aria-label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button #clearBtn *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple [attr.aria-label]="applyButtonLabel"></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `, isInline: true, dependencies: [{ kind: "directive", type: i0.forwardRef(() => i2.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i2.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "component", type: i0.forwardRef(() => i5.Dropdown), selector: "p-dropdown", inputs: ["id", "scrollHeight", "filter", "name", "style", "panelStyle", "styleClass", "panelStyleClass", "readonly", "required", "editable", "appendTo", "tabindex", "placeholder", "filterPlaceholder", "filterLocale", "inputId", "dataKey", "filterBy", "filterFields", "autofocus", "resetFilterOnHide", "dropdownIcon", "optionLabel", "optionValue", "optionDisabled", "optionGroupLabel", "optionGroupChildren", "autoDisplayFirst", "group", "showClear", "emptyFilterMessage", "emptyMessage", "lazy", "virtualScroll", "virtualScrollItemSize", "virtualScrollOptions", "overlayOptions", "ariaFilterLabel", "ariaLabel", "ariaLabelledBy", "filterMatchMode", "maxlength", "tooltip", "tooltipPosition", "tooltipPositionStyle", "tooltipStyleClass", "focusOnHover", "selectOnFocus", "autoOptionFocus", "autofocusFilter", "disabled", "itemSize", "autoZIndex", "baseZIndex", "showTransitionOptions", "hideTransitionOptions", "filterValue", "options"], outputs: ["onChange", "onFilter", "onFocus", "onBlur", "onClick", "onShow", "onHide", "onClear", "onLazyLoad"] }, { kind: "directive", type: i0.forwardRef(() => i6.NgControlStatus), selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i0.forwardRef(() => i6.NgModel), selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i0.forwardRef(() => i7.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i0.forwardRef(() => FilterIcon), selector: "FilterIcon" }, { kind: "component", type: i0.forwardRef(() => FilterSlashIcon), selector: "FilterSlashIcon" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => TrashIcon), selector: "TrashIcon" }, { kind: "component", type: i0.forwardRef(() => ColumnFilterFormElement), selector: "p-columnFilterFormElement", inputs: ["field", "type", "filterConstraint", "filterTemplate", "placeholder", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "locale", "localeMatcher", "currency", "currencyDisplay", "useGrouping"] }], animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]), transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])])], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ColumnFilter, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilter',
                    template: `
        <div class="p-column-filter" [ngClass]="{ 'p-column-filter-row': display === 'row', 'p-column-filter-menu': display === 'menu' }">
            <p-columnFilterFormElement
                *ngIf="display === 'row'"
                class="p-fluid"
                [type]="type"
                [field]="field"
                [filterConstraint]="dt.filters[field]"
                [filterTemplate]="filterTemplate"
                [placeholder]="placeholder"
                [minFractionDigits]="minFractionDigits"
                [maxFractionDigits]="maxFractionDigits"
                [prefix]="prefix"
                [suffix]="suffix"
                [locale]="locale"
                [localeMatcher]="localeMatcher"
                [currency]="currency"
                [currencyDisplay]="currencyDisplay"
                [useGrouping]="useGrouping"
                [showButtons]="showButtons"
            ></p-columnFilterFormElement>
            <button
                #icon
                *ngIf="showMenuButton"
                type="button"
                class="p-column-filter-menu-button p-link"
                aria-haspopup="true"
                [attr.aria-label]="filterMenuButtonAriaLabel"
                [attr.aria-controls]="overlayId"
                [attr.aria-expanded]="overlayVisible"
                [ngClass]="{ 'p-column-filter-menu-button-open': overlayVisible, 'p-column-filter-menu-button-active': hasFilter() }"
                (click)="toggleMenu()"
                (keydown)="onToggleButtonKeyDown($event)"
            >
                <FilterIcon [styleClass]="'pi-filter-icon'" *ngIf="!filterIconTemplate" />
                <span class="pi-filter-icon" *ngIf="filterIconTemplate">
                    <ng-template *ngTemplateOutlet="filterIconTemplate"></ng-template>
                </span>
            </button>
            <button #icon *ngIf="showClearButton && display === 'row'" [ngClass]="{ 'p-hidden-space': !hasRowFilter() }" type="button" class="p-column-filter-clear-button p-link" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel">
                <FilterSlashIcon *ngIf="!clearFilterIconTemplate" />
                <ng-template *ngTemplateOutlet="clearFilterIconTemplate"></ng-template>
            </button>
            <div
                *ngIf="showMenu && overlayVisible"
                [ngClass]="{ 'p-column-filter-overlay p-component p-fluid': true, 'p-column-filter-overlay-menu': display === 'menu' }"
                [id]="overlayId"
                [attr.aria-modal]="true"
                role="dialog"
                (click)="onContentClick()"
                [@overlayAnimation]="'visible'"
                (@overlayAnimation.start)="onOverlayAnimationStart($event)"
                (@overlayAnimation.done)="onOverlayAnimationEnd($event)"
                (keydown.escape)="onEscape()"
            >
                <ng-container *ngTemplateOutlet="headerTemplate; context: { $implicit: field }"></ng-container>
                <ul *ngIf="display === 'row'; else menu" class="p-column-filter-row-items">
                    <li
                        class="p-column-filter-row-item"
                        *ngFor="let matchMode of matchModes; let i = index"
                        (click)="onRowMatchModeChange(matchMode.value)"
                        (keydown)="onRowMatchModeKeyDown($event)"
                        (keydown.enter)="this.onRowMatchModeChange(matchMode.value)"
                        [ngClass]="{ 'p-highlight': isRowMatchModeSelected(matchMode.value) }"
                        [attr.tabindex]="i === 0 ? '0' : null"
                    >
                        {{ matchMode.label }}
                    </li>
                    <li class="p-column-filter-separator"></li>
                    <li class="p-column-filter-row-item" (click)="onRowClearItemClick()" (keydown)="onRowMatchModeKeyDown($event)" (keydown.enter)="onRowClearItemClick()">{{ noFilterLabel }}</li>
                </ul>
                <ng-template #menu>
                    <div class="p-column-filter-operator" *ngIf="isShowOperator">
                        <p-dropdown [options]="operatorOptions" [ngModel]="operator" (ngModelChange)="onOperatorChange($event)" styleClass="p-column-filter-operator-dropdown"></p-dropdown>
                    </div>
                    <div class="p-column-filter-constraints">
                        <div *ngFor="let fieldConstraint of fieldConstraints; let i = index" class="p-column-filter-constraint">
                            <p-dropdown
                                *ngIf="showMatchModes && matchModes"
                                [options]="matchModes"
                                [ngModel]="fieldConstraint.matchMode"
                                (ngModelChange)="onMenuMatchModeChange($event, fieldConstraint)"
                                styleClass="p-column-filter-matchmode-dropdown"
                            ></p-dropdown>
                            <p-columnFilterFormElement
                                [type]="type"
                                [field]="field"
                                [filterConstraint]="fieldConstraint"
                                [filterTemplate]="filterTemplate"
                                [placeholder]="placeholder"
                                [minFractionDigits]="minFractionDigits"
                                [maxFractionDigits]="maxFractionDigits"
                                [prefix]="prefix"
                                [suffix]="suffix"
                                [locale]="locale"
                                [localeMatcher]="localeMatcher"
                                [currency]="currency"
                                [currencyDisplay]="currencyDisplay"
                                [useGrouping]="useGrouping"
                            ></p-columnFilterFormElement>
                            <div>
                                <button
                                    *ngIf="showRemoveIcon"
                                    type="button"
                                    pButton
                                    class="p-column-filter-remove-button p-button-text p-button-danger p-button-sm"
                                    (click)="removeConstraint(fieldConstraint)"
                                    pRipple
                                    [attr.aria-label]="removeRuleButtonLabel"
                                    [label]="removeRuleButtonLabel"
                                >
                                    <TrashIcon *ngIf="!removeRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                                    <ng-template *ngTemplateOutlet="removeRuleIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="p-column-filter-add-rule" *ngIf="isShowAddConstraint">
                        <button type="button" pButton [label]="addRuleButtonLabel" [attr.aria-label]="addRuleButtonLabel" class="p-column-filter-add-button p-button-text p-button-sm" (click)="addConstraint()" pRipple>
                            <PlusIcon *ngIf="!addRuleIconTemplate" [styleClass]="'p-button-icon-left'" />
                            <ng-template *ngTemplateOutlet="addRuleIconTemplate"></ng-template>
                        </button>
                    </div>
                    <div class="p-column-filter-buttonbar">
                        <button #clearBtn *ngIf="showClearButton" type="button" pButton class="p-button-outlined p-button-sm" (click)="clearFilter()" [attr.aria-label]="clearButtonLabel" [label]="clearButtonLabel" pRipple></button>
                        <button *ngIf="showApplyButton" type="button" pButton (click)="applyFilter()" class="p-button-sm" [label]="applyButtonLabel" pRipple [attr.aria-label]="applyButtonLabel"></button>
                    </div>
                </ng-template>
                <ng-container *ngTemplateOutlet="footerTemplate; context: { $implicit: field }"></ng-container>
            </div>
        </div>
    `,
                    animations: [trigger('overlayAnimation', [transition(':enter', [style({ opacity: 0, transform: 'scaleY(0.8)' }), animate('.12s cubic-bezier(0, 0, 0.2, 1)')]), transition(':leave', [animate('.1s linear', style({ opacity: 0 }))])])],
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i0.ElementRef }, { type: Table }, { type: i0.Renderer2 }, { type: i1.PrimeNGConfig }, { type: i1.OverlayService }, { type: i0.ChangeDetectorRef }], propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], display: [{
                type: Input
            }], showMenu: [{
                type: Input
            }], matchMode: [{
                type: Input
            }], operator: [{
                type: Input
            }], showOperator: [{
                type: Input
            }], showClearButton: [{
                type: Input
            }], showApplyButton: [{
                type: Input
            }], showMatchModes: [{
                type: Input
            }], showAddButton: [{
                type: Input
            }], hideOnClear: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], matchModeOptions: [{
                type: Input
            }], maxConstraints: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }], showButtons: [{
                type: Input
            }], icon: [{
                type: ViewChild,
                args: ['icon']
            }], clearButtonViewChild: [{
                type: ViewChild,
                args: ['clearBtn']
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }] } });
export class ColumnFilterFormElement {
    dt;
    colFilter;
    field;
    type;
    filterConstraint;
    filterTemplate;
    placeholder;
    minFractionDigits;
    maxFractionDigits;
    prefix;
    suffix;
    locale;
    localeMatcher;
    currency;
    currencyDisplay;
    useGrouping = true;
    get showButtons() {
        return this.colFilter.showButtons;
    }
    filterCallback;
    constructor(dt, colFilter) {
        this.dt = dt;
        this.colFilter = colFilter;
    }
    ngOnInit() {
        this.filterCallback = (value) => {
            this.filterConstraint.value = value;
            this.dt._filter();
        };
    }
    onModelChange(value) {
        this.filterConstraint.value = value;
        if (this.type === 'date' || this.type === 'boolean' || value === '') {
            this.dt._filter();
        }
    }
    onTextInputEnterKeyDown(event) {
        this.dt._filter();
        event.preventDefault();
    }
    onNumericInputKeyDown(event) {
        if (event.key === 'Enter') {
            this.dt._filter();
            event.preventDefault();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ColumnFilterFormElement, deps: [{ token: Table }, { token: ColumnFilter }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: ColumnFilterFormElement, selector: "p-columnFilterFormElement", inputs: { field: "field", type: "type", filterConstraint: "filterConstraint", filterTemplate: "filterTemplate", placeholder: "placeholder", minFractionDigits: "minFractionDigits", maxFractionDigits: "maxFractionDigits", prefix: "prefix", suffix: "suffix", locale: "locale", localeMatcher: "localeMatcher", currency: "currency", currencyDisplay: "currencyDisplay", useGrouping: "useGrouping" }, host: { classAttribute: "p-element" }, ngImport: i0, template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)" (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder" />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" appendTo="body"></p-calendar>
            </ng-container>
        </ng-template>
    `, isInline: true, dependencies: [{ kind: "directive", type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i2.NgTemplateOutlet, selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i2.NgSwitch, selector: "[ngSwitch]", inputs: ["ngSwitch"] }, { kind: "directive", type: i2.NgSwitchCase, selector: "[ngSwitchCase]", inputs: ["ngSwitchCase"] }, { kind: "component", type: i8.InputNumber, selector: "p-inputNumber", inputs: ["showButtons", "format", "buttonLayout", "inputId", "styleClass", "style", "placeholder", "size", "maxlength", "tabindex", "title", "ariaLabelledBy", "ariaLabel", "ariaRequired", "name", "required", "autocomplete", "min", "max", "incrementButtonClass", "decrementButtonClass", "incrementButtonIcon", "decrementButtonIcon", "readonly", "step", "allowEmpty", "locale", "localeMatcher", "mode", "currency", "currencyDisplay", "useGrouping", "minFractionDigits", "maxFractionDigits", "prefix", "suffix", "inputStyle", "inputStyleClass", "showClear", "disabled"], outputs: ["onInput", "onFocus", "onBlur", "onKeyDown", "onClear"] }, { kind: "directive", type: i6.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { kind: "directive", type: i6.NgModel, selector: "[ngModel]:not([formControlName]):not([formControl])", inputs: ["name", "disabled", "ngModel", "ngModelOptions"], outputs: ["ngModelChange"], exportAs: ["ngModel"] }, { kind: "directive", type: i9.InputText, selector: "[pInputText]" }, { kind: "component", type: i10.Calendar, selector: "p-calendar", inputs: ["iconDisplay", "style", "styleClass", "inputStyle", "inputId", "name", "inputStyleClass", "placeholder", "ariaLabelledBy", "ariaLabel", "iconAriaLabel", "disabled", "dateFormat", "multipleSeparator", "rangeSeparator", "inline", "showOtherMonths", "selectOtherMonths", "showIcon", "icon", "appendTo", "readonlyInput", "shortYearCutoff", "monthNavigator", "yearNavigator", "hourFormat", "timeOnly", "stepHour", "stepMinute", "stepSecond", "showSeconds", "required", "showOnFocus", "showWeek", "showClear", "dataType", "selectionMode", "maxDateCount", "showButtonBar", "todayButtonStyleClass", "clearButtonStyleClass", "autoZIndex", "baseZIndex", "panelStyleClass", "panelStyle", "keepInvalid", "hideOnDateTimeSelect", "touchUI", "timeSeparator", "focusTrap", "showTransitionOptions", "hideTransitionOptions", "tabindex", "minDate", "maxDate", "disabledDates", "disabledDays", "yearRange", "showTime", "responsiveOptions", "numberOfMonths", "firstDayOfWeek", "locale", "view", "defaultDate"], outputs: ["onFocus", "onBlur", "onClose", "onSelect", "onClear", "onInput", "onTodayClick", "onClearClick", "onMonthChange", "onYearChange", "onClickOutside", "onShow"] }, { kind: "component", type: i11.TriStateCheckbox, selector: "p-triStateCheckbox", inputs: ["disabled", "name", "ariaLabel", "ariaLabelledBy", "tabindex", "inputId", "style", "styleClass", "label", "readonly", "checkboxTrueIcon", "checkboxFalseIcon"], outputs: ["onChange"] }], encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: ColumnFilterFormElement, decorators: [{
            type: Component,
            args: [{
                    selector: 'p-columnFilterFormElement',
                    template: `
        <ng-container *ngIf="filterTemplate; else builtInElement">
            <ng-container
                *ngTemplateOutlet="
                    filterTemplate;
                    context: {
                        $implicit: filterConstraint.value,
                        filterCallback: filterCallback,
                        type: type,
                        field: field,
                        filterConstraint: filterConstraint,
                        placeholder: placeholder,
                        minFractionDigits: minFractionDigits,
                        maxFractionDigits: maxFractionDigits,
                        prefix: prefix,
                        suffix: suffix,
                        locale: locale,
                        localeMatcher: localeMatcher,
                        currency: currency,
                        currencyDisplay: currencyDisplay,
                        useGrouping: useGrouping,
                        showButtons: showButtons
                    }
                "
            ></ng-container>
        </ng-container>
        <ng-template #builtInElement>
            <ng-container [ngSwitch]="type">
                <input *ngSwitchCase="'text'" type="text" pInputText [value]="filterConstraint?.value" (input)="onModelChange($event.target.value)" (keydown.enter)="onTextInputEnterKeyDown($event)" [attr.placeholder]="placeholder" />
                <p-inputNumber
                    *ngSwitchCase="'numeric'"
                    [ngModel]="filterConstraint?.value"
                    (ngModelChange)="onModelChange($event)"
                    (onKeyDown)="onNumericInputKeyDown($event)"
                    [showButtons]="showButtons"
                    [minFractionDigits]="minFractionDigits"
                    [maxFractionDigits]="maxFractionDigits"
                    [prefix]="prefix"
                    [suffix]="suffix"
                    [placeholder]="placeholder"
                    [mode]="currency ? 'currency' : 'decimal'"
                    [locale]="locale"
                    [localeMatcher]="localeMatcher"
                    [currency]="currency"
                    [currencyDisplay]="currencyDisplay"
                    [useGrouping]="useGrouping"
                ></p-inputNumber>
                <p-triStateCheckbox *ngSwitchCase="'boolean'" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)"></p-triStateCheckbox>
                <p-calendar *ngSwitchCase="'date'" [placeholder]="placeholder" [ngModel]="filterConstraint?.value" (ngModelChange)="onModelChange($event)" appendTo="body"></p-calendar>
            </ng-container>
        </ng-template>
    `,
                    encapsulation: ViewEncapsulation.None,
                    host: {
                        class: 'p-element'
                    }
                }]
        }], ctorParameters: () => [{ type: Table }, { type: ColumnFilter }], propDecorators: { field: [{
                type: Input
            }], type: [{
                type: Input
            }], filterConstraint: [{
                type: Input
            }], filterTemplate: [{
                type: Input
            }], placeholder: [{
                type: Input
            }], minFractionDigits: [{
                type: Input
            }], maxFractionDigits: [{
                type: Input
            }], prefix: [{
                type: Input
            }], suffix: [{
                type: Input
            }], locale: [{
                type: Input
            }], localeMatcher: [{
                type: Input
            }], currency: [{
                type: Input
            }], currencyDisplay: [{
                type: Input
            }], useGrouping: [{
                type: Input
            }] } });
export class TableModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: TableModule, declarations: [Table, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, TableBody, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement], imports: [CommonModule,
            PaginatorModule,
            InputTextModule,
            DropdownModule,
            FormsModule,
            ButtonModule,
            SelectButtonModule,
            CalendarModule,
            InputNumberModule,
            TriStateCheckboxModule,
            ScrollerModule,
            ArrowDownIcon,
            ArrowUpIcon,
            SpinnerIcon,
            SortAltIcon,
            SortAmountUpAltIcon,
            SortAmountDownIcon,
            CheckIcon,
            FilterIcon,
            FilterSlashIcon,
            PlusIcon,
            TrashIcon], exports: [Table, SharedModule, SortableColumn, FrozenColumn, RowGroupHeader, SelectableRow, RowToggler, ContextMenuRow, ResizableColumn, ReorderableColumn, EditableColumn, CellEditor, SortIcon, TableRadioButton, TableCheckbox, TableHeaderCheckbox, ReorderableRowHandle, ReorderableRow, SelectableRowDblClick, EditableRow, InitEditableRow, SaveEditableRow, CancelEditableRow, ColumnFilter, ColumnFilterFormElement, ScrollerModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableModule, imports: [CommonModule,
            PaginatorModule,
            InputTextModule,
            DropdownModule,
            FormsModule,
            ButtonModule,
            SelectButtonModule,
            CalendarModule,
            InputNumberModule,
            TriStateCheckboxModule,
            ScrollerModule,
            ArrowDownIcon,
            ArrowUpIcon,
            SpinnerIcon,
            SortAltIcon,
            SortAmountUpAltIcon,
            SortAmountDownIcon,
            CheckIcon,
            FilterIcon,
            FilterSlashIcon,
            PlusIcon,
            TrashIcon, SharedModule,
            ScrollerModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: TableModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [
                        CommonModule,
                        PaginatorModule,
                        InputTextModule,
                        DropdownModule,
                        FormsModule,
                        ButtonModule,
                        SelectButtonModule,
                        CalendarModule,
                        InputNumberModule,
                        TriStateCheckboxModule,
                        ScrollerModule,
                        ArrowDownIcon,
                        ArrowUpIcon,
                        SpinnerIcon,
                        SortAltIcon,
                        SortAmountUpAltIcon,
                        SortAmountDownIcon,
                        CheckIcon,
                        FilterIcon,
                        FilterSlashIcon,
                        PlusIcon,
                        TrashIcon
                    ],
                    exports: [
                        Table,
                        SharedModule,
                        SortableColumn,
                        FrozenColumn,
                        RowGroupHeader,
                        SelectableRow,
                        RowToggler,
                        ContextMenuRow,
                        ResizableColumn,
                        ReorderableColumn,
                        EditableColumn,
                        CellEditor,
                        SortIcon,
                        TableRadioButton,
                        TableCheckbox,
                        TableHeaderCheckbox,
                        ReorderableRowHandle,
                        ReorderableRow,
                        SelectableRowDblClick,
                        EditableRow,
                        InitEditableRow,
                        SaveEditableRow,
                        CancelEditableRow,
                        ColumnFilter,
                        ColumnFilterFormElement,
                        ScrollerModule
                    ],
                    declarations: [
                        Table,
                        SortableColumn,
                        FrozenColumn,
                        RowGroupHeader,
                        SelectableRow,
                        RowToggler,
                        ContextMenuRow,
                        ResizableColumn,
                        ReorderableColumn,
                        EditableColumn,
                        CellEditor,
                        TableBody,
                        SortIcon,
                        TableRadioButton,
                        TableCheckbox,
                        TableHeaderCheckbox,
                        ReorderableRowHandle,
                        ReorderableRow,
                        SelectableRowDblClick,
                        EditableRow,
                        InitEditableRow,
                        SaveEditableRow,
                        CancelEditableRow,
                        ColumnFilter,
                        ColumnFilterFormElement
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwL2NvbXBvbmVudHMvdGFibGUvdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLE9BQU8sRUFBa0IsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzVFLE9BQU8sRUFHSCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBRVQsWUFBWSxFQUNaLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUNWLEtBQUssRUFDTCxRQUFRLEVBS1IsUUFBUSxFQUNSLE1BQU0sRUFDTixXQUFXLEVBS1gsU0FBUyxFQUNULGlCQUFpQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDN0MsT0FBTyxFQUFlLGVBQWUsRUFBa0IsY0FBYyxFQUE4RCxhQUFhLEVBQStCLFlBQVksRUFBd0IsZUFBZSxFQUFFLE1BQU0sYUFBYSxDQUFDO0FBQ3hQLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM5QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN4RSxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ3hELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNwRCxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEQsT0FB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QUNyQixXQUFXO3dCQUNYLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLFlBQVk7d0JBQ1osdUJBQXVCO3FCQUMxQjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIEFuaW1hdGlvbkV2ZW50LCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtcbiAgICBBZnRlckNvbnRlbnRJbml0LFxuICAgIEFmdGVyVmlld0luaXQsXG4gICAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gICAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgQ29tcG9uZW50LFxuICAgIENvbnRlbnRDaGlsZHJlbixcbiAgICBEaXJlY3RpdmUsXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSG9zdExpc3RlbmVyLFxuICAgIEluamVjdCxcbiAgICBJbmplY3RhYmxlLFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkNoYW5nZXMsXG4gICAgT25EZXN0cm95LFxuICAgIE9uSW5pdCxcbiAgICBPcHRpb25hbCxcbiAgICBPdXRwdXQsXG4gICAgUExBVEZPUk1fSUQsXG4gICAgUXVlcnlMaXN0LFxuICAgIFJlbmRlcmVyMixcbiAgICBTaW1wbGVDaGFuZ2VzLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHsgQmxvY2thYmxlVUksIEZpbHRlck1hdGNoTW9kZSwgRmlsdGVyTWV0YWRhdGEsIEZpbHRlck9wZXJhdG9yLCBGaWx0ZXJTZXJ2aWNlLCBMYXp5TG9hZE1ldGEsIE92ZXJsYXlTZXJ2aWNlLCBQcmltZU5HQ29uZmlnLCBQcmltZVRlbXBsYXRlLCBTY3JvbGxlck9wdGlvbnMsIFNlbGVjdEl0ZW0sIFNoYXJlZE1vZHVsZSwgU29ydE1ldGEsIFRhYmxlU3RhdGUsIFRyYW5zbGF0aW9uS2V5cyB9IGZyb20gJ3ByaW1lbmcvYXBpJztcbmltcG9ydCB7IEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvYnV0dG9uJztcbmltcG9ydCB7IENhbGVuZGFyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9jYWxlbmRhcic7XG5pbXBvcnQgeyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciwgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IERyb3Bkb3duTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9kcm9wZG93bic7XG5pbXBvcnQgeyBBcnJvd0Rvd25JY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9hcnJvd2Rvd24nO1xuaW1wb3J0IHsgQXJyb3dVcEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL2Fycm93dXAnO1xuaW1wb3J0IHsgQ2hlY2tJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9jaGVjayc7XG5pbXBvcnQgeyBGaWx0ZXJJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9maWx0ZXInO1xuaW1wb3J0IHsgRmlsdGVyU2xhc2hJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9maWx0ZXJzbGFzaCc7XG5pbXBvcnQgeyBQbHVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvcGx1cyc7XG5pbXBvcnQgeyBTb3J0QWx0SWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc29ydGFsdCc7XG5pbXBvcnQgeyBTb3J0QW1vdW50RG93bkljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NvcnRhbW91bnRkb3duJztcbmltcG9ydCB7IFNvcnRBbW91bnRVcEFsdEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3NvcnRhbW91bnR1cGFsdCc7XG5pbXBvcnQgeyBTcGlubmVySWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvc3Bpbm5lcic7XG5pbXBvcnQgeyBUcmFzaEljb24gfSBmcm9tICdwcmltZW5nL2ljb25zL3RyYXNoJztcbmltcG9ydCB7IElucHV0TnVtYmVyTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9pbnB1dG51bWJlcic7XG5pbXBvcnQgeyBJbnB1dFRleHRNb2R1bGUgfSBmcm9tICdwcmltZW5nL2lucHV0dGV4dCc7XG5pbXBvcnQgeyBQYWdpbmF0b3JNb2R1bGUgfSBmcm9tICdwcmltZW5nL3BhZ2luYXRvcic7XG5pbXBvcnQgeyBTY3JvbGxlciwgU2Nyb2xsZXJNb2R1bGUgfSBmcm9tICdwcmltZW5nL3Njcm9sbGVyJztcbmltcG9ydCB7IFNlbGVjdEJ1dHRvbk1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvc2VsZWN0YnV0dG9uJztcbmltcG9ydCB7IFRyaVN0YXRlQ2hlY2tib3hNb2R1bGUgfSBmcm9tICdwcmltZW5nL3RyaXN0YXRlY2hlY2tib3gnO1xuaW1wb3J0IHsgTnVsbGFibGUsIFZvaWRMaXN0ZW5lciB9IGZyb20gJ3ByaW1lbmcvdHMtaGVscGVycyc7XG5pbXBvcnQgeyBPYmplY3RVdGlscywgVW5pcXVlQ29tcG9uZW50SWQsIFpJbmRleFV0aWxzIH0gZnJvbSAncHJpbWVuZy91dGlscyc7XG5pbXBvcnQgeyBTdWJqZWN0LCBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gICAgRXhwb3J0Q1NWT3B0aW9ucyxcbiAgICBUYWJsZUNvbFJlc2l6ZUV2ZW50LFxuICAgIFRhYmxlQ29sdW1uUmVvcmRlckV2ZW50LFxuICAgIFRhYmxlQ29udGV4dE1lbnVTZWxlY3RFdmVudCxcbiAgICBUYWJsZUVkaXRDYW5jZWxFdmVudCxcbiAgICBUYWJsZUVkaXRDb21wbGV0ZUV2ZW50LFxuICAgIFRhYmxlRWRpdEluaXRFdmVudCxcbiAgICBUYWJsZUZpbHRlckV2ZW50LFxuICAgIFRhYmxlSGVhZGVyQ2hlY2tib3hUb2dnbGVFdmVudCxcbiAgICBUYWJsZUxhenlMb2FkRXZlbnQsXG4gICAgVGFibGVQYWdlRXZlbnQsXG4gICAgVGFibGVSb3dDb2xsYXBzZUV2ZW50LFxuICAgIFRhYmxlUm93RXhwYW5kRXZlbnQsXG4gICAgVGFibGVSb3dSZW9yZGVyRXZlbnQsXG4gICAgVGFibGVSb3dTZWxlY3RFdmVudCxcbiAgICBUYWJsZVJvd1VuU2VsZWN0RXZlbnQsXG4gICAgVGFibGVTZWxlY3RBbGxDaGFuZ2VFdmVudFxufSBmcm9tICcuL3RhYmxlLmludGVyZmFjZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUYWJsZVNlcnZpY2Uge1xuICAgIHByaXZhdGUgc29ydFNvdXJjZSA9IG5ldyBTdWJqZWN0PFNvcnRNZXRhIHwgU29ydE1ldGFbXSB8IG51bGw+KCk7XG4gICAgcHJpdmF0ZSBzZWxlY3Rpb25Tb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuICAgIHByaXZhdGUgY29udGV4dE1lbnVTb3VyY2UgPSBuZXcgU3ViamVjdDxhbnk+KCk7XG4gICAgcHJpdmF0ZSB2YWx1ZVNvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIHRvdGFsUmVjb3Jkc1NvdXJjZSA9IG5ldyBTdWJqZWN0PGFueT4oKTtcbiAgICBwcml2YXRlIGNvbHVtbnNTb3VyY2UgPSBuZXcgU3ViamVjdCgpO1xuXG4gICAgc29ydFNvdXJjZSQgPSB0aGlzLnNvcnRTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgc2VsZWN0aW9uU291cmNlJCA9IHRoaXMuc2VsZWN0aW9uU291cmNlLmFzT2JzZXJ2YWJsZSgpO1xuICAgIGNvbnRleHRNZW51U291cmNlJCA9IHRoaXMuY29udGV4dE1lbnVTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgdmFsdWVTb3VyY2UkID0gdGhpcy52YWx1ZVNvdXJjZS5hc09ic2VydmFibGUoKTtcbiAgICB0b3RhbFJlY29yZHNTb3VyY2UkID0gdGhpcy50b3RhbFJlY29yZHNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG4gICAgY29sdW1uc1NvdXJjZSQgPSB0aGlzLmNvbHVtbnNTb3VyY2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgICBvblNvcnQoc29ydE1ldGE6IFNvcnRNZXRhIHwgU29ydE1ldGFbXSB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5zb3J0U291cmNlLm5leHQoc29ydE1ldGEpO1xuICAgIH1cblxuICAgIG9uU2VsZWN0aW9uQ2hhbmdlKCkge1xuICAgICAgICB0aGlzLnNlbGVjdGlvblNvdXJjZS5uZXh0KG51bGwpO1xuICAgIH1cblxuICAgIG9uQ29udGV4dE1lbnUoZGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMuY29udGV4dE1lbnVTb3VyY2UubmV4dChkYXRhKTtcbiAgICB9XG5cbiAgICBvblZhbHVlQ2hhbmdlKHZhbHVlOiBhbnkpIHtcbiAgICAgICAgdGhpcy52YWx1ZVNvdXJjZS5uZXh0KHZhbHVlKTtcbiAgICB9XG5cbiAgICBvblRvdGFsUmVjb3Jkc0NoYW5nZSh2YWx1ZTogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMudG90YWxSZWNvcmRzU291cmNlLm5leHQodmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ29sdW1uc0NoYW5nZShjb2x1bW5zOiBhbnlbXSkge1xuICAgICAgICB0aGlzLmNvbHVtbnNTb3VyY2UubmV4dChjb2x1bW5zKTtcbiAgICB9XG59XG4vKipcbiAqIFRhYmxlIGRpc3BsYXlzIGRhdGEgaW4gdGFidWxhciBmb3JtYXQuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGUnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxkaXZcbiAgICAgICAgICAgICNjb250YWluZXJcbiAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgIFtjbGFzc109XCJzdHlsZUNsYXNzXCJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGF0YXRhYmxlIHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtZGF0YXRhYmxlLWhvdmVyYWJsZS1yb3dzJzogcm93SG92ZXIgfHwgc2VsZWN0aW9uTW9kZSwgJ3AtZGF0YXRhYmxlLXNjcm9sbGFibGUnOiBzY3JvbGxhYmxlLCAncC1kYXRhdGFibGUtZmxleC1zY3JvbGxhYmxlJzogc2Nyb2xsYWJsZSAmJiBzY3JvbGxIZWlnaHQgPT09ICdmbGV4JyB9XCJcbiAgICAgICAgICAgIFthdHRyLmlkXT1cImlkXCJcbiAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZGF0YXRhYmxlLWxvYWRpbmctb3ZlcmxheSBwLWNvbXBvbmVudC1vdmVybGF5XCIgKm5nSWY9XCJsb2FkaW5nICYmIHNob3dMb2FkZXJcIj5cbiAgICAgICAgICAgICAgICA8aSAqbmdJZj1cImxvYWRpbmdJY29uXCIgW2NsYXNzXT1cIidwLWRhdGF0YWJsZS1sb2FkaW5nLWljb24gJyArIGxvYWRpbmdJY29uXCI+PC9pPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhbG9hZGluZ0ljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPFNwaW5uZXJJY29uICpuZ0lmPVwiIWxvYWRpbmdJY29uVGVtcGxhdGVcIiBbc3Bpbl09XCJ0cnVlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtZGF0YXRhYmxlLWxvYWRpbmctaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImxvYWRpbmdJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0YXRhYmxlLWxvYWRpbmctaWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwibG9hZGluZ0ljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAqbmdJZj1cImNhcHRpb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1kYXRhdGFibGUtaGVhZGVyXCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNhcHRpb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cC1wYWdpbmF0b3JcbiAgICAgICAgICAgICAgICBbcm93c109XCJyb3dzXCJcbiAgICAgICAgICAgICAgICBbZmlyc3RdPVwiZmlyc3RcIlxuICAgICAgICAgICAgICAgIFt0b3RhbFJlY29yZHNdPVwidG90YWxSZWNvcmRzXCJcbiAgICAgICAgICAgICAgICBbcGFnZUxpbmtTaXplXT1cInBhZ2VMaW5rc1wiXG4gICAgICAgICAgICAgICAgW2Fsd2F5c1Nob3ddPVwiYWx3YXlzU2hvd1BhZ2luYXRvclwiXG4gICAgICAgICAgICAgICAgKG9uUGFnZUNoYW5nZSk9XCJvblBhZ2VDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgW3Jvd3NQZXJQYWdlT3B0aW9uc109XCJyb3dzUGVyUGFnZU9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICpuZ0lmPVwicGFnaW5hdG9yICYmIChwYWdpbmF0b3JQb3NpdGlvbiA9PT0gJ3RvcCcgfHwgcGFnaW5hdG9yUG9zaXRpb24gPT0gJ2JvdGgnKVwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlTGVmdF09XCJwYWdpbmF0b3JMZWZ0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFt0ZW1wbGF0ZVJpZ2h0XT1cInBhZ2luYXRvclJpZ2h0VGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bkFwcGVuZFRvXT1cInBhZ2luYXRvckRyb3Bkb3duQXBwZW5kVG9cIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93blNjcm9sbEhlaWdodF09XCJwYWdpbmF0b3JEcm9wZG93blNjcm9sbEhlaWdodFwiXG4gICAgICAgICAgICAgICAgW2N1cnJlbnRQYWdlUmVwb3J0VGVtcGxhdGVdPVwiY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3Nob3dGaXJzdExhc3RJY29uXT1cInNob3dGaXJzdExhc3RJY29uXCJcbiAgICAgICAgICAgICAgICBbZHJvcGRvd25JdGVtVGVtcGxhdGVdPVwicGFnaW5hdG9yRHJvcGRvd25JdGVtVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgIFtzaG93Q3VycmVudFBhZ2VSZXBvcnRdPVwic2hvd0N1cnJlbnRQYWdlUmVwb3J0XCJcbiAgICAgICAgICAgICAgICBbc2hvd0p1bXBUb1BhZ2VEcm9wZG93bl09XCJzaG93SnVtcFRvUGFnZURyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICBbc2hvd0p1bXBUb1BhZ2VJbnB1dF09XCJzaG93SnVtcFRvUGFnZUlucHV0XCJcbiAgICAgICAgICAgICAgICBbc2hvd1BhZ2VMaW5rc109XCJzaG93UGFnZUxpbmtzXCJcbiAgICAgICAgICAgICAgICBbc3R5bGVDbGFzc109XCJnZXRQYWdpbmF0b3JTdHlsZUNsYXNzZXMoJ3AtcGFnaW5hdG9yLXRvcCcpXCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cInBhZ2luYXRvckxvY2FsZVwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImRyb3Bkb3duaWNvblwiICpuZ0lmPVwicGFnaW5hdG9yRHJvcGRvd25JY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvckRyb3Bkb3duSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJmaXJzdHBhZ2VsaW5raWNvblwiICpuZ0lmPVwicGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwicHJldmlvdXNwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvclByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvclByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImxhc3RwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvckxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yTGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJuZXh0cGFnZWxpbmtpY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JOZXh0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cInBhZ2luYXRvck5leHRQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3AtcGFnaW5hdG9yPlxuXG4gICAgICAgICAgICA8ZGl2ICN3cmFwcGVyIGNsYXNzPVwicC1kYXRhdGFibGUtd3JhcHBlclwiIFtuZ1N0eWxlXT1cInsgbWF4SGVpZ2h0OiB2aXJ0dWFsU2Nyb2xsID8gJycgOiBzY3JvbGxIZWlnaHQgfVwiPlxuICAgICAgICAgICAgICAgIDxwLXNjcm9sbGVyXG4gICAgICAgICAgICAgICAgICAgICNzY3JvbGxlclxuICAgICAgICAgICAgICAgICAgICAqbmdJZj1cInZpcnR1YWxTY3JvbGxcIlxuICAgICAgICAgICAgICAgICAgICBbaXRlbXNdPVwicHJvY2Vzc2VkRGF0YVwiXG4gICAgICAgICAgICAgICAgICAgIFtjb2x1bW5zXT1cImNvbHVtbnNcIlxuICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwieyBoZWlnaHQ6IHNjcm9sbEhlaWdodCAhPT0gJ2ZsZXgnID8gc2Nyb2xsSGVpZ2h0IDogdW5kZWZpbmVkIH1cIlxuICAgICAgICAgICAgICAgICAgICBbc2Nyb2xsSGVpZ2h0XT1cInNjcm9sbEhlaWdodCAhPT0gJ2ZsZXgnID8gdW5kZWZpbmVkIDogJzEwMCUnXCJcbiAgICAgICAgICAgICAgICAgICAgW2l0ZW1TaXplXT1cInZpcnR1YWxTY3JvbGxJdGVtU2l6ZSB8fCBfdmlydHVhbFJvd0hlaWdodFwiXG4gICAgICAgICAgICAgICAgICAgIFtzdGVwXT1cInJvd3NcIlxuICAgICAgICAgICAgICAgICAgICBbZGVsYXldPVwibGF6eSA/IHZpcnR1YWxTY3JvbGxEZWxheSA6IDBcIlxuICAgICAgICAgICAgICAgICAgICBbaW5saW5lXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICBbbGF6eV09XCJsYXp5XCJcbiAgICAgICAgICAgICAgICAgICAgKG9uTGF6eUxvYWQpPVwib25MYXp5SXRlbUxvYWQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIFtsb2FkZXJEaXNhYmxlZF09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgW3Nob3dTcGFjZXJdPVwiZmFsc2VcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd0xvYWRlcl09XCJsb2FkaW5nQm9keVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgW29wdGlvbnNdPVwidmlydHVhbFNjcm9sbE9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbYXV0b1NpemVdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiY29udGVudFwiIGxldC1pdGVtcyBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1aWxkSW5UYWJsZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGl0ZW1zLCBvcHRpb25zOiBzY3JvbGxlck9wdGlvbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvcC1zY3JvbGxlcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXZpcnR1YWxTY3JvbGxcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImJ1aWxkSW5UYWJsZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHByb2Nlc3NlZERhdGEsIG9wdGlvbnM6IHsgY29sdW1ucyB9IH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbGRJblRhYmxlIGxldC1pdGVtcyBsZXQtc2Nyb2xsZXJPcHRpb25zPVwib3B0aW9uc1wiPlxuICAgICAgICAgICAgICAgICAgICA8dGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgICN0YWJsZVxuICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInRhYmxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtZGF0YXRhYmxlLXRhYmxlJzogdHJ1ZSwgJ3AtZGF0YXRhYmxlLXNjcm9sbGFibGUtdGFibGUnOiBzY3JvbGxhYmxlLCAncC1kYXRhdGFibGUtcmVzaXphYmxlLXRhYmxlJzogcmVzaXphYmxlQ29sdW1ucywgJ3AtZGF0YXRhYmxlLXJlc2l6YWJsZS10YWJsZS1maXQnOiByZXNpemFibGVDb2x1bW5zICYmIGNvbHVtblJlc2l6ZU1vZGUgPT09ICdmaXQnIH1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cInRhYmxlU3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICBbc3R5bGVdPVwidGFibGVTdHlsZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpZCArICctdGFibGUnXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImNvbEdyb3VwVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBzY3JvbGxlck9wdGlvbnMuY29sdW1ucyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8dGhlYWQgcm9sZT1cInJvd2dyb3VwXCIgI3RoZWFkIGNsYXNzPVwicC1kYXRhdGFibGUtdGhlYWRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiaGVhZGVyR3JvdXBlZFRlbXBsYXRlIHx8IGhlYWRlclRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogc2Nyb2xsZXJPcHRpb25zLmNvbHVtbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90aGVhZD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJyb3dncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWRhdGF0YWJsZS10Ym9keSBwLWRhdGF0YWJsZS1mcm96ZW4tdGJvZHlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwiZnJvemVuVmFsdWUgfHwgZnJvemVuQm9keVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZnJvemVuVmFsdWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtmcm96ZW5Sb3dzXT1cInRydWVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwVGFibGVCb2R5XT1cInNjcm9sbGVyT3B0aW9ucy5jb2x1bW5zXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcFRhYmxlQm9keVRlbXBsYXRlXT1cImZyb3plbkJvZHlUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW2Zyb3plbl09XCJ0cnVlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRib2R5XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcm9sZT1cInJvd2dyb3VwXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtZGF0YXRhYmxlLXRib2R5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCJzY3JvbGxlck9wdGlvbnMuY29udGVudFN0eWxlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdmFsdWVdPVwiZGF0YVRvUmVuZGVyKHNjcm9sbGVyT3B0aW9ucy5yb3dzKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgW3BUYWJsZUJvZHldPVwic2Nyb2xsZXJPcHRpb25zLmNvbHVtbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtwVGFibGVCb2R5VGVtcGxhdGVdPVwiYm9keVRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBbc2Nyb2xsZXJPcHRpb25zXT1cInNjcm9sbGVyT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICA+PC90Ym9keT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvbGU9XCJyb3dncm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzY3JvbGxlck9wdGlvbnMuc3BhY2VyU3R5bGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdHlsZV09XCInaGVpZ2h0OiBjYWxjKCcgKyBzY3JvbGxlck9wdGlvbnMuc3BhY2VyU3R5bGUuaGVpZ2h0ICsgJyAtICcgKyBzY3JvbGxlck9wdGlvbnMucm93cy5sZW5ndGggKiBzY3JvbGxlck9wdGlvbnMuaXRlbVNpemUgKyAncHgpOydcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1kYXRhdGFibGUtc2Nyb2xsZXItc3BhY2VyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L3Rib2R5PlxuICAgICAgICAgICAgICAgICAgICAgICAgPHRmb290IHJvbGU9XCJyb3dncm91cFwiICpuZ0lmPVwiZm9vdGVyR3JvdXBlZFRlbXBsYXRlIHx8IGZvb3RlclRlbXBsYXRlXCIgI3Rmb290IGNsYXNzPVwicC1kYXRhdGFibGUtdGZvb3RcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwiZm9vdGVyR3JvdXBlZFRlbXBsYXRlIHx8IGZvb3RlclRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogc2Nyb2xsZXJPcHRpb25zLmNvbHVtbnMgfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC90Zm9vdD5cbiAgICAgICAgICAgICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgIDxwLXBhZ2luYXRvclxuICAgICAgICAgICAgICAgIFtyb3dzXT1cInJvd3NcIlxuICAgICAgICAgICAgICAgIFtmaXJzdF09XCJmaXJzdFwiXG4gICAgICAgICAgICAgICAgW3RvdGFsUmVjb3Jkc109XCJ0b3RhbFJlY29yZHNcIlxuICAgICAgICAgICAgICAgIFtwYWdlTGlua1NpemVdPVwicGFnZUxpbmtzXCJcbiAgICAgICAgICAgICAgICBbYWx3YXlzU2hvd109XCJhbHdheXNTaG93UGFnaW5hdG9yXCJcbiAgICAgICAgICAgICAgICAob25QYWdlQ2hhbmdlKT1cIm9uUGFnZUNoYW5nZSgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICBbcm93c1BlclBhZ2VPcHRpb25zXT1cInJvd3NQZXJQYWdlT3B0aW9uc1wiXG4gICAgICAgICAgICAgICAgKm5nSWY9XCJwYWdpbmF0b3IgJiYgKHBhZ2luYXRvclBvc2l0aW9uID09PSAnYm90dG9tJyB8fCBwYWdpbmF0b3JQb3NpdGlvbiA9PSAnYm90aCcpXCJcbiAgICAgICAgICAgICAgICBbdGVtcGxhdGVMZWZ0XT1cInBhZ2luYXRvckxlZnRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3RlbXBsYXRlUmlnaHRdPVwicGFnaW5hdG9yUmlnaHRUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duQXBwZW5kVG9dPVwicGFnaW5hdG9yRHJvcGRvd25BcHBlbmRUb1wiXG4gICAgICAgICAgICAgICAgW2Ryb3Bkb3duU2Nyb2xsSGVpZ2h0XT1cInBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0XCJcbiAgICAgICAgICAgICAgICBbY3VycmVudFBhZ2VSZXBvcnRUZW1wbGF0ZV09XCJjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlXCJcbiAgICAgICAgICAgICAgICBbc2hvd0ZpcnN0TGFzdEljb25dPVwic2hvd0ZpcnN0TGFzdEljb25cIlxuICAgICAgICAgICAgICAgIFtkcm9wZG93bkl0ZW1UZW1wbGF0ZV09XCJwYWdpbmF0b3JEcm9wZG93bkl0ZW1UZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3Nob3dDdXJyZW50UGFnZVJlcG9ydF09XCJzaG93Q3VycmVudFBhZ2VSZXBvcnRcIlxuICAgICAgICAgICAgICAgIFtzaG93SnVtcFRvUGFnZURyb3Bkb3duXT1cInNob3dKdW1wVG9QYWdlRHJvcGRvd25cIlxuICAgICAgICAgICAgICAgIFtzaG93SnVtcFRvUGFnZUlucHV0XT1cInNob3dKdW1wVG9QYWdlSW5wdXRcIlxuICAgICAgICAgICAgICAgIFtzaG93UGFnZUxpbmtzXT1cInNob3dQYWdlTGlua3NcIlxuICAgICAgICAgICAgICAgIFtzdHlsZUNsYXNzXT1cImdldFBhZ2luYXRvclN0eWxlQ2xhc3NlcygncC1wYWdpbmF0b3ItYm90dG9tJylcIlxuICAgICAgICAgICAgICAgIFtsb2NhbGVdPVwicGFnaW5hdG9yTG9jYWxlXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwiZHJvcGRvd25pY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JEcm9wZG93bkljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yRHJvcGRvd25JY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cImZpcnN0cGFnZWxpbmtpY29uXCIgKm5nSWY9XCJwYWdpbmF0b3JGaXJzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYWdpbmF0b3JGaXJzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cblxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBwVGVtcGxhdGU9XCJwcmV2aW91c3BhZ2VsaW5raWNvblwiICpuZ0lmPVwicGFnaW5hdG9yUHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yUHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgcFRlbXBsYXRlPVwibGFzdHBhZ2VsaW5raWNvblwiICpuZ0lmPVwicGFnaW5hdG9yTGFzdFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJwYWdpbmF0b3JMYXN0UGFnZUxpbmtJY29uVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuXG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlIHBUZW1wbGF0ZT1cIm5leHRwYWdlbGlua2ljb25cIiAqbmdJZj1cInBhZ2luYXRvck5leHRQYWdlTGlua0ljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ1RlbXBsYXRlT3V0bGV0PVwicGFnaW5hdG9yTmV4dFBhZ2VMaW5rSWNvblRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgIDwvcC1wYWdpbmF0b3I+XG5cbiAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJzdW1tYXJ5VGVtcGxhdGVcIiBjbGFzcz1cInAtZGF0YXRhYmxlLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJzdW1tYXJ5VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuXG4gICAgICAgICAgICA8ZGl2ICNyZXNpemVIZWxwZXIgY2xhc3M9XCJwLWNvbHVtbi1yZXNpemVyLWhlbHBlclwiIHN0eWxlPVwiZGlzcGxheTpub25lXCIgKm5nSWY9XCJyZXNpemFibGVDb2x1bW5zXCI+PC9kaXY+XG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvclVwIGNsYXNzPVwicC1kYXRhdGFibGUtcmVvcmRlci1pbmRpY2F0b3ItdXBcIiBzdHlsZT1cImRpc3BsYXk6IG5vbmU7XCIgKm5nSWY9XCJyZW9yZGVyYWJsZUNvbHVtbnNcIj5cbiAgICAgICAgICAgICAgICA8QXJyb3dEb3duSWNvbiAqbmdJZj1cIiFyZW9yZGVySW5kaWNhdG9yVXBJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInJlb3JkZXJJbmRpY2F0b3JVcEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8c3BhbiAjcmVvcmRlckluZGljYXRvckRvd24gY2xhc3M9XCJwLWRhdGF0YWJsZS1yZW9yZGVyLWluZGljYXRvci1kb3duXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lO1wiICpuZ0lmPVwicmVvcmRlcmFibGVDb2x1bW5zXCI+XG4gICAgICAgICAgICAgICAgPEFycm93VXBJY29uICpuZ0lmPVwiIXJlb3JkZXJJbmRpY2F0b3JEb3duSWNvblRlbXBsYXRlXCIgLz5cbiAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJyZW9yZGVySW5kaWNhdG9yRG93bkljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgcHJvdmlkZXJzOiBbVGFibGVTZXJ2aWNlXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LkRlZmF1bHQsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBzdHlsZVVybHM6IFsnLi90YWJsZS5jc3MnXSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGUgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyVmlld0luaXQsIEFmdGVyQ29udGVudEluaXQsIEJsb2NrYWJsZVVJLCBPbkNoYW5nZXMge1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIG9iamVjdHMgdG8gcmVwcmVzZW50IGR5bmFtaWMgY29sdW1ucyB0aGF0IGFyZSBmcm96ZW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZnJvemVuQ29sdW1uczogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byBkaXNwbGF5IGFzIGZyb3plbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmcm96ZW5WYWx1ZTogYW55W10gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3R5bGU6IHsgW2tsYXNzOiBzdHJpbmddOiBhbnkgfSB8IG51bGwgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNvbXBvbmVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSW5saW5lIHN0eWxlIG9mIHRoZSB0YWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJsZVN0eWxlOiB7IFtrbGFzczogc3RyaW5nXTogYW55IH0gfCBudWxsIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSB0YWJsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0YWJsZVN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIHNwZWNpZmllZCBhcyB0cnVlLCBlbmFibGVzIHRoZSBwYWdpbmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBOdW1iZXIgb2YgcGFnZSBsaW5rcyB0byBkaXNwbGF5IGluIHBhZ2luYXRvci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYWdlTGlua3M6IG51bWJlciA9IDU7XG4gICAgLyoqXG4gICAgICogQXJyYXkgb2YgaW50ZWdlci9vYmplY3QgdmFsdWVzIHRvIGRpc3BsYXkgaW5zaWRlIHJvd3MgcGVyIHBhZ2UgZHJvcGRvd24gb2YgcGFnaW5hdG9yXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm93c1BlclBhZ2VPcHRpb25zOiBhbnlbXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgaXQgZXZlbiB0aGVyZSBpcyBvbmx5IG9uZSBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFsd2F5c1Nob3dQYWdpbmF0b3I6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFBvc2l0aW9uIG9mIHRoZSBwYWdpbmF0b3IsIG9wdGlvbnMgYXJlIFwidG9wXCIsIFwiYm90dG9tXCIgb3IgXCJib3RoXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcGFnaW5hdG9yUG9zaXRpb246ICd0b3AnIHwgJ2JvdHRvbScgfCAnYm90aCcgPSAnYm90dG9tJztcbiAgICAvKipcbiAgICAgKiBDdXN0b20gc3R5bGUgY2xhc3MgZm9yIHBhZ2luYXRvclxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvclN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUYXJnZXQgZWxlbWVudCB0byBhdHRhY2ggdGhlIHBhZ2luYXRvciBkcm9wZG93biBvdmVybGF5LCB2YWxpZCB2YWx1ZXMgYXJlIFwiYm9keVwiIG9yIGEgbG9jYWwgbmctdGVtcGxhdGUgdmFyaWFibGUgb2YgYW5vdGhlciBlbGVtZW50IChub3RlOiB1c2UgYmluZGluZyB3aXRoIGJyYWNrZXRzIGZvciB0ZW1wbGF0ZSB2YXJpYWJsZXMsIGUuZy4gW2FwcGVuZFRvXT1cIm15ZGl2XCIgZm9yIGEgZGl2IGVsZW1lbnQgaGF2aW5nICNteWRpdiBhcyB2YXJpYWJsZSBuYW1lKS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JEcm9wZG93bkFwcGVuZFRvOiBIVE1MRWxlbWVudCB8IEVsZW1lbnRSZWYgfCBUZW1wbGF0ZVJlZjxhbnk+IHwgc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZCB8IGFueTtcbiAgICAvKipcbiAgICAgKiBQYWdpbmF0b3IgZHJvcGRvd24gaGVpZ2h0IG9mIHRoZSB2aWV3cG9ydCBpbiBwaXhlbHMsIGEgc2Nyb2xsYmFyIGlzIGRlZmluZWQgaWYgaGVpZ2h0IG9mIGxpc3QgZXhjZWVkcyB0aGlzIHZhbHVlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHBhZ2luYXRvckRyb3Bkb3duU2Nyb2xsSGVpZ2h0OiBzdHJpbmcgPSAnMjAwcHgnO1xuICAgIC8qKlxuICAgICAqIFRlbXBsYXRlIG9mIHRoZSBjdXJyZW50IHBhZ2UgcmVwb3J0IGVsZW1lbnQuIEF2YWlsYWJsZSBwbGFjZWhvbGRlcnMgYXJlIHtjdXJyZW50UGFnZX0se3RvdGFsUGFnZXN9LHtyb3dzfSx7Zmlyc3R9LHtsYXN0fSBhbmQge3RvdGFsUmVjb3Jkc31cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjdXJyZW50UGFnZVJlcG9ydFRlbXBsYXRlOiBzdHJpbmcgPSAne2N1cnJlbnRQYWdlfSBvZiB7dG90YWxQYWdlc30nO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBjdXJyZW50IHBhZ2UgcmVwb3J0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDdXJyZW50UGFnZVJlcG9ydDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGRpc3BsYXkgYSBkcm9wZG93biB0byBuYXZpZ2F0ZSB0byBhbnkgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93SnVtcFRvUGFnZURyb3Bkb3duOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdG8gZGlzcGxheSBhIGlucHV0IHRvIG5hdmlnYXRlIHRvIGFueSBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dKdW1wVG9QYWdlSW5wdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hlbiBlbmFibGVkLCBpY29ucyBhcmUgZGlzcGxheWVkIG9uIHBhZ2luYXRvciB0byBnbyBmaXJzdCBhbmQgbGFzdCBwYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dGaXJzdExhc3RJY29uOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgcGFnZSBsaW5rcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93UGFnZUxpbmtzOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTb3J0IG9yZGVyIHRvIHVzZSB3aGVuIGFuIHVuc29ydGVkIGNvbHVtbiBnZXRzIHNvcnRlZCBieSB1c2VyIGludGVyYWN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGRlZmF1bHRTb3J0T3JkZXI6IG51bWJlciA9IDE7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIHNvcnRpbmcgd29ya3Mgb24gc2luZ2xlIGNvbHVtbiBvciBvbiBtdWx0aXBsZSBjb2x1bW5zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNvcnRNb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgPSAnc2luZ2xlJztcbiAgICAvKipcbiAgICAgKiBXaGVuIHRydWUsIHJlc2V0cyBwYWdpbmF0b3IgdG8gZmlyc3QgcGFnZSBhZnRlciBzb3J0aW5nLiBBdmFpbGFibGUgb25seSB3aGVuIHNvcnRNb2RlIGlzIHNldCB0byBzaW5nbGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzZXRQYWdlT25Tb3J0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBTcGVjaWZpZXMgdGhlIHNlbGVjdGlvbiBtb2RlLCB2YWxpZCB2YWx1ZXMgYXJlIFwic2luZ2xlXCIgYW5kIFwibXVsdGlwbGVcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25Nb2RlOiAnc2luZ2xlJyB8ICdtdWx0aXBsZScgfCB1bmRlZmluZWQgfCBudWxsO1xuICAgIC8qKlxuICAgICAqIFdoZW4gZW5hYmxlZCB3aXRoIHBhZ2luYXRvciBhbmQgY2hlY2tib3ggc2VsZWN0aW9uIG1vZGUsIHRoZSBzZWxlY3QgYWxsIGNoZWNrYm94IGluIHRoZSBoZWFkZXIgd2lsbCBzZWxlY3QgYWxsIHJvd3Mgb24gdGhlIGN1cnJlbnQgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzZWxlY3Rpb25QYWdlT25seTogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTZWxlY3RlZCByb3cgd2l0aCBhIGNvbnRleHQgbWVudS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb250ZXh0TWVudVNlbGVjdGlvbjogYW55O1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBjb250ZXh0IG1lbnUgc2VsZWN0aW9uIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0geyp9IG9iamVjdCAtIHJvdyBkYXRhLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBjb250ZXh0TWVudVNlbGVjdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gICAgLyoqXG4gICAgICogIERlZmluZXMgdGhlIGJlaGF2aW9yIG9mIGNvbnRleHQgbWVudSBzZWxlY3Rpb24sIGluIFwic2VwYXJhdGVcIiBtb2RlIGNvbnRleHQgbWVudSB1cGRhdGVzIGNvbnRleHRNZW51U2VsZWN0aW9uIHByb3BlcnR5IHdoZXJlYXMgaW4gam9pbnQgbW9kZSBzZWxlY3Rpb24gcHJvcGVydHkgaXMgdXNlZCBpbnN0ZWFkIHNvIHRoYXQgd2hlbiByb3cgc2VsZWN0aW9uIGlzIGVuYWJsZWQsIGJvdGggcm93IHNlbGVjdGlvbiBhbmQgY29udGV4dCBtZW51IHNlbGVjdGlvbiB1c2UgdGhlIHNhbWUgcHJvcGVydHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlOiBzdHJpbmcgPSAnc2VwYXJhdGUnO1xuICAgIC8qKlxuICAgICAqIEEgcHJvcGVydHkgdG8gdW5pcXVlbHkgaWRlbnRpZnkgYSByZWNvcmQgaW4gZGF0YS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkYXRhS2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGV0aGVyIG1ldGFLZXkgc2hvdWxkIGJlIGNvbnNpZGVyZWQgZm9yIHRoZSBzZWxlY3Rpb24uIE9uIHRvdWNoIGVuYWJsZWQgZGV2aWNlcywgbWV0YUtleVNlbGVjdGlvbiBpcyB0dXJuZWQgb2ZmIGF1dG9tYXRpY2FsbHkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWV0YUtleVNlbGVjdGlvbjogYm9vbGVhbiB8IHVuZGVmaW5lZCA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgdGhlIHJvdyBpcyBzZWxlY3RhYmxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJvd1NlbGVjdGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBhbnk7XG4gICAgLyoqXG4gICAgICogRnVuY3Rpb24gdG8gb3B0aW1pemUgdGhlIGRvbSBvcGVyYXRpb25zIGJ5IGRlbGVnYXRpbmcgdG8gbmdGb3JUcmFja0J5LCBkZWZhdWx0IGFsZ29yaXRobSBjaGVja3MgZm9yIG9iamVjdCBpZGVudGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3dUcmFja0J5OiBGdW5jdGlvbiA9IChpbmRleDogbnVtYmVyLCBpdGVtOiBhbnkpID0+IGl0ZW07XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBkYXRhIGlzIGxvYWRlZCBhbmQgaW50ZXJhY3RlZCB3aXRoIGluIGxhenkgbWFubmVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhenk6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIGNhbGwgbGF6eSBsb2FkaW5nIG9uIGluaXRpYWxpemF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxhenlMb2FkT25Jbml0OiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBBbGdvcml0aG0gdG8gZGVmaW5lIGlmIGEgcm93IGlzIHNlbGVjdGVkLCB2YWxpZCB2YWx1ZXMgYXJlIFwiZXF1YWxzXCIgdGhhdCBjb21wYXJlcyBieSByZWZlcmVuY2UgYW5kIFwiZGVlcEVxdWFsc1wiIHRoYXQgY29tcGFyZXMgYWxsIGZpZWxkcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb21wYXJlU2VsZWN0aW9uQnk6ICdlcXVhbHMnIHwgJ2RlZXBFcXVhbHMnID0gJ2RlZXBFcXVhbHMnO1xuICAgIC8qKlxuICAgICAqIENoYXJhY3RlciB0byB1c2UgYXMgdGhlIGNzdiBzZXBhcmF0b3IuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY3N2U2VwYXJhdG9yOiBzdHJpbmcgPSAnLCc7XG4gICAgLyoqXG4gICAgICogTmFtZSBvZiB0aGUgZXhwb3J0ZWQgZmlsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBvcnRGaWxlbmFtZTogc3RyaW5nID0gJ2Rvd25sb2FkJztcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBGaWx0ZXJNZXRhZGF0YSBvYmplY3RzIHRvIHByb3ZpZGUgZXh0ZXJuYWwgZmlsdGVycy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJzOiB7IFtzOiBzdHJpbmddOiBGaWx0ZXJNZXRhZGF0YSB8IEZpbHRlck1ldGFkYXRhW10gfSA9IHt9O1xuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIGZpZWxkcyBhcyBzdHJpbmcgdG8gdXNlIGluIGdsb2JhbCBmaWx0ZXJpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2xvYmFsRmlsdGVyRmllbGRzOiBzdHJpbmdbXSB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWxheSBpbiBtaWxsaXNlY29uZHMgYmVmb3JlIGZpbHRlcmluZyB0aGUgZGF0YS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJEZWxheTogbnVtYmVyID0gMzAwO1xuICAgIC8qKlxuICAgICAqIExvY2FsZSB0byB1c2UgaW4gZmlsdGVyaW5nLiBUaGUgZGVmYXVsdCBsb2NhbGUgaXMgdGhlIGhvc3QgZW52aXJvbm1lbnQncyBjdXJyZW50IGxvY2FsZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWx0ZXJMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXAgaW5zdGFuY2UgdG8ga2VlcCB0aGUgZXhwYW5kZWQgcm93cyB3aGVyZSBrZXkgb2YgdGhlIG1hcCBpcyB0aGUgZGF0YSBrZXkgb2YgdGhlIHJvdy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBhbmRlZFJvd0tleXM6IHsgW3M6IHN0cmluZ106IGJvb2xlYW4gfSA9IHt9O1xuICAgIC8qKlxuICAgICAqIE1hcCBpbnN0YW5jZSB0byBrZWVwIHRoZSByb3dzIGJlaW5nIGVkaXRlZCB3aGVyZSBrZXkgb2YgdGhlIG1hcCBpcyB0aGUgZGF0YSBrZXkgb2YgdGhlIHJvdy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBlZGl0aW5nUm93S2V5czogeyBbczogc3RyaW5nXTogYm9vbGVhbiB9ID0ge307XG4gICAgLyoqXG4gICAgICogV2hldGhlciBtdWx0aXBsZSByb3dzIGNhbiBiZSBleHBhbmRlZCBhdCBhbnkgdGltZS4gVmFsaWQgdmFsdWVzIGFyZSBcIm11bHRpcGxlXCIgYW5kIFwic2luZ2xlXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm93RXhwYW5kTW9kZTogJ211bHRpcGxlJyB8ICdzaW5nbGUnID0gJ211bHRpcGxlJztcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIHNjcm9sbGFibGUgdGFibGVzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNjcm9sbGFibGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogT3JpZW50YXRpb24gb2YgdGhlIHNjcm9sbGluZywgb3B0aW9ucyBhcmUgXCJ2ZXJ0aWNhbFwiLCBcImhvcml6b250YWxcIiBhbmQgXCJib3RoXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgUHJvcGVydHkgaXMgb2JzZWxldGUgc2luY2UgdjE0LjIuMC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBzY3JvbGxEaXJlY3Rpb246ICd2ZXJ0aWNhbCcgfCAnaG9yaXpvbnRhbCcgfCAnYm90aCcgPSAndmVydGljYWwnO1xuICAgIC8qKlxuICAgICAqIFR5cGUgb2YgdGhlIHJvdyBncm91cGluZywgdmFsaWQgdmFsdWVzIGFyZSBcInN1YmhlYWRlclwiIGFuZCBcInJvd3NwYW5cIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByb3dHcm91cE1vZGU6ICdzdWJoZWFkZXInIHwgJ3Jvd3NwYW4nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEhlaWdodCBvZiB0aGUgc2Nyb2xsIHZpZXdwb3J0IGluIGZpeGVkIHBpeGVscyBvciB0aGUgXCJmbGV4XCIga2V5d29yZCBmb3IgYSBkeW5hbWljIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2Nyb2xsSGVpZ2h0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0aGUgZGF0YSBzaG91bGQgYmUgbG9hZGVkIG9uIGRlbWFuZCBkdXJpbmcgc2Nyb2xsLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHZpcnR1YWxTY3JvbGw6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSGVpZ2h0IG9mIGEgcm93IHRvIHVzZSBpbiBjYWxjdWxhdGlvbnMgb2YgdmlydHVhbCBzY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbEl0ZW1TaXplOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIHNjcm9sbGVyIGZlYXR1cmUuIFRoZSBwcm9wZXJ0aWVzIG9mIHNjcm9sbGVyIGNvbXBvbmVudCBjYW4gYmUgdXNlZCBsaWtlIGFuIG9iamVjdCBpbiBpdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB2aXJ0dWFsU2Nyb2xsT3B0aW9uczogU2Nyb2xsZXJPcHRpb25zIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFRocmVzaG9sZCBpbiBtaWxsaXNlY29uZHMgdG8gZGVsYXkgbGF6eSBsb2FkaW5nIGR1cmluZyBzY3JvbGxpbmcuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdmlydHVhbFNjcm9sbERlbGF5OiBudW1iZXIgPSAyNTA7XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIGZyb3plbiBjb2x1bW5zIGNvbnRhaW5lci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmcm96ZW5XaWR0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgaWYgdGhlIHRhYmxlIGlzIHJlc3BvbnNpdmUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICogQGRlcHJlY2F0ZWQgdGFibGUgaXMgYWx3YXlzIHJlc3BvbnNpdmUgd2l0aCBzY3JvbGxhYmxlIGJlaGF2aW9yLlxuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCByZXNwb25zaXZlKCk6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3Jlc3BvbnNpdmU7XG4gICAgfVxuICAgIHNldCByZXNwb25zaXZlKHZhbDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVzcG9uc2l2ZSA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdyZXNwb25zaXZlIHByb3BlcnR5IGlzIGRlcHJlY2F0ZWQgYXMgdGFibGUgaXMgYWx3YXlzIHJlc3BvbnNpdmUgd2l0aCBzY3JvbGxhYmxlIGJlaGF2aW9yLicpO1xuICAgIH1cbiAgICBfcmVzcG9uc2l2ZTogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG4gICAgLyoqXG4gICAgICogTG9jYWwgbmctdGVtcGxhdGUgdmFyaWxhYmxlIG9mIGEgQ29udGV4dE1lbnUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY29udGV4dE1lbnU6IGFueTtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNvbHVtbnMgY2FuIGJlIHJlc2l6ZWQgdXNpbmcgZHJhZyBhbmQgZHJvcC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSByZXNpemFibGVDb2x1bW5zOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgd2hldGhlciB0aGUgb3ZlcmFsbCB0YWJsZSB3aWR0aCBzaG91bGQgY2hhbmdlIG9uIGNvbHVtbiByZXNpemUsIHZhbGlkIHZhbHVlcyBhcmUgXCJmaXRcIiBhbmQgXCJleHBhbmRcIi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjb2x1bW5SZXNpemVNb2RlOiBzdHJpbmcgPSAnZml0JztcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIGNvbHVtbnMgY2FuIGJlIHJlb3JkZXJlZCB1c2luZyBkcmFnIGFuZCBkcm9wLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlb3JkZXJhYmxlQ29sdW1uczogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEaXNwbGF5cyBhIGxvYWRlciB0byBpbmRpY2F0ZSBkYXRhIGxvYWQgaXMgaW4gcHJvZ3Jlc3MuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUaGUgaWNvbiB0byBzaG93IHdoaWxlIGluZGljYXRpbmcgZGF0YSBsb2FkIGlzIGluIHByb2dyZXNzLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvYWRpbmdJY29uOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBsb2FkaW5nIG1hc2sgd2hlbiBsb2FkaW5nIHByb3BlcnR5IGlzIHRydWUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0xvYWRlcjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogQWRkcyBob3ZlciBlZmZlY3QgdG8gcm93cyB3aXRob3V0IHRoZSBuZWVkIGZvciBzZWxlY3Rpb25Nb2RlLiBOb3RlIHRoYXQgdHIgZWxlbWVudHMgdGhhdCBjYW4gYmUgaG92ZXJlZCBuZWVkIHRvIGhhdmUgXCJwLXNlbGVjdGFibGUtcm93XCIgY2xhc3MgZm9yIHJvd0hvdmVyIHRvIHdvcmsuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcm93SG92ZXI6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIGRlZmF1bHQgc29ydGluZyBvciBhIGN1c3RvbSBvbmUgdXNpbmcgc29ydEZ1bmN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGN1c3RvbVNvcnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byB1c2UgdGhlIGluaXRpYWwgc29ydCBiYWRnZSBvciBub3QuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0luaXRpYWxTb3J0QmFkZ2U6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIFdoZXRoZXIgdGhlIGNlbGwgd2lkdGhzIHNjYWxlIGFjY29yZGluZyB0byB0aGVpciBjb250ZW50IG9yIG5vdC4gIERlcHJlY2F0ZWQ6ICBUYWJsZSBsYXlvdXQgaXMgYWx3YXlzIFwiYXV0b1wiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG9MYXlvdXQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRXhwb3J0IGZ1bmN0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGV4cG9ydEZ1bmN0aW9uOiBGdW5jdGlvbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDdXN0b20gZXhwb3J0IGhlYWRlciBvZiB0aGUgY29sdW1uIHRvIGJlIGV4cG9ydGVkIGFzIENTVi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBleHBvcnRIZWFkZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBVbmlxdWUgaWRlbnRpZmllciBvZiBhIHN0YXRlZnVsIHRhYmxlIHRvIHVzZSBpbiBzdGF0ZSBzdG9yYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXRlS2V5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB3aGVyZSBhIHN0YXRlZnVsIHRhYmxlIGtlZXBzIGl0cyBzdGF0ZSwgdmFsaWQgdmFsdWVzIGFyZSBcInNlc3Npb25cIiBmb3Igc2Vzc2lvblN0b3JhZ2UgYW5kIFwibG9jYWxcIiBmb3IgbG9jYWxTdG9yYWdlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHN0YXRlU3RvcmFnZTogJ3Nlc3Npb24nIHwgJ2xvY2FsJyA9ICdzZXNzaW9uJztcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSBlZGl0aW5nIG1vZGUsIHZhbGlkIHZhbHVlcyBhcmUgXCJjZWxsXCIgYW5kIFwicm93XCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZWRpdE1vZGU6ICdjZWxsJyB8ICdyb3cnID0gJ2NlbGwnO1xuICAgIC8qKlxuICAgICAqIEZpZWxkIG5hbWUgdG8gdXNlIGluIHJvdyBncm91cGluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBncm91cFJvd3NCeTogYW55O1xuICAgIC8qKlxuICAgICAqIE9yZGVyIHRvIHNvcnQgd2hlbiBkZWZhdWx0IHJvdyBncm91cGluZyBpcyBlbmFibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdyb3VwUm93c0J5T3JkZXI6IG51bWJlciA9IDE7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgcmVzcG9uc2l2ZSBtb2RlLCB2YWxpZCBvcHRpb25zIGFyZSBcInN0YWNrXCIgYW5kIFwic2Nyb2xsXCIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcmVzcG9uc2l2ZUxheW91dDogc3RyaW5nID0gJ3Njcm9sbCc7XG4gICAgLyoqXG4gICAgICogVGhlIGJyZWFrcG9pbnQgdG8gZGVmaW5lIHRoZSBtYXhpbXVtIHdpZHRoIGJvdW5kYXJ5IHdoZW4gdXNpbmcgc3RhY2sgcmVzcG9uc2l2ZSBsYXlvdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgYnJlYWtwb2ludDogc3RyaW5nID0gJzY0MHB4JztcbiAgICAvKipcbiAgICAgKiBMb2NhbGUgdG8gYmUgdXNlZCBpbiBwYWdpbmF0b3IgZm9ybWF0dGluZy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwYWdpbmF0b3JMb2NhbGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBBbiBhcnJheSBvZiBvYmplY3RzIHRvIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZ2V0IHZhbHVlKCk6IGFueVtdIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICAgIH1cbiAgICBzZXQgdmFsdWUodmFsOiBhbnlbXSkge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogQW4gYXJyYXkgb2Ygb2JqZWN0cyB0byByZXByZXNlbnQgZHluYW1pYyBjb2x1bW5zLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBjb2x1bW5zKCk6IGFueVtdIHwgdW5kZWZpbmVkIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbHVtbnM7XG4gICAgfVxuICAgIHNldCBjb2x1bW5zKGNvbHM6IGFueVtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX2NvbHVtbnMgPSBjb2xzO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBJbmRleCBvZiB0aGUgZmlyc3Qgcm93IHRvIGJlIGRpc3BsYXllZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgZmlyc3QoKTogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maXJzdDtcbiAgICB9XG4gICAgc2V0IGZpcnN0KHZhbDogbnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZCkge1xuICAgICAgICB0aGlzLl9maXJzdCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHJvd3MgdG8gZGlzcGxheSBwZXIgcGFnZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgcm93cygpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm93cztcbiAgICB9XG4gICAgc2V0IHJvd3ModmFsOiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhpcy5fcm93cyA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogTnVtYmVyIG9mIHRvdGFsIHJlY29yZHMsIGRlZmF1bHRzIHRvIGxlbmd0aCBvZiB2YWx1ZSB3aGVuIG5vdCBkZWZpbmVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCB0b3RhbFJlY29yZHMoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RvdGFsUmVjb3JkcztcbiAgICB9XG4gICAgc2V0IHRvdGFsUmVjb3Jkcyh2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl90b3RhbFJlY29yZHMgPSB2YWw7XG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVG90YWxSZWNvcmRzQ2hhbmdlKHRoaXMuX3RvdGFsUmVjb3Jkcyk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIGZpZWxkIHRvIHNvcnQgZGF0YSBieSBkZWZhdWx0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzb3J0RmllbGQoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zb3J0RmllbGQ7XG4gICAgfVxuICAgIHNldCBzb3J0RmllbGQodmFsOiBzdHJpbmcgfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IHZhbDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogT3JkZXIgdG8gc29ydCB3aGVuIGRlZmF1bHQgc29ydGluZyBpcyBlbmFibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzb3J0T3JkZXIoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3NvcnRPcmRlcjtcbiAgICB9XG4gICAgc2V0IHNvcnRPcmRlcih2YWw6IG51bWJlcikge1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIEFuIGFycmF5IG9mIFNvcnRNZXRhIG9iamVjdHMgdG8gc29ydCB0aGUgZGF0YSBieSBkZWZhdWx0IGluIG11bHRpcGxlIHNvcnQgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgbXVsdGlTb3J0TWV0YSgpOiBTb3J0TWV0YVtdIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tdWx0aVNvcnRNZXRhO1xuICAgIH1cbiAgICBzZXQgbXVsdGlTb3J0TWV0YSh2YWw6IFNvcnRNZXRhW10gfCB1bmRlZmluZWQgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSB2YWw7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNlbGVjdGVkIHJvdyBpbiBzaW5nbGUgbW9kZSBvciBhbiBhcnJheSBvZiB2YWx1ZXMgaW4gbXVsdGlwbGUgbW9kZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgc2VsZWN0aW9uKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zZWxlY3Rpb247XG4gICAgfVxuICAgIHNldCBzZWxlY3Rpb24odmFsOiBhbnkpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIGFsbCBkYXRhIGlzIHNlbGVjdGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGdldCBzZWxlY3RBbGwoKTogYm9vbGVhbiB8IG51bGwge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uO1xuICAgIH1cbiAgICBzZXQgc2VsZWN0QWxsKHZhbDogYm9vbGVhbiB8IG51bGwpIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdmFsO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBFbWl0cyB3aGVuIHRoZSBhbGwgb2YgdGhlIGl0ZW1zIHNlbGVjdGVkIG9yIHVuc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZVNlbGVjdEFsbENoYW5nZUV2ZW50fSBldmVudCAtIGN1c3RvbSAgYWxsIHNlbGVjdGlvbiBjaGFuZ2UgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIHNlbGVjdEFsbENoYW5nZTogRXZlbnRFbWl0dGVyPFRhYmxlU2VsZWN0QWxsQ2hhbmdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVNlbGVjdEFsbENoYW5nZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiBzZWxlY3Rpb24gY2hhbmdlZC5cbiAgICAgKiBAcGFyYW0ge2FueSB8IG51bGx9IHZhbHVlIC0gc2VsZWN0ZWQgZGF0YS5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgc2VsZWN0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8YW55IHwgbnVsbD4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueSB8IG51bGw+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSByb3cgaXMgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZVJvd1NlbGVjdEV2ZW50fSBldmVudCAtIGN1c3RvbSBzZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUm93U2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFibGVSb3dTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlUm93U2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSByb3cgaXMgdW5zZWxlY3RlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlUm93VW5TZWxlY3RFdmVudH0gZXZlbnQgLSBjdXN0b20gdW5zZWxlY3QgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUm93VW5zZWxlY3Q6IEV2ZW50RW1pdHRlcjxUYWJsZVJvd1VuU2VsZWN0RXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVJvd1VuU2VsZWN0RXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gcGFnaW5hdGlvbiBvY2N1cnMuXG4gICAgICogQHBhcmFtIHtUYWJsZVBhZ2VFdmVudH0gZXZlbnQgLSBjdXN0b20gcGFnaW5hdGlvbiBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25QYWdlOiBFdmVudEVtaXR0ZXI8VGFibGVQYWdlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVBhZ2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIGNvbHVtbiBnZXRzIHNvcnRlZC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqZWN0IC0gc29ydCBtZXRhLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNvcnQ6IEV2ZW50RW1pdHRlcjx7IG11bHRpc29ydG1ldGE6IFNvcnRNZXRhW10gfSB8IGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPHsgbXVsdGlzb3J0bWV0YTogU29ydE1ldGFbXSB9IHwgYW55PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGRhdGEgaXMgZmlsdGVyZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZUZpbHRlckV2ZW50fSBldmVudCAtIGN1c3RvbSBmaWx0ZXJpbmcgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uRmlsdGVyOiBFdmVudEVtaXR0ZXI8VGFibGVGaWx0ZXJFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlRmlsdGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gcGFnaW5nLCBzb3J0aW5nIG9yIGZpbHRlcmluZyBoYXBwZW5zIGluIGxhenkgbW9kZS5cbiAgICAgKiBAcGFyYW0ge1RhYmxlTGF6eUxvYWRFdmVudH0gZXZlbnQgLSBjdXN0b20gbGF6eSBsb2FkaW5nIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkxhenlMb2FkOiBFdmVudEVtaXR0ZXI8VGFibGVMYXp5TG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVMYXp5TG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgcm93IGlzIGV4cGFuZGVkLlxuICAgICAqIEBwYXJhbSB7VGFibGVSb3dFeHBhbmRFdmVudH0gZXZlbnQgLSBjdXN0b20gcm93IGV4cGFuZCBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Sb3dFeHBhbmQ6IEV2ZW50RW1pdHRlcjxUYWJsZVJvd0V4cGFuZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVSb3dFeHBhbmRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHJvdyBpcyBjb2xsYXBzZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZVJvd0NvbGxhcHNlRXZlbnR9IGV2ZW50IC0gY3VzdG9tIHJvdyBjb2xsYXBzZSBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Sb3dDb2xsYXBzZTogRXZlbnRFbWl0dGVyPFRhYmxlUm93Q29sbGFwc2VFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlUm93Q29sbGFwc2VFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHJvdyBpcyBzZWxlY3RlZCB3aXRoIHJpZ2h0IGNsaWNrLlxuICAgICAqIEBwYXJhbSB7VGFibGVDb250ZXh0TWVudVNlbGVjdEV2ZW50fSBldmVudCAtIGN1c3RvbSBjb250ZXh0IG1lbnUgc2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNvbnRleHRNZW51U2VsZWN0OiBFdmVudEVtaXR0ZXI8VGFibGVDb250ZXh0TWVudVNlbGVjdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVDb250ZXh0TWVudVNlbGVjdEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgY29sdW1uIGlzIHJlc2l6ZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZUNvbFJlc2l6ZUV2ZW50fSBldmVudCAtIGN1c3RvbSBjb2x1bW4gcmVzaXplIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkNvbFJlc2l6ZTogRXZlbnRFbWl0dGVyPFRhYmxlQ29sUmVzaXplRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUNvbFJlc2l6ZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgY29sdW1uIGlzIHJlb3JkZXJlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlQ29sdW1uUmVvcmRlckV2ZW50fSBldmVudCAtIGN1c3RvbSBjb2x1bW4gcmVvcmRlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Db2xSZW9yZGVyOiBFdmVudEVtaXR0ZXI8VGFibGVDb2x1bW5SZW9yZGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUNvbHVtblJlb3JkZXJFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBhIHJvdyBpcyByZW9yZGVyZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZVJvd1Jlb3JkZXJFdmVudH0gZXZlbnQgLSBjdXN0b20gcm93IHJlb3JkZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uUm93UmVvcmRlcjogRXZlbnRFbWl0dGVyPFRhYmxlUm93UmVvcmRlckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVSb3dSZW9yZGVyRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gYSBjZWxsIHN3aXRjaGVzIHRvIGVkaXQgbW9kZS5cbiAgICAgKiBAcGFyYW0ge1RhYmxlRWRpdEluaXRFdmVudH0gZXZlbnQgLSBjdXN0b20gZWRpdCBpbml0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkVkaXRJbml0OiBFdmVudEVtaXR0ZXI8VGFibGVFZGl0SW5pdEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8VGFibGVFZGl0SW5pdEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNlbGwgZWRpdCBpcyBjb21wbGV0ZWQuXG4gICAgICogQHBhcmFtIHtUYWJsZUVkaXRDb21wbGV0ZUV2ZW50fSBldmVudCAtIGN1c3RvbSBlZGl0IGNvbXBsZXRlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkVkaXRDb21wbGV0ZTogRXZlbnRFbWl0dGVyPFRhYmxlRWRpdENvbXBsZXRlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUVkaXRDb21wbGV0ZUV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGNlbGwgZWRpdCBpcyBjYW5jZWxsZWQgd2l0aCBlc2NhcGUga2V5LlxuICAgICAqIEBwYXJhbSB7VGFibGVFZGl0Q2FuY2VsRXZlbnR9IGV2ZW50IC0gY3VzdG9tIGVkaXQgY2FuY2VsIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkVkaXRDYW5jZWw6IEV2ZW50RW1pdHRlcjxUYWJsZUVkaXRDYW5jZWxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPFRhYmxlRWRpdENhbmNlbEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIHN0YXRlIG9mIGhlYWRlciBjaGVja2JveCBjaGFuZ2VzLlxuICAgICAqIEBwYXJhbSB7VGFibGVIZWFkZXJDaGVja2JveFRvZ2dsZUV2ZW50fSBldmVudCAtIGN1c3RvbSBoZWFkZXIgY2hlY2tib3ggZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uSGVhZGVyQ2hlY2tib3hUb2dnbGU6IEV2ZW50RW1pdHRlcjxUYWJsZUhlYWRlckNoZWNrYm94VG9nZ2xlRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZUhlYWRlckNoZWNrYm94VG9nZ2xlRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQSBmdW5jdGlvbiB0byBpbXBsZW1lbnQgY3VzdG9tIHNvcnRpbmcsIHJlZmVyIHRvIHNvcnRpbmcgc2VjdGlvbiBmb3IgZGV0YWlscy5cbiAgICAgKiBAcGFyYW0ge2FueX0gYW55IC0gc29ydCBtZXRhLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBzb3J0RnVuY3Rpb246IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIG9uIHBhZ2luYXRpb24uXG4gICAgICogQHBhcmFtIHtudW1iZXJ9IG51bWJlciAtIGZpcnN0IGVsZW1lbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIGZpcnN0Q2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBvbiByb3dzIGNoYW5nZS5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gbnVtYmVyIC0gUm93IGNvdW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSByb3dzQ2hhbmdlOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB0YWJsZSBzdGF0ZSBpcyBzYXZlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlU3RhdGV9IG9iamVjdCAtIHRhYmxlIHN0YXRlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblN0YXRlU2F2ZTogRXZlbnRFbWl0dGVyPFRhYmxlU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVN0YXRlPigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB0YWJsZSBzdGF0ZSBpcyByZXN0b3JlZC5cbiAgICAgKiBAcGFyYW0ge1RhYmxlU3RhdGV9IG9iamVjdCAtIHRhYmxlIHN0YXRlLlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblN0YXRlUmVzdG9yZTogRXZlbnRFbWl0dGVyPFRhYmxlU3RhdGU+ID0gbmV3IEV2ZW50RW1pdHRlcjxUYWJsZVN0YXRlPigpO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGFpbmVyJykgY29udGFpbmVyVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3Jlc2l6ZUhlbHBlcicpIHJlc2l6ZUhlbHBlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdyZW9yZGVySW5kaWNhdG9yVXAnKSByZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgncmVvcmRlckluZGljYXRvckRvd24nKSByZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd3cmFwcGVyJykgd3JhcHBlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCd0YWJsZScpIHRhYmxlVmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIEBWaWV3Q2hpbGQoJ3RoZWFkJykgdGFibGVIZWFkZXJWaWV3Q2hpbGQ6IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgndGZvb3QnKSB0YWJsZUZvb3RlclZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAVmlld0NoaWxkKCdzY3JvbGxlcicpIHNjcm9sbGVyOiBOdWxsYWJsZTxTY3JvbGxlcj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+PjtcbiAgICAvKipcbiAgICAgKiBJbmRpY2F0ZXMgdGhlIGhlaWdodCBvZiByb3dzIHRvIGJlIHNjcm9sbGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqIEBkZXByZWNhdGVkIHVzZSB2aXJ0dWFsU2Nyb2xsSXRlbVNpemUgcHJvcGVydHkgaW5zdGVhZC5cbiAgICAgKi9cbiAgICBASW5wdXQoKSBnZXQgdmlydHVhbFJvd0hlaWdodCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmlydHVhbFJvd0hlaWdodDtcbiAgICB9XG4gICAgc2V0IHZpcnR1YWxSb3dIZWlnaHQodmFsOiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fdmlydHVhbFJvd0hlaWdodCA9IHZhbDtcbiAgICAgICAgY29uc29sZS53YXJuKCdUaGUgdmlydHVhbFJvd0hlaWdodCBwcm9wZXJ0eSBpcyBkZXByZWNhdGVkLicpO1xuICAgIH1cbiAgICBfdmlydHVhbFJvd0hlaWdodDogbnVtYmVyID0gMjg7XG5cbiAgICBfdmFsdWU6IGFueVtdID0gW107XG5cbiAgICBfY29sdW1uczogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBfdG90YWxSZWNvcmRzOiBudW1iZXIgPSAwO1xuXG4gICAgX2ZpcnN0OiBudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkID0gMDtcblxuICAgIF9yb3dzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBmaWx0ZXJlZFZhbHVlOiBhbnlbXSB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBoZWFkZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBoZWFkZXJHcm91cGVkVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgYm9keVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRpbmdCb2R5VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2FwdGlvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3RlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZvb3Rlckdyb3VwZWRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBzdW1tYXJ5VGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY29sR3JvdXBUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBleHBhbmRlZFJvd1RlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGdyb3VwSGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZ3JvdXBGb290ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmcm96ZW5FeHBhbmRlZFJvd1RlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZyb3plbkhlYWRlclRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGZyb3plbkJvZHlUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmcm96ZW5Gb290ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBmcm96ZW5Db2xHcm91cFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGVtcHR5TWVzc2FnZVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2luYXRvckxlZnRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JSaWdodFRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHBhZ2luYXRvckRyb3Bkb3duSXRlbVRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIGxvYWRpbmdJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcmVvcmRlckluZGljYXRvclVwSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHJlb3JkZXJJbmRpY2F0b3JEb3duSWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHNvcnRJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgY2hlY2tib3hJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgaGVhZGVyQ2hlY2tib3hJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnaW5hdG9yRHJvcGRvd25JY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnaW5hdG9yRmlyc3RQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JMYXN0UGFnZUxpbmtJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgcGFnaW5hdG9yUHJldmlvdXNQYWdlTGlua0ljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBwYWdpbmF0b3JOZXh0UGFnZUxpbmtJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgc2VsZWN0aW9uS2V5czogYW55ID0ge307XG5cbiAgICBsYXN0UmVzaXplckhlbHBlclg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHJlb3JkZXJJY29uV2lkdGg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIHJlb3JkZXJJY29uSGVpZ2h0OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBkcmFnZ2VkQ29sdW1uOiBhbnk7XG5cbiAgICBkcmFnZ2VkUm93SW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBkcm9wcGVkUm93SW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICByb3dEcmFnZ2luZzogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBkcm9wUG9zaXRpb246IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBlZGl0aW5nQ2VsbDogRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBlZGl0aW5nQ2VsbERhdGE6IGFueTtcblxuICAgIGVkaXRpbmdDZWxsRmllbGQ6IGFueTtcblxuICAgIGVkaXRpbmdDZWxsUm93SW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBzZWxmQ2xpY2s6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsO1xuXG4gICAgZG9jdW1lbnRFZGl0TGlzdGVuZXI6IGFueTtcblxuICAgIF9tdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdIHwgdW5kZWZpbmVkIHwgbnVsbDtcblxuICAgIF9zb3J0RmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBfc29ydE9yZGVyOiBudW1iZXIgPSAxO1xuXG4gICAgcHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgX3NlbGVjdGlvbjogYW55O1xuXG4gICAgX3NlbGVjdEFsbDogYm9vbGVhbiB8IG51bGwgPSBudWxsO1xuXG4gICAgYW5jaG9yUm93SW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICByYW5nZVJvd0luZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBmaWx0ZXJUaW1lb3V0OiBhbnk7XG5cbiAgICBpbml0aWFsaXplZDogYm9vbGVhbiB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICByb3dUb3VjaGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzdG9yaW5nU29ydDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHJlc3RvcmluZ0ZpbHRlcjogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN0YXRlUmVzdG9yZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb2x1bW5PcmRlclN0YXRlUmVzdG9yZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb2x1bW5XaWR0aHNTdGF0ZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgdGFibGVXaWR0aFN0YXRlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBvdmVybGF5U3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICByZXNpemVDb2x1bW5FbGVtZW50OiBhbnk7XG5cbiAgICBjb2x1bW5SZXNpemluZzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgcm93R3JvdXBIZWFkZXJTdHlsZU9iamVjdDogYW55ID0ge307XG5cbiAgICBpZDogc3RyaW5nID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcblxuICAgIHN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgcmVzcG9uc2l2ZVN0eWxlRWxlbWVudDogYW55O1xuXG4gICAgcHJpdmF0ZSB3aW5kb3c6IFdpbmRvdztcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHVibGljIGVsOiBFbGVtZW50UmVmLFxuICAgICAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgICAgICBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBmaWx0ZXJTZXJ2aWNlOiBGaWx0ZXJTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgb3ZlcmxheVNlcnZpY2U6IE92ZXJsYXlTZXJ2aWNlLFxuICAgICAgICBwdWJsaWMgY29uZmlnOiBQcmltZU5HQ29uZmlnXG4gICAgKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmxhenkgJiYgdGhpcy5sYXp5TG9hZE9uSW5pdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3RvcmluZ0ZpbHRlcikge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nRmlsdGVyID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNwb25zaXZlTGF5b3V0ID09PSAnc3RhY2snKSB7XG4gICAgICAgICAgICB0aGlzLmNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5pbml0aWFsaXplZCA9IHRydWU7XG4gICAgfVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnY2FwdGlvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2FwdGlvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXJncm91cGVkJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oZWFkZXJHcm91cGVkVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2JvZHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2JvZHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdCb2R5VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zvb3Rlcmdyb3VwZWQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3Rlckdyb3VwZWRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc3VtbWFyeSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VtbWFyeVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb2xncm91cCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29sR3JvdXBUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncm93ZXhwYW5zaW9uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd1RlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdncm91cGhlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZ3JvdXBIZWFkZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZ3JvdXBmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmdyb3VwRm9vdGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbmhlYWRlcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuSGVhZGVyVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbmJvZHknOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkJvZHlUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuZm9vdGVyJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5mcm96ZW5Gb290ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZnJvemVuY29sZ3JvdXAnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZyb3plbkNvbEdyb3VwVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2Zyb3plbnJvd2V4cGFuc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZnJvemVuRXhwYW5kZWRSb3dUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnZW1wdHltZXNzYWdlJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbXB0eU1lc3NhZ2VUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ybGVmdCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yTGVmdFRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdwYWdpbmF0b3JyaWdodCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGFnaW5hdG9yUmlnaHRUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9yZHJvcGRvd25pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JEcm9wZG93bkljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9yZHJvcGRvd25pdGVtJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wYWdpbmF0b3JEcm9wZG93bkl0ZW1UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9yZmlyc3RwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvckZpcnN0UGFnZUxpbmtJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcmxhc3RwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvckxhc3RQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncGFnaW5hdG9ycHJldmlvdXNwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvclByZXZpb3VzUGFnZUxpbmtJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3BhZ2luYXRvcm5leHRwYWdlbGlua2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBhZ2luYXRvck5leHRQYWdlTGlua0ljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnbG9hZGluZ2ljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmxvYWRpbmdJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Jlb3JkZXJpbmRpY2F0b3J1cGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlb3JkZXJJbmRpY2F0b3JVcEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAncmVvcmRlcmluZGljYXRvcmRvd25pY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW9yZGVySW5kaWNhdG9yRG93bkljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc29ydGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NoZWNrYm94aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tib3hJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2hlYWRlcmNoZWNrYm94aWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGVhZGVyQ2hlY2tib3hJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpICYmIHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMucmVzdG9yZUNvbHVtbldpZHRocygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoc2ltcGxlQ2hhbmdlOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2UudmFsdWUpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiAhdGhpcy5zdGF0ZVJlc3RvcmVkICYmIGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmVTdGF0ZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHNpbXBsZUNoYW5nZS52YWx1ZS5jdXJyZW50VmFsdWU7XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5KSB7XG4gICAgICAgICAgICAgICAgdGhpcy50b3RhbFJlY29yZHMgPSB0aGlzLl92YWx1ZSA/IHRoaXMuX3ZhbHVlLmxlbmd0aCA6IDA7XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PSAnc2luZ2xlJyAmJiAodGhpcy5zb3J0RmllbGQgfHwgdGhpcy5ncm91cFJvd3NCeSkpIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuc29ydE1vZGUgPT0gJ211bHRpcGxlJyAmJiAodGhpcy5tdWx0aVNvcnRNZXRhIHx8IHRoaXMuZ3JvdXBSb3dzQnkpKSB0aGlzLnNvcnRNdWx0aXBsZSgpO1xuICAgICAgICAgICAgICAgIGVsc2UgaWYgKHRoaXMuaGFzRmlsdGVyKCkpXG4gICAgICAgICAgICAgICAgICAgIC8vc29ydCBhbHJlYWR5IGZpbHRlcnNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uVmFsdWVDaGFuZ2Uoc2ltcGxlQ2hhbmdlLnZhbHVlLmN1cnJlbnRWYWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIHRoaXMuX2NvbHVtbnMgPSBzaW1wbGVDaGFuZ2UuY29sdW1ucy5jdXJyZW50VmFsdWU7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vbkNvbHVtbnNDaGFuZ2Uoc2ltcGxlQ2hhbmdlLmNvbHVtbnMuY3VycmVudFZhbHVlKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuX2NvbHVtbnMgJiYgdGhpcy5pc1N0YXRlZnVsKCkgJiYgdGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgIXRoaXMuY29sdW1uT3JkZXJTdGF0ZVJlc3RvcmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JlQ29sdW1uT3JkZXIoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc29ydEZpZWxkKSB7XG4gICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBzaW1wbGVDaGFuZ2Uuc29ydEZpZWxkLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmdyb3VwUm93c0J5KSB7XG4gICAgICAgICAgICAvL2F2b2lkIHRyaWdnZXJpbmcgbGF6eSBsb2FkIHByaW9yIHRvIGxhenkgaW5pdGlhbGl6YXRpb24gYXQgb25Jbml0XG4gICAgICAgICAgICBpZiAoIXRoaXMubGF6eSB8fCB0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydFNpbmdsZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc29ydE9yZGVyKSB7XG4gICAgICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSBzaW1wbGVDaGFuZ2Uuc29ydE9yZGVyLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgLy9hdm9pZCB0cmlnZ2VyaW5nIGxhenkgbG9hZCBwcmlvciB0byBsYXp5IGluaXRpYWxpemF0aW9uIGF0IG9uSW5pdFxuICAgICAgICAgICAgaWYgKCF0aGlzLmxhenkgfHwgdGhpcy5pbml0aWFsaXplZCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNvcnRTaW5nbGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2ltcGxlQ2hhbmdlLmdyb3VwUm93c0J5T3JkZXIpIHtcbiAgICAgICAgICAgIC8vYXZvaWQgdHJpZ2dlcmluZyBsYXp5IGxvYWQgcHJpb3IgdG8gbGF6eSBpbml0aWFsaXphdGlvbiBhdCBvbkluaXRcbiAgICAgICAgICAgIGlmICghdGhpcy5sYXp5IHx8IHRoaXMuaW5pdGlhbGl6ZWQpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc2ltcGxlQ2hhbmdlLm11bHRpU29ydE1ldGEuY3VycmVudFZhbHVlO1xuICAgICAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScgJiYgKHRoaXMuaW5pdGlhbGl6ZWQgfHwgKCF0aGlzLmxhenkgJiYgIXRoaXMudmlydHVhbFNjcm9sbCkpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zb3J0TXVsdGlwbGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzaW1wbGVDaGFuZ2Uuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBzaW1wbGVDaGFuZ2Uuc2VsZWN0aW9uLmN1cnJlbnRWYWx1ZTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU2VsZWN0aW9uS2V5cygpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNpbXBsZUNoYW5nZS5zZWxlY3RBbGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdEFsbCA9IHNpbXBsZUNoYW5nZS5zZWxlY3RBbGwuY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICBpZiAoIXRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uKSB7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25LZXlzKCk7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBnZXQgcHJvY2Vzc2VkRGF0YSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZmlsdGVyZWRWYWx1ZSB8fCB0aGlzLnZhbHVlIHx8IFtdO1xuICAgIH1cblxuICAgIHByaXZhdGUgX2luaXRpYWxDb2xXaWR0aHM6IG51bWJlcltdO1xuXG4gICAgZGF0YVRvUmVuZGVyKGRhdGE6IGFueSkge1xuICAgICAgICBjb25zdCBfZGF0YSA9IGRhdGEgfHwgdGhpcy5wcm9jZXNzZWREYXRhO1xuXG4gICAgICAgIGlmIChfZGF0YSAmJiB0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgY29uc3QgZmlyc3QgPSB0aGlzLmxhenkgPyAwIDogdGhpcy5maXJzdDtcbiAgICAgICAgICAgIHJldHVybiBfZGF0YS5zbGljZShmaXJzdCwgPG51bWJlcj5maXJzdCArIDxudW1iZXI+dGhpcy5yb3dzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfZGF0YTtcbiAgICB9XG5cbiAgICB1cGRhdGVTZWxlY3Rpb25LZXlzKCkge1xuICAgICAgICBpZiAodGhpcy5kYXRhS2V5ICYmIHRoaXMuX3NlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLl9zZWxlY3Rpb24pKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgZGF0YSBvZiB0aGlzLl9zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW1N0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGEsIHRoaXMuZGF0YUtleSkpXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy5fc2VsZWN0aW9uLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25QYWdlQ2hhbmdlKGV2ZW50OiBUYWJsZVBhZ2VFdmVudCkge1xuICAgICAgICB0aGlzLmZpcnN0ID0gZXZlbnQuZmlyc3Q7XG4gICAgICAgIHRoaXMucm93cyA9IGV2ZW50LnJvd3M7XG5cbiAgICAgICAgdGhpcy5vblBhZ2UuZW1pdCh7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHJvd3M6IDxudW1iZXI+dGhpcy5yb3dzXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcbiAgICAgICAgdGhpcy5yb3dzQ2hhbmdlLmVtaXQodGhpcy5yb3dzKTtcbiAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25WYWx1ZUNoYW5nZSh0aGlzLnZhbHVlKTtcblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcblxuICAgICAgICBpZiAodGhpcy5zY3JvbGxhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzb3J0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgbGV0IG9yaWdpbmFsRXZlbnQgPSBldmVudC5vcmlnaW5hbEV2ZW50O1xuXG4gICAgICAgIGlmICh0aGlzLnNvcnRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gdGhpcy5zb3J0RmllbGQgPT09IGV2ZW50LmZpZWxkID8gdGhpcy5zb3J0T3JkZXIgKiAtMSA6IHRoaXMuZGVmYXVsdFNvcnRPcmRlcjtcbiAgICAgICAgICAgIHRoaXMuX3NvcnRGaWVsZCA9IGV2ZW50LmZpZWxkO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5yZXNldFBhZ2VPblNvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuX2ZpcnN0KTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNldFNjcm9sbFRvcCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5zb3J0U2luZ2xlKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHRoaXMuc29ydE1vZGUgPT09ICdtdWx0aXBsZScpIHtcbiAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gKDxLZXlib2FyZEV2ZW50Pm9yaWdpbmFsRXZlbnQpLm1ldGFLZXkgfHwgKDxLZXlib2FyZEV2ZW50Pm9yaWdpbmFsRXZlbnQpLmN0cmxLZXk7XG4gICAgICAgICAgICBsZXQgc29ydE1ldGEgPSB0aGlzLmdldFNvcnRNZXRhKDxzdHJpbmc+ZXZlbnQuZmllbGQpO1xuXG4gICAgICAgICAgICBpZiAoc29ydE1ldGEpIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt7IGZpZWxkOiA8c3RyaW5nPmV2ZW50LmZpZWxkLCBvcmRlcjogc29ydE1ldGEub3JkZXIgKiAtMSB9XTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5yZXNldFBhZ2VPblNvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2ZpcnN0ID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLl9maXJzdCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnJlc2V0U2Nyb2xsVG9wKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBzb3J0TWV0YS5vcmRlciA9IHNvcnRNZXRhLm9yZGVyICogLTE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoIW1ldGFLZXkgfHwgIXRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gW107XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMucmVzZXRQYWdlT25Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9maXJzdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5fZmlyc3QpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICg8U29ydE1ldGFbXT50aGlzLl9tdWx0aVNvcnRNZXRhKS5wdXNoKHsgZmllbGQ6IDxzdHJpbmc+ZXZlbnQuZmllbGQsIG9yZGVyOiB0aGlzLmRlZmF1bHRTb3J0T3JkZXIgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmFuY2hvclJvd0luZGV4ID0gbnVsbDtcbiAgICB9XG5cbiAgICBzb3J0U2luZ2xlKCkge1xuICAgICAgICBsZXQgZmllbGQgPSB0aGlzLnNvcnRGaWVsZCB8fCB0aGlzLmdyb3VwUm93c0J5O1xuICAgICAgICBsZXQgb3JkZXIgPSB0aGlzLnNvcnRGaWVsZCA/IHRoaXMuc29ydE9yZGVyIDogdGhpcy5ncm91cFJvd3NCeU9yZGVyO1xuICAgICAgICBpZiAodGhpcy5ncm91cFJvd3NCeSAmJiB0aGlzLnNvcnRGaWVsZCAmJiB0aGlzLmdyb3VwUm93c0J5ICE9PSB0aGlzLnNvcnRGaWVsZCkge1xuICAgICAgICAgICAgdGhpcy5fbXVsdGlTb3J0TWV0YSA9IFt0aGlzLmdldEdyb3VwUm93c01ldGEoKSwgeyBmaWVsZDogdGhpcy5zb3J0RmllbGQsIG9yZGVyOiB0aGlzLnNvcnRPcmRlciB9XTtcbiAgICAgICAgICAgIHRoaXMuc29ydE11bHRpcGxlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZmllbGQgJiYgb3JkZXIpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJlc3RvcmluZ1NvcnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ1NvcnQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy52YWx1ZSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmN1c3RvbVNvcnQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zb3J0RnVuY3Rpb24uZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiB0aGlzLnZhbHVlLFxuICAgICAgICAgICAgICAgICAgICAgICAgbW9kZTogdGhpcy5zb3J0TW9kZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkOiBmaWVsZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9yZGVyOiBvcmRlclxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlLnNvcnQoKGRhdGExLCBkYXRhMikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHZhbHVlMSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEoZGF0YTEsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGEyLCBmaWVsZCk7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcmVzdWx0ID0gbnVsbDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHZhbHVlMSA9PSBudWxsICYmIHZhbHVlMiAhPSBudWxsKSByZXN1bHQgPSAtMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKHZhbHVlMSAhPSBudWxsICYmIHZhbHVlMiA9PSBudWxsKSByZXN1bHQgPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAodmFsdWUxID09IG51bGwgJiYgdmFsdWUyID09IG51bGwpIHJlc3VsdCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgdmFsdWUxID09PSAnc3RyaW5nJyAmJiB0eXBlb2YgdmFsdWUyID09PSAnc3RyaW5nJykgcmVzdWx0ID0gdmFsdWUxLmxvY2FsZUNvbXBhcmUodmFsdWUyKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsc2UgcmVzdWx0ID0gdmFsdWUxIDwgdmFsdWUyID8gLTEgOiB2YWx1ZTEgPiB2YWx1ZTIgPyAxIDogMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9yZGVyICogcmVzdWx0O1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IFsuLi50aGlzLnZhbHVlXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodGhpcy5oYXNGaWx0ZXIoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9maWx0ZXIoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGxldCBzb3J0TWV0YTogU29ydE1ldGEgPSB7XG4gICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgIG9yZGVyOiBvcmRlclxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5vblNvcnQuZW1pdChzb3J0TWV0YSk7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNvcnQoc29ydE1ldGEpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc29ydE11bHRpcGxlKCkge1xuICAgICAgICBpZiAodGhpcy5ncm91cFJvd3NCeSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLl9tdWx0aVNvcnRNZXRhKSB0aGlzLl9tdWx0aVNvcnRNZXRhID0gW3RoaXMuZ2V0R3JvdXBSb3dzTWV0YSgpXTtcbiAgICAgICAgICAgIGVsc2UgaWYgKCg8U29ydE1ldGFbXT50aGlzLm11bHRpU29ydE1ldGEpWzBdLmZpZWxkICE9PSB0aGlzLmdyb3VwUm93c0J5KSB0aGlzLl9tdWx0aVNvcnRNZXRhID0gW3RoaXMuZ2V0R3JvdXBSb3dzTWV0YSgpLCAuLi50aGlzLl9tdWx0aVNvcnRNZXRhXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGEpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmxhenkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMudmFsdWUpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jdXN0b21Tb3J0KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc29ydEZ1bmN0aW9uLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogdGhpcy52YWx1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1vZGU6IHRoaXMuc29ydE1vZGUsXG4gICAgICAgICAgICAgICAgICAgICAgICBtdWx0aVNvcnRNZXRhOiB0aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZS5zb3J0KChkYXRhMSwgZGF0YTIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpc29ydEZpZWxkKGRhdGExLCBkYXRhMiwgPFNvcnRNZXRhW10+dGhpcy5tdWx0aVNvcnRNZXRhLCAwKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSBbLi4udGhpcy52YWx1ZV07XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZmlsdGVyKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLm9uU29ydC5lbWl0KHtcbiAgICAgICAgICAgICAgICBtdWx0aXNvcnRtZXRhOiA8U29ydE1ldGFbXT50aGlzLm11bHRpU29ydE1ldGFcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25Tb3J0KHRoaXMubXVsdGlTb3J0TWV0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtdWx0aXNvcnRGaWVsZChkYXRhMTogYW55LCBkYXRhMjogYW55LCBtdWx0aVNvcnRNZXRhOiBTb3J0TWV0YVtdLCBpbmRleDogbnVtYmVyKTogYW55IHtcbiAgICAgICAgY29uc3QgdmFsdWUxID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShkYXRhMSwgbXVsdGlTb3J0TWV0YVtpbmRleF0uZmllbGQpO1xuICAgICAgICBjb25zdCB2YWx1ZTIgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKGRhdGEyLCBtdWx0aVNvcnRNZXRhW2luZGV4XS5maWVsZCk7XG4gICAgICAgIGlmIChPYmplY3RVdGlscy5jb21wYXJlKHZhbHVlMSwgdmFsdWUyLCB0aGlzLmZpbHRlckxvY2FsZSkgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBtdWx0aVNvcnRNZXRhLmxlbmd0aCAtIDEgPiBpbmRleCA/IHRoaXMubXVsdGlzb3J0RmllbGQoZGF0YTEsIGRhdGEyLCBtdWx0aVNvcnRNZXRhLCBpbmRleCArIDEpIDogMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlVmFsdWVzT25Tb3J0KHZhbHVlMSwgdmFsdWUyLCBtdWx0aVNvcnRNZXRhW2luZGV4XS5vcmRlcik7XG4gICAgfVxuXG4gICAgY29tcGFyZVZhbHVlc09uU29ydCh2YWx1ZTE6IGFueSwgdmFsdWUyOiBhbnksIG9yZGVyOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLnNvcnQodmFsdWUxLCB2YWx1ZTIsIG9yZGVyLCB0aGlzLmZpbHRlckxvY2FsZSwgdGhpcy5zb3J0T3JkZXIpO1xuICAgIH1cblxuICAgIGdldFNvcnRNZXRhKGZpZWxkOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSAmJiB0aGlzLm11bHRpU29ydE1ldGEubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubXVsdGlTb3J0TWV0YS5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGFbaV0uZmllbGQgPT09IGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLm11bHRpU29ydE1ldGFbaV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaXNTb3J0ZWQoZmllbGQ6IHN0cmluZykge1xuICAgICAgICBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ3NpbmdsZScpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNvcnRGaWVsZCAmJiB0aGlzLnNvcnRGaWVsZCA9PT0gZmllbGQ7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgbGV0IHNvcnRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgaWYgKHRoaXMubXVsdGlTb3J0TWV0YSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5tdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm11bHRpU29ydE1ldGFbaV0uZmllbGQgPT0gZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHNvcnRlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzb3J0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoYW5kbGVSb3dDbGljayhldmVudDogYW55KSB7XG4gICAgICAgIGxldCB0YXJnZXQgPSA8SFRNTEVsZW1lbnQ+ZXZlbnQub3JpZ2luYWxFdmVudC50YXJnZXQ7XG4gICAgICAgIGxldCB0YXJnZXROb2RlID0gdGFyZ2V0Lm5vZGVOYW1lO1xuICAgICAgICBsZXQgcGFyZW50Tm9kZSA9IHRhcmdldC5wYXJlbnRFbGVtZW50ICYmIHRhcmdldC5wYXJlbnRFbGVtZW50Lm5vZGVOYW1lO1xuICAgICAgICBpZiAodGFyZ2V0Tm9kZSA9PSAnSU5QVVQnIHx8IHRhcmdldE5vZGUgPT0gJ0JVVFRPTicgfHwgdGFyZ2V0Tm9kZSA9PSAnQScgfHwgcGFyZW50Tm9kZSA9PSAnSU5QVVQnIHx8IHBhcmVudE5vZGUgPT0gJ0JVVFRPTicgfHwgcGFyZW50Tm9kZSA9PSAnQScgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC5vcmlnaW5hbEV2ZW50LnRhcmdldCwgJ3AtY2xpY2thYmxlJykpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbk1vZGUpIHtcbiAgICAgICAgICAgIGxldCByb3dEYXRhID0gZXZlbnQucm93RGF0YTtcbiAgICAgICAgICAgIGxldCByb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuXG4gICAgICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG4gICAgICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpICYmIGV2ZW50Lm9yaWdpbmFsRXZlbnQuc2hpZnRLZXkgJiYgdGhpcy5hbmNob3JSb3dJbmRleCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnJhbmdlUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyU2VsZWN0aW9uUmFuZ2UoZXZlbnQub3JpZ2luYWxFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5yYW5nZVJvd0luZGV4ID0gcm93SW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RSYW5nZShldmVudC5vcmlnaW5hbEV2ZW50LCByb3dJbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcblxuICAgICAgICAgICAgICAgIGlmICghc2VsZWN0ZWQgJiYgIXRoaXMuaXNSb3dTZWxlY3RhYmxlKHJvd0RhdGEsIHJvd0luZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IG1ldGFTZWxlY3Rpb24gPSB0aGlzLnJvd1RvdWNoZWQgPyBmYWxzZSA6IHRoaXMubWV0YUtleVNlbGVjdGlvbjtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICAgICAgICAgIHRoaXMuYW5jaG9yUm93SW5kZXggPSByb3dJbmRleDtcbiAgICAgICAgICAgICAgICB0aGlzLnJhbmdlUm93SW5kZXggPSByb3dJbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChtZXRhU2VsZWN0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBtZXRhS2V5ID0gZXZlbnQub3JpZ2luYWxFdmVudC5tZXRhS2V5IHx8IGV2ZW50Lm9yaWdpbmFsRXZlbnQuY3RybEtleTtcblxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWQgJiYgbWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzZWxlY3Rpb25JbmRleCA9IHRoaXMuZmluZEluZGV4SW5TZWxlY3Rpb24ocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5pc1NpbmdsZVNlbGVjdGlvbk1vZGUoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLmlzTXVsdGlwbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAobWV0YUtleSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzID0ge307XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gWy4uLnRoaXMuc2VsZWN0aW9uLCByb3dEYXRhXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogcm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93VW5zZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyb3cnLCBpbmRleDogcm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25DaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGlvbik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycsIGluZGV4OiByb3dJbmRleCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IHNlbGVjdGlvbkluZGV4ID0gdGhpcy5maW5kSW5kZXhJblNlbGVjdGlvbihyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbDogYW55LCBpOiBudW1iZXIpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JvdycsIGluZGV4OiByb3dJbmRleCB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uID8gWy4uLnRoaXMuc2VsZWN0aW9uLCByb3dEYXRhXSA6IFtyb3dEYXRhXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAncm93JywgaW5kZXg6IHJvd0luZGV4IH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25LZXlzW2RhdGFLZXlWYWx1ZV0gPSAxO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy50YWJsZVNlcnZpY2Uub25TZWxlY3Rpb25DaGFuZ2UoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucm93VG91Y2hlZCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGhhbmRsZVJvd1RvdWNoRW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnJvd1RvdWNoZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGhhbmRsZVJvd1JpZ2h0Q2xpY2soZXZlbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudSkge1xuICAgICAgICAgICAgY29uc3Qgcm93RGF0YSA9IGV2ZW50LnJvd0RhdGE7XG4gICAgICAgICAgICBjb25zdCByb3dJbmRleCA9IGV2ZW50LnJvd0luZGV4O1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb250ZXh0TWVudVNlbGVjdGlvbk1vZGUgPT09ICdzZXBhcmF0ZScpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHRNZW51U2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkNvbnRleHRNZW51U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBkYXRhOiByb3dEYXRhLCBpbmRleDogZXZlbnQucm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uQ29udGV4dE1lbnUocm93RGF0YSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY29udGV4dE1lbnVTZWxlY3Rpb25Nb2RlID09PSAnam9pbnQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGxldCBzZWxlY3RlZCA9IHRoaXMuaXNTZWxlY3RlZChyb3dEYXRhKTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFzZWxlY3RlZCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNSb3dTZWxlY3RhYmxlKHJvd0RhdGEsIHJvd0luZGV4KSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTaW5nbGVTZWxlY3Rpb25Nb2RlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gcm93RGF0YTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQocm93RGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChkYXRhS2V5VmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXMgPSB7fTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5pc011bHRpcGxlU2VsZWN0aW9uTW9kZSgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiA/IFsuLi50aGlzLnNlbGVjdGlvbiwgcm93RGF0YV0gOiBbcm93RGF0YV07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0TWVudS5zaG93KGV2ZW50Lm9yaWdpbmFsRXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMub25Db250ZXh0TWVudVNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJvd0RhdGEsIGluZGV4OiBldmVudC5yb3dJbmRleCB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNlbGVjdFJhbmdlKGV2ZW50OiBNb3VzZUV2ZW50IHwgS2V5Ym9hcmRFdmVudCwgcm93SW5kZXg6IG51bWJlcikge1xuICAgICAgICBsZXQgcmFuZ2VTdGFydCwgcmFuZ2VFbmQ7XG5cbiAgICAgICAgaWYgKDxudW1iZXI+dGhpcy5hbmNob3JSb3dJbmRleCA+IHJvd0luZGV4KSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gcm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XG4gICAgICAgIH0gZWxzZSBpZiAoPG51bWJlcj50aGlzLmFuY2hvclJvd0luZGV4IDwgcm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLmFuY2hvclJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSByb3dJbmRleDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSByb3dJbmRleDtcbiAgICAgICAgICAgIHJhbmdlRW5kID0gcm93SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5sYXp5ICYmIHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICAocmFuZ2VTdGFydCBhcyBudW1iZXIpIC09IDxudW1iZXI+dGhpcy5maXJzdDtcbiAgICAgICAgICAgIChyYW5nZUVuZCBhcyBudW1iZXIpIC09IDxudW1iZXI+dGhpcy5maXJzdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCByYW5nZVJvd3NEYXRhID0gW107XG4gICAgICAgIGZvciAobGV0IGkgPSA8bnVtYmVyPnJhbmdlU3RhcnQ7IGkgPD0gPG51bWJlcj5yYW5nZUVuZDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgcmFuZ2VSb3dEYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlID8gdGhpcy5maWx0ZXJlZFZhbHVlW2ldIDogdGhpcy52YWx1ZVtpXTtcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NlbGVjdGVkKHJhbmdlUm93RGF0YSkpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaXNSb3dTZWxlY3RhYmxlKHJhbmdlUm93RGF0YSwgcm93SW5kZXgpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJhbmdlUm93c0RhdGEucHVzaChyYW5nZVJvd0RhdGEpO1xuICAgICAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IFsuLi50aGlzLnNlbGVjdGlvbiwgcmFuZ2VSb3dEYXRhXTtcbiAgICAgICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocmFuZ2VSb3dEYXRhLCB0aGlzLmRhdGFLZXkpKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXSA9IDE7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICB0aGlzLm9uUm93U2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZGF0YTogcmFuZ2VSb3dzRGF0YSwgdHlwZTogJ3JvdycgfSk7XG4gICAgfVxuXG4gICAgY2xlYXJTZWxlY3Rpb25SYW5nZShldmVudDogTW91c2VFdmVudCB8IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgbGV0IHJhbmdlU3RhcnQsIHJhbmdlRW5kO1xuICAgICAgICBsZXQgcmFuZ2VSb3dJbmRleCA9IDxudW1iZXI+dGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICBsZXQgYW5jaG9yUm93SW5kZXggPSA8bnVtYmVyPnRoaXMuYW5jaG9yUm93SW5kZXg7XG5cbiAgICAgICAgaWYgKHJhbmdlUm93SW5kZXggPiBhbmNob3JSb3dJbmRleCkge1xuICAgICAgICAgICAgcmFuZ2VTdGFydCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHRoaXMucmFuZ2VSb3dJbmRleDtcbiAgICAgICAgfSBlbHNlIGlmIChyYW5nZVJvd0luZGV4IDwgYW5jaG9yUm93SW5kZXgpIHtcbiAgICAgICAgICAgIHJhbmdlU3RhcnQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgICAgICByYW5nZUVuZCA9IHRoaXMuYW5jaG9yUm93SW5kZXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByYW5nZVN0YXJ0ID0gdGhpcy5yYW5nZVJvd0luZGV4O1xuICAgICAgICAgICAgcmFuZ2VFbmQgPSB0aGlzLnJhbmdlUm93SW5kZXg7XG4gICAgICAgIH1cblxuICAgICAgICBmb3IgKGxldCBpID0gPG51bWJlcj5yYW5nZVN0YXJ0OyBpIDw9IDxudW1iZXI+cmFuZ2VFbmQ7IGkrKykge1xuICAgICAgICAgICAgbGV0IHJhbmdlUm93RGF0YSA9IHRoaXMudmFsdWVbaV07XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJhbmdlUm93RGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbi5maWx0ZXIoKHZhbDogYW55LCBpOiBudW1iZXIpID0+IGkgIT0gc2VsZWN0aW9uSW5kZXgpO1xuICAgICAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IHRoaXMuZGF0YUtleSA/IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJhbmdlUm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnNlbGVjdGlvbktleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMub25Sb3dVbnNlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGRhdGE6IHJhbmdlUm93RGF0YSwgdHlwZTogJ3JvdycgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1NlbGVjdGVkKHJvd0RhdGE6IGFueSkge1xuICAgICAgICBpZiAocm93RGF0YSAmJiB0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbktleXNbT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLnNlbGVjdGlvbikpIHJldHVybiB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpID4gLTE7XG4gICAgICAgICAgICAgICAgZWxzZSByZXR1cm4gdGhpcy5lcXVhbHMocm93RGF0YSwgdGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGE6IGFueSkge1xuICAgICAgICBsZXQgaW5kZXg6IG51bWJlciA9IC0xO1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gJiYgdGhpcy5zZWxlY3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc2VsZWN0aW9uLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZXF1YWxzKHJvd0RhdGEsIHRoaXMuc2VsZWN0aW9uW2ldKSkge1xuICAgICAgICAgICAgICAgICAgICBpbmRleCA9IGk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBpbmRleDtcbiAgICB9XG5cbiAgICBpc1Jvd1NlbGVjdGFibGUoZGF0YTogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGlmICh0aGlzLnJvd1NlbGVjdGFibGUgJiYgIXRoaXMucm93U2VsZWN0YWJsZSh7IGRhdGEsIGluZGV4IH0pKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICB0b2dnbGVSb3dXaXRoUmFkaW8oZXZlbnQ6IGFueSwgcm93RGF0YTogYW55KSB7XG4gICAgICAgIHRoaXMucHJldmVudFNlbGVjdGlvblNldHRlclByb3BhZ2F0aW9uID0gdHJ1ZTtcblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24gIT0gcm93RGF0YSkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUm93U2VsZWN0YWJsZShyb3dEYXRhLCBldmVudC5yb3dJbmRleCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHJvd0RhdGE7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuc2VsZWN0aW9uKTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dTZWxlY3QuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50Lm9yaWdpbmFsRXZlbnQsIGluZGV4OiBldmVudC5yb3dJbmRleCwgZGF0YTogcm93RGF0YSwgdHlwZTogJ3JhZGlvYnV0dG9uJyB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZGF0YUtleSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5cyA9IHt9O1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKV0gPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBpbmRleDogZXZlbnQucm93SW5kZXgsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdyYWRpb2J1dHRvbicgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZVJvd1dpdGhDaGVja2JveChldmVudDogYW55LCByb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSB0aGlzLnNlbGVjdGlvbiB8fCBbXTtcbiAgICAgICAgbGV0IHNlbGVjdGVkID0gdGhpcy5pc1NlbGVjdGVkKHJvd0RhdGEpO1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gdGhpcy5kYXRhS2V5ID8gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSkgOiBudWxsO1xuICAgICAgICB0aGlzLnByZXZlbnRTZWxlY3Rpb25TZXR0ZXJQcm9wYWdhdGlvbiA9IHRydWU7XG5cbiAgICAgICAgaWYgKHNlbGVjdGVkKSB7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uSW5kZXggPSB0aGlzLmZpbmRJbmRleEluU2VsZWN0aW9uKHJvd0RhdGEpO1xuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb24uZmlsdGVyKCh2YWw6IGFueSwgaTogbnVtYmVyKSA9PiBpICE9IHNlbGVjdGlvbkluZGV4KTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1Vuc2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudC5vcmlnaW5hbEV2ZW50LCBpbmRleDogZXZlbnQucm93SW5kZXgsIGRhdGE6IHJvd0RhdGEsIHR5cGU6ICdjaGVja2JveCcgfSk7XG4gICAgICAgICAgICBpZiAoZGF0YUtleVZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUm93U2VsZWN0YWJsZShyb3dEYXRhLCBldmVudC5yb3dJbmRleCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuX3NlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uID8gWy4uLnRoaXMuc2VsZWN0aW9uLCByb3dEYXRhXSA6IFtyb3dEYXRhXTtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3Rpb24pO1xuICAgICAgICAgICAgdGhpcy5vblJvd1NlbGVjdC5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQub3JpZ2luYWxFdmVudCwgaW5kZXg6IGV2ZW50LnJvd0luZGV4LCBkYXRhOiByb3dEYXRhLCB0eXBlOiAnY2hlY2tib3gnIH0pO1xuICAgICAgICAgICAgaWYgKGRhdGFLZXlWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uS2V5c1tkYXRhS2V5VmFsdWVdID0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudGFibGVTZXJ2aWNlLm9uU2VsZWN0aW9uQ2hhbmdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdG9nZ2xlUm93c1dpdGhDaGVja2JveChldmVudDogRXZlbnQsIGNoZWNrOiBib29sZWFuKSB7XG4gICAgICAgIGlmICh0aGlzLl9zZWxlY3RBbGwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0QWxsQ2hhbmdlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgY2hlY2tlZDogY2hlY2sgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5zZWxlY3Rpb25QYWdlT25seSA/IHRoaXMuZGF0YVRvUmVuZGVyKHRoaXMucHJvY2Vzc2VkRGF0YSkgOiB0aGlzLnByb2Nlc3NlZERhdGE7XG4gICAgICAgICAgICBsZXQgc2VsZWN0aW9uID0gdGhpcy5zZWxlY3Rpb25QYWdlT25seSAmJiB0aGlzLl9zZWxlY3Rpb24gPyB0aGlzLl9zZWxlY3Rpb24uZmlsdGVyKChzOiBhbnkpID0+ICFkYXRhLnNvbWUoKGQ6IGFueSkgPT4gdGhpcy5lcXVhbHMocywgZCkpKSA6IFtdO1xuXG4gICAgICAgICAgICBpZiAoY2hlY2spIHtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLmZyb3plblZhbHVlID8gWy4uLnNlbGVjdGlvbiwgLi4udGhpcy5mcm96ZW5WYWx1ZSwgLi4uZGF0YV0gOiBbLi4uc2VsZWN0aW9uLCAuLi5kYXRhXTtcbiAgICAgICAgICAgICAgICBzZWxlY3Rpb24gPSB0aGlzLnJvd1NlbGVjdGFibGUgPyBzZWxlY3Rpb24uZmlsdGVyKChkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHRoaXMucm93U2VsZWN0YWJsZSh7IGRhdGEsIGluZGV4IH0pKSA6IHNlbGVjdGlvbjtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5fc2VsZWN0aW9uID0gc2VsZWN0aW9uO1xuICAgICAgICAgICAgdGhpcy5wcmV2ZW50U2VsZWN0aW9uU2V0dGVyUHJvcGFnYXRpb24gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTZWxlY3Rpb25LZXlzKCk7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHRoaXMuX3NlbGVjdGlvbik7XG4gICAgICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNlbGVjdGlvbkNoYW5nZSgpO1xuICAgICAgICAgICAgdGhpcy5vbkhlYWRlckNoZWNrYm94VG9nZ2xlLmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgY2hlY2tlZDogY2hlY2sgfSk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBlcXVhbHMoZGF0YTE6IGFueSwgZGF0YTI6IGFueSkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb21wYXJlU2VsZWN0aW9uQnkgPT09ICdlcXVhbHMnID8gZGF0YTEgPT09IGRhdGEyIDogT2JqZWN0VXRpbHMuZXF1YWxzKGRhdGExLCBkYXRhMiwgdGhpcy5kYXRhS2V5KTtcbiAgICB9XG5cbiAgICAvKiBMZWdhY3kgRmlsdGVyaW5nIGZvciBjdXN0b20gZWxlbWVudHMgKi9cbiAgICBmaWx0ZXIodmFsdWU6IGFueSwgZmllbGQ6IHN0cmluZywgbWF0Y2hNb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgaWYgKHRoaXMuZmlsdGVyVGltZW91dCkge1xuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHRoaXMuZmlsdGVyVGltZW91dCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF0aGlzLmlzRmlsdGVyQmxhbmsodmFsdWUpKSB7XG4gICAgICAgICAgICB0aGlzLmZpbHRlcnNbZmllbGRdID0gZmllbGQgPT0gJ2dsb2JhbCcgPyB7IHZhbHVlOiB2YWx1ZSwgbWF0Y2hNb2RlOiBtYXRjaE1vZGUgfSA6IFt7IHZhbHVlOiB2YWx1ZSwgbWF0Y2hNb2RlOiBtYXRjaE1vZGUgfV07XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5maWx0ZXJzW2ZpZWxkXSkge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuZmlsdGVyc1tmaWVsZF07XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmZpbHRlclRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuX2ZpbHRlcigpO1xuICAgICAgICAgICAgdGhpcy5maWx0ZXJUaW1lb3V0ID0gbnVsbDtcbiAgICAgICAgfSwgdGhpcy5maWx0ZXJEZWxheSk7XG5cbiAgICAgICAgdGhpcy5hbmNob3JSb3dJbmRleCA9IG51bGw7XG4gICAgfVxuXG4gICAgZmlsdGVyR2xvYmFsKHZhbHVlOiBhbnksIG1hdGNoTW9kZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuZmlsdGVyKHZhbHVlLCAnZ2xvYmFsJywgbWF0Y2hNb2RlKTtcbiAgICB9XG5cbiAgICBpc0ZpbHRlckJsYW5rKGZpbHRlcjogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIGlmIChmaWx0ZXIgIT09IG51bGwgJiYgZmlsdGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGlmICgodHlwZW9mIGZpbHRlciA9PT0gJ3N0cmluZycgJiYgZmlsdGVyLnRyaW0oKS5sZW5ndGggPT0gMCkgfHwgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSAmJiBmaWx0ZXIubGVuZ3RoID09IDApKSByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIF9maWx0ZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZmlyc3QgPSAwO1xuICAgICAgICAgICAgdGhpcy5maXJzdENoYW5nZS5lbWl0KHRoaXMuZmlyc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMubGF6eSkge1xuICAgICAgICAgICAgdGhpcy5vbkxhenlMb2FkLmVtaXQodGhpcy5jcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMudmFsdWUgPyB0aGlzLnZhbHVlLmxlbmd0aCA6IDA7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXk7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmNvbHVtbnMgJiYgIXRoaXMuZ2xvYmFsRmlsdGVyRmllbGRzKSB0aHJvdyBuZXcgRXJyb3IoJ0dsb2JhbCBmaWx0ZXJpbmcgcmVxdWlyZXMgZHluYW1pYyBjb2x1bW5zIG9yIGdsb2JhbEZpbHRlckZpZWxkcyB0byBiZSBkZWZpbmVkLicpO1xuICAgICAgICAgICAgICAgICAgICBlbHNlIGdsb2JhbEZpbHRlckZpZWxkc0FycmF5ID0gdGhpcy5nbG9iYWxGaWx0ZXJGaWVsZHMgfHwgdGhpcy5jb2x1bW5zO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IFtdO1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnZhbHVlLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbE1hdGNoID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgbGV0IGdsb2JhbE1hdGNoID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIGxldCBsb2NhbEZpbHRlcmVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLmZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnMuaGFzT3duUHJvcGVydHkocHJvcCkgJiYgcHJvcCAhPT0gJ2dsb2JhbCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsb2NhbEZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsdGVyRmllbGQgPSBwcm9wO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBmaWx0ZXJNZXRhID0gdGhpcy5maWx0ZXJzW2ZpbHRlckZpZWxkXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGZpbHRlck1ldGEpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IG1ldGEgb2YgZmlsdGVyTWV0YSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYXRjaCA9IHRoaXMuZXhlY3V0ZUxvY2FsRmlsdGVyKGZpbHRlckZpZWxkLCB0aGlzLnZhbHVlW2ldLCBtZXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKChtZXRhLm9wZXJhdG9yID09PSBGaWx0ZXJPcGVyYXRvci5PUiAmJiBsb2NhbE1hdGNoKSB8fCAobWV0YS5vcGVyYXRvciA9PT0gRmlsdGVyT3BlcmF0b3IuQU5EICYmICFsb2NhbE1hdGNoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbG9jYWxNYXRjaCA9IHRoaXMuZXhlY3V0ZUxvY2FsRmlsdGVyKGZpbHRlckZpZWxkLCB0aGlzLnZhbHVlW2ldLCA8YW55PmZpbHRlck1ldGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghbG9jYWxNYXRjaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5maWx0ZXJzWydnbG9iYWwnXSAmJiAhZ2xvYmFsTWF0Y2ggJiYgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZ2xvYmFsRmlsdGVyRmllbGRzQXJyYXkubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZ2xvYmFsRmlsdGVyRmllbGQgPSBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheVtqXS5maWVsZCB8fCBnbG9iYWxGaWx0ZXJGaWVsZHNBcnJheVtqXTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBnbG9iYWxNYXRjaCA9ICg8YW55PnRoaXMuZmlsdGVyU2VydmljZSkuZmlsdGVyc1soPGFueT50aGlzLmZpbHRlcnNbJ2dsb2JhbCddKS5tYXRjaE1vZGVdKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEodGhpcy52YWx1ZVtpXSwgZ2xvYmFsRmlsdGVyRmllbGQpLCAoPEZpbHRlck1ldGFkYXRhPnRoaXMuZmlsdGVyc1snZ2xvYmFsJ10pLnZhbHVlLCB0aGlzLmZpbHRlckxvY2FsZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZ2xvYmFsTWF0Y2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IG1hdGNoZXM6IGJvb2xlYW47XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnNbJ2dsb2JhbCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBtYXRjaGVzID0gbG9jYWxGaWx0ZXJlZCA/IGxvY2FsRmlsdGVyZWQgJiYgbG9jYWxNYXRjaCAmJiBnbG9iYWxNYXRjaCA6IGdsb2JhbE1hdGNoO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgbWF0Y2hlcyA9IGxvY2FsRmlsdGVyZWQgJiYgbG9jYWxNYXRjaDtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIGlmIChtYXRjaGVzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUucHVzaCh0aGlzLnZhbHVlW2ldKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcmVkVmFsdWUubGVuZ3RoID09PSB0aGlzLnZhbHVlLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlcmVkVmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMuZmlsdGVyZWRWYWx1ZSA/IHRoaXMuZmlsdGVyZWRWYWx1ZS5sZW5ndGggOiB0aGlzLnZhbHVlID8gdGhpcy52YWx1ZS5sZW5ndGggOiAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMub25GaWx0ZXIuZW1pdCh7XG4gICAgICAgICAgICBmaWx0ZXJzOiA8eyBbczogc3RyaW5nXTogRmlsdGVyTWV0YWRhdGEgfCB1bmRlZmluZWQgfT50aGlzLmZpbHRlcnMsXG4gICAgICAgICAgICBmaWx0ZXJlZFZhbHVlOiB0aGlzLmZpbHRlcmVkVmFsdWUgfHwgdGhpcy52YWx1ZVxuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblZhbHVlQ2hhbmdlKHRoaXMudmFsdWUpO1xuXG4gICAgICAgIGlmICh0aGlzLmlzU3RhdGVmdWwoKSAmJiAhdGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXN0b3JpbmdGaWx0ZXIpIHtcbiAgICAgICAgICAgIHRoaXMucmVzdG9yaW5nRmlsdGVyID0gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLnNjcm9sbGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRTY3JvbGxUb3AoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGV4ZWN1dGVMb2NhbEZpbHRlcihmaWVsZDogc3RyaW5nLCByb3dEYXRhOiBhbnksIGZpbHRlck1ldGE6IEZpbHRlck1ldGFkYXRhKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBmaWx0ZXJWYWx1ZSA9IGZpbHRlck1ldGEudmFsdWU7XG4gICAgICAgIGxldCBmaWx0ZXJNYXRjaE1vZGUgPSBmaWx0ZXJNZXRhLm1hdGNoTW9kZSB8fCBGaWx0ZXJNYXRjaE1vZGUuU1RBUlRTX1dJVEg7XG4gICAgICAgIGxldCBkYXRhRmllbGRWYWx1ZSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgZmllbGQpO1xuICAgICAgICBsZXQgZmlsdGVyQ29uc3RyYWludCA9ICg8YW55PnRoaXMuZmlsdGVyU2VydmljZSkuZmlsdGVyc1tmaWx0ZXJNYXRjaE1vZGVdO1xuXG4gICAgICAgIHJldHVybiBmaWx0ZXJDb25zdHJhaW50KGRhdGFGaWVsZFZhbHVlLCBmaWx0ZXJWYWx1ZSwgdGhpcy5maWx0ZXJMb2NhbGUpO1xuICAgIH1cblxuICAgIGhhc0ZpbHRlcigpIHtcbiAgICAgICAgbGV0IGVtcHR5ID0gdHJ1ZTtcbiAgICAgICAgZm9yIChsZXQgcHJvcCBpbiB0aGlzLmZpbHRlcnMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbHRlcnMuaGFzT3duUHJvcGVydHkocHJvcCkpIHtcbiAgICAgICAgICAgICAgICBlbXB0eSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICFlbXB0eTtcbiAgICB9XG5cbiAgICBjcmVhdGVMYXp5TG9hZE1ldGFkYXRhKCk6IGFueSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmaXJzdDogdGhpcy5maXJzdCxcbiAgICAgICAgICAgIHJvd3M6IHRoaXMucm93cyxcbiAgICAgICAgICAgIHNvcnRGaWVsZDogdGhpcy5zb3J0RmllbGQsXG4gICAgICAgICAgICBzb3J0T3JkZXI6IHRoaXMuc29ydE9yZGVyLFxuICAgICAgICAgICAgZmlsdGVyczogdGhpcy5maWx0ZXJzLFxuICAgICAgICAgICAgZ2xvYmFsRmlsdGVyOiB0aGlzLmZpbHRlcnMgJiYgdGhpcy5maWx0ZXJzWydnbG9iYWwnXSA/ICg8RmlsdGVyTWV0YWRhdGE+dGhpcy5maWx0ZXJzWydnbG9iYWwnXSkudmFsdWUgOiBudWxsLFxuICAgICAgICAgICAgbXVsdGlTb3J0TWV0YTogdGhpcy5tdWx0aVNvcnRNZXRhLFxuICAgICAgICAgICAgZm9yY2VVcGRhdGU6ICgpID0+IHRoaXMuY2QuZGV0ZWN0Q2hhbmdlcygpXG4gICAgICAgIH07XG4gICAgfVxuXG4gICAgcHVibGljIGNsZWFyKCkge1xuICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBudWxsO1xuICAgICAgICB0aGlzLl9zb3J0T3JkZXIgPSB0aGlzLmRlZmF1bHRTb3J0T3JkZXI7XG4gICAgICAgIHRoaXMuX211bHRpU29ydE1ldGEgPSBudWxsO1xuICAgICAgICB0aGlzLnRhYmxlU2VydmljZS5vblNvcnQobnVsbCk7XG5cbiAgICAgICAgdGhpcy5jbGVhckZpbHRlclZhbHVlcygpO1xuXG4gICAgICAgIHRoaXMuZmlsdGVyZWRWYWx1ZSA9IG51bGw7XG5cbiAgICAgICAgdGhpcy5maXJzdCA9IDA7XG4gICAgICAgIHRoaXMuZmlyc3RDaGFuZ2UuZW1pdCh0aGlzLmZpcnN0KTtcblxuICAgICAgICBpZiAodGhpcy5sYXp5KSB7XG4gICAgICAgICAgICB0aGlzLm9uTGF6eUxvYWQuZW1pdCh0aGlzLmNyZWF0ZUxhenlMb2FkTWV0YWRhdGEoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnRvdGFsUmVjb3JkcyA9IHRoaXMuX3ZhbHVlID8gdGhpcy5fdmFsdWUubGVuZ3RoIDogMDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyRmlsdGVyVmFsdWVzKCkge1xuICAgICAgICBmb3IgKGNvbnN0IFssIGZpbHRlck1ldGFkYXRhXSBvZiBPYmplY3QuZW50cmllcyh0aGlzLmZpbHRlcnMpKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWx0ZXJNZXRhZGF0YSkpIHtcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBmaWx0ZXIgb2YgZmlsdGVyTWV0YWRhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsdGVyLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGZpbHRlck1ldGFkYXRhKSB7XG4gICAgICAgICAgICAgICAgZmlsdGVyTWV0YWRhdGEudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmVzZXQoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICB9XG5cbiAgICBnZXRFeHBvcnRIZWFkZXIoY29sdW1uOiBhbnkpIHtcbiAgICAgICAgcmV0dXJuIGNvbHVtbls8c3RyaW5nPnRoaXMuZXhwb3J0SGVhZGVyXSB8fCBjb2x1bW4uaGVhZGVyIHx8IGNvbHVtbi5maWVsZDtcbiAgICB9XG4gICAgLyoqXG4gICAgICogRGF0YSBleHBvcnQgbWV0aG9kLlxuICAgICAqIEBwYXJhbSB7RXhwb3J0Q1NWT3B0aW9uc30gb2JqZWN0IC0gRXhwb3J0IG9wdGlvbnMuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBleHBvcnRDU1Yob3B0aW9ucz86IEV4cG9ydENTVk9wdGlvbnMpIHtcbiAgICAgICAgbGV0IGRhdGE7XG4gICAgICAgIGxldCBjc3YgPSAnJztcbiAgICAgICAgbGV0IGNvbHVtbnMgPSB0aGlzLmNvbHVtbnM7XG5cbiAgICAgICAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5zZWxlY3Rpb25Pbmx5KSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5zZWxlY3Rpb24gfHwgW107XG4gICAgICAgIH0gZWxzZSBpZiAob3B0aW9ucyAmJiBvcHRpb25zLmFsbFZhbHVlcykge1xuICAgICAgICAgICAgZGF0YSA9IHRoaXMudmFsdWUgfHwgW107XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkYXRhID0gdGhpcy5maWx0ZXJlZFZhbHVlIHx8IHRoaXMudmFsdWU7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLmZyb3plblZhbHVlKSB7XG4gICAgICAgICAgICAgICAgZGF0YSA9IGRhdGEgPyBbLi4udGhpcy5mcm96ZW5WYWx1ZSwgLi4uZGF0YV0gOiB0aGlzLmZyb3plblZhbHVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZXhwb3J0YWJsZUNvbHVtbnM6IGFueVtdID0gKDxhbnlbXT5jb2x1bW5zKS5maWx0ZXIoKGNvbHVtbikgPT4gY29sdW1uLmV4cG9ydGFibGUgIT09IGZhbHNlICYmIGNvbHVtbi5maWVsZCk7XG5cbiAgICAgICAgLy9oZWFkZXJzXG4gICAgICAgIGNzdiArPSBleHBvcnRhYmxlQ29sdW1ucy5tYXAoKGNvbHVtbikgPT4gJ1wiJyArIHRoaXMuZ2V0RXhwb3J0SGVhZGVyKGNvbHVtbikgKyAnXCInKS5qb2luKHRoaXMuY3N2U2VwYXJhdG9yKTtcblxuICAgICAgICAvL2JvZHlcbiAgICAgICAgY29uc3QgYm9keSA9IGRhdGFcbiAgICAgICAgICAgIC5tYXAoKHJlY29yZDogYW55KSA9PlxuICAgICAgICAgICAgICAgIGV4cG9ydGFibGVDb2x1bW5zXG4gICAgICAgICAgICAgICAgICAgIC5tYXAoKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNlbGxEYXRhID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyZWNvcmQsIGNvbHVtbi5maWVsZCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjZWxsRGF0YSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuZXhwb3J0RnVuY3Rpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2VsbERhdGEgPSB0aGlzLmV4cG9ydEZ1bmN0aW9uKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRhdGE6IGNlbGxEYXRhLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGNvbHVtbi5maWVsZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY2VsbERhdGEgPSBTdHJpbmcoY2VsbERhdGEpLnJlcGxhY2UoL1wiL2csICdcIlwiJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgY2VsbERhdGEgPSAnJztcblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuICdcIicgKyBjZWxsRGF0YSArICdcIic7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5qb2luKHRoaXMuY3N2U2VwYXJhdG9yKVxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLmpvaW4oJ1xcbicpO1xuXG4gICAgICAgIGlmIChib2R5Lmxlbmd0aCkge1xuICAgICAgICAgICAgY3N2ICs9ICdcXG4nICsgYm9keTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBibG9iID0gbmV3IEJsb2IoW25ldyBVaW50OEFycmF5KFsweGVmLCAweGJiLCAweGJmXSksIGNzdl0sIHtcbiAgICAgICAgICAgIHR5cGU6ICd0ZXh0L2NzdjtjaGFyc2V0PXV0Zi04OydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IGxpbmsgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgbGluay5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgbGluayk7XG4gICAgICAgIGlmIChsaW5rLmRvd25sb2FkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIGxpbmsuc2V0QXR0cmlidXRlKCdocmVmJywgVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKSk7XG4gICAgICAgICAgICBsaW5rLnNldEF0dHJpYnV0ZSgnZG93bmxvYWQnLCB0aGlzLmV4cG9ydEZpbGVuYW1lICsgJy5jc3YnKTtcbiAgICAgICAgICAgIGxpbmsuY2xpY2soKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNzdiA9ICdkYXRhOnRleHQvY3N2O2NoYXJzZXQ9dXRmLTgsJyArIGNzdjtcbiAgICAgICAgICAgIHRoaXMud2luZG93Lm9wZW4oZW5jb2RlVVJJKGNzdikpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5ib2R5LCBsaW5rKTtcbiAgICB9XG5cbiAgICBvbkxhenlJdGVtTG9hZChldmVudDogTGF6eUxvYWRNZXRhKSB7XG4gICAgICAgIHRoaXMub25MYXp5TG9hZC5lbWl0KHtcbiAgICAgICAgICAgIC4uLnRoaXMuY3JlYXRlTGF6eUxvYWRNZXRhZGF0YSgpLFxuICAgICAgICAgICAgLi4uZXZlbnQsXG4gICAgICAgICAgICByb3dzOiA8bnVtYmVyPmV2ZW50Lmxhc3QgLSA8bnVtYmVyPmV2ZW50LmZpcnN0XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBSZXNldHMgc2Nyb2xsIHRvIHRvcC5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIHJlc2V0U2Nyb2xsVG9wKCkge1xuICAgICAgICBpZiAodGhpcy52aXJ0dWFsU2Nyb2xsKSB0aGlzLnNjcm9sbFRvVmlydHVhbEluZGV4KDApO1xuICAgICAgICBlbHNlIHRoaXMuc2Nyb2xsVG8oeyB0b3A6IDAgfSk7XG4gICAgfVxuICAgIC8qKlxuICAgICAqIFNjcm9sbHMgdG8gZ2l2ZW4gaW5kZXggd2hlbiB1c2luZyB2aXJ0dWFsIHNjcm9sbC5cbiAgICAgKiBAcGFyYW0ge251bWJlcn0gaW5kZXggLSBpbmRleCBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgcHVibGljIHNjcm9sbFRvVmlydHVhbEluZGV4KGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxlciAmJiB0aGlzLnNjcm9sbGVyLnNjcm9sbFRvSW5kZXgoaW5kZXgpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBTY3JvbGxzIHRvIGdpdmVuIGluZGV4LlxuICAgICAqIEBwYXJhbSB7U2Nyb2xsVG9PcHRpb25zfSBvcHRpb25zIC0gc2Nyb2xsIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIE1ldGhvZFxuICAgICAqL1xuICAgIHB1YmxpYyBzY3JvbGxUbyhvcHRpb25zOiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMudmlydHVhbFNjcm9sbCkge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxlcj8uc2Nyb2xsVG8ob3B0aW9ucyk7XG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy53cmFwcGVyVmlld0NoaWxkICYmIHRoaXMud3JhcHBlclZpZXdDaGlsZC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsVG8pIHtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUbyhvcHRpb25zKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy53cmFwcGVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCA9IG9wdGlvbnMubGVmdDtcbiAgICAgICAgICAgICAgICB0aGlzLndyYXBwZXJWaWV3Q2hpbGQubmF0aXZlRWxlbWVudC5zY3JvbGxUb3AgPSBvcHRpb25zLnRvcDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZUVkaXRpbmdDZWxsKGNlbGw6IGFueSwgZGF0YTogYW55LCBmaWVsZDogc3RyaW5nLCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBjZWxsO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsRGF0YSA9IGRhdGE7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGxGaWVsZCA9IGZpZWxkO1xuICAgICAgICB0aGlzLmVkaXRpbmdDZWxsUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICBpc0VkaXRpbmdDZWxsVmFsaWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmVkaXRpbmdDZWxsICYmIERvbUhhbmRsZXIuZmluZCh0aGlzLmVkaXRpbmdDZWxsLCAnLm5nLWludmFsaWQubmctZGlydHknKS5sZW5ndGggPT09IDA7XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRFZGl0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmRvY3VtZW50LCAnY2xpY2snLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lZGl0aW5nQ2VsbCAmJiAhdGhpcy5zZWxmQ2xpY2sgJiYgdGhpcy5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuZWRpdGluZ0NlbGwsICdwLWNlbGwtZWRpdGluZycpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVkaXRpbmdDZWxsID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkVkaXRDb21wbGV0ZS5lbWl0KHsgZmllbGQ6IHRoaXMuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogdGhpcy5lZGl0aW5nQ2VsbERhdGEsIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBpbmRleDogPG51bWJlcj50aGlzLmVkaXRpbmdDZWxsUm93SW5kZXggfSk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0NlbGxGaWVsZCA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZWRpdGluZ0NlbGxEYXRhID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lZGl0aW5nQ2VsbFJvd0luZGV4ID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRFZGl0TGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50RWRpdExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGluaXRSb3dFZGl0KHJvd0RhdGE6IGFueSkge1xuICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG4gICAgICAgIHRoaXMuZWRpdGluZ1Jvd0tleXNbZGF0YUtleVZhbHVlXSA9IHRydWU7XG4gICAgfVxuXG4gICAgc2F2ZVJvd0VkaXQocm93RGF0YTogYW55LCByb3dFbGVtZW50OiBIVE1MVGFibGVSb3dFbGVtZW50KSB7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmZpbmQocm93RWxlbWVudCwgJy5uZy1pbnZhbGlkLm5nLWRpcnR5JykubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICBsZXQgZGF0YUtleVZhbHVlID0gU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSk7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY2FuY2VsUm93RWRpdChyb3dEYXRhOiBhbnkpIHtcbiAgICAgICAgbGV0IGRhdGFLZXlWYWx1ZSA9IFN0cmluZyhPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZGF0YUtleSkpO1xuICAgICAgICBkZWxldGUgdGhpcy5lZGl0aW5nUm93S2V5c1tkYXRhS2V5VmFsdWVdO1xuICAgIH1cblxuICAgIHRvZ2dsZVJvdyhyb3dEYXRhOiBhbnksIGV2ZW50PzogRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRhdGFLZXkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignZGF0YUtleSBtdXN0IGJlIGRlZmluZWQgdG8gdXNlIHJvdyBleHBhbnNpb24nKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBkYXRhS2V5VmFsdWUgPSBTdHJpbmcoT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmRhdGFLZXkpKTtcblxuICAgICAgICBpZiAodGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBkZWxldGUgdGhpcy5leHBhbmRlZFJvd0tleXNbZGF0YUtleVZhbHVlXTtcbiAgICAgICAgICAgIHRoaXMub25Sb3dDb2xsYXBzZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiA8RXZlbnQ+ZXZlbnQsXG4gICAgICAgICAgICAgICAgZGF0YTogcm93RGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy5yb3dFeHBhbmRNb2RlID09PSAnc2luZ2xlJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dLZXlzID0ge307XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRSb3dLZXlzW2RhdGFLZXlWYWx1ZV0gPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vblJvd0V4cGFuZC5lbWl0KHtcbiAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiA8RXZlbnQ+ZXZlbnQsXG4gICAgICAgICAgICAgICAgZGF0YTogcm93RGF0YVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZXZlbnQpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5pc1N0YXRlZnVsKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2F2ZVN0YXRlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc1Jvd0V4cGFuZGVkKHJvd0RhdGE6IGFueSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5leHBhbmRlZFJvd0tleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSldID09PSB0cnVlO1xuICAgIH1cblxuICAgIGlzUm93RWRpdGluZyhyb3dEYXRhOiBhbnkpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZWRpdGluZ1Jvd0tleXNbU3RyaW5nKE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kYXRhS2V5KSldID09PSB0cnVlO1xuICAgIH1cblxuICAgIGlzU2luZ2xlU2VsZWN0aW9uTW9kZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ3NpbmdsZSc7XG4gICAgfVxuXG4gICAgaXNNdWx0aXBsZVNlbGVjdGlvbk1vZGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdtdWx0aXBsZSc7XG4gICAgfVxuXG4gICAgb25Db2x1bW5SZXNpemVCZWdpbihldmVudDogYW55KSB7XG4gICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIHRoaXMucmVzaXplQ29sdW1uRWxlbWVudCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50O1xuICAgICAgICB0aGlzLmNvbHVtblJlc2l6aW5nID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5sYXN0UmVzaXplckhlbHBlclggPSBldmVudC5wYWdlWCAtIGNvbnRhaW5lckxlZnQgKyB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5zY3JvbGxMZWZ0O1xuICAgICAgICB0aGlzLm9uQ29sdW1uUmVzaXplKGV2ZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkNvbHVtblJlc2l6ZShldmVudDogYW55KSB7XG4gICAgICAgIGxldCBjb250YWluZXJMZWZ0ID0gRG9tSGFuZGxlci5nZXRPZmZzZXQodGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpLmxlZnQ7XG4gICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3ModGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQsICdwLXVuc2VsZWN0YWJsZS10ZXh0Jyk7XG4gICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5oZWlnaHQgPSB0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5vZmZzZXRIZWlnaHQgKyAncHgnO1xuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZXNpemVIZWxwZXJWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gMCArICdweCc7XG4gICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gZXZlbnQucGFnZVggLSBjb250YWluZXJMZWZ0ICsgdGhpcy5jb250YWluZXJWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsTGVmdCArICdweCc7XG5cbiAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVzaXplSGVscGVyVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgIH1cblxuICAgIG9uQ29sdW1uUmVzaXplRW5kKCkge1xuICAgICAgICBsZXQgZGVsdGEgPSB0aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudC5vZmZzZXRMZWZ0IC0gPG51bWJlcj50aGlzLmxhc3RSZXNpemVySGVscGVyWDtcbiAgICAgICAgbGV0IGNvbHVtbldpZHRoID0gdGhpcy5yZXNpemVDb2x1bW5FbGVtZW50Lm9mZnNldFdpZHRoO1xuICAgICAgICBsZXQgbmV3Q29sdW1uV2lkdGggPSBjb2x1bW5XaWR0aCArIGRlbHRhO1xuICAgICAgICBsZXQgbWluV2lkdGggPSB0aGlzLnJlc2l6ZUNvbHVtbkVsZW1lbnQuc3R5bGUubWluV2lkdGgucmVwbGFjZSgvW15cXGQuXS9nLCAnJykgfHwgMTU7XG5cbiAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID49IG1pbldpZHRoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZml0Jykge1xuICAgICAgICAgICAgICAgIGxldCBuZXh0Q29sdW1uID0gdGhpcy5yZXNpemVDb2x1bW5FbGVtZW50Lm5leHRFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBsZXQgbmV4dENvbHVtbldpZHRoID0gbmV4dENvbHVtbi5vZmZzZXRXaWR0aCAtIGRlbHRhO1xuXG4gICAgICAgICAgICAgICAgaWYgKG5ld0NvbHVtbldpZHRoID4gMTUgJiYgbmV4dENvbHVtbldpZHRoID4gMTUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZXNpemVUYWJsZUNlbGxzKG5ld0NvbHVtbldpZHRoLCBuZXh0Q29sdW1uV2lkdGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2luaXRpYWxDb2xXaWR0aHMgPSB0aGlzLl90b3RhbFRhYmxlV2lkdGgoKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFibGVXaWR0aCA9IHRoaXMudGFibGVWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0V2lkdGggKyBkZWx0YTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzaXplVGFibGVXaWR0aCh0YWJsZVdpZHRoICsgJ3B4Jyk7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNpemVUYWJsZUNlbGxzKG5ld0NvbHVtbldpZHRoLCBudWxsKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vbkNvbFJlc2l6ZS5lbWl0KHtcbiAgICAgICAgICAgICAgICBlbGVtZW50OiB0aGlzLnJlc2l6ZUNvbHVtbkVsZW1lbnQsXG4gICAgICAgICAgICAgICAgZGVsdGE6IGRlbHRhXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zYXZlU3RhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlc2l6ZUhlbHBlclZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAncC11bnNlbGVjdGFibGUtdGV4dCcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgX3RvdGFsVGFibGVXaWR0aCgpOiBudW1iZXJbXSB7XG4gICAgICAgIGxldCB3aWR0aHMgPSBbXTtcbiAgICAgICAgY29uc3QgdGFibGVIZWFkID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuY29udGFpbmVyVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQsICcucC1kYXRhdGFibGUtdGhlYWQnKTtcbiAgICAgICAgbGV0IGhlYWRlcnMgPSBEb21IYW5kbGVyLmZpbmQodGFibGVIZWFkLCAndHIgPiB0aCcpO1xuICAgICAgICBoZWFkZXJzLmZvckVhY2goKGhlYWRlcikgPT4gd2lkdGhzLnB1c2goRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGhlYWRlcikpKTtcblxuICAgICAgICByZXR1cm4gd2lkdGhzO1xuICAgIH1cblxuICAgIG9uQ29sdW1uRHJhZ1N0YXJ0KGV2ZW50OiBhbnksIGNvbHVtbkVsZW1lbnQ6IGFueSkge1xuICAgICAgICB0aGlzLnJlb3JkZXJJY29uV2lkdGggPSBEb21IYW5kbGVyLmdldEhpZGRlbkVsZW1lbnRPdXRlcldpZHRoKHRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgdGhpcy5yZW9yZGVySWNvbkhlaWdodCA9IERvbUhhbmRsZXIuZ2V0SGlkZGVuRWxlbWVudE91dGVySGVpZ2h0KHRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB0aGlzLmRyYWdnZWRDb2x1bW4gPSBjb2x1bW5FbGVtZW50O1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdiJyk7IC8vIEZvciBmaXJlZm94XG4gICAgfVxuXG4gICAgb25Db2x1bW5EcmFnRW50ZXIoZXZlbnQ6IGFueSwgZHJvcEhlYWRlcjogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnJlb3JkZXJhYmxlQ29sdW1ucyAmJiB0aGlzLmRyYWdnZWRDb2x1bW4gJiYgZHJvcEhlYWRlcikge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGxldCBjb250YWluZXJPZmZzZXQgPSBEb21IYW5kbGVyLmdldE9mZnNldCh0aGlzLmNvbnRhaW5lclZpZXdDaGlsZD8ubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICBsZXQgZHJvcEhlYWRlck9mZnNldCA9IERvbUhhbmRsZXIuZ2V0T2Zmc2V0KGRyb3BIZWFkZXIpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnZ2VkQ29sdW1uICE9IGRyb3BIZWFkZXIpIHtcbiAgICAgICAgICAgICAgICBsZXQgZHJhZ0luZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKHRoaXMuZHJhZ2dlZENvbHVtbiwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCBkcm9wSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAoZHJvcEhlYWRlciwgJ3ByZW9yZGVyYWJsZWNvbHVtbicpO1xuICAgICAgICAgICAgICAgIGxldCB0YXJnZXRMZWZ0ID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0IC0gY29udGFpbmVyT2Zmc2V0LmxlZnQ7XG4gICAgICAgICAgICAgICAgbGV0IHRhcmdldFRvcCA9IGNvbnRhaW5lck9mZnNldC50b3AgLSBkcm9wSGVhZGVyT2Zmc2V0LnRvcDtcbiAgICAgICAgICAgICAgICBsZXQgY29sdW1uQ2VudGVyID0gZHJvcEhlYWRlck9mZnNldC5sZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAvIDI7XG5cbiAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZW9yZGVySW5kaWNhdG9yVXBWaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUudG9wID0gZHJvcEhlYWRlck9mZnNldC50b3AgLSBjb250YWluZXJPZmZzZXQudG9wIC0gKDxudW1iZXI+dGhpcy5yZW9yZGVySWNvbkhlaWdodCAtIDEpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS50b3AgPSBkcm9wSGVhZGVyT2Zmc2V0LnRvcCAtIGNvbnRhaW5lck9mZnNldC50b3AgKyBkcm9wSGVhZGVyLm9mZnNldEhlaWdodCArICdweCc7XG5cbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQucGFnZVggPiBjb2x1bW5DZW50ZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB0YXJnZXRMZWZ0ICsgZHJvcEhlYWRlci5vZmZzZXRXaWR0aCAtIE1hdGguY2VpbCg8bnVtYmVyPnRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUubGVmdCA9IHRhcmdldExlZnQgKyBkcm9wSGVhZGVyLm9mZnNldFdpZHRoIC0gTWF0aC5jZWlsKDxudW1iZXI+dGhpcy5yZW9yZGVySWNvbldpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmRyb3BQb3NpdGlvbiA9IDE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSB0YXJnZXRMZWZ0IC0gTWF0aC5jZWlsKDxudW1iZXI+dGhpcy5yZW9yZGVySWNvbldpZHRoIC8gMikgKyAncHgnO1xuICAgICAgICAgICAgICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy5yZW9yZGVySW5kaWNhdG9yRG93blZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0ID0gdGFyZ2V0TGVmdCAtIE1hdGguY2VpbCg8bnVtYmVyPnRoaXMucmVvcmRlckljb25XaWR0aCAvIDIpICsgJ3B4JztcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kcm9wUG9zaXRpb24gPSAtMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvclVwVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JEb3duVmlld0NoaWxkKS5uYXRpdmVFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuZHJvcEVmZmVjdCA9ICdub25lJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uQ29sdW1uRHJhZ0xlYXZlKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5yZW9yZGVyYWJsZUNvbHVtbnMgJiYgdGhpcy5kcmFnZ2VkQ29sdW1uKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Db2x1bW5Ecm9wKGV2ZW50OiBFdmVudCwgZHJvcENvbHVtbjogYW55KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGlmICh0aGlzLmRyYWdnZWRDb2x1bW4pIHtcbiAgICAgICAgICAgIGxldCBkcmFnSW5kZXggPSBEb21IYW5kbGVyLmluZGV4V2l0aGluR3JvdXAodGhpcy5kcmFnZ2VkQ29sdW1uLCAncHJlb3JkZXJhYmxlY29sdW1uJyk7XG4gICAgICAgICAgICBsZXQgZHJvcEluZGV4ID0gRG9tSGFuZGxlci5pbmRleFdpdGhpbkdyb3VwKGRyb3BDb2x1bW4sICdwcmVvcmRlcmFibGVjb2x1bW4nKTtcbiAgICAgICAgICAgIGxldCBhbGxvd0Ryb3AgPSBkcmFnSW5kZXggIT0gZHJvcEluZGV4O1xuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCAmJiAoKGRyb3BJbmRleCAtIGRyYWdJbmRleCA9PSAxICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAtMSkgfHwgKGRyYWdJbmRleCAtIGRyb3BJbmRleCA9PSAxICYmIHRoaXMuZHJvcFBvc2l0aW9uID09PSAxKSkpIHtcbiAgICAgICAgICAgICAgICBhbGxvd0Ryb3AgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKGFsbG93RHJvcCAmJiBkcm9wSW5kZXggPCBkcmFnSW5kZXggJiYgdGhpcy5kcm9wUG9zaXRpb24gPT09IDEpIHtcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXggPSBkcm9wSW5kZXggKyAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wICYmIGRyb3BJbmRleCA+IGRyYWdJbmRleCAmJiB0aGlzLmRyb3BQb3NpdGlvbiA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICBkcm9wSW5kZXggPSBkcm9wSW5kZXggLSAxO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wKSB7XG4gICAgICAgICAgICAgICAgT2JqZWN0VXRpbHMucmVvcmRlckFycmF5KDxhbnlbXT50aGlzLmNvbHVtbnMsIGRyYWdJbmRleCwgZHJvcEluZGV4KTtcblxuICAgICAgICAgICAgICAgIHRoaXMub25Db2xSZW9yZGVyLmVtaXQoe1xuICAgICAgICAgICAgICAgICAgICBkcmFnSW5kZXg6IGRyYWdJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgZHJvcEluZGV4OiBkcm9wSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IHRoaXMuY29sdW1uc1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNTdGF0ZWZ1bCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNhdmVTdGF0ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucyAmJiB0aGlzLnJlc2l6ZUNvbHVtbkVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICBsZXQgd2lkdGggPSB0aGlzLmNvbHVtblJlc2l6ZU1vZGUgPT09ICdleHBhbmQnID8gdGhpcy5faW5pdGlhbENvbFdpZHRocyA6IHRoaXMuX3RvdGFsVGFibGVXaWR0aCgpO1xuICAgICAgICAgICAgICAgIE9iamVjdFV0aWxzLnJlb3JkZXJBcnJheSh3aWR0aCwgZHJhZ0luZGV4ICsgMSwgZHJvcEluZGV4ICsgMSk7XG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVTdHlsZUVsZW1lbnQod2lkdGgsIGRyYWdJbmRleCwgbnVsbCwgbnVsbCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICg8RWxlbWVudFJlZj50aGlzLnJlb3JkZXJJbmRpY2F0b3JVcFZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgKDxFbGVtZW50UmVmPnRoaXMucmVvcmRlckluZGljYXRvckRvd25WaWV3Q2hpbGQpLm5hdGl2ZUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbi5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ2dlZENvbHVtbiA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLmRyb3BQb3NpdGlvbiA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNpemVUYWJsZUNlbGxzKG5ld0NvbHVtbldpZHRoOiBudW1iZXIsIG5leHRDb2x1bW5XaWR0aDogbnVtYmVyIHwgbnVsbCkge1xuICAgICAgICBsZXQgY29sSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KHRoaXMucmVzaXplQ29sdW1uRWxlbWVudCk7XG4gICAgICAgIGxldCB3aWR0aCA9IHRoaXMuY29sdW1uUmVzaXplTW9kZSA9PT0gJ2V4cGFuZCcgPyB0aGlzLl9pbml0aWFsQ29sV2lkdGhzIDogdGhpcy5fdG90YWxUYWJsZVdpZHRoKCk7XG4gICAgICAgIHRoaXMudXBkYXRlU3R5bGVFbGVtZW50KHdpZHRoLCBjb2xJbmRleCwgbmV3Q29sdW1uV2lkdGgsIG5leHRDb2x1bW5XaWR0aCk7XG4gICAgfVxuXG4gICAgdXBkYXRlU3R5bGVFbGVtZW50KHdpZHRoOiBudW1iZXJbXSwgY29sSW5kZXg6IG51bWJlciwgbmV3Q29sdW1uV2lkdGg6IG51bWJlciwgbmV4dENvbHVtbldpZHRoOiBudW1iZXIgfCBudWxsKSB7XG4gICAgICAgIHRoaXMuZGVzdHJveVN0eWxlRWxlbWVudCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZVN0eWxlRWxlbWVudCgpO1xuXG4gICAgICAgIGxldCBpbm5lckhUTUwgPSAnJztcbiAgICAgICAgd2lkdGguZm9yRWFjaCgod2lkdGgsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBsZXQgY29sV2lkdGggPSBpbmRleCA9PT0gY29sSW5kZXggPyBuZXdDb2x1bW5XaWR0aCA6IG5leHRDb2x1bW5XaWR0aCAmJiBpbmRleCA9PT0gY29sSW5kZXggKyAxID8gbmV4dENvbHVtbldpZHRoIDogd2lkdGg7XG4gICAgICAgICAgICBsZXQgc3R5bGUgPSBgd2lkdGg6ICR7Y29sV2lkdGh9cHggIWltcG9ydGFudDsgbWF4LXdpZHRoOiAke2NvbFdpZHRofXB4ICFpbXBvcnRhbnQ7YDtcbiAgICAgICAgICAgIGlubmVySFRNTCArPSBgXG4gICAgICAgICAgICAgICAgIyR7dGhpcy5pZH0tdGFibGUgPiAucC1kYXRhdGFibGUtdGhlYWQgPiB0ciA+IHRoOm50aC1jaGlsZCgke2luZGV4ICsgMX0pLFxuICAgICAgICAgICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoJHtpbmRleCArIDF9KSxcbiAgICAgICAgICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Zm9vdCA+IHRyID4gdGQ6bnRoLWNoaWxkKCR7aW5kZXggKyAxfSkge1xuICAgICAgICAgICAgICAgICAgICAke3N0eWxlfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGA7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFByb3BlcnR5KHRoaXMuc3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICB9XG5cbiAgICBvblJvd0RyYWdTdGFydChldmVudDogYW55LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMucm93RHJhZ2dpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLmRyYWdnZWRSb3dJbmRleCA9IGluZGV4O1xuICAgICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YSgndGV4dCcsICdiJyk7IC8vIEZvciBmaXJlZm94XG4gICAgfVxuXG4gICAgb25Sb3dEcmFnT3ZlcihldmVudDogTW91c2VFdmVudCwgaW5kZXg6IG51bWJlciwgcm93RWxlbWVudDogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLnJvd0RyYWdnaW5nICYmIHRoaXMuZHJhZ2dlZFJvd0luZGV4ICE9PSBpbmRleCkge1xuICAgICAgICAgICAgbGV0IHJvd1kgPSBEb21IYW5kbGVyLmdldE9mZnNldChyb3dFbGVtZW50KS50b3A7XG4gICAgICAgICAgICBsZXQgcGFnZVkgPSBldmVudC5wYWdlWTtcbiAgICAgICAgICAgIGxldCByb3dNaWRZID0gcm93WSArIERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQocm93RWxlbWVudCkgLyAyO1xuICAgICAgICAgICAgbGV0IHByZXZSb3dFbGVtZW50ID0gcm93RWxlbWVudC5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgICAgICBpZiAocGFnZVkgPCByb3dNaWRZKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBpbmRleDtcbiAgICAgICAgICAgICAgICBpZiAocHJldlJvd0VsZW1lbnQpIERvbUhhbmRsZXIuYWRkQ2xhc3MocHJldlJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtYm90dG9tJyk7XG4gICAgICAgICAgICAgICAgZWxzZSBEb21IYW5kbGVyLmFkZENsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtdG9wJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChwcmV2Um93RWxlbWVudCkgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhwcmV2Um93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgICAgICAgICBlbHNlIERvbUhhbmRsZXIuYWRkQ2xhc3Mocm93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC10b3AnKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJvcHBlZFJvd0luZGV4ID0gaW5kZXggKyAxO1xuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuYWRkQ2xhc3Mocm93RWxlbWVudCwgJ3AtZGF0YXRhYmxlLWRyYWdwb2ludC1ib3R0b20nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uUm93RHJhZ0xlYXZlKGV2ZW50OiBFdmVudCwgcm93RWxlbWVudDogYW55KSB7XG4gICAgICAgIGxldCBwcmV2Um93RWxlbWVudCA9IHJvd0VsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgaWYgKHByZXZSb3dFbGVtZW50KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHByZXZSb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xuICAgICAgICB9XG5cbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyhyb3dFbGVtZW50LCAncC1kYXRhdGFibGUtZHJhZ3BvaW50LWJvdHRvbScpO1xuICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHJvd0VsZW1lbnQsICdwLWRhdGF0YWJsZS1kcmFncG9pbnQtdG9wJyk7XG4gICAgfVxuXG4gICAgb25Sb3dEcmFnRW5kKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLnJvd0RyYWdnaW5nID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZHJhZ2dlZFJvd0luZGV4ID0gbnVsbDtcbiAgICAgICAgdGhpcy5kcm9wcGVkUm93SW5kZXggPSBudWxsO1xuICAgIH1cblxuICAgIG9uUm93RHJvcChldmVudDogRXZlbnQsIHJvd0VsZW1lbnQ6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5kcm9wcGVkUm93SW5kZXggIT0gbnVsbCkge1xuICAgICAgICAgICAgbGV0IGRyb3BJbmRleCA9IDxudW1iZXI+dGhpcy5kcmFnZ2VkUm93SW5kZXggPiB0aGlzLmRyb3BwZWRSb3dJbmRleCA/IHRoaXMuZHJvcHBlZFJvd0luZGV4IDogdGhpcy5kcm9wcGVkUm93SW5kZXggPT09IDAgPyAwIDogdGhpcy5kcm9wcGVkUm93SW5kZXggLSAxO1xuICAgICAgICAgICAgT2JqZWN0VXRpbHMucmVvcmRlckFycmF5KHRoaXMudmFsdWUsIDxudW1iZXI+dGhpcy5kcmFnZ2VkUm93SW5kZXgsIGRyb3BJbmRleCk7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAvLyBUT0RPOiBDaGVja1xuICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gWy4uLnRoaXMuX3ZhbHVlXTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdGhpcy5vblJvd1Jlb3JkZXIuZW1pdCh7XG4gICAgICAgICAgICAgICAgZHJhZ0luZGV4OiA8bnVtYmVyPnRoaXMuZHJhZ2dlZFJvd0luZGV4LFxuICAgICAgICAgICAgICAgIGRyb3BJbmRleDogZHJvcEluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICAvL2NsZWFudXBcbiAgICAgICAgdGhpcy5vblJvd0RyYWdMZWF2ZShldmVudCwgcm93RWxlbWVudCk7XG4gICAgICAgIHRoaXMub25Sb3dEcmFnRW5kKGV2ZW50KTtcbiAgICB9XG5cbiAgICBpc0VtcHR5KCkge1xuICAgICAgICBsZXQgZGF0YSA9IHRoaXMuZmlsdGVyZWRWYWx1ZSB8fCB0aGlzLnZhbHVlO1xuICAgICAgICByZXR1cm4gZGF0YSA9PSBudWxsIHx8IGRhdGEubGVuZ3RoID09IDA7XG4gICAgfVxuXG4gICAgZ2V0QmxvY2thYmxlRWxlbWVudCgpOiBIVE1MRWxlbWVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuY2hpbGRyZW5bMF07XG4gICAgfVxuXG4gICAgZ2V0U3RvcmFnZSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5zdGF0ZVN0b3JhZ2UpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdsb2NhbCc6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cubG9jYWxTdG9yYWdlO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnc2Vzc2lvbic6XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB3aW5kb3cuc2Vzc2lvblN0b3JhZ2U7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IodGhpcy5zdGF0ZVN0b3JhZ2UgKyAnIGlzIG5vdCBhIHZhbGlkIHZhbHVlIGZvciB0aGUgc3RhdGUgc3RvcmFnZSwgc3VwcG9ydGVkIHZhbHVlcyBhcmUgXCJsb2NhbFwiIGFuZCBcInNlc3Npb25cIi4nKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQnJvd3NlciBzdG9yYWdlIGlzIG5vdCBhdmFpbGFibGUgaW4gdGhlIHNlcnZlciBzaWRlLicpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNTdGF0ZWZ1bCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGVLZXkgIT0gbnVsbDtcbiAgICB9XG5cbiAgICBzYXZlU3RhdGUoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0ge307XG5cbiAgICAgICAgaWYgKHRoaXMucGFnaW5hdG9yKSB7XG4gICAgICAgICAgICBzdGF0ZS5maXJzdCA9IDxudW1iZXI+dGhpcy5maXJzdDtcbiAgICAgICAgICAgIHN0YXRlLnJvd3MgPSB0aGlzLnJvd3M7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zb3J0RmllbGQpIHtcbiAgICAgICAgICAgIHN0YXRlLnNvcnRGaWVsZCA9IHRoaXMuc29ydEZpZWxkO1xuICAgICAgICAgICAgc3RhdGUuc29ydE9yZGVyID0gdGhpcy5zb3J0T3JkZXI7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICBzdGF0ZS5tdWx0aVNvcnRNZXRhID0gdGhpcy5tdWx0aVNvcnRNZXRhO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsdGVyKCkpIHtcbiAgICAgICAgICAgIHN0YXRlLmZpbHRlcnMgPSB0aGlzLmZpbHRlcnM7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5yZXNpemFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5XaWR0aHMoc3RhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVvcmRlcmFibGVDb2x1bW5zKSB7XG4gICAgICAgICAgICB0aGlzLnNhdmVDb2x1bW5PcmRlcihzdGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHN0YXRlLnNlbGVjdGlvbiA9IHRoaXMuc2VsZWN0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHRoaXMuZXhwYW5kZWRSb3dLZXlzKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHN0YXRlLmV4cGFuZGVkUm93S2V5cyA9IHRoaXMuZXhwYW5kZWRSb3dLZXlzO1xuICAgICAgICB9XG5cbiAgICAgICAgc3RvcmFnZS5zZXRJdGVtKDxzdHJpbmc+dGhpcy5zdGF0ZUtleSwgSlNPTi5zdHJpbmdpZnkoc3RhdGUpKTtcbiAgICAgICAgdGhpcy5vblN0YXRlU2F2ZS5lbWl0KHN0YXRlKTtcbiAgICB9XG5cbiAgICBjbGVhclN0YXRlKCkge1xuICAgICAgICBjb25zdCBzdG9yYWdlID0gdGhpcy5nZXRTdG9yYWdlKCk7XG5cbiAgICAgICAgaWYgKHRoaXMuc3RhdGVLZXkpIHtcbiAgICAgICAgICAgIHN0b3JhZ2UucmVtb3ZlSXRlbSh0aGlzLnN0YXRlS2V5KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJlc3RvcmVTdGF0ZSgpIHtcbiAgICAgICAgY29uc3Qgc3RvcmFnZSA9IHRoaXMuZ2V0U3RvcmFnZSgpO1xuICAgICAgICBjb25zdCBzdGF0ZVN0cmluZyA9IHN0b3JhZ2UuZ2V0SXRlbSg8c3RyaW5nPnRoaXMuc3RhdGVLZXkpO1xuICAgICAgICBjb25zdCBkYXRlRm9ybWF0ID0gL1xcZHs0fS1cXGR7Mn0tXFxkezJ9VFxcZHsyfTpcXGR7Mn06XFxkezJ9LlxcZHszfVovO1xuICAgICAgICBjb25zdCByZXZpdmVyID0gZnVuY3Rpb24gKGtleTogYW55LCB2YWx1ZTogYW55KSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJyAmJiBkYXRlRm9ybWF0LnRlc3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChzdGF0ZVN0cmluZykge1xuICAgICAgICAgICAgbGV0IHN0YXRlOiBUYWJsZVN0YXRlID0gSlNPTi5wYXJzZShzdGF0ZVN0cmluZywgcmV2aXZlcik7XG5cbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2luYXRvcikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpcnN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maXJzdCA9IHN0YXRlLmZpcnN0O1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpcnN0Q2hhbmdlLmVtaXQodGhpcy5maXJzdCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMucm93cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93cyA9IHN0YXRlLnJvd3M7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucm93c0NoYW5nZS5lbWl0KHRoaXMucm93cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUuc29ydEZpZWxkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdTb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9zb3J0RmllbGQgPSBzdGF0ZS5zb3J0RmllbGQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fc29ydE9yZGVyID0gPG51bWJlcj5zdGF0ZS5zb3J0T3JkZXI7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5tdWx0aVNvcnRNZXRhKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXN0b3JpbmdTb3J0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9tdWx0aVNvcnRNZXRhID0gc3RhdGUubXVsdGlTb3J0TWV0YTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0YXRlLmZpbHRlcnMpIHtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc3RvcmluZ0ZpbHRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJzID0gc3RhdGUuZmlsdGVycztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHRoaXMucmVzaXphYmxlQ29sdW1ucykge1xuICAgICAgICAgICAgICAgIHRoaXMuY29sdW1uV2lkdGhzU3RhdGUgPSBzdGF0ZS5jb2x1bW5XaWR0aHM7XG4gICAgICAgICAgICAgICAgdGhpcy50YWJsZVdpZHRoU3RhdGUgPSBzdGF0ZS50YWJsZVdpZHRoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoc3RhdGUuZXhwYW5kZWRSb3dLZXlzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5leHBhbmRlZFJvd0tleXMgPSBzdGF0ZS5leHBhbmRlZFJvd0tleXM7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmIChzdGF0ZS5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgICAgICBQcm9taXNlLnJlc29sdmUobnVsbCkudGhlbigoKSA9PiB0aGlzLnNlbGVjdGlvbkNoYW5nZS5lbWl0KHN0YXRlLnNlbGVjdGlvbikpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnN0YXRlUmVzdG9yZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICB0aGlzLm9uU3RhdGVSZXN0b3JlLmVtaXQoc3RhdGUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2F2ZUNvbHVtbldpZHRocyhzdGF0ZTogYW55KSB7XG4gICAgICAgIGxldCB3aWR0aHM6IGFueVtdID0gW107XG4gICAgICAgIGxldCBoZWFkZXJzID0gRG9tSGFuZGxlci5maW5kKHRoaXMuY29udGFpbmVyVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50LCAnLnAtZGF0YXRhYmxlLXRoZWFkID4gdHIgPiB0aCcpO1xuICAgICAgICBoZWFkZXJzLmZvckVhY2goKGhlYWRlcikgPT4gd2lkdGhzLnB1c2goRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKGhlYWRlcikpKTtcbiAgICAgICAgc3RhdGUuY29sdW1uV2lkdGhzID0gd2lkdGhzLmpvaW4oJywnKTtcblxuICAgICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJykge1xuICAgICAgICAgICAgc3RhdGUudGFibGVXaWR0aCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJXaWR0aCh0aGlzLnRhYmxlVmlld0NoaWxkPy5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNldFJlc2l6ZVRhYmxlV2lkdGgod2lkdGg6IHN0cmluZykge1xuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy50YWJsZVZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS53aWR0aCA9IHdpZHRoO1xuICAgICAgICAoPEVsZW1lbnRSZWY+dGhpcy50YWJsZVZpZXdDaGlsZCkubmF0aXZlRWxlbWVudC5zdHlsZS5taW5XaWR0aCA9IHdpZHRoO1xuICAgIH1cblxuICAgIHJlc3RvcmVDb2x1bW5XaWR0aHMoKSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbldpZHRoc1N0YXRlKSB7XG4gICAgICAgICAgICBsZXQgd2lkdGhzID0gdGhpcy5jb2x1bW5XaWR0aHNTdGF0ZS5zcGxpdCgnLCcpO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5jb2x1bW5SZXNpemVNb2RlID09PSAnZXhwYW5kJyAmJiB0aGlzLnRhYmxlV2lkdGhTdGF0ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2V0UmVzaXplVGFibGVXaWR0aCh0aGlzLnRhYmxlV2lkdGhTdGF0ZSArICdweCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh3aWR0aHMpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jcmVhdGVTdHlsZUVsZW1lbnQoKTtcblxuICAgICAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSAnJztcbiAgICAgICAgICAgICAgICB3aWR0aHMuZm9yRWFjaCgod2lkdGgsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBzdHlsZSA9IGB3aWR0aDogJHt3aWR0aH1weCAhaW1wb3J0YW50OyBtYXgtd2lkdGg6ICR7d2lkdGh9cHggIWltcG9ydGFudGA7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5uZXJIVE1MICs9IGBcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRoZWFkID4gdHIgPiB0aDpudGgtY2hpbGQoJHtpbmRleCArIDF9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZDpudGgtY2hpbGQoJHtpbmRleCArIDF9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRmb290ID4gdHIgPiB0ZDpudGgtY2hpbGQoJHtpbmRleCArIDF9KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtzdHlsZX1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYDtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50LmlubmVySFRNTCA9IGlubmVySFRNTDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNhdmVDb2x1bW5PcmRlcihzdGF0ZTogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmNvbHVtbnMpIHtcbiAgICAgICAgICAgIGxldCBjb2x1bW5PcmRlcjogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgICAgIHRoaXMuY29sdW1ucy5tYXAoKGNvbHVtbikgPT4ge1xuICAgICAgICAgICAgICAgIGNvbHVtbk9yZGVyLnB1c2goY29sdW1uLmZpZWxkIHx8IGNvbHVtbi5rZXkpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHN0YXRlLmNvbHVtbk9yZGVyID0gY29sdW1uT3JkZXI7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXN0b3JlQ29sdW1uT3JkZXIoKSB7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0aGlzLmdldFN0b3JhZ2UoKTtcbiAgICAgICAgY29uc3Qgc3RhdGVTdHJpbmcgPSBzdG9yYWdlLmdldEl0ZW0oPHN0cmluZz50aGlzLnN0YXRlS2V5KTtcbiAgICAgICAgaWYgKHN0YXRlU3RyaW5nKSB7XG4gICAgICAgICAgICBsZXQgc3RhdGU6IFRhYmxlU3RhdGUgPSBKU09OLnBhcnNlKHN0YXRlU3RyaW5nKTtcbiAgICAgICAgICAgIGxldCBjb2x1bW5PcmRlciA9IHN0YXRlLmNvbHVtbk9yZGVyO1xuICAgICAgICAgICAgaWYgKGNvbHVtbk9yZGVyKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJlb3JkZXJlZENvbHVtbnM6IGFueVtdID0gW107XG5cbiAgICAgICAgICAgICAgICBjb2x1bW5PcmRlci5tYXAoKGtleSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBsZXQgY29sID0gdGhpcy5maW5kQ29sdW1uQnlLZXkoa2V5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNvbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVvcmRlcmVkQ29sdW1ucy5wdXNoKGNvbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbHVtbk9yZGVyU3RhdGVSZXN0b3JlZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgdGhpcy5jb2x1bW5zID0gcmVvcmRlcmVkQ29sdW1ucztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmRDb2x1bW5CeUtleShrZXk6IGFueSkge1xuICAgICAgICBpZiAodGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBjb2wgb2YgdGhpcy5jb2x1bW5zKSB7XG4gICAgICAgICAgICAgICAgaWYgKGNvbC5rZXkgPT09IGtleSB8fCBjb2wuZmllbGQgPT09IGtleSkgcmV0dXJuIGNvbDtcbiAgICAgICAgICAgICAgICBlbHNlIGNvbnRpbnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjcmVhdGVTdHlsZUVsZW1lbnQoKSB7XG4gICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICB0aGlzLnN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICB9XG5cbiAgICBnZXRHcm91cFJvd3NNZXRhKCkge1xuICAgICAgICByZXR1cm4geyBmaWVsZDogdGhpcy5ncm91cFJvd3NCeSwgb3JkZXI6IHRoaXMuZ3JvdXBSb3dzQnlPcmRlciB9O1xuICAgIH1cblxuICAgIGNyZWF0ZVJlc3BvbnNpdmVTdHlsZSgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gdGhpcy5yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdzdHlsZScpO1xuICAgICAgICAgICAgICAgIHRoaXMucmVzcG9uc2l2ZVN0eWxlRWxlbWVudC50eXBlID0gJ3RleHQvY3NzJztcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuaGVhZCwgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIGxldCBpbm5lckhUTUwgPSBgXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJHt0aGlzLmJyZWFrcG9pbnR9KSB7XG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRoZWFkID4gdHIgPiB0aCxcbiAgICAgICAgIyR7dGhpcy5pZH0tdGFibGUgPiAucC1kYXRhdGFibGUtdGZvb3QgPiB0ciA+IHRkIHtcbiAgICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZCB7XG4gICAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgICAgd2lkdGg6IDEwMCUgIWltcG9ydGFudDtcbiAgICAgICAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICAgICAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgICAgIH1cblxuICAgICAgICAjJHt0aGlzLmlkfS10YWJsZSA+IC5wLWRhdGF0YWJsZS10Ym9keSA+IHRyID4gdGQ6bm90KDpsYXN0LWNoaWxkKSB7XG4gICAgICAgICAgICBib3JkZXI6IDAgbm9uZTtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LnAtZGF0YXRhYmxlLWdyaWRsaW5lcyA+IC5wLWRhdGF0YWJsZS13cmFwcGVyID4gLnAtZGF0YXRhYmxlLXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZDpsYXN0LWNoaWxkIHtcbiAgICAgICAgICAgIGJvcmRlci10b3A6IDA7XG4gICAgICAgICAgICBib3JkZXItcmlnaHQ6IDA7XG4gICAgICAgICAgICBib3JkZXItbGVmdDogMDtcbiAgICAgICAgfVxuXG4gICAgICAgICMke3RoaXMuaWR9LXRhYmxlID4gLnAtZGF0YXRhYmxlLXRib2R5ID4gdHIgPiB0ZCA+IC5wLWNvbHVtbi10aXRsZSB7XG4gICAgICAgICAgICBkaXNwbGF5OiBibG9jaztcbiAgICAgICAgfVxuICAgIH1cbiAgICBgO1xuICAgICAgICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0UHJvcGVydHkodGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50LCAnaW5uZXJIVE1MJywgaW5uZXJIVE1MKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lSZXNwb25zaXZlU3R5bGUoKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZXIucmVtb3ZlQ2hpbGQodGhpcy5kb2N1bWVudC5oZWFkLCB0aGlzLnJlc3BvbnNpdmVTdHlsZUVsZW1lbnQpO1xuICAgICAgICAgICAgdGhpcy5yZXNwb25zaXZlU3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc3Ryb3lTdHlsZUVsZW1lbnQoKSB7XG4gICAgICAgIGlmICh0aGlzLnN0eWxlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5yZW1vdmVDaGlsZCh0aGlzLmRvY3VtZW50LmhlYWQsIHRoaXMuc3R5bGVFbGVtZW50KTtcbiAgICAgICAgICAgIHRoaXMuc3R5bGVFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RWRpdExpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMuZWRpdGluZ0NlbGwgPSBudWxsO1xuICAgICAgICB0aGlzLmluaXRpYWxpemVkID0gbnVsbDtcblxuICAgICAgICB0aGlzLmRlc3Ryb3lTdHlsZUVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5kZXN0cm95UmVzcG9uc2l2ZVN0eWxlKCk7XG4gICAgfVxuXG4gICAgZ2V0UGFnaW5hdG9yU3R5bGVDbGFzc2VzKGNsYXNzTmFtZT86IHN0cmluZykge1xuICAgICAgICByZXR1cm4gW3RoaXMucGFnaW5hdG9yU3R5bGVDbGFzcywgY2xhc3NOYW1lXVxuICAgICAgICAgICAgLmZpbHRlcigoYykgPT4gISFjKVxuICAgICAgICAgICAgLmpvaW4oJyAnKVxuICAgICAgICAgICAgLnRyaW0oKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnW3BUYWJsZUJvZHldJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIWR0LmV4cGFuZGVkUm93VGVtcGxhdGVcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInZhbHVlXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0Lmdyb3VwSGVhZGVyVGVtcGxhdGUgJiYgIWR0LnZpcnR1YWxTY3JvbGwgJiYgZHQucm93R3JvdXBNb2RlID09PSAnc3ViaGVhZGVyJyAmJiBzaG91bGRSZW5kZXJSb3dHcm91cEhlYWRlcih2YWx1ZSwgcm93RGF0YSwgcm93SW5kZXgpXCIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cImR0Lmdyb3VwSGVhZGVyVGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5yb3dHcm91cE1vZGUgIT09ICdyb3dzcGFuJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cInJvd0RhdGEgPyB0ZW1wbGF0ZSA6IGR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICAgICAgPjwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5yb3dHcm91cE1vZGUgPT09ICdyb3dzcGFuJ1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0RhdGEgPyB0ZW1wbGF0ZSA6IGR0LmxvYWRpbmdCb2R5VGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IHJvd0RhdGEsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbHVtbnM6IGNvbHVtbnMsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRpbmc6IGR0LmVkaXRNb2RlID09PSAncm93JyAmJiBkdC5pc1Jvd0VkaXRpbmcocm93RGF0YSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZyb3plbjogZnJvemVuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dncm91cDogc2hvdWxkUmVuZGVyUm93c3Bhbih2YWx1ZSwgcm93RGF0YSwgcm93SW5kZXgpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByb3dzcGFuOiBjYWxjdWxhdGVSb3dHcm91cFNpemUodmFsdWUsIHJvd0RhdGEsIHJvd0luZGV4KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIFwiXG4gICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZSAmJiAhZHQudmlydHVhbFNjcm9sbCAmJiBkdC5yb3dHcm91cE1vZGUgPT09ICdzdWJoZWFkZXInICYmIHNob3VsZFJlbmRlclJvd0dyb3VwRm9vdGVyKHZhbHVlLCByb3dEYXRhLCByb3dJbmRleClcIiByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGVkaXRpbmc6IGR0LmVkaXRNb2RlID09PSAncm93JyAmJiBkdC5pc1Jvd0VkaXRpbmcocm93RGF0YSksIGZyb3plbjogZnJvemVuIH1cIlxuICAgICAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmV4cGFuZGVkUm93VGVtcGxhdGUgJiYgIShmcm96ZW4gJiYgZHQuZnJvemVuRXhwYW5kZWRSb3dUZW1wbGF0ZSlcIj5cbiAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBsZXQtcm93RGF0YSBsZXQtcm93SW5kZXg9XCJpbmRleFwiIFtuZ0Zvck9mXT1cInZhbHVlXCIgW25nRm9yVHJhY2tCeV09XCJkdC5yb3dUcmFja0J5XCI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFkdC5ncm91cEhlYWRlclRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwidGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBleHBhbmRlZDogZHQuaXNSb3dFeHBhbmRlZChyb3dEYXRhKSwgZWRpdGluZzogZHQuZWRpdE1vZGUgPT09ICdyb3cnICYmIGR0LmlzUm93RWRpdGluZyhyb3dEYXRhKSwgZnJvemVuOiBmcm96ZW4gfVwiXG4gICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZHQuZ3JvdXBIZWFkZXJUZW1wbGF0ZSAmJiBkdC5yb3dHcm91cE1vZGUgPT09ICdzdWJoZWFkZXInICYmIHNob3VsZFJlbmRlclJvd0dyb3VwSGVhZGVyKHZhbHVlLCByb3dEYXRhLCBnZXRSb3dJbmRleChyb3dJbmRleCkpXCIgcm9sZT1cInJvd1wiPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAqbmdUZW1wbGF0ZU91dGxldD1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGR0Lmdyb3VwSGVhZGVyVGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICBcIlxuICAgICAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzUm93RXhwYW5kZWQocm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmV4cGFuZGVkUm93VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBmcm96ZW46IGZyb3plbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJkdC5ncm91cEZvb3RlclRlbXBsYXRlICYmIGR0LnJvd0dyb3VwTW9kZSA9PT0gJ3N1YmhlYWRlcicgJiYgc2hvdWxkUmVuZGVyUm93R3JvdXBGb290ZXIodmFsdWUsIHJvd0RhdGEsIGdldFJvd0luZGV4KHJvd0luZGV4KSlcIiByb2xlPVwicm93XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZHQuZ3JvdXBGb290ZXJUZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgICAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGUgJiYgZnJvemVuXCI+XG4gICAgICAgICAgICA8bmctdGVtcGxhdGUgbmdGb3IgbGV0LXJvd0RhdGEgbGV0LXJvd0luZGV4PVwiaW5kZXhcIiBbbmdGb3JPZl09XCJ2YWx1ZVwiIFtuZ0ZvclRyYWNrQnldPVwiZHQucm93VHJhY2tCeVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXJcbiAgICAgICAgICAgICAgICAgICAgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0ZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHJvd0RhdGEsIHJvd0luZGV4OiBnZXRSb3dJbmRleChyb3dJbmRleCksIGNvbHVtbnM6IGNvbHVtbnMsIGV4cGFuZGVkOiBkdC5pc1Jvd0V4cGFuZGVkKHJvd0RhdGEpLCBlZGl0aW5nOiBkdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgZHQuaXNSb3dFZGl0aW5nKHJvd0RhdGEpLCBmcm96ZW46IGZyb3plbiB9XCJcbiAgICAgICAgICAgICAgICA+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzUm93RXhwYW5kZWQocm93RGF0YSlcIj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmZyb3plbkV4cGFuZGVkUm93VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiByb3dEYXRhLCByb3dJbmRleDogZ2V0Um93SW5kZXgocm93SW5kZXgpLCBjb2x1bW5zOiBjb2x1bW5zLCBmcm96ZW46IGZyb3plbiB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmxvYWRpbmdcIj5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5sb2FkaW5nQm9keVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW4gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImR0LmlzRW1wdHkoKSAmJiAhZHQubG9hZGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmVtcHR5TWVzc2FnZVRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY29sdW1ucywgZnJvemVuOiBmcm96ZW4gfVwiPjwvbmctY29udGFpbmVyPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICBgLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuRGVmYXVsdCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUJvZHkgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFRhYmxlQm9keScpIGNvbHVtbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCdwVGFibGVCb2R5VGVtcGxhdGUnKSB0ZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBASW5wdXQoKSBnZXQgdmFsdWUoKTogYW55W10gfCB1bmRlZmluZWQge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gICAgfVxuICAgIHNldCB2YWx1ZSh2YWw6IGFueVtdIHwgdW5kZWZpbmVkKSB7XG4gICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsO1xuICAgICAgICBpZiAodGhpcy5mcm96ZW5Sb3dzKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyb3plblJvd1N0aWNreVBvc2l0aW9uKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy5kdC5zY3JvbGxhYmxlICYmIHRoaXMuZHQucm93R3JvdXBNb2RlID09PSAnc3ViaGVhZGVyJykge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVGcm96ZW5Sb3dHcm91cEhlYWRlclN0aWNreVBvc2l0aW9uKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASW5wdXQoKSBmcm96ZW46IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBmcm96ZW5Sb3dzOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgc2Nyb2xsZXJPcHRpb25zOiBhbnk7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIF92YWx1ZTogYW55W10gfCB1bmRlZmluZWQ7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmZyb3plblJvd3MpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlRnJvemVuUm93U3RpY2t5UG9zaXRpb24oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmR0LnNjcm9sbGFibGUgJiYgdGhpcy5kdC5yb3dHcm91cE1vZGUgPT09ICdzdWJoZWFkZXInKSB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUZyb3plblJvd0dyb3VwSGVhZGVyU3RpY2t5UG9zaXRpb24oKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSwgcHVibGljIGNkOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHVibGljIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2UudmFsdWVTb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICBpZiAodGhpcy5kdC52aXJ0dWFsU2Nyb2xsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jZC5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHNob3VsZFJlbmRlclJvd0dyb3VwSGVhZGVyKHZhbHVlOiBhbnksIHJvd0RhdGE6IGFueSwgaTogbnVtYmVyKSB7XG4gICAgICAgIGxldCBjdXJyZW50Um93RmllbGREYXRhID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShyb3dEYXRhLCB0aGlzLmR0Lmdyb3VwUm93c0J5KTtcbiAgICAgICAgbGV0IHByZXZSb3dEYXRhID0gdmFsdWVbaSAtIDFdO1xuICAgICAgICBpZiAocHJldlJvd0RhdGEpIHtcbiAgICAgICAgICAgIGxldCBwcmV2aW91c1Jvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocHJldlJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3dGaWVsZERhdGEgIT09IHByZXZpb3VzUm93RmllbGREYXRhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBzaG91bGRSZW5kZXJSb3dHcm91cEZvb3Rlcih2YWx1ZTogYW55LCByb3dEYXRhOiBhbnksIGk6IG51bWJlcikge1xuICAgICAgICBsZXQgY3VycmVudFJvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEocm93RGF0YSwgdGhpcy5kdC5ncm91cFJvd3NCeSk7XG4gICAgICAgIGxldCBuZXh0Um93RGF0YSA9IHZhbHVlW2kgKyAxXTtcbiAgICAgICAgaWYgKG5leHRSb3dEYXRhKSB7XG4gICAgICAgICAgICBsZXQgbmV4dFJvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobmV4dFJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRSb3dGaWVsZERhdGEgIT09IG5leHRSb3dGaWVsZERhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHNob3VsZFJlbmRlclJvd3NwYW4odmFsdWU6IGFueSwgcm93RGF0YTogYW55LCBpOiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRSb3dGaWVsZERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICBsZXQgcHJldlJvd0RhdGEgPSB2YWx1ZVtpIC0gMV07XG4gICAgICAgIGlmIChwcmV2Um93RGF0YSkge1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzUm93RmllbGREYXRhID0gT2JqZWN0VXRpbHMucmVzb2x2ZUZpZWxkRGF0YShwcmV2Um93RGF0YSwgdGhpcy5kdC5ncm91cFJvd3NCeSk7XG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFJvd0ZpZWxkRGF0YSAhPT0gcHJldmlvdXNSb3dGaWVsZERhdGE7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNhbGN1bGF0ZVJvd0dyb3VwU2l6ZSh2YWx1ZTogYW55LCByb3dEYXRhOiBhbnksIGluZGV4OiBudW1iZXIpIHtcbiAgICAgICAgbGV0IGN1cnJlbnRSb3dGaWVsZERhdGEgPSBPYmplY3RVdGlscy5yZXNvbHZlRmllbGREYXRhKHJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICBsZXQgbmV4dFJvd0ZpZWxkRGF0YSA9IGN1cnJlbnRSb3dGaWVsZERhdGE7XG4gICAgICAgIGxldCBncm91cFJvd1NwYW4gPSAwO1xuXG4gICAgICAgIHdoaWxlIChjdXJyZW50Um93RmllbGREYXRhID09PSBuZXh0Um93RmllbGREYXRhKSB7XG4gICAgICAgICAgICBncm91cFJvd1NwYW4rKztcbiAgICAgICAgICAgIGxldCBuZXh0Um93RGF0YSA9IHZhbHVlWysraW5kZXhdO1xuICAgICAgICAgICAgaWYgKG5leHRSb3dEYXRhKSB7XG4gICAgICAgICAgICAgICAgbmV4dFJvd0ZpZWxkRGF0YSA9IE9iamVjdFV0aWxzLnJlc29sdmVGaWVsZERhdGEobmV4dFJvd0RhdGEsIHRoaXMuZHQuZ3JvdXBSb3dzQnkpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBncm91cFJvd1NwYW4gPT09IDEgPyBudWxsIDogZ3JvdXBSb3dTcGFuO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1cGRhdGVGcm96ZW5Sb3dTdGlja3lQb3NpdGlvbigpIHtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnRvcCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpICsgJ3B4JztcbiAgICB9XG5cbiAgICB1cGRhdGVGcm96ZW5Sb3dHcm91cEhlYWRlclN0aWNreVBvc2l0aW9uKCkge1xuICAgICAgICBpZiAodGhpcy5lbC5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpIHtcbiAgICAgICAgICAgIGxldCB0YWJsZUhlYWRlckhlaWdodCA9IERvbUhhbmRsZXIuZ2V0T3V0ZXJIZWlnaHQodGhpcy5lbC5uYXRpdmVFbGVtZW50LnByZXZpb3VzRWxlbWVudFNpYmxpbmcpO1xuICAgICAgICAgICAgdGhpcy5kdC5yb3dHcm91cEhlYWRlclN0eWxlT2JqZWN0LnRvcCA9IHRhYmxlSGVhZGVySGVpZ2h0ICsgJ3B4JztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldFNjcm9sbGVyT3B0aW9uKG9wdGlvbjogYW55LCBvcHRpb25zPzogYW55KSB7XG4gICAgICAgIGlmICh0aGlzLmR0LnZpcnR1YWxTY3JvbGwpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHRoaXMuc2Nyb2xsZXJPcHRpb25zO1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnMgPyBvcHRpb25zW29wdGlvbl0gOiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgZ2V0Um93SW5kZXgocm93SW5kZXg6IG51bWJlcikge1xuICAgICAgICBjb25zdCBpbmRleCA9IHRoaXMuZHQucGFnaW5hdG9yID8gPG51bWJlcj50aGlzLmR0LmZpcnN0ICsgcm93SW5kZXggOiByb3dJbmRleDtcbiAgICAgICAgY29uc3QgZ2V0SXRlbU9wdGlvbnMgPSB0aGlzLmdldFNjcm9sbGVyT3B0aW9uKCdnZXRJdGVtT3B0aW9ucycpO1xuICAgICAgICByZXR1cm4gZ2V0SXRlbU9wdGlvbnMgPyBnZXRJdGVtT3B0aW9ucyhpbmRleCkuaW5kZXggOiBpbmRleDtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSb3dHcm91cEhlYWRlcl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLXJvd2dyb3VwLWhlYWRlciBwLWVsZW1lbnQnLFxuICAgICAgICAnW3N0eWxlLnRvcF0nOiAnZ2V0RnJvemVuUm93R3JvdXBIZWFkZXJTdGlja3lQb3NpdGlvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJvd0dyb3VwSGVhZGVyIHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7fVxuXG4gICAgZ2V0IGdldEZyb3plblJvd0dyb3VwSGVhZGVyU3RpY2t5UG9zaXRpb24oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LnJvd0dyb3VwSGVhZGVyU3R5bGVPYmplY3QgPyB0aGlzLmR0LnJvd0dyb3VwSGVhZGVyU3R5bGVPYmplY3QudG9wIDogJyc7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twRnJvemVuQ29sdW1uXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1mcm96ZW4tY29sdW1uXSc6ICdmcm96ZW4nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGcm96ZW5Db2x1bW4gaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgICBASW5wdXQoKSBnZXQgZnJvemVuKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZnJvemVuO1xuICAgIH1cblxuICAgIHNldCBmcm96ZW4odmFsOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2Zyb3plbiA9IHZhbDtcbiAgICAgICAgUHJvbWlzZS5yZXNvbHZlKG51bGwpLnRoZW4oKCkgPT4gdGhpcy51cGRhdGVTdGlja3lQb3NpdGlvbigpKTtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBhbGlnbkZyb3plbjogc3RyaW5nID0gJ2xlZnQnO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0aWNreVBvc2l0aW9uKCk7XG4gICAgICAgIH0sIDEwMDApO1xuICAgIH1cblxuICAgIF9mcm96ZW46IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgdXBkYXRlU3RpY2t5UG9zaXRpb24oKSB7XG4gICAgICAgIGlmICh0aGlzLl9mcm96ZW4pIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsaWduRnJvemVuID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgICAgICAgbGV0IHJpZ2h0ID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICAgICAgaWYgKG5leHQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmlnaHQgPSBEb21IYW5kbGVyLmdldE91dGVyV2lkdGgobmV4dCkgKyAocGFyc2VGbG9hdChuZXh0LnN0eWxlLnJpZ2h0KSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0ID0gcmlnaHQgKyAncHgnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsZXQgbGVmdCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IHByZXYgPSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgICAgICAgICAgICAgICBpZiAocHJldikge1xuICAgICAgICAgICAgICAgICAgICBsZWZ0ID0gRG9tSGFuZGxlci5nZXRPdXRlcldpZHRoKHByZXYpICsgKHBhcnNlRmxvYXQocHJldi5zdHlsZS5sZWZ0KSB8fCAwKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLmxlZnQgPSBsZWZ0ICsgJ3B4JztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZmlsdGVyUm93ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50Py5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgIGlmIChmaWx0ZXJSb3cpIHtcbiAgICAgICAgICAgICAgICBsZXQgaW5kZXggPSBEb21IYW5kbGVyLmluZGV4KHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlclJvdy5jaGlsZHJlbiAmJiBmaWx0ZXJSb3cuY2hpbGRyZW5baW5kZXhdKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclJvdy5jaGlsZHJlbltpbmRleF0uc3R5bGUubGVmdCA9IHRoaXMuZWwubmF0aXZlRWxlbWVudC5zdHlsZS5sZWZ0O1xuICAgICAgICAgICAgICAgICAgICBmaWx0ZXJSb3cuY2hpbGRyZW5baW5kZXhdLnN0eWxlLnJpZ2h0ID0gdGhpcy5lbC5uYXRpdmVFbGVtZW50LnN0eWxlLnJpZ2h0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn1cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BTb3J0YWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnLFxuICAgICAgICAnW2NsYXNzLnAtc29ydGFibGUtY29sdW1uXSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MucC1oaWdobGlnaHRdJzogJ3NvcnRlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnaXNFbmFibGVkKCkgPyBcIjBcIiA6IG51bGwnLFxuICAgICAgICAnW2F0dHIucm9sZV0nOiAnXCJjb2x1bW5oZWFkZXJcIicsXG4gICAgICAgICdbYXR0ci5hcmlhLXNvcnRdJzogJ3NvcnRPcmRlcidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNvcnRhYmxlQ29sdW1uIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFNvcnRhYmxlQ29sdW1uJykgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHBTb3J0YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc29ydGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc29ydE9yZGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc29ydFNvdXJjZSQuc3Vic2NyaWJlKChzb3J0TWV0YSkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgdGhpcy5zb3J0ZWQgPSB0aGlzLmR0LmlzU29ydGVkKDxzdHJpbmc+dGhpcy5maWVsZCkgYXMgYm9vbGVhbjtcbiAgICAgICAgdGhpcy5zb3J0T3JkZXIgPSB0aGlzLnNvcnRlZCA/ICh0aGlzLmR0LnNvcnRPcmRlciA9PT0gMSA/ICdhc2NlbmRpbmcnIDogJ2Rlc2NlbmRpbmcnKSA6ICdub25lJztcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSAmJiAhdGhpcy5pc0ZpbHRlckVsZW1lbnQoPEhUTUxFbGVtZW50PmV2ZW50LnRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU29ydFN0YXRlKCk7XG4gICAgICAgICAgICB0aGlzLmR0LnNvcnQoe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIGZpZWxkOiB0aGlzLmZpZWxkXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5zcGFjZScsIFsnJGV2ZW50J10pXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gICAgb25FbnRlcktleShldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICB0aGlzLm9uQ2xpY2soZXZlbnQpO1xuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wU29ydGFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpc0ZpbHRlckVsZW1lbnQoZWxlbWVudDogSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNGaWx0ZXJFbGVtZW50SWNvbk9yQnV0dG9uKGVsZW1lbnQpIHx8IHRoaXMuaXNGaWx0ZXJFbGVtZW50SWNvbk9yQnV0dG9uKGVsZW1lbnQ/LnBhcmVudEVsZW1lbnQ/LnBhcmVudEVsZW1lbnQpO1xuICAgIH1cbiAgICBwcml2YXRlIGlzRmlsdGVyRWxlbWVudEljb25PckJ1dHRvbihlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICAgICAgICByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhlbGVtZW50LCAncGktZmlsdGVyLWljb24nKSB8fCBEb21IYW5kbGVyLmhhc0NsYXNzKGVsZW1lbnQsICdwLWNvbHVtbi1maWx0ZXItbWVudS1idXR0b24nKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3Atc29ydEljb24nLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQuc29ydEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgPFNvcnRBbHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXNvcnRhYmxlLWNvbHVtbi1pY29uJ1wiICpuZ0lmPVwic29ydE9yZGVyID09PSAwXCIgLz5cbiAgICAgICAgICAgIDxTb3J0QW1vdW50VXBBbHRJY29uIFtzdHlsZUNsYXNzXT1cIidwLXNvcnRhYmxlLWNvbHVtbi1pY29uJ1wiICpuZ0lmPVwic29ydE9yZGVyID09PSAxXCIgLz5cbiAgICAgICAgICAgIDxTb3J0QW1vdW50RG93bkljb24gW3N0eWxlQ2xhc3NdPVwiJ3Atc29ydGFibGUtY29sdW1uLWljb24nXCIgKm5nSWY9XCJzb3J0T3JkZXIgPT09IC0xXCIgLz5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxzcGFuICpuZ0lmPVwiZHQuc29ydEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1zb3J0YWJsZS1jb2x1bW4taWNvblwiPlxuICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiZHQuc29ydEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IHNvcnRPcmRlciB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgICA8c3BhbiAqbmdJZj1cImlzTXVsdGlTb3J0ZWQoKVwiIGNsYXNzPVwicC1zb3J0YWJsZS1jb2x1bW4tYmFkZ2VcIj57eyBnZXRCYWRnZVZhbHVlKCkgfX08L3NwYW4+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTb3J0SWNvbiBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBzb3J0T3JkZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zb3J0U291cmNlJC5zdWJzY3JpYmUoKHNvcnRNZXRhKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVNvcnRTdGF0ZSgpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy51cGRhdGVTb3J0U3RhdGUoKTtcbiAgICB9XG5cbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVNvcnRTdGF0ZSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHQuc29ydE1vZGUgPT09ICdzaW5nbGUnKSB7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHRoaXMuZHQuaXNTb3J0ZWQoPHN0cmluZz50aGlzLmZpZWxkKSA/IHRoaXMuZHQuc29ydE9yZGVyIDogMDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmR0LnNvcnRNb2RlID09PSAnbXVsdGlwbGUnKSB7XG4gICAgICAgICAgICBsZXQgc29ydE1ldGEgPSB0aGlzLmR0LmdldFNvcnRNZXRhKDxzdHJpbmc+dGhpcy5maWVsZCk7XG4gICAgICAgICAgICB0aGlzLnNvcnRPcmRlciA9IHNvcnRNZXRhID8gc29ydE1ldGEub3JkZXIgOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICBnZXRNdWx0aVNvcnRNZXRhSW5kZXgoKSB7XG4gICAgICAgIGxldCBtdWx0aVNvcnRNZXRhID0gdGhpcy5kdC5fbXVsdGlTb3J0TWV0YTtcbiAgICAgICAgbGV0IGluZGV4ID0gLTE7XG5cbiAgICAgICAgaWYgKG11bHRpU29ydE1ldGEgJiYgdGhpcy5kdC5zb3J0TW9kZSA9PT0gJ211bHRpcGxlJyAmJiB0aGlzLmR0LnNob3dJbml0aWFsU29ydEJhZGdlICYmIG11bHRpU29ydE1ldGEubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtdWx0aVNvcnRNZXRhLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IG1ldGEgPSBtdWx0aVNvcnRNZXRhW2ldO1xuICAgICAgICAgICAgICAgIGlmIChtZXRhLmZpZWxkID09PSB0aGlzLmZpZWxkIHx8IG1ldGEuZmllbGQgPT09IHRoaXMuZmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gaW5kZXg7XG4gICAgfVxuXG4gICAgZ2V0QmFkZ2VWYWx1ZSgpIHtcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRNdWx0aVNvcnRNZXRhSW5kZXgoKTtcblxuICAgICAgICByZXR1cm4gdGhpcy5kdC5ncm91cFJvd3NCeSAmJiBpbmRleCA+IC0xID8gaW5kZXggOiBpbmRleCArIDE7XG4gICAgfVxuXG4gICAgaXNNdWx0aVNvcnRlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuc29ydE1vZGUgPT09ICdtdWx0aXBsZScgJiYgdGhpcy5nZXRNdWx0aVNvcnRNZXRhSW5kZXgoKSA+IC0xO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BTZWxlY3RhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCcsXG4gICAgICAgICdbY2xhc3MucC1zZWxlY3RhYmxlLXJvd10nOiAnaXNFbmFibGVkKCknLFxuICAgICAgICAnW2NsYXNzLnAtaGlnaGxpZ2h0XSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbYXR0ci50YWJpbmRleF0nOiAnc2V0Um93VGFiSW5kZXgoKScsXG4gICAgICAgICdbYXR0ci5kYXRhLXAtaGlnaGxpZ2h0XSc6ICdzZWxlY3RlZCcsXG4gICAgICAgICdbYXR0ci5kYXRhLXAtc2VsZWN0YWJsZS1yb3ddJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RhYmxlUm93IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFNlbGVjdGFibGVSb3cnKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoJ3BTZWxlY3RhYmxlUm93SW5kZXgnKSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgcFNlbGVjdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHNlbGVjdGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHByaXZhdGUgZWw6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgc2V0Um93VGFiSW5kZXgoKSB7XG4gICAgICAgIGlmICh0aGlzLmR0LnNlbGVjdGlvbk1vZGUgPT09ICdzaW5nbGUnIHx8IHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgcmV0dXJuICF0aGlzLmR0LnNlbGVjdGlvbiA/IDAgOiB0aGlzLmR0LmFuY2hvclJvd0luZGV4ID09PSB0aGlzLmluZGV4ID8gMCA6IC0xO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMuZGF0YSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93Q2xpY2soe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCd0b3VjaGVuZCcsIFsnJGV2ZW50J10pXG4gICAgb25Ub3VjaEVuZChldmVudDogRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQuaGFuZGxlUm93VG91Y2hFbmQoZXZlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQuY29kZSkge1xuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uQXJyb3dEb3duS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkFycm93VXBLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdIb21lJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uSG9tZUtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ0VuZCc6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVuZEtleShldmVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uU3BhY2VLZXkoZXZlbnQpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkVudGVyS2V5KGV2ZW50KTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PT0gJ0tleUEnICYmIChldmVudC5tZXRhS2V5IHx8IGV2ZW50LmN0cmxLZXkpICYmIHRoaXMuZHQuc2VsZWN0aW9uTW9kZSA9PT0gJ211bHRpcGxlJykge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kdC5kYXRhVG9SZW5kZXIodGhpcy5kdC5wcm9jZXNzZWREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3Rpb24gPSBbLi4uZGF0YV07XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZHQuc2VsZWN0UmFuZ2UoZXZlbnQsIGRhdGEubGVuZ3RoIC0gMSk7XG5cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvbkFycm93RG93bktleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IG5leHRSb3cgPSB0aGlzLmZpbmROZXh0U2VsZWN0YWJsZVJvdyhyb3cpO1xuXG4gICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICBuZXh0Um93LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uQXJyb3dVcEtleShldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PmV2ZW50LmN1cnJlbnRUYXJnZXQ7XG4gICAgICAgIGNvbnN0IHByZXZSb3cgPSB0aGlzLmZpbmRQcmV2U2VsZWN0YWJsZVJvdyhyb3cpO1xuXG4gICAgICAgIGlmIChwcmV2Um93KSB7XG4gICAgICAgICAgICBwcmV2Um93LmZvY3VzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uRW50ZXJLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd0NsaWNrKHtcbiAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgb25FbmRLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgbGFzdFJvdyA9IHRoaXMuZmluZExhc3RTZWxlY3RhYmxlUm93KCk7XG4gICAgICAgIGxhc3RSb3cgJiYgdGhpcy5mb2N1c1Jvd0NoYW5nZSh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIGxhc3RSb3cpO1xuXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kdC5kYXRhVG9SZW5kZXIodGhpcy5kdC5yb3dzKTtcbiAgICAgICAgICAgIGNvbnN0IGxhc3RTZWxlY3RhYmxlUm93SW5kZXggPSBEb21IYW5kbGVyLmdldEF0dHJpYnV0ZShsYXN0Um93LCAnaW5kZXgnKTtcblxuICAgICAgICAgICAgdGhpcy5kdC5hbmNob3JSb3dJbmRleCA9IGxhc3RTZWxlY3RhYmxlUm93SW5kZXg7XG4gICAgICAgICAgICB0aGlzLmR0LnNlbGVjdGlvbiA9IGRhdGEuc2xpY2UodGhpcy5pbmRleCwgZGF0YS5sZW5ndGgpO1xuICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3RSYW5nZShldmVudCwgdGhpcy5pbmRleCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkhvbWVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgY29uc3QgZmlyc3RSb3cgPSB0aGlzLmZpbmRGaXJzdFNlbGVjdGFibGVSb3coKTtcblxuICAgICAgICBmaXJzdFJvdyAmJiB0aGlzLmZvY3VzUm93Q2hhbmdlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZmlyc3RSb3cpO1xuXG4gICAgICAgIGlmIChldmVudC5jdHJsS2V5ICYmIGV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kdC5kYXRhVG9SZW5kZXIodGhpcy5kdC5yb3dzKTtcbiAgICAgICAgICAgIGNvbnN0IGZpcnN0U2VsZWN0YWJsZVJvd0luZGV4ID0gRG9tSGFuZGxlci5nZXRBdHRyaWJ1dGUoZmlyc3RSb3csICdpbmRleCcpO1xuXG4gICAgICAgICAgICB0aGlzLmR0LmFuY2hvclJvd0luZGV4ID0gdGhpcy5kdC5hbmNob3JSb3dJbmRleCB8fCBmaXJzdFNlbGVjdGFibGVSb3dJbmRleDtcbiAgICAgICAgICAgIHRoaXMuZHQuc2VsZWN0aW9uID0gZGF0YS5zbGljZSgwLCB0aGlzLmluZGV4ICsgMSk7XG4gICAgICAgICAgICB0aGlzLmR0LnNlbGVjdFJhbmdlKGV2ZW50LCB0aGlzLmluZGV4KTtcbiAgICAgICAgfVxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cblxuICAgIG9uU3BhY2VLZXkoZXZlbnQpIHtcbiAgICAgICAgY29uc3QgaXNJbnB1dCA9IGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxJbnB1dEVsZW1lbnQgfHwgZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTFNlbGVjdEVsZW1lbnQgfHwgZXZlbnQudGFyZ2V0IGluc3RhbmNlb2YgSFRNTFRleHRBcmVhRWxlbWVudDtcbiAgICAgICAgaWYgKGlzSW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMub25FbnRlcktleShldmVudCk7XG5cbiAgICAgICAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiB0aGlzLmR0LnNlbGVjdGlvbiAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSB0aGlzLmR0LmRhdGFUb1JlbmRlcih0aGlzLmR0LnJvd3MpO1xuICAgICAgICAgICAgICAgIGxldCBpbmRleDtcblxuICAgICAgICAgICAgICAgIGlmIChPYmplY3RVdGlscy5pc05vdEVtcHR5KHRoaXMuZHQuc2VsZWN0aW9uKSAmJiB0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIGxldCBmaXJzdFNlbGVjdGVkUm93SW5kZXgsIGxhc3RTZWxlY3RlZFJvd0luZGV4O1xuICAgICAgICAgICAgICAgICAgICBmaXJzdFNlbGVjdGVkUm93SW5kZXggPSBPYmplY3RVdGlscy5maW5kSW5kZXhJbkxpc3QodGhpcy5kdC5zZWxlY3Rpb25bMF0sIGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBsYXN0U2VsZWN0ZWRSb3dJbmRleCA9IE9iamVjdFV0aWxzLmZpbmRJbmRleEluTGlzdCh0aGlzLmR0LnNlbGVjdGlvblt0aGlzLmR0LnNlbGVjdGlvbi5sZW5ndGggLSAxXSwgZGF0YSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaW5kZXggPSB0aGlzLmluZGV4IDw9IGZpcnN0U2VsZWN0ZWRSb3dJbmRleCA/IGxhc3RTZWxlY3RlZFJvd0luZGV4IDogZmlyc3RTZWxlY3RlZFJvd0luZGV4O1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGluZGV4ID0gT2JqZWN0VXRpbHMuZmluZEluZGV4SW5MaXN0KHRoaXMuZHQuc2VsZWN0aW9uLCBkYXRhKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmR0LmFuY2hvclJvd0luZGV4ID0gaW5kZXg7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC5zZWxlY3Rpb24gPSBpbmRleCAhPT0gdGhpcy5pbmRleCA/IGRhdGEuc2xpY2UoTWF0aC5taW4oaW5kZXgsIHRoaXMuaW5kZXgpLCBNYXRoLm1heChpbmRleCwgdGhpcy5pbmRleCkgKyAxKSA6IFt0aGlzLmRhdGFdO1xuICAgICAgICAgICAgICAgIHRoaXMuZHQuc2VsZWN0UmFuZ2UoZXZlbnQsIHRoaXMuaW5kZXgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZm9jdXNSb3dDaGFuZ2UoZmlyc3RGb2N1c2FibGVSb3csIGN1cnJlbnRGb2N1c2VkUm93KSB7XG4gICAgICAgIGZpcnN0Rm9jdXNhYmxlUm93LnRhYkluZGV4ID0gJy0xJztcbiAgICAgICAgY3VycmVudEZvY3VzZWRSb3cudGFiSW5kZXggPSAnMCc7XG4gICAgICAgIERvbUhhbmRsZXIuZm9jdXMoY3VycmVudEZvY3VzZWRSb3cpO1xuICAgIH1cblxuICAgIGZpbmRMYXN0U2VsZWN0YWJsZVJvdygpIHtcbiAgICAgICAgY29uc3Qgcm93cyA9IERvbUhhbmRsZXIuZmluZCh0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQsICcucC1zZWxlY3RhYmxlLXJvdycpO1xuXG4gICAgICAgIHJldHVybiByb3dzID8gcm93c1tyb3dzLmxlbmd0aCAtIDFdIDogbnVsbDtcbiAgICB9XG5cbiAgICBmaW5kRmlyc3RTZWxlY3RhYmxlUm93KCkge1xuICAgICAgICBjb25zdCBmaXJzdFJvdyA9IERvbUhhbmRsZXIuZmluZFNpbmdsZSh0aGlzLmR0LmVsLm5hdGl2ZUVsZW1lbnQsICcucC1zZWxlY3RhYmxlLXJvdycpO1xuXG4gICAgICAgIHJldHVybiBmaXJzdFJvdztcbiAgICB9XG5cbiAgICBmaW5kTmV4dFNlbGVjdGFibGVSb3cocm93OiBIVE1MVGFibGVSb3dFbGVtZW50KTogSFRNTFRhYmxlUm93RWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgbmV4dFJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PnJvdy5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgIGlmIChuZXh0Um93KSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0Um93LCAncC1zZWxlY3RhYmxlLXJvdycpKSByZXR1cm4gbmV4dFJvdztcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmluZE5leHRTZWxlY3RhYmxlUm93KG5leHRSb3cpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldlNlbGVjdGFibGVSb3cocm93OiBIVE1MVGFibGVSb3dFbGVtZW50KTogSFRNTFRhYmxlUm93RWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgcHJldlJvdyA9IDxIVE1MVGFibGVSb3dFbGVtZW50PnJvdy5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICBpZiAocHJldlJvdykge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldlJvdywgJ3Atc2VsZWN0YWJsZS1yb3cnKSkgcmV0dXJuIHByZXZSb3c7XG4gICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLmZpbmRQcmV2U2VsZWN0YWJsZVJvdyhwcmV2Um93KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wU2VsZWN0YWJsZVJvd0Rpc2FibGVkICE9PSB0cnVlO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BTZWxlY3RhYmxlUm93RGJsQ2xpY2tdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLXNlbGVjdGFibGUtcm93XSc6ICdpc0VuYWJsZWQoKScsXG4gICAgICAgICdbY2xhc3MucC1oaWdobGlnaHRdJzogJ3NlbGVjdGVkJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgU2VsZWN0YWJsZVJvd0RibENsaWNrIGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICAgIEBJbnB1dCgncFNlbGVjdGFibGVSb3dEYmxDbGljaycpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCgncFNlbGVjdGFibGVSb3dJbmRleCcpIGluZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwU2VsZWN0YWJsZVJvd0Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZWN0ZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyB0YWJsZVNlcnZpY2U6IFRhYmxlU2VydmljZSkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24gPSB0aGlzLmR0LnRhYmxlU2VydmljZS5zZWxlY3Rpb25Tb3VyY2UkLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IHRoaXMuZHQuaXNTZWxlY3RlZCh0aGlzLmRhdGEpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQgPSB0aGlzLmR0LmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2RibGNsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5oYW5kbGVSb3dDbGljayh7XG4gICAgICAgICAgICAgICAgb3JpZ2luYWxFdmVudDogZXZlbnQsXG4gICAgICAgICAgICAgICAgcm93RGF0YTogdGhpcy5kYXRhLFxuICAgICAgICAgICAgICAgIHJvd0luZGV4OiB0aGlzLmluZGV4XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucFNlbGVjdGFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twQ29udGV4dE1lbnVSb3ddJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50JyxcbiAgICAgICAgJ1tjbGFzcy5wLWhpZ2hsaWdodC1jb250ZXh0bWVudV0nOiAnc2VsZWN0ZWQnLFxuICAgICAgICAnW2F0dHIudGFiaW5kZXhdJzogJ2lzRW5hYmxlZCgpID8gMCA6IHVuZGVmaW5lZCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbnRleHRNZW51Um93IHtcbiAgICBASW5wdXQoJ3BDb250ZXh0TWVudVJvdycpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCgncENvbnRleHRNZW51Um93SW5kZXgnKSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgcENvbnRleHRNZW51Um93RGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzZWxlY3RlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwcml2YXRlIGVsOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLmNvbnRleHRNZW51U291cmNlJC5zdWJzY3JpYmUoKGRhdGEpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gdGhpcy5kdC5lcXVhbHModGhpcy5kYXRhLCBkYXRhKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY29udGV4dG1lbnUnLCBbJyRldmVudCddKVxuICAgIG9uQ29udGV4dE1lbnUoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LmhhbmRsZVJvd1JpZ2h0Q2xpY2soe1xuICAgICAgICAgICAgICAgIG9yaWdpbmFsRXZlbnQ6IGV2ZW50LFxuICAgICAgICAgICAgICAgIHJvd0RhdGE6IHRoaXMuZGF0YSxcbiAgICAgICAgICAgICAgICByb3dJbmRleDogdGhpcy5pbmRleFxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuZWwubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucENvbnRleHRNZW51Um93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbcFJvd1RvZ2dsZXJdJyxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgUm93VG9nZ2xlciB7XG4gICAgQElucHV0KCdwUm93VG9nZ2xlcicpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCgpIHBSb3dUb2dnbGVyRGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlKSB7fVxuXG4gICAgQEhvc3RMaXN0ZW5lcignY2xpY2snLCBbJyRldmVudCddKVxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLmR0LnRvZ2dsZVJvdyh0aGlzLmRhdGEsIGV2ZW50KTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpc0VuYWJsZWQoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnBSb3dUb2dnbGVyRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twUmVzaXphYmxlQ29sdW1uXScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFJlc2l6YWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcFJlc2l6YWJsZUNvbHVtbkRpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplcjogSFRNTFNwYW5FbGVtZW50IHwgdW5kZWZpbmVkO1xuXG4gICAgcmVzaXplck1vdXNlRG93bkxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkb2N1bWVudE1vdXNlVXBMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIEBJbmplY3QoUExBVEZPUk1fSUQpIHByaXZhdGUgcGxhdGZvcm1JZDogYW55LCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgaWYgKGlzUGxhdGZvcm1Ccm93c2VyKHRoaXMucGxhdGZvcm1JZCkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLXJlc2l6YWJsZS1jb2x1bW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlc2l6ZXIgPSB0aGlzLnJlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFkZENsYXNzKHRoaXMucmVzaXplciwgJ3AtY29sdW1uLXJlc2l6ZXInKTtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgdGhpcy5yZXNpemVyKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5yZXNpemVyLCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZG9jdW1lbnQsICdtb3VzZW1vdmUnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZU1vdmUuYmluZCh0aGlzKSk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VVcExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5kb2N1bWVudCwgJ21vdXNldXAnLCB0aGlzLm9uRG9jdW1lbnRNb3VzZVVwLmJpbmQodGhpcykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB1bmJpbmREb2N1bWVudEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZU1vdmVMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudE1vdXNlTW92ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50TW91c2VNb3ZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRNb3VzZVVwTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LndoaWNoID09PSAxKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uUmVzaXplQmVnaW4oZXZlbnQpO1xuICAgICAgICAgICAgdGhpcy5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRG9jdW1lbnRNb3VzZU1vdmUoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZShldmVudCk7XG4gICAgfVxuXG4gICAgb25Eb2N1bWVudE1vdXNlVXAoZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtblJlc2l6ZUVuZCgpO1xuICAgICAgICB0aGlzLnVuYmluZERvY3VtZW50RXZlbnRzKCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVzaXphYmxlQ29sdW1uRGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIGlmICh0aGlzLnJlc2l6ZXJNb3VzZURvd25MaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5yZXNpemVyTW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMucmVzaXplck1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudW5iaW5kRG9jdW1lbnRFdmVudHMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZW9yZGVyYWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZUNvbHVtbiBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gICAgQElucHV0KCkgcFJlb3JkZXJhYmxlQ29sdW1uRGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBkcmFnU3RhcnRMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZHJhZ092ZXJMaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgZHJhZ0VudGVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdMZWF2ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBtb3VzZURvd25MaXN0ZW5lcjogVm9pZExpc3RlbmVyO1xuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBiaW5kRXZlbnRzKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnc3RhcnQnLCB0aGlzLm9uRHJhZ1N0YXJ0LmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ292ZXInLCB0aGlzLm9uRHJhZ092ZXIuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2VudGVyJywgdGhpcy5vbkRyYWdFbnRlci5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnbGVhdmUnLCB0aGlzLm9uRHJhZ0xlYXZlLmJpbmQodGhpcykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB1bmJpbmRFdmVudHMoKSB7XG4gICAgICAgIGlmICh0aGlzLm1vdXNlRG93bkxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdTdGFydExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdTdGFydExpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdPdmVyTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ092ZXJMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdFbnRlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbnRlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdMZWF2ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uTW91c2VEb3duKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGV2ZW50LnRhcmdldC5ub2RlTmFtZSA9PT0gJ0lOUFVUJyB8fCBldmVudC50YXJnZXQubm9kZU5hbWUgPT09ICdURVhUQVJFQScgfHwgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQsICdwLWNvbHVtbi1yZXNpemVyJykpIHRoaXMuZWwubmF0aXZlRWxlbWVudC5kcmFnZ2FibGUgPSBmYWxzZTtcbiAgICAgICAgZWxzZSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBvbkRyYWdTdGFydChldmVudDogYW55KSB7XG4gICAgICAgIHRoaXMuZHQub25Db2x1bW5EcmFnU3RhcnQoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25EcmFnT3ZlcihldmVudDogYW55KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgb25EcmFnRW50ZXIoZXZlbnQ6IGFueSkge1xuICAgICAgICB0aGlzLmR0Lm9uQ29sdW1uRHJhZ0VudGVyKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgdGhpcy5kdC5vbkNvbHVtbkRyYWdMZWF2ZShldmVudCk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcignZHJvcCcsIFsnJGV2ZW50J10pXG4gICAgb25Ecm9wKGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25Db2x1bW5Ecm9wKGV2ZW50LCB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmRFdmVudHMoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BFZGl0YWJsZUNvbHVtbl0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZUNvbHVtbiBpbXBsZW1lbnRzIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgICBASW5wdXQoJ3BFZGl0YWJsZUNvbHVtbicpIGRhdGE6IGFueTtcblxuICAgIEBJbnB1dCgncEVkaXRhYmxlQ29sdW1uRmllbGQnKSBmaWVsZDogYW55O1xuXG4gICAgQElucHV0KCdwRWRpdGFibGVDb2x1bW5Sb3dJbmRleCcpIHJvd0luZGV4OiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwRWRpdGFibGVDb2x1bW5EaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHBGb2N1c0NlbGxTZWxlY3Rvcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgb3ZlcmxheUV2ZW50TGlzdGVuZXI6IGFueTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBkdDogVGFibGUsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIHpvbmU6IE5nWm9uZSkge31cblxuICAgIHB1YmxpYyBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQgJiYgIWNoYW5nZXMuZGF0YT8uZmlyc3RDaGFuZ2UpIHtcbiAgICAgICAgICAgIHRoaXMuZHQudXBkYXRlRWRpdGluZ0NlbGwodGhpcy5lbC5uYXRpdmVFbGVtZW50LCB0aGlzLmRhdGEsIHRoaXMuZmllbGQsIDxudW1iZXI+dGhpcy5yb3dJbmRleCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmFkZENsYXNzKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ3AtZWRpdGFibGUtY29sdW1uJyk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5kdC5zZWxmQ2xpY2sgPSB0cnVlO1xuXG4gICAgICAgICAgICBpZiAodGhpcy5kdC5lZGl0aW5nQ2VsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmVkaXRpbmdDZWxsICE9PSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9wZW5DZWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm9wZW5DZWxsKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvcGVuQ2VsbCgpIHtcbiAgICAgICAgdGhpcy5kdC51cGRhdGVFZGl0aW5nQ2VsbCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuZGF0YSwgdGhpcy5maWVsZCwgPG51bWJlcj50aGlzLnJvd0luZGV4KTtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWNlbGwtZWRpdGluZycpO1xuICAgICAgICB0aGlzLmR0Lm9uRWRpdEluaXQuZW1pdCh7IGZpZWxkOiB0aGlzLmZpZWxkLCBkYXRhOiB0aGlzLmRhdGEsIGluZGV4OiA8bnVtYmVyPnRoaXMucm93SW5kZXggfSk7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgZm9jdXNDZWxsU2VsZWN0b3IgPSB0aGlzLnBGb2N1c0NlbGxTZWxlY3RvciB8fCAnaW5wdXQsIHRleHRhcmVhLCBzZWxlY3QnO1xuICAgICAgICAgICAgICAgIGxldCBmb2N1c2FibGVFbGVtZW50ID0gRG9tSGFuZGxlci5maW5kU2luZ2xlKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgZm9jdXNDZWxsU2VsZWN0b3IpO1xuXG4gICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZUVsZW1lbnQpIHtcbiAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlRWxlbWVudC5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDUwKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lciA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVsICYmIHRoaXMuZWwubmF0aXZlRWxlbWVudC5jb250YWlucyhlLnRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmR0LnNlbGZDbGljayA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgdGhpcy5kdC5vdmVybGF5U3Vic2NyaXB0aW9uID0gdGhpcy5kdC5vdmVybGF5U2VydmljZS5jbGlja09ic2VydmFibGUuc3Vic2NyaWJlKHRoaXMub3ZlcmxheUV2ZW50TGlzdGVuZXIpO1xuICAgIH1cblxuICAgIGNsb3NlRWRpdGluZ0NlbGwoY29tcGxldGVkOiBhbnksIGV2ZW50OiBFdmVudCkge1xuICAgICAgICBjb25zdCBldmVudERhdGEgPSB7IGZpZWxkOiA8c3RyaW5nPnRoaXMuZHQuZWRpdGluZ0NlbGxGaWVsZCwgZGF0YTogPGFueT50aGlzLmR0LmVkaXRpbmdDZWxsRGF0YSwgb3JpZ2luYWxFdmVudDogPEV2ZW50PmV2ZW50LCBpbmRleDogPG51bWJlcj50aGlzLmR0LmVkaXRpbmdDZWxsUm93SW5kZXggfTtcblxuICAgICAgICBpZiAoY29tcGxldGVkKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uRWRpdENvbXBsZXRlLmVtaXQoZXZlbnREYXRhKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuZHQub25FZGl0Q2FuY2VsLmVtaXQoZXZlbnREYXRhKTtcblxuICAgICAgICAgICAgdGhpcy5kdC52YWx1ZS5mb3JFYWNoKChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRbdGhpcy5kdC5lZGl0aW5nQ2VsbEZpZWxkXSA9PT0gdGhpcy5kYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnRbdGhpcy5kdC5lZGl0aW5nQ2VsbEZpZWxkXSA9IHRoaXMuZHQuZWRpdGluZ0NlbGxEYXRhO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmR0LmVkaXRpbmdDZWxsLCAncC1jZWxsLWVkaXRpbmcnKTtcbiAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbCA9IG51bGw7XG4gICAgICAgIHRoaXMuZHQuZWRpdGluZ0NlbGxEYXRhID0gbnVsbDtcbiAgICAgICAgdGhpcy5kdC5lZGl0aW5nQ2VsbEZpZWxkID0gbnVsbDtcbiAgICAgICAgdGhpcy5kdC51bmJpbmREb2N1bWVudEVkaXRMaXN0ZW5lcigpO1xuXG4gICAgICAgIGlmICh0aGlzLmR0Lm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuZHQub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5lbnRlcicsIFsnJGV2ZW50J10pXG4gICAgb25FbnRlcktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkgJiYgIWV2ZW50LnNoaWZ0S2V5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLnRhYicsIFsnJGV2ZW50J10pXG4gICAgb25UYWJLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmVzY2FwZScsIFsnJGV2ZW50J10pXG4gICAgb25Fc2NhcGVLZXlEb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbChmYWxzZSwgZXZlbnQpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi50YWInLCBbJyRldmVudCddKVxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24uc2hpZnQudGFiJywgWyckZXZlbnQnXSlcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLm1ldGEudGFiJywgWyckZXZlbnQnXSlcbiAgICBvblNoaWZ0S2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgaWYgKGV2ZW50LnNoaWZ0S2V5KSB0aGlzLm1vdmVUb1ByZXZpb3VzQ2VsbChldmVudCk7XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1vdmVUb05leHRDZWxsKGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25BcnJvd0Rvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2VsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGN1cnJlbnRDZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZE5leHRFZGl0YWJsZUNvbHVtbkJ5SW5kZXgoY3VycmVudENlbGwsIGNlbGxJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsICdibHVyJyk7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd3VwJywgWyckZXZlbnQnXSlcbiAgICBvbkFycm93VXAoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKHRoaXMuaXNFbmFibGVkKCkpIHtcbiAgICAgICAgICAgIGxldCBjdXJyZW50Q2VsbCA9IHRoaXMuZmluZENlbGwoZXZlbnQudGFyZ2V0KTtcbiAgICAgICAgICAgIGlmIChjdXJyZW50Q2VsbCkge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsSW5kZXggPSBEb21IYW5kbGVyLmluZGV4KGN1cnJlbnRDZWxsKTtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0Q2VsbCA9IHRoaXMuZmluZFByZXZFZGl0YWJsZUNvbHVtbkJ5SW5kZXgoY3VycmVudENlbGwsIGNlbGxJbmRleCk7XG5cbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsICdibHVyJyk7XG4gICAgICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZCh0YXJnZXRDZWxsLCAnY2xpY2snKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bi5hcnJvd2xlZnQnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dMZWZ0KGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XG4gICAgICAgIGlmICh0aGlzLmlzRW5hYmxlZCgpKSB7XG4gICAgICAgICAgICB0aGlzLm1vdmVUb1ByZXZpb3VzQ2VsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duLmFycm93cmlnaHQnLCBbJyRldmVudCddKVxuICAgIG9uQXJyb3dSaWdodChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5tb3ZlVG9OZXh0Q2VsbChldmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kQ2VsbChlbGVtZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGxldCBjZWxsID0gZWxlbWVudDtcbiAgICAgICAgICAgIHdoaWxlIChjZWxsICYmICFEb21IYW5kbGVyLmhhc0NsYXNzKGNlbGwsICdwLWNlbGwtZWRpdGluZycpKSB7XG4gICAgICAgICAgICAgICAgY2VsbCA9IGNlbGwucGFyZW50RWxlbWVudDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIGNlbGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG1vdmVUb1ByZXZpb3VzQ2VsbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgY3VycmVudENlbGwgPSB0aGlzLmZpbmRDZWxsKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbCkge1xuICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSB0aGlzLmZpbmRQcmV2aW91c0VkaXRhYmxlQ29sdW1uKGN1cnJlbnRDZWxsKTtcblxuICAgICAgICAgICAgaWYgKHRhcmdldENlbGwpIHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5kdC5pc0VkaXRpbmdDZWxsVmFsaWQoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmNsb3NlRWRpdGluZ0NlbGwodHJ1ZSwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIERvbUhhbmRsZXIuaW52b2tlRWxlbWVudE1ldGhvZChldmVudC50YXJnZXQsICdibHVyJyk7XG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKHRhcmdldENlbGwsICdjbGljaycpO1xuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBtb3ZlVG9OZXh0Q2VsbChldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICBsZXQgY3VycmVudENlbGwgPSB0aGlzLmZpbmRDZWxsKGV2ZW50LnRhcmdldCk7XG4gICAgICAgIGlmIChjdXJyZW50Q2VsbCkge1xuICAgICAgICAgICAgbGV0IHRhcmdldENlbGwgPSB0aGlzLmZpbmROZXh0RWRpdGFibGVDb2x1bW4oY3VycmVudENlbGwpO1xuXG4gICAgICAgICAgICBpZiAodGFyZ2V0Q2VsbCkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmR0LmlzRWRpdGluZ0NlbGxWYWxpZCgpKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xvc2VFZGl0aW5nQ2VsbCh0cnVlLCBldmVudCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgRG9tSGFuZGxlci5pbnZva2VFbGVtZW50TWV0aG9kKGV2ZW50LnRhcmdldCwgJ2JsdXInKTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmludm9rZUVsZW1lbnRNZXRob2QodGFyZ2V0Q2VsbCwgJ2NsaWNrJyk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZHQuaXNFZGl0aW5nQ2VsbFZhbGlkKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jbG9zZUVkaXRpbmdDZWxsKHRydWUsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldmlvdXNFZGl0YWJsZUNvbHVtbihjZWxsOiBhbnkpOiBIVE1MVGFibGVDZWxsRWxlbWVudCB8IG51bGwge1xuICAgICAgICBsZXQgcHJldkNlbGwgPSBjZWxsLnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKCFwcmV2Q2VsbCkge1xuICAgICAgICAgICAgbGV0IHByZXZpb3VzUm93ID0gY2VsbC5wYXJlbnRFbGVtZW50Py5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuICAgICAgICAgICAgaWYgKHByZXZpb3VzUm93KSB7XG4gICAgICAgICAgICAgICAgcHJldkNlbGwgPSBwcmV2aW91c1Jvdy5sYXN0RWxlbWVudENoaWxkO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHByZXZDZWxsKSB7XG4gICAgICAgICAgICBpZiAoRG9tSGFuZGxlci5oYXNDbGFzcyhwcmV2Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHJldHVybiBwcmV2Q2VsbDtcbiAgICAgICAgICAgIGVsc2UgcmV0dXJuIHRoaXMuZmluZFByZXZpb3VzRWRpdGFibGVDb2x1bW4ocHJldkNlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEVkaXRhYmxlQ29sdW1uKGNlbGw6IGFueSk6IEhUTUxUYWJsZUNlbGxFbGVtZW50IHwgbnVsbCB7XG4gICAgICAgIGxldCBuZXh0Q2VsbCA9IGNlbGwubmV4dEVsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmICghbmV4dENlbGwpIHtcbiAgICAgICAgICAgIGxldCBuZXh0Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XG4gICAgICAgICAgICBpZiAobmV4dFJvdykge1xuICAgICAgICAgICAgICAgIG5leHRDZWxsID0gbmV4dFJvdy5maXJzdEVsZW1lbnRDaGlsZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChuZXh0Q2VsbCkge1xuICAgICAgICAgICAgaWYgKERvbUhhbmRsZXIuaGFzQ2xhc3MobmV4dENlbGwsICdwLWVkaXRhYmxlLWNvbHVtbicpKSByZXR1cm4gbmV4dENlbGw7XG4gICAgICAgICAgICBlbHNlIHJldHVybiB0aGlzLmZpbmROZXh0RWRpdGFibGVDb2x1bW4obmV4dENlbGwpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kTmV4dEVkaXRhYmxlQ29sdW1uQnlJbmRleChjZWxsOiBFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBuZXh0Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50Py5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRSb3cpIHtcbiAgICAgICAgICAgIGxldCBuZXh0Q2VsbCA9IG5leHRSb3cuY2hpbGRyZW5baW5kZXhdO1xuXG4gICAgICAgICAgICBpZiAobmV4dENlbGwgJiYgRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0Q2VsbCwgJ3AtZWRpdGFibGUtY29sdW1uJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV4dENlbGw7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmaW5kUHJldkVkaXRhYmxlQ29sdW1uQnlJbmRleChjZWxsOiBFbGVtZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIGxldCBwcmV2Um93ID0gY2VsbC5wYXJlbnRFbGVtZW50Py5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChwcmV2Um93KSB7XG4gICAgICAgICAgICBsZXQgcHJldkNlbGwgPSBwcmV2Um93LmNoaWxkcmVuW2luZGV4XTtcblxuICAgICAgICAgICAgaWYgKHByZXZDZWxsICYmIERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkNlbGwsICdwLWVkaXRhYmxlLWNvbHVtbicpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXZDZWxsO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wRWRpdGFibGVDb2x1bW5EaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuZHQub3ZlcmxheVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BFZGl0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBFZGl0YWJsZVJvdyB7XG4gICAgQElucHV0KCdwRWRpdGFibGVSb3cnKSBkYXRhOiBhbnk7XG5cbiAgICBASW5wdXQoKSBwRWRpdGFibGVSb3dEaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIGlzRW5hYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMucEVkaXRhYmxlUm93RGlzYWJsZWQgIT09IHRydWU7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twSW5pdEVkaXRhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEluaXRFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LmluaXRSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSk7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufVxuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1twU2F2ZUVkaXRhYmxlUm93XScsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFNhdmVFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LnNhdmVSb3dFZGl0KHRoaXMuZWRpdGFibGVSb3cuZGF0YSwgdGhpcy5lZGl0YWJsZVJvdy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BDYW5jZWxFZGl0YWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBDYW5jZWxFZGl0YWJsZVJvdyB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVkaXRhYmxlUm93OiBFZGl0YWJsZVJvdykge31cblxuICAgIEBIb3N0TGlzdGVuZXIoJ2NsaWNrJywgWyckZXZlbnQnXSlcbiAgICBvbkNsaWNrKGV2ZW50OiBFdmVudCkge1xuICAgICAgICB0aGlzLmR0LmNhbmNlbFJvd0VkaXQodGhpcy5lZGl0YWJsZVJvdy5kYXRhKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1jZWxsRWRpdG9yJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiZWRpdGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cImlucHV0VGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZWRpdGluZ1wiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm91dHB1dFRlbXBsYXRlXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgIGAsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQ2VsbEVkaXRvciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIEBDb250ZW50Q2hpbGRyZW4oUHJpbWVUZW1wbGF0ZSkgdGVtcGxhdGVzOiBOdWxsYWJsZTxRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4+O1xuXG4gICAgaW5wdXRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBvdXRwdXRUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVDb2x1bW46IEVkaXRhYmxlQ29sdW1uLCBAT3B0aW9uYWwoKSBwdWJsaWMgZWRpdGFibGVSb3c6IEVkaXRhYmxlUm93KSB7fVxuXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xuICAgICAgICAodGhpcy50ZW1wbGF0ZXMgYXMgUXVlcnlMaXN0PFByaW1lVGVtcGxhdGU+KS5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnaW5wdXQnOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmlucHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ291dHB1dCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub3V0cHV0VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZ2V0IGVkaXRpbmcoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAodGhpcy5kdC5lZGl0aW5nQ2VsbCAmJiB0aGlzLmVkaXRhYmxlQ29sdW1uICYmIHRoaXMuZHQuZWRpdGluZ0NlbGwgPT09IHRoaXMuZWRpdGFibGVDb2x1bW4uZWwubmF0aXZlRWxlbWVudCkgfHwgKHRoaXMuZWRpdGFibGVSb3cgJiYgdGhpcy5kdC5lZGl0TW9kZSA9PT0gJ3JvdycgJiYgdGhpcy5kdC5pc1Jvd0VkaXRpbmcodGhpcy5lZGl0YWJsZVJvdy5kYXRhKSk7XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVSYWRpb0J1dHRvbicsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtcmFkaW9idXR0b24gcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLXJhZGlvYnV0dG9uLWZvY3VzZWQnOiBmb2N1c2VkLCAncC1yYWRpb2J1dHRvbi1jaGVja2VkJzogY2hlY2tlZCwgJ3AtcmFkaW9idXR0b24tZGlzYWJsZWQnOiBkaXNhYmxlZCB9XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI3JiIHR5cGU9XCJyYWRpb1wiIFthdHRyLmlkXT1cImlucHV0SWRcIiBbYXR0ci5uYW1lXT1cIm5hbWVcIiBbY2hlY2tlZF09XCJjaGVja2VkXCIgKGZvY3VzKT1cIm9uRm9jdXMoKVwiIChibHVyKT1cIm9uQmx1cigpXCIgW2Rpc2FibGVkXT1cImRpc2FibGVkXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIiBbdGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogJzAnXCIgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjYm94IFtuZ0NsYXNzXT1cInsgJ3AtcmFkaW9idXR0b24tYm94IHAtY29tcG9uZW50JzogdHJ1ZSwgJ3AtaGlnaGxpZ2h0JzogY2hlY2tlZCwgJ3AtZm9jdXMnOiBmb2N1c2VkLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIj5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1yYWRpb2J1dHRvbi1pY29uXCI+PC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZVJhZGlvQnV0dG9uIHtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKSBpbmRleDogbnVtYmVyIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgaW5wdXRJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbmFtZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBAVmlld0NoaWxkKCdyYicpIGlucHV0Vmlld0NoaWxkOiBOdWxsYWJsZTxFbGVtZW50UmVmPjtcblxuICAgIGNoZWNrZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBmb2N1c2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbCB8fCB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gKHRoaXMuY2hlY2tlZCA/IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2VsZWN0Um93IDogdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYS51bnNlbGVjdFJvdykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoUmFkaW8oXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHRoaXMuaW5wdXRWaWV3Q2hpbGQ/Lm5hdGl2ZUVsZW1lbnQ/LmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWZvY3VzZWQnOiBmb2N1c2VkLCAncC1jaGVja2JveC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIiAoY2xpY2spPVwib25DbGljaygkZXZlbnQpXCI+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1oaWRkZW4tYWNjZXNzaWJsZVwiPlxuICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5pZF09XCJpbnB1dElkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIubmFtZV09XCJuYW1lXCJcbiAgICAgICAgICAgICAgICAgICAgW2NoZWNrZWRdPVwiY2hlY2tlZFwiXG4gICAgICAgICAgICAgICAgICAgIChmb2N1cyk9XCJvbkZvY3VzKClcIlxuICAgICAgICAgICAgICAgICAgICAoYmx1cik9XCJvbkJsdXIoKVwiXG4gICAgICAgICAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICAgICAgICAgIFthdHRyLnJlcXVpcmVkXT1cInJlcXVpcmVkXCJcbiAgICAgICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgICAgICAgICAgICAgICAgICBbdGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogJzAnXCJcbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2ICNib3ggW25nQ2xhc3NdPVwieyAncC1jaGVja2JveC1ib3ggcC1jb21wb25lbnQnOiB0cnVlLCAncC1oaWdobGlnaHQnOiBjaGVja2VkLCAncC1mb2N1cyc6IGZvY3VzZWQsICdwLWRpc2FibGVkJzogZGlzYWJsZWQgfVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQuY2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiICpuZ0lmPVwiY2hlY2tlZFwiIC8+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJkdC5jaGVja2JveEljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJkdC5jaGVja2JveEljb25UZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGNoZWNrZWQgfVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgIGAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgICBob3N0OiB7XG4gICAgICAgIGNsYXNzOiAncC1lbGVtZW50J1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFibGVDaGVja2JveCB7XG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KCkgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHJlcXVpcmVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgYXJpYUxhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBjaGVja2VkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgZm9jdXNlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHVibGljIHRhYmxlU2VydmljZTogVGFibGVTZXJ2aWNlLCBwdWJsaWMgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMuc3Vic2NyaXB0aW9uID0gdGhpcy5kdC50YWJsZVNlcnZpY2Uuc2VsZWN0aW9uU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgICAgICAgICAgdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmFyaWFMYWJlbCB8fCB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhID8gKHRoaXMuY2hlY2tlZCA/IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEuc2VsZWN0Um93IDogdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYS51bnNlbGVjdFJvdykgOiB1bmRlZmluZWQ7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy5kdC5pc1NlbGVjdGVkKHRoaXMudmFsdWUpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dXaXRoQ2hlY2tib3goXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgcm93SW5kZXg6IHRoaXMuaW5kZXhcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVcbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgRG9tSGFuZGxlci5jbGVhclNlbGVjdGlvbigpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoKSB7XG4gICAgICAgIHRoaXMuZm9jdXNlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMuc3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtdGFibGVIZWFkZXJDaGVja2JveCcsXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPGRpdiBjbGFzcz1cInAtY2hlY2tib3ggcC1jb21wb25lbnRcIiBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWZvY3VzZWQnOiBmb2N1c2VkLCAncC1jaGVja2JveC1kaXNhYmxlZCc6IGlzRGlzYWJsZWQoKSB9XCIgKGNsaWNrKT1cIm9uQ2xpY2soJGV2ZW50KVwiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtaGlkZGVuLWFjY2Vzc2libGVcIj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2NiIHR5cGU9XCJjaGVja2JveFwiIFt0YWJpbmRleF09XCJkaXNhYmxlZCA/IG51bGwgOiAnMCdcIiBbYXR0ci5pZF09XCJpbnB1dElkXCIgW2F0dHIubmFtZV09XCJuYW1lXCIgW2NoZWNrZWRdPVwiY2hlY2tlZFwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFtkaXNhYmxlZF09XCJpc0Rpc2FibGVkKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFyaWFMYWJlbFwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgI2JveCBbbmdDbGFzc109XCJ7ICdwLWNoZWNrYm94LWJveCc6IHRydWUsICdwLWhpZ2hsaWdodCc6IGNoZWNrZWQsICdwLWZvY3VzJzogZm9jdXNlZCwgJ3AtZGlzYWJsZWQnOiBpc0Rpc2FibGVkKCkgfVwiPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhZHQuaGVhZGVyQ2hlY2tib3hJY29uVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgPENoZWNrSWNvbiAqbmdJZj1cImNoZWNrZWRcIiBbc3R5bGVDbGFzc109XCIncC1jaGVja2JveC1pY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwLWNoZWNrYm94LWljb25cIiAqbmdJZj1cImR0LmhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImR0LmhlYWRlckNoZWNrYm94SWNvblRlbXBsYXRlOyBjb250ZXh0OiB7ICRpbXBsaWNpdDogY2hlY2tlZCB9XCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZUhlYWRlckNoZWNrYm94IHtcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGlucHV0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIGFyaWFMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgY2hlY2tlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGZvY3VzZWQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBzZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcblxuICAgIHZhbHVlQ2hhbmdlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZHQ6IFRhYmxlLCBwdWJsaWMgdGFibGVTZXJ2aWNlOiBUYWJsZVNlcnZpY2UsIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnZhbHVlU291cmNlJC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5jaGVja2VkID0gdGhpcy51cGRhdGVDaGVja2VkU3RhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuYXJpYUxhYmVsID0gdGhpcy5hcmlhTGFiZWwgfHwgdGhpcy5kdC5jb25maWcudHJhbnNsYXRpb24uYXJpYSA/ICh0aGlzLmNoZWNrZWQgPyB0aGlzLmR0LmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLnNlbGVjdEFsbCA6IHRoaXMuZHQuY29uZmlnLnRyYW5zbGF0aW9uLmFyaWEudW5zZWxlY3RBbGwpIDogdW5kZWZpbmVkO1xuICAgICAgICB9KTtcblxuICAgICAgICB0aGlzLnNlbGVjdGlvbkNoYW5nZVN1YnNjcmlwdGlvbiA9IHRoaXMuZHQudGFibGVTZXJ2aWNlLnNlbGVjdGlvblNvdXJjZSQuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuY2hlY2tlZCA9IHRoaXMudXBkYXRlQ2hlY2tlZFN0YXRlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmNoZWNrZWQgPSB0aGlzLnVwZGF0ZUNoZWNrZWRTdGF0ZSgpO1xuICAgIH1cblxuICAgIG9uQ2xpY2soZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZHQudmFsdWUgJiYgdGhpcy5kdC52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kdC50b2dnbGVSb3dzV2l0aENoZWNrYm94KGV2ZW50LCAhdGhpcy5jaGVja2VkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIERvbUhhbmRsZXIuY2xlYXJTZWxlY3Rpb24oKTtcbiAgICB9XG5cbiAgICBvbkZvY3VzKCkge1xuICAgICAgICB0aGlzLmZvY3VzZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIG9uQmx1cigpIHtcbiAgICAgICAgdGhpcy5mb2N1c2VkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNEaXNhYmxlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuZHQudmFsdWUgfHwgIXRoaXMuZHQudmFsdWUubGVuZ3RoO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb25DaGFuZ2VTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uQ2hhbmdlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy52YWx1ZUNoYW5nZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdXBkYXRlQ2hlY2tlZFN0YXRlKCkge1xuICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuXG4gICAgICAgIGlmICh0aGlzLmR0Ll9zZWxlY3RBbGwgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmR0Ll9zZWxlY3RBbGw7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBkYXRhID0gdGhpcy5kdC5zZWxlY3Rpb25QYWdlT25seSA/IHRoaXMuZHQuZGF0YVRvUmVuZGVyKHRoaXMuZHQucHJvY2Vzc2VkRGF0YSkgOiB0aGlzLmR0LnByb2Nlc3NlZERhdGE7XG4gICAgICAgICAgICBjb25zdCB2YWwgPSB0aGlzLmR0LmZyb3plblZhbHVlID8gWy4uLnRoaXMuZHQuZnJvemVuVmFsdWUsIC4uLmRhdGFdIDogZGF0YTtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGFibGVWYWwgPSB0aGlzLmR0LnJvd1NlbGVjdGFibGUgPyB2YWwuZmlsdGVyKChkYXRhOiBhbnksIGluZGV4OiBudW1iZXIpID0+IHRoaXMuZHQucm93U2VsZWN0YWJsZSh7IGRhdGEsIGluZGV4IH0pKSA6IHZhbDtcblxuICAgICAgICAgICAgcmV0dXJuIE9iamVjdFV0aWxzLmlzTm90RW1wdHkoc2VsZWN0YWJsZVZhbCkgJiYgT2JqZWN0VXRpbHMuaXNOb3RFbXB0eSh0aGlzLmR0LnNlbGVjdGlvbikgJiYgc2VsZWN0YWJsZVZhbC5ldmVyeSgodjogYW55KSA9PiB0aGlzLmR0LnNlbGVjdGlvbi5zb21lKChzOiBhbnkpID0+IHRoaXMuZHQuZXF1YWxzKHYsIHMpKSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZW9yZGVyYWJsZVJvd0hhbmRsZV0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVJvd0hhbmRsZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBlbDogRWxlbWVudFJlZikge31cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdwLWRhdGF0YWJsZS1yZW9yZGVyYWJsZXJvdy1oYW5kbGUnKTtcbiAgICB9XG59XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3BSZW9yZGVyYWJsZVJvd10nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgY2xhc3M6ICdwLWVsZW1lbnQnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBSZW9yZGVyYWJsZVJvdyBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICAgIEBJbnB1dCgncFJlb3JkZXJhYmxlUm93JykgaW5kZXg6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHBSZW9yZGVyYWJsZVJvd0Rpc2FibGVkOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgbW91c2VEb3duTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdTdGFydExpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkcmFnRW5kTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRyYWdMZWF2ZUxpc3RlbmVyOiBWb2lkTGlzdGVuZXI7XG5cbiAgICBkcm9wTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHVibGljIGR0OiBUYWJsZSwgcHVibGljIGVsOiBFbGVtZW50UmVmLCBwdWJsaWMgem9uZTogTmdab25lKSB7fVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSkge1xuICAgICAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyb3BwYWJsZSA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRFdmVudHMoKSB7XG4gICAgICAgIHRoaXMuem9uZS5ydW5PdXRzaWRlQW5ndWxhcigoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLm1vdXNlRG93bkxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnbW91c2Vkb3duJywgdGhpcy5vbk1vdXNlRG93bi5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnU3RhcnRMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdzdGFydCcsIHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSk7XG5cbiAgICAgICAgICAgIHRoaXMuZHJhZ0VuZExpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5lbC5uYXRpdmVFbGVtZW50LCAnZHJhZ2VuZCcsIHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsICdkcmFnb3ZlcicsIHRoaXMub25EcmFnT3Zlci5iaW5kKHRoaXMpKTtcblxuICAgICAgICAgICAgdGhpcy5kcmFnTGVhdmVMaXN0ZW5lciA9IHRoaXMucmVuZGVyZXIubGlzdGVuKHRoaXMuZWwubmF0aXZlRWxlbWVudCwgJ2RyYWdsZWF2ZScsIHRoaXMub25EcmFnTGVhdmUuYmluZCh0aGlzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHVuYmluZEV2ZW50cygpIHtcbiAgICAgICAgaWYgKHRoaXMubW91c2VEb3duTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMubW91c2VEb3duTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ1N0YXJ0TGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0VuZExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRyYWdFbmRMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kcmFnRW5kTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ092ZXJMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRyYWdPdmVyTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIoKTtcbiAgICAgICAgICAgIHRoaXMuZHJhZ0xlYXZlTGlzdGVuZXIgPSBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIGlmIChEb21IYW5kbGVyLmhhc0NsYXNzKGV2ZW50LnRhcmdldCwgJ3AtZGF0YXRhYmxlLXJlb3JkZXJhYmxlcm93LWhhbmRsZScpKSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gdHJ1ZTtcbiAgICAgICAgZWxzZSB0aGlzLmVsLm5hdGl2ZUVsZW1lbnQuZHJhZ2dhYmxlID0gZmFsc2U7XG4gICAgfVxuXG4gICAgb25EcmFnU3RhcnQoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICB0aGlzLmR0Lm9uUm93RHJhZ1N0YXJ0KGV2ZW50LCA8bnVtYmVyPnRoaXMuaW5kZXgpO1xuICAgIH1cblxuICAgIG9uRHJhZ0VuZChldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnRW5kKGV2ZW50KTtcbiAgICAgICAgdGhpcy5lbC5uYXRpdmVFbGVtZW50LmRyYWdnYWJsZSA9IGZhbHNlO1xuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICB0aGlzLmR0Lm9uUm93RHJhZ092ZXIoZXZlbnQsIDxudW1iZXI+dGhpcy5pbmRleCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbkRyYWdMZWF2ZShldmVudDogRHJhZ0V2ZW50KSB7XG4gICAgICAgIHRoaXMuZHQub25Sb3dEcmFnTGVhdmUoZXZlbnQsIHRoaXMuZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgaXNFbmFibGVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5wUmVvcmRlcmFibGVSb3dEaXNhYmxlZCAhPT0gdHJ1ZTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdkcm9wJywgWyckZXZlbnQnXSlcbiAgICBvbkRyb3AoZXZlbnQ6IERyYWdFdmVudCkge1xuICAgICAgICBpZiAodGhpcy5pc0VuYWJsZWQoKSAmJiB0aGlzLmR0LnJvd0RyYWdnaW5nKSB7XG4gICAgICAgICAgICB0aGlzLmR0Lm9uUm93RHJvcChldmVudCwgdGhpcy5lbC5uYXRpdmVFbGVtZW50KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKSB7XG4gICAgICAgIHRoaXMudW5iaW5kRXZlbnRzKCk7XG4gICAgfVxufVxuLyoqXG4gKiBDb2x1bW4gRmlsdGVyIGVsZW1lbnQgb2YgVGFibGUuXG4gKiBAZ3JvdXAgQ29tcG9uZW50c1xuICovXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sdW1uRmlsdGVyJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyXCIgW25nQ2xhc3NdPVwieyAncC1jb2x1bW4tZmlsdGVyLXJvdyc6IGRpc3BsYXkgPT09ICdyb3cnLCAncC1jb2x1bW4tZmlsdGVyLW1lbnUnOiBkaXNwbGF5ID09PSAnbWVudScgfVwiPlxuICAgICAgICAgICAgPHAtY29sdW1uRmlsdGVyRm9ybUVsZW1lbnRcbiAgICAgICAgICAgICAgICAqbmdJZj1cImRpc3BsYXkgPT09ICdyb3cnXCJcbiAgICAgICAgICAgICAgICBjbGFzcz1cInAtZmx1aWRcIlxuICAgICAgICAgICAgICAgIFt0eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgICAgIFtmaWVsZF09XCJmaWVsZFwiXG4gICAgICAgICAgICAgICAgW2ZpbHRlckNvbnN0cmFpbnRdPVwiZHQuZmlsdGVyc1tmaWVsZF1cIlxuICAgICAgICAgICAgICAgIFtmaWx0ZXJUZW1wbGF0ZV09XCJmaWx0ZXJUZW1wbGF0ZVwiXG4gICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgIFttYXhGcmFjdGlvbkRpZ2l0c109XCJtYXhGcmFjdGlvbkRpZ2l0c1wiXG4gICAgICAgICAgICAgICAgW3ByZWZpeF09XCJwcmVmaXhcIlxuICAgICAgICAgICAgICAgIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICBbbG9jYWxlXT1cImxvY2FsZVwiXG4gICAgICAgICAgICAgICAgW2xvY2FsZU1hdGNoZXJdPVwibG9jYWxlTWF0Y2hlclwiXG4gICAgICAgICAgICAgICAgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICBbY3VycmVuY3lEaXNwbGF5XT1cImN1cnJlbmN5RGlzcGxheVwiXG4gICAgICAgICAgICAgICAgW3VzZUdyb3VwaW5nXT1cInVzZUdyb3VwaW5nXCJcbiAgICAgICAgICAgICAgICBbc2hvd0J1dHRvbnNdPVwic2hvd0J1dHRvbnNcIlxuICAgICAgICAgICAgPjwvcC1jb2x1bW5GaWx0ZXJGb3JtRWxlbWVudD5cbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAjaWNvblxuICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd01lbnVCdXR0b25cIlxuICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLW1lbnUtYnV0dG9uIHAtbGlua1wiXG4gICAgICAgICAgICAgICAgYXJpYS1oYXNwb3B1cD1cInRydWVcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbGFiZWxdPVwiZmlsdGVyTWVudUJ1dHRvbkFyaWFMYWJlbFwiXG4gICAgICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJvdmVybGF5SWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtZXhwYW5kZWRdPVwib3ZlcmxheVZpc2libGVcIlxuICAgICAgICAgICAgICAgIFtuZ0NsYXNzXT1cInsgJ3AtY29sdW1uLWZpbHRlci1tZW51LWJ1dHRvbi1vcGVuJzogb3ZlcmxheVZpc2libGUsICdwLWNvbHVtbi1maWx0ZXItbWVudS1idXR0b24tYWN0aXZlJzogaGFzRmlsdGVyKCkgfVwiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cInRvZ2dsZU1lbnUoKVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24pPVwib25Ub2dnbGVCdXR0b25LZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxGaWx0ZXJJY29uIFtzdHlsZUNsYXNzXT1cIidwaS1maWx0ZXItaWNvbidcIiAqbmdJZj1cIiFmaWx0ZXJJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicGktZmlsdGVyLWljb25cIiAqbmdJZj1cImZpbHRlckljb25UZW1wbGF0ZVwiPlxuICAgICAgICAgICAgICAgICAgICA8bmctdGVtcGxhdGUgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgPGJ1dHRvbiAjaWNvbiAqbmdJZj1cInNob3dDbGVhckJ1dHRvbiAmJiBkaXNwbGF5ID09PSAncm93J1wiIFtuZ0NsYXNzXT1cInsgJ3AtaGlkZGVuLXNwYWNlJzogIWhhc1Jvd0ZpbHRlcigpIH1cIiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY2xlYXItYnV0dG9uIHAtbGlua1wiIChjbGljayk9XCJjbGVhckZpbHRlcigpXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJjbGVhckJ1dHRvbkxhYmVsXCI+XG4gICAgICAgICAgICAgICAgPEZpbHRlclNsYXNoSWNvbiAqbmdJZj1cIiFjbGVhckZpbHRlckljb25UZW1wbGF0ZVwiIC8+XG4gICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2xlYXJGaWx0ZXJJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93TWVudSAmJiBvdmVybGF5VmlzaWJsZVwiXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1jb2x1bW4tZmlsdGVyLW92ZXJsYXkgcC1jb21wb25lbnQgcC1mbHVpZCc6IHRydWUsICdwLWNvbHVtbi1maWx0ZXItb3ZlcmxheS1tZW51JzogZGlzcGxheSA9PT0gJ21lbnUnIH1cIlxuICAgICAgICAgICAgICAgIFtpZF09XCJvdmVybGF5SWRcIlxuICAgICAgICAgICAgICAgIFthdHRyLmFyaWEtbW9kYWxdPVwidHJ1ZVwiXG4gICAgICAgICAgICAgICAgcm9sZT1cImRpYWxvZ1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQ29udGVudENsaWNrKClcIlxuICAgICAgICAgICAgICAgIFtAb3ZlcmxheUFuaW1hdGlvbl09XCIndmlzaWJsZSdcIlxuICAgICAgICAgICAgICAgIChAb3ZlcmxheUFuaW1hdGlvbi5zdGFydCk9XCJvbk92ZXJsYXlBbmltYXRpb25TdGFydCgkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAoQG92ZXJsYXlBbmltYXRpb24uZG9uZSk9XCJvbk92ZXJsYXlBbmltYXRpb25FbmQoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgKGtleWRvd24uZXNjYXBlKT1cIm9uRXNjYXBlKClcIlxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJoZWFkZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICA8dWwgKm5nSWY9XCJkaXNwbGF5ID09PSAncm93JzsgZWxzZSBtZW51XCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1zXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaVxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1cIlxuICAgICAgICAgICAgICAgICAgICAgICAgKm5nRm9yPVwibGV0IG1hdGNoTW9kZSBvZiBtYXRjaE1vZGVzOyBsZXQgaSA9IGluZGV4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJvblJvd01hdGNoTW9kZUNoYW5nZShtYXRjaE1vZGUudmFsdWUpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uUm93TWF0Y2hNb2RlS2V5RG93bigkZXZlbnQpXCJcbiAgICAgICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInRoaXMub25Sb3dNYXRjaE1vZGVDaGFuZ2UobWF0Y2hNb2RlLnZhbHVlKVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWhpZ2hsaWdodCc6IGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlLnZhbHVlKSB9XCJcbiAgICAgICAgICAgICAgICAgICAgICAgIFthdHRyLnRhYmluZGV4XT1cImkgPT09IDAgPyAnMCcgOiBudWxsXCJcbiAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge3sgbWF0Y2hNb2RlLmxhYmVsIH19XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1zZXBhcmF0b3JcIj48L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItcm93LWl0ZW1cIiAoY2xpY2spPVwib25Sb3dDbGVhckl0ZW1DbGljaygpXCIgKGtleWRvd24pPVwib25Sb3dNYXRjaE1vZGVLZXlEb3duKCRldmVudClcIiAoa2V5ZG93bi5lbnRlcik9XCJvblJvd0NsZWFySXRlbUNsaWNrKClcIj57eyBub0ZpbHRlckxhYmVsIH19PC9saT5cbiAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjbWVudT5cbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtY29sdW1uLWZpbHRlci1vcGVyYXRvclwiICpuZ0lmPVwiaXNTaG93T3BlcmF0b3JcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxwLWRyb3Bkb3duIFtvcHRpb25zXT1cIm9wZXJhdG9yT3B0aW9uc1wiIFtuZ01vZGVsXT1cIm9wZXJhdG9yXCIgKG5nTW9kZWxDaGFuZ2UpPVwib25PcGVyYXRvckNoYW5nZSgkZXZlbnQpXCIgc3R5bGVDbGFzcz1cInAtY29sdW1uLWZpbHRlci1vcGVyYXRvci1kcm9wZG93blwiPjwvcC1kcm9wZG93bj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY29uc3RyYWludHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nRm9yPVwibGV0IGZpZWxkQ29uc3RyYWludCBvZiBmaWVsZENvbnN0cmFpbnRzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItY29uc3RyYWludFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWRyb3Bkb3duXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICpuZ0lmPVwic2hvd01hdGNoTW9kZXMgJiYgbWF0Y2hNb2Rlc1wiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtvcHRpb25zXT1cIm1hdGNoTW9kZXNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJmaWVsZENvbnN0cmFpbnQubWF0Y2hNb2RlXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKG5nTW9kZWxDaGFuZ2UpPVwib25NZW51TWF0Y2hNb2RlQ2hhbmdlKCRldmVudCwgZmllbGRDb25zdHJhaW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlQ2xhc3M9XCJwLWNvbHVtbi1maWx0ZXItbWF0Y2htb2RlLWRyb3Bkb3duXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA+PC9wLWRyb3Bkb3duPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwLWNvbHVtbkZpbHRlckZvcm1FbGVtZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFt0eXBlXT1cInR5cGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmllbGRdPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyQ29uc3RyYWludF09XCJmaWVsZENvbnN0cmFpbnRcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbZmlsdGVyVGVtcGxhdGVdPVwiZmlsdGVyVGVtcGxhdGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbWF4RnJhY3Rpb25EaWdpdHNdPVwibWF4RnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbcHJlZml4XT1cInByZWZpeFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbG9jYWxlTWF0Y2hlcl09XCJsb2NhbGVNYXRjaGVyXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5RGlzcGxheV09XCJjdXJyZW5jeURpc3BsYXlcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbdXNlR3JvdXBpbmddPVwidXNlR3JvdXBpbmdcIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID48L3AtY29sdW1uRmlsdGVyRm9ybUVsZW1lbnQ+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKm5nSWY9XCJzaG93UmVtb3ZlSWNvblwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBCdXR0b25cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24gcC1idXR0b24tdGV4dCBwLWJ1dHRvbi1kYW5nZXIgcC1idXR0b24tc21cIlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGNsaWNrKT1cInJlbW92ZUNvbnN0cmFpbnQoZmllbGRDb25zdHJhaW50KVwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbYXR0ci5hcmlhLWxhYmVsXT1cInJlbW92ZVJ1bGVCdXR0b25MYWJlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBbbGFiZWxdPVwicmVtb3ZlUnVsZUJ1dHRvbkxhYmVsXCJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRyYXNoSWNvbiAqbmdJZj1cIiFyZW1vdmVSdWxlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwicmVtb3ZlUnVsZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1ydWxlXCIgKm5nSWY9XCJpc1Nob3dBZGRDb25zdHJhaW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBwQnV0dG9uIFtsYWJlbF09XCJhZGRSdWxlQnV0dG9uTGFiZWxcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImFkZFJ1bGVCdXR0b25MYWJlbFwiIGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWFkZC1idXR0b24gcC1idXR0b24tdGV4dCBwLWJ1dHRvbi1zbVwiIChjbGljayk9XCJhZGRDb25zdHJhaW50KClcIiBwUmlwcGxlPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxQbHVzSWNvbiAqbmdJZj1cIiFhZGRSdWxlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImFkZFJ1bGVJY29uVGVtcGxhdGVcIj48L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1jb2x1bW4tZmlsdGVyLWJ1dHRvbmJhclwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiAjY2xlYXJCdG4gKm5nSWY9XCJzaG93Q2xlYXJCdXR0b25cIiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiBjbGFzcz1cInAtYnV0dG9uLW91dGxpbmVkIHAtYnV0dG9uLXNtXCIgKGNsaWNrKT1cImNsZWFyRmlsdGVyKClcIiBbYXR0ci5hcmlhLWxhYmVsXT1cImNsZWFyQnV0dG9uTGFiZWxcIiBbbGFiZWxdPVwiY2xlYXJCdXR0b25MYWJlbFwiIHBSaXBwbGU+PC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uICpuZ0lmPVwic2hvd0FwcGx5QnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIHBCdXR0b24gKGNsaWNrKT1cImFwcGx5RmlsdGVyKClcIiBjbGFzcz1cInAtYnV0dG9uLXNtXCIgW2xhYmVsXT1cImFwcGx5QnV0dG9uTGFiZWxcIiBwUmlwcGxlIFthdHRyLmFyaWEtbGFiZWxdPVwiYXBwbHlCdXR0b25MYWJlbFwiPjwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L25nLXRlbXBsYXRlPlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJmb290ZXJUZW1wbGF0ZTsgY29udGV4dDogeyAkaW1wbGljaXQ6IGZpZWxkIH1cIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICBgLFxuICAgIGFuaW1hdGlvbnM6IFt0cmlnZ2VyKCdvdmVybGF5QW5pbWF0aW9uJywgW3RyYW5zaXRpb24oJzplbnRlcicsIFtzdHlsZSh7IG9wYWNpdHk6IDAsIHRyYW5zZm9ybTogJ3NjYWxlWSgwLjgpJyB9KSwgYW5pbWF0ZSgnLjEycyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKScpXSksIHRyYW5zaXRpb24oJzpsZWF2ZScsIFthbmltYXRlKCcuMXMgbGluZWFyJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKV0pXSldLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkZpbHRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQge1xuICAgIC8qKlxuICAgICAqIFByb3BlcnR5IHJlcHJlc2VudGVkIGJ5IHRoZSBjb2x1bW4uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZmllbGQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBUeXBlIG9mIHRoZSBpbnB1dC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB0eXBlOiBzdHJpbmcgPSAndGV4dCc7XG4gICAgLyoqXG4gICAgICogRmlsdGVyIGRpc3BsYXkuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgZGlzcGxheTogc3RyaW5nID0gJ3Jvdyc7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgZmlsdGVyIG1lbnUgcG9wdXAuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd01lbnU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBtYXRjaCBtb2RlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1hdGNoTW9kZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBvcGVyYXRvci5cbiAgICAgKiBAZGVmYXVsdFZhbHVlICdBTkQnXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgb3BlcmF0b3I6IHN0cmluZyA9IEZpbHRlck9wZXJhdG9yLkFORDtcbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIHdoZXRoZXIgdG8gZGlzcGxheSBmaWx0ZXIgb3BlcmF0b3IuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd09wZXJhdG9yOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWNpZGVzIHdoZXRoZXIgdG8gZGlzcGxheSBjbGVhciBmaWx0ZXIgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDbGVhckJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgYXBwbHkgZmlsdGVyIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93QXBwbHlCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlY2lkZXMgd2hldGhlciB0byBkaXNwbGF5IGZpbHRlciBtYXRjaCBtb2Rlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzaG93TWF0Y2hNb2RlczogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGRpc3BsYXkgYWRkIGZpbHRlciBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0FkZEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogRGVjaWRlcyB3aGV0aGVyIHRvIGNsb3NlIHBvcHVwIG9uIGNsZWFyIGJ1dHRvbiBjbGljay5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoaWRlT25DbGVhcjogYm9vbGVhbiA9IGZhbHNlO1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBwbGFjZWhvbGRlci5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIEZpbHRlciBtYXRjaCBtb2RlIG9wdGlvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF0Y2hNb2RlT3B0aW9uczogU2VsZWN0SXRlbVtdIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgbWF4aW11bSBhbW91bnQgb2YgY29uc3RyYWludHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4Q29uc3RyYWludHM6IG51bWJlciA9IDI7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBtaW5pbXVtIGZyYWN0aW9uIG9mIGRpZ2l0cy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtaW5GcmFjdGlvbkRpZ2l0czogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgbWF4aW11bSBmcmFjdGlvbiBvZiBkaWdpdHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbWF4RnJhY3Rpb25EaWdpdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHByZWZpeCBvZiB0aGUgZmlsdGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHByZWZpeDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgc3VmZml4IG9mIHRoZSBmaWx0ZXIuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc3VmZml4OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBmaWx0ZXIgbG9jYWxlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvY2FsZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgZmlsdGVyIGxvY2FsZSBtYXRjaGVyLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGxvY2FsZU1hdGNoZXI6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBFbmFibGVzIGN1cnJlbmN5IGlucHV0LlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGN1cnJlbmN5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyB0aGUgZGlzcGxheSBvZiB0aGUgY3VycmVuY3kgaW5wdXQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY3VycmVuY3lEaXNwbGF5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogRGVmaW5lcyBpZiBmaWx0ZXIgZ3JvdXBpbmcgd2lsbCBiZSBlbmFibGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVzZUdyb3VwaW5nOiBib29sZWFuID0gdHJ1ZTtcbiAgICAvKipcbiAgICAgKiBEZWZpbmVzIHRoZSB2aXNpYmlsaXR5IG9mIGJ1dHRvbnMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd0J1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgQFZpZXdDaGlsZCgnaWNvbicpIGljb246IE51bGxhYmxlPEVsZW1lbnRSZWY+O1xuXG4gICAgQFZpZXdDaGlsZCgnY2xlYXJCdG4nKSBjbGVhckJ1dHRvblZpZXdDaGlsZDogTnVsbGFibGU8RWxlbWVudFJlZj47XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFByaW1lVGVtcGxhdGUpIHRlbXBsYXRlczogTnVsbGFibGU8UXVlcnlMaXN0PGFueT4+O1xuXG4gICAgb3ZlcmxheVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgaGVhZGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZm9vdGVyVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgZmlsdGVySWNvblRlbXBsYXRlOiBOdWxsYWJsZTxUZW1wbGF0ZVJlZjxhbnk+PjtcblxuICAgIHJlbW92ZVJ1bGVJY29uVGVtcGxhdGU6IE51bGxhYmxlPFRlbXBsYXRlUmVmPGFueT4+O1xuXG4gICAgYWRkUnVsZUljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBjbGVhckZpbHRlckljb25UZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBvcGVyYXRvck9wdGlvbnM6IGFueVtdIHwgdW5kZWZpbmVkO1xuXG4gICAgb3ZlcmxheVZpc2libGU6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG5cbiAgICBvdmVybGF5OiBIVE1MRWxlbWVudCB8IHVuZGVmaW5lZCB8IG51bGw7XG5cbiAgICBzY3JvbGxIYW5kbGVyOiBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlciB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgICBkb2N1bWVudENsaWNrTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGRvY3VtZW50UmVzaXplTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIG1hdGNoTW9kZXM6IFNlbGVjdEl0ZW1bXSB8IHVuZGVmaW5lZDtcblxuICAgIHRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gfCB1bmRlZmluZWQ7XG5cbiAgICByZXNldFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uIHwgdW5kZWZpbmVkO1xuXG4gICAgc2VsZkNsaWNrOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuXG4gICAgb3ZlcmxheUV2ZW50TGlzdGVuZXI6IGFueTtcblxuICAgIHByaXZhdGUgd2luZG93OiBXaW5kb3c7XG5cbiAgICBvdmVybGF5SWQ6IGFueTtcblxuICAgIGdldCBmaWVsZENvbnN0cmFpbnRzKCk6IEZpbHRlck1ldGFkYXRhW10gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZHQuZmlsdGVycyA/IDxGaWx0ZXJNZXRhZGF0YVtdPnRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdIDogbnVsbDtcbiAgICB9XG5cbiAgICBnZXQgc2hvd1JlbW92ZUljb24oKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmZpZWxkQ29uc3RyYWludHMgPyB0aGlzLmZpZWxkQ29uc3RyYWludHMubGVuZ3RoID4gMSA6IGZhbHNlO1xuICAgIH1cblxuICAgIGdldCBzaG93TWVudUJ1dHRvbigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd01lbnUgJiYgKHRoaXMuZGlzcGxheSA9PT0gJ3JvdycgPyB0aGlzLnR5cGUgIT09ICdib29sZWFuJyA6IHRydWUpO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dPcGVyYXRvcigpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd09wZXJhdG9yICYmIHRoaXMudHlwZSAhPT0gJ2Jvb2xlYW4nO1xuICAgIH1cblxuICAgIGdldCBpc1Nob3dBZGRDb25zdHJhaW50KCk6IGJvb2xlYW4gfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc2hvd0FkZEJ1dHRvbiAmJiB0aGlzLnR5cGUgIT09ICdib29sZWFuJyAmJiB0aGlzLmZpZWxkQ29uc3RyYWludHMgJiYgdGhpcy5maWVsZENvbnN0cmFpbnRzLmxlbmd0aCA8IHRoaXMubWF4Q29uc3RyYWludHM7XG4gICAgfVxuXG4gICAgZ2V0IHNob3dNZW51QnV0dG9uTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuU0hPV19GSUxURVJfTUVOVSk7XG4gICAgfVxuXG4gICAgZ2V0IGFwcGx5QnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5BUFBMWSk7XG4gICAgfVxuXG4gICAgZ2V0IGNsZWFyQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5DTEVBUik7XG4gICAgfVxuXG4gICAgZ2V0IGFkZFJ1bGVCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLkFERF9SVUxFKTtcbiAgICB9XG5cbiAgICBnZXQgcmVtb3ZlUnVsZUJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuUkVNT1ZFX1JVTEUpO1xuICAgIH1cblxuICAgIGdldCBub0ZpbHRlckxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTk9fRklMVEVSKTtcbiAgICB9XG5cbiAgICBnZXQgZmlsdGVyTWVudUJ1dHRvbkFyaWFMYWJlbCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uID8gKHRoaXMub3ZlcmxheVZpc2libGUgPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmhpZGVGaWx0ZXJNZW51IDogdGhpcy5jb25maWcudHJhbnNsYXRpb24uYXJpYS5zaG93RmlsdGVyTWVudSkgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IHJlbW92ZVJ1bGVCdXR0b25BcmlhTGFiZWwoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbiA/IHRoaXMuY29uZmlnLnRyYW5zbGF0aW9uLnJlbW92ZVJ1bGUgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZ2V0IGZpbHRlck9wZXJhdG9yQXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24gPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmZpbHRlck9wZXJhdG9yIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGdldCBmaWx0ZXJDb25zdHJhaW50QXJpYUxhYmVsKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5jb25maWcudHJhbnNsYXRpb24gPyB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbi5hcmlhLmZpbHRlckNvbnN0cmFpbnQgOiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IoQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBkb2N1bWVudDogRG9jdW1lbnQsIHB1YmxpYyBlbDogRWxlbWVudFJlZiwgcHVibGljIGR0OiBUYWJsZSwgcHVibGljIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWcsIHB1YmxpYyBvdmVybGF5U2VydmljZTogT3ZlcmxheVNlcnZpY2UsIHByaXZhdGUgY2Q6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgICAgIHRoaXMud2luZG93ID0gdGhpcy5kb2N1bWVudC5kZWZhdWx0VmlldyBhcyBXaW5kb3c7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheUlkID0gVW5pcXVlQ29tcG9uZW50SWQoKTtcbiAgICAgICAgaWYgKCF0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkge1xuICAgICAgICAgICAgdGhpcy5pbml0RmllbGRGaWx0ZXJDb25zdHJhaW50KCk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uID0gdGhpcy5jb25maWcudHJhbnNsYXRpb25PYnNlcnZlci5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZU1hdGNoTW9kZU9wdGlvbnMoKTtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVPcGVyYXRvck9wdGlvbnMoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5nZW5lcmF0ZU1hdGNoTW9kZU9wdGlvbnMoKTtcbiAgICAgICAgdGhpcy5nZW5lcmF0ZU9wZXJhdG9yT3B0aW9ucygpO1xuICAgIH1cblxuICAgIGdlbmVyYXRlTWF0Y2hNb2RlT3B0aW9ucygpIHtcbiAgICAgICAgdGhpcy5tYXRjaE1vZGVzID1cbiAgICAgICAgICAgIHRoaXMubWF0Y2hNb2RlT3B0aW9ucyB8fFxuICAgICAgICAgICAgKHRoaXMuY29uZmlnIGFzIGFueSkuZmlsdGVyTWF0Y2hNb2RlT3B0aW9uc1t0aGlzLnR5cGVdPy5tYXAoKGtleTogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHsgbGFiZWw6IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKGtleSksIHZhbHVlOiBrZXkgfTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGdlbmVyYXRlT3BlcmF0b3JPcHRpb25zKCkge1xuICAgICAgICB0aGlzLm9wZXJhdG9yT3B0aW9ucyA9IFtcbiAgICAgICAgICAgIHsgbGFiZWw6IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5NQVRDSF9BTEwpLCB2YWx1ZTogRmlsdGVyT3BlcmF0b3IuQU5EIH0sXG4gICAgICAgICAgICB7IGxhYmVsOiB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuTUFUQ0hfQU5ZKSwgdmFsdWU6IEZpbHRlck9wZXJhdG9yLk9SIH1cbiAgICAgICAgXTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgICh0aGlzLnRlbXBsYXRlcyBhcyBRdWVyeUxpc3Q8UHJpbWVUZW1wbGF0ZT4pLmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHN3aXRjaCAoaXRlbS5nZXRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlICdoZWFkZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhlYWRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZpbHRlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmb290ZXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmZvb3RlclRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdmaWx0ZXJpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NsZWFyZmlsdGVyaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJGaWx0ZXJJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3JlbW92ZXJ1bGVpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVSdWxlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdhZGRydWxlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkUnVsZUljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWx0ZXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBpbml0RmllbGRGaWx0ZXJDb25zdHJhaW50KCkge1xuICAgICAgICBsZXQgZGVmYXVsdE1hdGNoTW9kZSA9IHRoaXMuZ2V0RGVmYXVsdE1hdGNoTW9kZSgpO1xuICAgICAgICB0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSA9IHRoaXMuZGlzcGxheSA9PSAncm93JyA/IHsgdmFsdWU6IG51bGwsIG1hdGNoTW9kZTogZGVmYXVsdE1hdGNoTW9kZSB9IDogW3sgdmFsdWU6IG51bGwsIG1hdGNoTW9kZTogZGVmYXVsdE1hdGNoTW9kZSwgb3BlcmF0b3I6IHRoaXMub3BlcmF0b3IgfV07XG4gICAgfVxuXG4gICAgb25NZW51TWF0Y2hNb2RlQ2hhbmdlKHZhbHVlOiBhbnksIGZpbHRlck1ldGE6IEZpbHRlck1ldGFkYXRhKSB7XG4gICAgICAgIGZpbHRlck1ldGEubWF0Y2hNb2RlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKCF0aGlzLnNob3dBcHBseUJ1dHRvbikge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd01hdGNoTW9kZUNoYW5nZShtYXRjaE1vZGU6IHN0cmluZykge1xuICAgICAgICAoPEZpbHRlck1ldGFkYXRhPnRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdKS5tYXRjaE1vZGUgPSBtYXRjaE1vZGU7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBvblJvd01hdGNoTW9kZUtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgbGV0IGl0ZW0gPSA8SFRNTExJRWxlbWVudD5ldmVudC50YXJnZXQ7XG5cbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgdmFyIG5leHRJdGVtID0gdGhpcy5maW5kTmV4dEl0ZW0oaXRlbSk7XG4gICAgICAgICAgICAgICAgaWYgKG5leHRJdGVtKSB7XG4gICAgICAgICAgICAgICAgICAgIGl0ZW0ucmVtb3ZlQXR0cmlidXRlKCd0YWJpbmRleCcpO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SXRlbS50YWJJbmRleCA9ICcwJztcbiAgICAgICAgICAgICAgICAgICAgbmV4dEl0ZW0uZm9jdXMoKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICdBcnJvd1VwJzpcbiAgICAgICAgICAgICAgICB2YXIgcHJldkl0ZW0gPSB0aGlzLmZpbmRQcmV2SXRlbShpdGVtKTtcbiAgICAgICAgICAgICAgICBpZiAocHJldkl0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ3RhYmluZGV4Jyk7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJdGVtLnRhYkluZGV4ID0gJzAnO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SXRlbS5mb2N1cygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblJvd0NsZWFySXRlbUNsaWNrKCkge1xuICAgICAgICB0aGlzLmNsZWFyRmlsdGVyKCk7XG4gICAgICAgIHRoaXMuaGlkZSgpO1xuICAgIH1cblxuICAgIGlzUm93TWF0Y2hNb2RlU2VsZWN0ZWQobWF0Y2hNb2RlOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuICg8RmlsdGVyTWV0YWRhdGE+dGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0pLm1hdGNoTW9kZSA9PT0gbWF0Y2hNb2RlO1xuICAgIH1cblxuICAgIGFkZENvbnN0cmFpbnQoKSB7XG4gICAgICAgICg8RmlsdGVyTWV0YWRhdGFbXT50aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkucHVzaCh7IHZhbHVlOiBudWxsLCBtYXRjaE1vZGU6IHRoaXMuZ2V0RGVmYXVsdE1hdGNoTW9kZSgpLCBvcGVyYXRvcjogdGhpcy5nZXREZWZhdWx0T3BlcmF0b3IoKSB9KTtcbiAgICAgICAgRG9tSGFuZGxlci5mb2N1cyh0aGlzLmNsZWFyQnV0dG9uVmlld0NoaWxkLm5hdGl2ZUVsZW1lbnQpO1xuICAgIH1cblxuICAgIHJlbW92ZUNvbnN0cmFpbnQoZmlsdGVyTWV0YTogRmlsdGVyTWV0YWRhdGEpIHtcbiAgICAgICAgdGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0gPSAoPEZpbHRlck1ldGFkYXRhW10+dGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0pLmZpbHRlcigobWV0YSkgPT4gbWV0YSAhPT0gZmlsdGVyTWV0YSk7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICBEb21IYW5kbGVyLmZvY3VzKHRoaXMuY2xlYXJCdXR0b25WaWV3Q2hpbGQubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuXG4gICAgb25PcGVyYXRvckNoYW5nZSh2YWx1ZTogYW55KSB7XG4gICAgICAgICg8RmlsdGVyTWV0YWRhdGFbXT50aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXSkuZm9yRWFjaCgoZmlsdGVyTWV0YSkgPT4ge1xuICAgICAgICAgICAgZmlsdGVyTWV0YS5vcGVyYXRvciA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5vcGVyYXRvciA9IHZhbHVlO1xuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoIXRoaXMuc2hvd0FwcGx5QnV0dG9uKSB7XG4gICAgICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHRvZ2dsZU1lbnUoKSB7XG4gICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSAhdGhpcy5vdmVybGF5VmlzaWJsZTtcbiAgICB9XG5cbiAgICBvblRvZ2dsZUJ1dHRvbktleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICBjYXNlICdUYWInOlxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheVZpc2libGUgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBsZXQgZm9jdXNhYmxlID0gRG9tSGFuZGxlci5nZXRGb2N1c2FibGVFbGVtZW50cyg8SFRNTEVsZW1lbnQ+dGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGZvY3VzYWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZm9jdXNhYmxlWzBdLmZvY3VzKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGV2ZW50LmFsdEtleSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy50b2dnbGVNZW51KCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRXNjYXBlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuaWNvbj8ubmF0aXZlRWxlbWVudC5mb2N1cygpO1xuICAgIH1cblxuICAgIGZpbmROZXh0SXRlbShpdGVtOiBIVE1MTElFbGVtZW50KTogYW55IHtcbiAgICAgICAgbGV0IG5leHRJdGVtID0gPEhUTUxMSUVsZW1lbnQ+aXRlbS5uZXh0RWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgaWYgKG5leHRJdGVtKSByZXR1cm4gRG9tSGFuZGxlci5oYXNDbGFzcyhuZXh0SXRlbSwgJ3AtY29sdW1uLWZpbHRlci1zZXBhcmF0b3InKSA/IHRoaXMuZmluZE5leHRJdGVtKG5leHRJdGVtKSA6IG5leHRJdGVtO1xuICAgICAgICBlbHNlIHJldHVybiBpdGVtLnBhcmVudEVsZW1lbnQ/LmZpcnN0RWxlbWVudENoaWxkO1xuICAgIH1cblxuICAgIGZpbmRQcmV2SXRlbShpdGVtOiBIVE1MTElFbGVtZW50KTogYW55IHtcbiAgICAgICAgbGV0IHByZXZJdGVtID0gPEhUTUxMSUVsZW1lbnQ+aXRlbS5wcmV2aW91c0VsZW1lbnRTaWJsaW5nO1xuXG4gICAgICAgIGlmIChwcmV2SXRlbSkgcmV0dXJuIERvbUhhbmRsZXIuaGFzQ2xhc3MocHJldkl0ZW0sICdwLWNvbHVtbi1maWx0ZXItc2VwYXJhdG9yJykgPyB0aGlzLmZpbmRQcmV2SXRlbShwcmV2SXRlbSkgOiBwcmV2SXRlbTtcbiAgICAgICAgZWxzZSByZXR1cm4gaXRlbS5wYXJlbnRFbGVtZW50Py5sYXN0RWxlbWVudENoaWxkO1xuICAgIH1cblxuICAgIG9uQ29udGVudENsaWNrKCkge1xuICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uU3RhcnQoZXZlbnQ6IEFuaW1hdGlvbkV2ZW50KSB7XG4gICAgICAgIHN3aXRjaCAoZXZlbnQudG9TdGF0ZSkge1xuICAgICAgICAgICAgY2FzZSAndmlzaWJsZSc6XG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5ID0gZXZlbnQuZWxlbWVudDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuZG9jdW1lbnQuYm9keSwgdGhpcy5vdmVybGF5KTtcbiAgICAgICAgICAgICAgICBaSW5kZXhVdGlscy5zZXQoJ292ZXJsYXknLCB0aGlzLm92ZXJsYXksIHRoaXMuY29uZmlnLnpJbmRleC5vdmVybGF5KTtcbiAgICAgICAgICAgICAgICBEb21IYW5kbGVyLmFic29sdXRlUG9zaXRpb24odGhpcy5vdmVybGF5LCB0aGlzLmljb24/Lm5hdGl2ZUVsZW1lbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50Q2xpY2tMaXN0ZW5lcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJpbmRTY3JvbGxMaXN0ZW5lcigpO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5RXZlbnRMaXN0ZW5lciA9IChlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheSAmJiB0aGlzLm92ZXJsYXkuY29udGFpbnMoZS50YXJnZXQpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uID0gdGhpcy5vdmVybGF5U2VydmljZS5jbGlja09ic2VydmFibGUuc3Vic2NyaWJlKHRoaXMub3ZlcmxheUV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICBjYXNlICd2b2lkJzpcbiAgICAgICAgICAgICAgICB0aGlzLm9uT3ZlcmxheUhpZGUoKTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5U3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25PdmVybGF5QW5pbWF0aW9uRW5kKGV2ZW50OiBBbmltYXRpb25FdmVudCkge1xuICAgICAgICBzd2l0Y2ggKGV2ZW50LnRvU3RhdGUpIHtcbiAgICAgICAgICAgIGNhc2UgJ3Zpc2libGUnOlxuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNPbkZpcnN0RWxlbWVudCgpO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSAndm9pZCc6XG4gICAgICAgICAgICAgICAgWkluZGV4VXRpbHMuY2xlYXIoZXZlbnQuZWxlbWVudCk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmb2N1c09uRmlyc3RFbGVtZW50KCkge1xuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLmZvY3VzKERvbUhhbmRsZXIuZ2V0Rmlyc3RGb2N1c2FibGVFbGVtZW50KHRoaXMub3ZlcmxheSwgJycpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGdldERlZmF1bHRNYXRjaE1vZGUoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMubWF0Y2hNb2RlKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5tYXRjaE1vZGU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAodGhpcy50eXBlID09PSAndGV4dCcpIHJldHVybiBGaWx0ZXJNYXRjaE1vZGUuU1RBUlRTX1dJVEg7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdudW1lcmljJykgcmV0dXJuIEZpbHRlck1hdGNoTW9kZS5FUVVBTFM7XG4gICAgICAgICAgICBlbHNlIGlmICh0aGlzLnR5cGUgPT09ICdkYXRlJykgcmV0dXJuIEZpbHRlck1hdGNoTW9kZS5EQVRFX0lTO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gRmlsdGVyTWF0Y2hNb2RlLkNPTlRBSU5TO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0RGVmYXVsdE9wZXJhdG9yKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgICAgIHJldHVybiB0aGlzLmR0LmZpbHRlcnMgPyAoPEZpbHRlck1ldGFkYXRhW10+dGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+KDxzdHJpbmc+dGhpcy5maWVsZCldKVswXS5vcGVyYXRvciA6IHRoaXMub3BlcmF0b3I7XG4gICAgfVxuXG4gICAgaGFzUm93RmlsdGVyKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5kdC5maWx0ZXJzWzxzdHJpbmc+dGhpcy5maWVsZF0gJiYgIXRoaXMuZHQuaXNGaWx0ZXJCbGFuaygoPEZpbHRlck1ldGFkYXRhPnRoaXMuZHQuZmlsdGVyc1s8c3RyaW5nPnRoaXMuZmllbGRdKS52YWx1ZSk7XG4gICAgfVxuXG4gICAgaGFzRmlsdGVyKCk6IGJvb2xlYW4ge1xuICAgICAgICBsZXQgZmllbGRGaWx0ZXIgPSB0aGlzLmR0LmZpbHRlcnNbPHN0cmluZz50aGlzLmZpZWxkXTtcbiAgICAgICAgaWYgKGZpZWxkRmlsdGVyKSB7XG4gICAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShmaWVsZEZpbHRlcikpIHJldHVybiAhdGhpcy5kdC5pc0ZpbHRlckJsYW5rKCg8RmlsdGVyTWV0YWRhdGFbXT5maWVsZEZpbHRlcilbMF0udmFsdWUpO1xuICAgICAgICAgICAgZWxzZSByZXR1cm4gIXRoaXMuZHQuaXNGaWx0ZXJCbGFuayhmaWVsZEZpbHRlci52YWx1ZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNPdXRzaWRlQ2xpY2tlZChldmVudDogYW55KTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhKFxuICAgICAgICAgICAgdGhpcy5vdmVybGF5Py5pc1NhbWVOb2RlKGV2ZW50LnRhcmdldCkgfHxcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheT8uY29udGFpbnMoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICAgICAgdGhpcy5pY29uPy5uYXRpdmVFbGVtZW50LmlzU2FtZU5vZGUoZXZlbnQudGFyZ2V0KSB8fFxuICAgICAgICAgICAgdGhpcy5pY29uPy5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKGV2ZW50LnRhcmdldCkgfHxcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tZmlsdGVyLWFkZC1idXR0b24nKSB8fFxuICAgICAgICAgICAgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCwgJ3AtY29sdW1uLWZpbHRlci1hZGQtYnV0dG9uJykgfHxcbiAgICAgICAgICAgIERvbUhhbmRsZXIuaGFzQ2xhc3MoZXZlbnQudGFyZ2V0LCAncC1jb2x1bW4tZmlsdGVyLXJlbW92ZS1idXR0b24nKSB8fFxuICAgICAgICAgICAgRG9tSGFuZGxlci5oYXNDbGFzcyhldmVudC50YXJnZXQucGFyZW50RWxlbWVudCwgJ3AtY29sdW1uLWZpbHRlci1yZW1vdmUtYnV0dG9uJylcbiAgICAgICAgKTtcbiAgICB9XG5cbiAgICBiaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAoIXRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFRhcmdldDogYW55ID0gdGhpcy5lbCA/IHRoaXMuZWwubmF0aXZlRWxlbWVudC5vd25lckRvY3VtZW50IDogJ2RvY3VtZW50JztcblxuICAgICAgICAgICAgdGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbihkb2N1bWVudFRhcmdldCwgJ21vdXNlZG93bicsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmIHRoaXMuaXNPdXRzaWRlQ2xpY2tlZChldmVudCkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWRlKCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxmQ2xpY2sgPSBmYWxzZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdW5iaW5kRG9jdW1lbnRDbGlja0xpc3RlbmVyKCkge1xuICAgICAgICBpZiAodGhpcy5kb2N1bWVudENsaWNrTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRDbGlja0xpc3RlbmVyKCk7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50Q2xpY2tMaXN0ZW5lciA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLnNlbGZDbGljayA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICghdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIgPSB0aGlzLnJlbmRlcmVyLmxpc3Rlbih0aGlzLndpbmRvdywgJ3Jlc2l6ZScsIChldmVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLm92ZXJsYXlWaXNpYmxlICYmICFEb21IYW5kbGVyLmlzVG91Y2hEZXZpY2UoKSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHVuYmluZERvY3VtZW50UmVzaXplTGlzdGVuZXIoKSB7XG4gICAgICAgIGlmICh0aGlzLmRvY3VtZW50UmVzaXplTGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuZG9jdW1lbnRSZXNpemVMaXN0ZW5lcigpO1xuICAgICAgICAgICAgdGhpcy5kb2N1bWVudFJlc2l6ZUxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKCF0aGlzLnNjcm9sbEhhbmRsZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlciA9IG5ldyBDb25uZWN0ZWRPdmVybGF5U2Nyb2xsSGFuZGxlcih0aGlzLmljb24/Lm5hdGl2ZUVsZW1lbnQsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5VmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2Nyb2xsSGFuZGxlci5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICB9XG5cbiAgICB1bmJpbmRTY3JvbGxMaXN0ZW5lcigpIHtcbiAgICAgICAgaWYgKHRoaXMuc2Nyb2xsSGFuZGxlcikge1xuICAgICAgICAgICAgdGhpcy5zY3JvbGxIYW5kbGVyLnVuYmluZFNjcm9sbExpc3RlbmVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBoaWRlKCkge1xuICAgICAgICB0aGlzLm92ZXJsYXlWaXNpYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuXG4gICAgb25PdmVybGF5SGlkZSgpIHtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudENsaWNrTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy51bmJpbmREb2N1bWVudFJlc2l6ZUxpc3RlbmVyKCk7XG4gICAgICAgIHRoaXMudW5iaW5kU2Nyb2xsTGlzdGVuZXIoKTtcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gbnVsbDtcbiAgICB9XG5cbiAgICBjbGVhckZpbHRlcigpIHtcbiAgICAgICAgdGhpcy5pbml0RmllbGRGaWx0ZXJDb25zdHJhaW50KCk7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICBpZiAodGhpcy5oaWRlT25DbGVhcikgdGhpcy5oaWRlKCk7XG4gICAgfVxuXG4gICAgYXBwbHlGaWx0ZXIoKSB7XG4gICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICB0aGlzLmhpZGUoKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpIHtcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xuICAgICAgICAgICAgdGhpcy5yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLmVsLm5hdGl2ZUVsZW1lbnQsIHRoaXMub3ZlcmxheSk7XG4gICAgICAgICAgICBaSW5kZXhVdGlscy5jbGVhcih0aGlzLm92ZXJsYXkpO1xuICAgICAgICAgICAgdGhpcy5vbk92ZXJsYXlIaWRlKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbikge1xuICAgICAgICAgICAgdGhpcy50cmFuc2xhdGlvblN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMucmVzZXRTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMucmVzZXRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXlTdWJzY3JpcHRpb24pIHtcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3AtY29sdW1uRmlsdGVyRm9ybUVsZW1lbnQnLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJmaWx0ZXJUZW1wbGF0ZTsgZWxzZSBidWlsdEluRWxlbWVudFwiPlxuICAgICAgICAgICAgPG5nLWNvbnRhaW5lclxuICAgICAgICAgICAgICAgICpuZ1RlbXBsYXRlT3V0bGV0PVwiXG4gICAgICAgICAgICAgICAgICAgIGZpbHRlclRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBjb250ZXh0OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAkaW1wbGljaXQ6IGZpbHRlckNvbnN0cmFpbnQudmFsdWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXJDYWxsYmFjazogZmlsdGVyQ2FsbGJhY2ssXG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQ6IGZpZWxkLFxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyQ29uc3RyYWludDogZmlsdGVyQ29uc3RyYWludCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHBsYWNlaG9sZGVyOiBwbGFjZWhvbGRlcixcbiAgICAgICAgICAgICAgICAgICAgICAgIG1pbkZyYWN0aW9uRGlnaXRzOiBtaW5GcmFjdGlvbkRpZ2l0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIG1heEZyYWN0aW9uRGlnaXRzOiBtYXhGcmFjdGlvbkRpZ2l0cyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZWZpeDogcHJlZml4LFxuICAgICAgICAgICAgICAgICAgICAgICAgc3VmZml4OiBzdWZmaXgsXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2NhbGU6IGxvY2FsZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvY2FsZU1hdGNoZXI6IGxvY2FsZU1hdGNoZXIsXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeTogY3VycmVuY3ksXG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW5jeURpc3BsYXk6IGN1cnJlbmN5RGlzcGxheSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHVzZUdyb3VwaW5nOiB1c2VHcm91cGluZyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHNob3dCdXR0b25zOiBzaG93QnV0dG9uc1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXCJcbiAgICAgICAgICAgID48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgIDxuZy10ZW1wbGF0ZSAjYnVpbHRJbkVsZW1lbnQ+XG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1N3aXRjaF09XCJ0eXBlXCI+XG4gICAgICAgICAgICAgICAgPGlucHV0ICpuZ1N3aXRjaENhc2U9XCIndGV4dCdcIiB0eXBlPVwidGV4dFwiIHBJbnB1dFRleHQgW3ZhbHVlXT1cImZpbHRlckNvbnN0cmFpbnQ/LnZhbHVlXCIgKGlucHV0KT1cIm9uTW9kZWxDaGFuZ2UoJGV2ZW50LnRhcmdldC52YWx1ZSlcIiAoa2V5ZG93bi5lbnRlcik9XCJvblRleHRJbnB1dEVudGVyS2V5RG93bigkZXZlbnQpXCIgW2F0dHIucGxhY2Vob2xkZXJdPVwicGxhY2Vob2xkZXJcIiAvPlxuICAgICAgICAgICAgICAgIDxwLWlucHV0TnVtYmVyXG4gICAgICAgICAgICAgICAgICAgICpuZ1N3aXRjaENhc2U9XCInbnVtZXJpYydcIlxuICAgICAgICAgICAgICAgICAgICBbbmdNb2RlbF09XCJmaWx0ZXJDb25zdHJhaW50Py52YWx1ZVwiXG4gICAgICAgICAgICAgICAgICAgIChuZ01vZGVsQ2hhbmdlKT1cIm9uTW9kZWxDaGFuZ2UoJGV2ZW50KVwiXG4gICAgICAgICAgICAgICAgICAgIChvbktleURvd24pPVwib25OdW1lcmljSW5wdXRLZXlEb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgICAgICBbc2hvd0J1dHRvbnNdPVwic2hvd0J1dHRvbnNcIlxuICAgICAgICAgICAgICAgICAgICBbbWluRnJhY3Rpb25EaWdpdHNdPVwibWluRnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICBbbWF4RnJhY3Rpb25EaWdpdHNdPVwibWF4RnJhY3Rpb25EaWdpdHNcIlxuICAgICAgICAgICAgICAgICAgICBbcHJlZml4XT1cInByZWZpeFwiXG4gICAgICAgICAgICAgICAgICAgIFtzdWZmaXhdPVwic3VmZml4XCJcbiAgICAgICAgICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCJcbiAgICAgICAgICAgICAgICAgICAgW21vZGVdPVwiY3VycmVuY3kgPyAnY3VycmVuY3knIDogJ2RlY2ltYWwnXCJcbiAgICAgICAgICAgICAgICAgICAgW2xvY2FsZV09XCJsb2NhbGVcIlxuICAgICAgICAgICAgICAgICAgICBbbG9jYWxlTWF0Y2hlcl09XCJsb2NhbGVNYXRjaGVyXCJcbiAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5XT1cImN1cnJlbmN5XCJcbiAgICAgICAgICAgICAgICAgICAgW2N1cnJlbmN5RGlzcGxheV09XCJjdXJyZW5jeURpc3BsYXlcIlxuICAgICAgICAgICAgICAgICAgICBbdXNlR3JvdXBpbmddPVwidXNlR3JvdXBpbmdcIlxuICAgICAgICAgICAgICAgID48L3AtaW5wdXROdW1iZXI+XG4gICAgICAgICAgICAgICAgPHAtdHJpU3RhdGVDaGVja2JveCAqbmdTd2l0Y2hDYXNlPVwiJ2Jvb2xlYW4nXCIgW25nTW9kZWxdPVwiZmlsdGVyQ29uc3RyYWludD8udmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudClcIj48L3AtdHJpU3RhdGVDaGVja2JveD5cbiAgICAgICAgICAgICAgICA8cC1jYWxlbmRhciAqbmdTd2l0Y2hDYXNlPVwiJ2RhdGUnXCIgW3BsYWNlaG9sZGVyXT1cInBsYWNlaG9sZGVyXCIgW25nTW9kZWxdPVwiZmlsdGVyQ29uc3RyYWludD8udmFsdWVcIiAobmdNb2RlbENoYW5nZSk9XCJvbk1vZGVsQ2hhbmdlKCRldmVudClcIiBhcHBlbmRUbz1cImJvZHlcIj48L3AtY2FsZW5kYXI+XG4gICAgICAgICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICBgLFxuICAgIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIENvbHVtbkZpbHRlckZvcm1FbGVtZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgICBASW5wdXQoKSBmaWVsZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgdHlwZTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgZmlsdGVyQ29uc3RyYWludDogRmlsdGVyTWV0YWRhdGEgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBmaWx0ZXJUZW1wbGF0ZTogTnVsbGFibGU8VGVtcGxhdGVSZWY8YW55Pj47XG5cbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbWluRnJhY3Rpb25EaWdpdHM6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIG1heEZyYWN0aW9uRGlnaXRzOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBwcmVmaXg6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICAgIEBJbnB1dCgpIHN1ZmZpeDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgbG9jYWxlOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBsb2NhbGVNYXRjaGVyOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBjdXJyZW5jeTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuXG4gICAgQElucHV0KCkgY3VycmVuY3lEaXNwbGF5OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSB1c2VHcm91cGluZzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBnZXQgc2hvd0J1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmNvbEZpbHRlci5zaG93QnV0dG9ucztcbiAgICB9XG5cbiAgICBmaWx0ZXJDYWxsYmFjazogYW55O1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGR0OiBUYWJsZSwgcHJpdmF0ZSBjb2xGaWx0ZXI6IENvbHVtbkZpbHRlcikge31cblxuICAgIG5nT25Jbml0KCkge1xuICAgICAgICB0aGlzLmZpbHRlckNhbGxiYWNrID0gKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgICAgICAgICg8YW55PnRoaXMuZmlsdGVyQ29uc3RyYWludCkudmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuZHQuX2ZpbHRlcigpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIG9uTW9kZWxDaGFuZ2UodmFsdWU6IGFueSkge1xuICAgICAgICAoPGFueT50aGlzLmZpbHRlckNvbnN0cmFpbnQpLnZhbHVlID0gdmFsdWU7XG5cbiAgICAgICAgaWYgKHRoaXMudHlwZSA9PT0gJ2RhdGUnIHx8IHRoaXMudHlwZSA9PT0gJ2Jvb2xlYW4nIHx8IHZhbHVlID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBvblRleHRJbnB1dEVudGVyS2V5RG93bihldmVudDogS2V5Ym9hcmRFdmVudCkge1xuICAgICAgICB0aGlzLmR0Ll9maWx0ZXIoKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBvbk51bWVyaWNJbnB1dEtleURvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJykge1xuICAgICAgICAgICAgdGhpcy5kdC5fZmlsdGVyKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBQYWdpbmF0b3JNb2R1bGUsXG4gICAgICAgIElucHV0VGV4dE1vZHVsZSxcbiAgICAgICAgRHJvcGRvd25Nb2R1bGUsXG4gICAgICAgIEZvcm1zTW9kdWxlLFxuICAgICAgICBCdXR0b25Nb2R1bGUsXG4gICAgICAgIFNlbGVjdEJ1dHRvbk1vZHVsZSxcbiAgICAgICAgQ2FsZW5kYXJNb2R1bGUsXG4gICAgICAgIElucHV0TnVtYmVyTW9kdWxlLFxuICAgICAgICBUcmlTdGF0ZUNoZWNrYm94TW9kdWxlLFxuICAgICAgICBTY3JvbGxlck1vZHVsZSxcbiAgICAgICAgQXJyb3dEb3duSWNvbixcbiAgICAgICAgQXJyb3dVcEljb24sXG4gICAgICAgIFNwaW5uZXJJY29uLFxuICAgICAgICBTb3J0QWx0SWNvbixcbiAgICAgICAgU29ydEFtb3VudFVwQWx0SWNvbixcbiAgICAgICAgU29ydEFtb3VudERvd25JY29uLFxuICAgICAgICBDaGVja0ljb24sXG4gICAgICAgIEZpbHRlckljb24sXG4gICAgICAgIEZpbHRlclNsYXNoSWNvbixcbiAgICAgICAgUGx1c0ljb24sXG4gICAgICAgIFRyYXNoSWNvblxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBUYWJsZSxcbiAgICAgICAgU2hhcmVkTW9kdWxlLFxuICAgICAgICBTb3J0YWJsZUNvbHVtbixcbiAgICAgICAgRnJvemVuQ29sdW1uLFxuICAgICAgICBSb3dHcm91cEhlYWRlcixcbiAgICAgICAgU2VsZWN0YWJsZVJvdyxcbiAgICAgICAgUm93VG9nZ2xlcixcbiAgICAgICAgQ29udGV4dE1lbnVSb3csXG4gICAgICAgIFJlc2l6YWJsZUNvbHVtbixcbiAgICAgICAgUmVvcmRlcmFibGVDb2x1bW4sXG4gICAgICAgIEVkaXRhYmxlQ29sdW1uLFxuICAgICAgICBDZWxsRWRpdG9yLFxuICAgICAgICBTb3J0SWNvbixcbiAgICAgICAgVGFibGVSYWRpb0J1dHRvbixcbiAgICAgICAgVGFibGVDaGVja2JveCxcbiAgICAgICAgVGFibGVIZWFkZXJDaGVja2JveCxcbiAgICAgICAgUmVvcmRlcmFibGVSb3dIYW5kbGUsXG4gICAgICAgIFJlb3JkZXJhYmxlUm93LFxuICAgICAgICBTZWxlY3RhYmxlUm93RGJsQ2xpY2ssXG4gICAgICAgIEVkaXRhYmxlUm93LFxuICAgICAgICBJbml0RWRpdGFibGVSb3csXG4gICAgICAgIFNhdmVFZGl0YWJsZVJvdyxcbiAgICAgICAgQ2FuY2VsRWRpdGFibGVSb3csXG4gICAgICAgIENvbHVtbkZpbHRlcixcbiAgICAgICAgQ29sdW1uRmlsdGVyRm9ybUVsZW1lbnQsXG4gICAgICAgIFNjcm9sbGVyTW9kdWxlXG4gICAgXSxcbiAgICBkZWNsYXJhdGlvbnM6IFtcbiAgICAgICAgVGFibGUsXG4gICAgICAgIFNvcnRhYmxlQ29sdW1uLFxuICAgICAgICBGcm96ZW5Db2x1bW4sXG4gICAgICAgIFJvd0dyb3VwSGVhZGVyLFxuICAgICAgICBTZWxlY3RhYmxlUm93LFxuICAgICAgICBSb3dUb2dnbGVyLFxuICAgICAgICBDb250ZXh0TWVudVJvdyxcbiAgICAgICAgUmVzaXphYmxlQ29sdW1uLFxuICAgICAgICBSZW9yZGVyYWJsZUNvbHVtbixcbiAgICAgICAgRWRpdGFibGVDb2x1bW4sXG4gICAgICAgIENlbGxFZGl0b3IsXG4gICAgICAgIFRhYmxlQm9keSxcbiAgICAgICAgU29ydEljb24sXG4gICAgICAgIFRhYmxlUmFkaW9CdXR0b24sXG4gICAgICAgIFRhYmxlQ2hlY2tib3gsXG4gICAgICAgIFRhYmxlSGVhZGVyQ2hlY2tib3gsXG4gICAgICAgIFJlb3JkZXJhYmxlUm93SGFuZGxlLFxuICAgICAgICBSZW9yZGVyYWJsZVJvdyxcbiAgICAgICAgU2VsZWN0YWJsZVJvd0RibENsaWNrLFxuICAgICAgICBFZGl0YWJsZVJvdyxcbiAgICAgICAgSW5pdEVkaXRhYmxlUm93LFxuICAgICAgICBTYXZlRWRpdGFibGVSb3csXG4gICAgICAgIENhbmNlbEVkaXRhYmxlUm93LFxuICAgICAgICBDb2x1bW5GaWx0ZXIsXG4gICAgICAgIENvbHVtbkZpbHRlckZvcm1FbGVtZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBUYWJsZU1vZHVsZSB7fVxuIl19