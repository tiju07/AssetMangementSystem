import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { HttpClientModule, HttpEventType } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, ContentChildren, EventEmitter, Inject, Input, NgModule, Output, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import { PrimeTemplate, SharedModule, TranslationKeys } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DomHandler } from 'primeng/dom';
import { PlusIcon } from 'primeng/icons/plus';
import { TimesIcon } from 'primeng/icons/times';
import { UploadIcon } from 'primeng/icons/upload';
import { MessagesModule } from 'primeng/messages';
import { ProgressBarModule } from 'primeng/progressbar';
import { RippleModule } from 'primeng/ripple';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@angular/common/http";
import * as i3 from "primeng/api";
import * as i4 from "@angular/common";
import * as i5 from "primeng/button";
import * as i6 from "primeng/progressbar";
import * as i7 from "primeng/messages";
import * as i8 from "primeng/ripple";
/**
 * FileUpload is an advanced uploader with dragdrop support, multi file uploads, auto uploading, progress tracking and validations.
 * @group Components
 */
export class FileUpload {
    document;
    platformId;
    renderer;
    el;
    sanitizer;
    zone;
    http;
    cd;
    config;
    /**
     * Name of the request parameter to identify the files at backend.
     * @group Props
     */
    name;
    /**
     * Remote url to upload the files.
     * @group Props
     */
    url;
    /**
     * HTTP method to send the files to the url such as "post" and "put".
     * @group Props
     */
    method = 'post';
    /**
     * Used to select multiple files at once from file dialog.
     * @group Props
     */
    multiple;
    /**
     * Comma-separated list of pattern to restrict the allowed file types. Can be any combination of either the MIME types (such as "image/*") or the file extensions (such as ".jpg").
     * @group Props
     */
    accept;
    /**
     * Disables the upload functionality.
     * @group Props
     */
    disabled;
    /**
     * When enabled, upload begins automatically after selection is completed.
     * @group Props
     */
    auto;
    /**
     * Cross-site Access-Control requests should be made using credentials such as cookies, authorization headers or TLS client certificates.
     * @group Props
     */
    withCredentials;
    /**
     * Maximum file size allowed in bytes.
     * @group Props
     */
    maxFileSize;
    /**
     * Summary message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageSummary = '{0}: Invalid file size, ';
    /**
     * Detail message of the invalid file size.
     * @group Props
     */
    invalidFileSizeMessageDetail = 'maximum upload size is {0}.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageSummary = '{0}: Invalid file type, ';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileTypeMessageDetail = 'allowed file types: {0}.';
    /**
     * Detail message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageDetail = 'limit is {0} at most.';
    /**
     * Summary message of the invalid file type.
     * @group Props
     */
    invalidFileLimitMessageSummary = 'Maximum number of files exceeded, ';
    /**
     * Inline style of the element.
     * @group Props
     */
    style;
    /**
     * Class of the element.
     * @group Props
     */
    styleClass;
    /**
     * Width of the image thumbnail in pixels.
     * @group Props
     */
    previewWidth = 50;
    /**
     * Label of the choose button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    chooseLabel;
    /**
     * Label of the upload button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    uploadLabel;
    /**
     * Label of the cancel button. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    cancelLabel;
    /**
     * Icon of the choose button.
     * @group Props
     */
    chooseIcon;
    /**
     * Icon of the upload button.
     * @group Props
     */
    uploadIcon;
    /**
     * Icon of the cancel button.
     * @group Props
     */
    cancelIcon;
    /**
     * Whether to show the upload button.
     * @group Props
     */
    showUploadButton = true;
    /**
     * Whether to show the cancel button.
     * @group Props
     */
    showCancelButton = true;
    /**
     * Defines the UI of the component.
     * @group Props
     */
    mode = 'advanced';
    /**
     * HttpHeaders class represents the header configuration options for an HTTP request.
     * @group Props
     */
    headers;
    /**
     * Whether to use the default upload or a manual implementation defined in uploadHandler callback. Defaults to PrimeNG Locale configuration.
     * @group Props
     */
    customUpload;
    /**
     * Maximum number of files that can be uploaded.
     * @group Props
     */
    fileLimit;
    /**
     * Style class of the upload button.
     * @group Props
     */
    uploadStyleClass;
    /**
     * Style class of the cancel button.
     * @group Props
     */
    cancelStyleClass;
    /**
     * Style class of the remove button.
     * @group Props
     */
    removeStyleClass;
    /**
     * Style class of the choose button.
     * @group Props
     */
    chooseStyleClass;
    /**
     * Callback to invoke before file upload is initialized.
     * @param {FileBeforeUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onBeforeUpload = new EventEmitter();
    /**
     * An event indicating that the request was sent to the server. Useful when a request may be retried multiple times, to distinguish between retries on the final event stream.
     * @param {FileSendEvent} event - Custom send event.
     * @group Emits
     */
    onSend = new EventEmitter();
    /**
     * Callback to invoke when file upload is complete.
     * @param {FileUploadEvent} event - Custom upload event.
     * @group Emits
     */
    onUpload = new EventEmitter();
    /**
     * Callback to invoke if file upload fails.
     * @param {FileUploadErrorEvent} event - Custom error event.
     * @group Emits
     */
    onError = new EventEmitter();
    /**
     * Callback to invoke when files in queue are removed without uploading using clear all button.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onClear = new EventEmitter();
    /**
     * Callback to invoke when a file is removed without uploading using clear button of a file.
     * @param {FileRemoveEvent} event - Remove event.
     * @group Emits
     */
    onRemove = new EventEmitter();
    /**
     * Callback to invoke when files are selected.
     * @param {FileSelectEvent} event - Select event.
     * @group Emits
     */
    onSelect = new EventEmitter();
    /**
     * Callback to invoke when files are being uploaded.
     * @param {FileProgressEvent} event - Progress event.
     * @group Emits
     */
    onProgress = new EventEmitter();
    /**
     * Callback to invoke in custom upload mode to upload the files manually.
     * @param {FileUploadHandlerEvent} event - Upload handler event.
     * @group Emits
     */
    uploadHandler = new EventEmitter();
    /**
     * This event is triggered if an error occurs while loading an image file.
     * @param {Event} event - Browser event.
     * @group Emits
     */
    onImageError = new EventEmitter();
    templates;
    advancedFileInput;
    basicFileInput;
    content;
    set files(files) {
        this._files = [];
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (this.validate(file)) {
                if (this.isImage(file)) {
                    file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                }
                this._files.push(files[i]);
            }
        }
    }
    get files() {
        return this._files;
    }
    get basicButtonLabel() {
        if (this.auto || !this.hasFiles()) {
            return this.chooseLabel;
        }
        return this.uploadLabel ?? this.files[0].name;
    }
    _files = [];
    progress = 0;
    dragHighlight;
    msgs;
    fileTemplate;
    contentTemplate;
    toolbarTemplate;
    chooseIconTemplate;
    uploadIconTemplate;
    cancelIconTemplate;
    uploadedFileCount = 0;
    focus;
    uploading;
    duplicateIEEvent; // flag to recognize duplicate onchange event for file input
    translationSubscription;
    dragOverListener;
    constructor(document, platformId, renderer, el, sanitizer, zone, http, cd, config) {
        this.document = document;
        this.platformId = platformId;
        this.renderer = renderer;
        this.el = el;
        this.sanitizer = sanitizer;
        this.zone = zone;
        this.http = http;
        this.cd = cd;
        this.config = config;
    }
    ngAfterContentInit() {
        this.templates?.forEach((item) => {
            switch (item.getType()) {
                case 'file':
                    this.fileTemplate = item.template;
                    break;
                case 'content':
                    this.contentTemplate = item.template;
                    break;
                case 'toolbar':
                    this.toolbarTemplate = item.template;
                    break;
                case 'chooseicon':
                    this.chooseIconTemplate = item.template;
                    break;
                case 'uploadicon':
                    this.uploadIconTemplate = item.template;
                    break;
                case 'cancelicon':
                    this.cancelIconTemplate = item.template;
                    break;
                default:
                    this.fileTemplate = item.template;
                    break;
            }
        });
    }
    ngOnInit() {
        this.translationSubscription = this.config.translationObserver.subscribe(() => {
            this.cd.markForCheck();
        });
    }
    ngAfterViewInit() {
        if (isPlatformBrowser(this.platformId)) {
            if (this.mode === 'advanced') {
                this.zone.runOutsideAngular(() => {
                    if (this.content) {
                        this.dragOverListener = this.renderer.listen(this.content.nativeElement, 'dragover', this.onDragOver.bind(this));
                    }
                });
            }
        }
    }
    getTranslation(option) {
        return this.config.getTranslation(option);
    }
    choose() {
        this.advancedFileInput?.nativeElement.click();
    }
    onFileSelect(event) {
        if (event.type !== 'drop' && this.isIE11() && this.duplicateIEEvent) {
            this.duplicateIEEvent = false;
            return;
        }
        this.msgs = [];
        if (!this.multiple) {
            this.files = [];
        }
        let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
        for (let i = 0; i < files.length; i++) {
            let file = files[i];
            if (!this.isFileSelected(file)) {
                if (this.validate(file)) {
                    if (this.isImage(file)) {
                        file.objectURL = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(files[i]));
                    }
                    this.files.push(files[i]);
                }
            }
        }
        this.onSelect.emit({ originalEvent: event, files: files, currentFiles: this.files });
        // this will check the fileLimit with the uploaded files
        this.checkFileLimit(files);
        if (this.hasFiles() && this.auto && !(this.mode === 'advanced') && !this.isFileLimitExceeded()) {
            this.upload();
        }
        if (event.type !== 'drop' && this.isIE11()) {
            this.clearIEInput();
        }
        else {
            this.clearInputElement();
        }
    }
    isFileSelected(file) {
        for (let sFile of this.files) {
            if (sFile.name + sFile.type + sFile.size === file.name + file.type + file.size) {
                return true;
            }
        }
        return false;
    }
    isIE11() {
        if (isPlatformBrowser(this.platformId)) {
            return !!this.document.defaultView['MSInputMethodContext'] && !!this.document['documentMode'];
        }
    }
    validate(file) {
        this.msgs = this.msgs || [];
        if (this.accept && !this.isFileTypeValid(file)) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileTypeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileTypeMessageDetail.replace('{0}', this.accept)
            });
            return false;
        }
        if (this.maxFileSize && file.size > this.maxFileSize) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileSizeMessageSummary.replace('{0}', file.name),
                detail: this.invalidFileSizeMessageDetail.replace('{0}', this.formatSize(this.maxFileSize))
            });
            return false;
        }
        return true;
    }
    isFileTypeValid(file) {
        let acceptableTypes = this.accept?.split(',').map((type) => type.trim());
        for (let type of acceptableTypes) {
            let acceptable = this.isWildcard(type) ? this.getTypeClass(file.type) === this.getTypeClass(type) : file.type == type || this.getFileExtension(file).toLowerCase() === type.toLowerCase();
            if (acceptable) {
                return true;
            }
        }
        return false;
    }
    getTypeClass(fileType) {
        return fileType.substring(0, fileType.indexOf('/'));
    }
    isWildcard(fileType) {
        return fileType.indexOf('*') !== -1;
    }
    getFileExtension(file) {
        return '.' + file.name.split('.').pop();
    }
    isImage(file) {
        return /^image\//.test(file.type);
    }
    onImageLoad(img) {
        window.URL.revokeObjectURL(img.src);
    }
    /**
     * Uploads the selected files.
     * @group Method
     */
    upload() {
        if (this.customUpload) {
            if (this.fileLimit) {
                this.uploadedFileCount += this.files.length;
            }
            this.uploadHandler.emit({
                files: this.files
            });
            this.cd.markForCheck();
        }
        else {
            this.uploading = true;
            this.msgs = [];
            let formData = new FormData();
            this.onBeforeUpload.emit({
                formData: formData
            });
            for (let i = 0; i < this.files.length; i++) {
                formData.append(this.name, this.files[i], this.files[i].name);
            }
            this.http
                .request(this.method, this.url, {
                body: formData,
                headers: this.headers,
                reportProgress: true,
                observe: 'events',
                withCredentials: this.withCredentials
            })
                .subscribe((event) => {
                switch (event.type) {
                    case HttpEventType.Sent:
                        this.onSend.emit({
                            originalEvent: event,
                            formData: formData
                        });
                        break;
                    case HttpEventType.Response:
                        this.uploading = false;
                        this.progress = 0;
                        if (event['status'] >= 200 && event['status'] < 300) {
                            if (this.fileLimit) {
                                this.uploadedFileCount += this.files.length;
                            }
                            this.onUpload.emit({ originalEvent: event, files: this.files });
                        }
                        else {
                            this.onError.emit({ files: this.files });
                        }
                        this.clear();
                        break;
                    case HttpEventType.UploadProgress: {
                        if (event['loaded']) {
                            this.progress = Math.round((event['loaded'] * 100) / event['total']);
                        }
                        this.onProgress.emit({ originalEvent: event, progress: this.progress });
                        break;
                    }
                }
                this.cd.markForCheck();
            }, (error) => {
                this.uploading = false;
                this.onError.emit({ files: this.files, error: error });
            });
        }
    }
    /**
     * Clears the files list.
     * @group Method
     */
    clear() {
        this.files = [];
        this.uploadedFileCount = 0;
        this.onClear.emit();
        this.clearInputElement();
        this.cd.markForCheck();
    }
    remove(event, index) {
        this.clearInputElement();
        this.onRemove.emit({ originalEvent: event, file: this.files[index] });
        this.files.splice(index, 1);
        this.checkFileLimit(this.files);
    }
    isFileLimitExceeded() {
        const isAutoMode = this.auto;
        const totalFileCount = isAutoMode ? this.files.length : this.files.length + this.uploadedFileCount;
        if (this.fileLimit && this.fileLimit <= totalFileCount && this.focus) {
            this.focus = false;
        }
        return this.fileLimit && this.fileLimit < totalFileCount;
    }
    isChooseDisabled() {
        if (this.auto) {
            return this.fileLimit && this.fileLimit <= this.files.length;
        }
        else {
            return this.fileLimit && this.fileLimit <= this.files.length + this.uploadedFileCount;
        }
    }
    checkFileLimit(files) {
        this.msgs ??= [];
        const hasExistingValidationMessages = this.msgs.length > 0 && this.fileLimit < files.length;
        if (this.isFileLimitExceeded() || hasExistingValidationMessages) {
            this.msgs.push({
                severity: 'error',
                summary: this.invalidFileLimitMessageSummary.replace('{0}', this.fileLimit.toString()),
                detail: this.invalidFileLimitMessageDetail.replace('{0}', this.fileLimit.toString())
            });
        }
    }
    clearInputElement() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.advancedFileInput.nativeElement.value = '';
        }
        if (this.basicFileInput && this.basicFileInput.nativeElement) {
            this.basicFileInput.nativeElement.value = '';
        }
    }
    clearIEInput() {
        if (this.advancedFileInput && this.advancedFileInput.nativeElement) {
            this.duplicateIEEvent = true; //IE11 fix to prevent onFileChange trigger again
            this.advancedFileInput.nativeElement.value = '';
        }
    }
    hasFiles() {
        return this.files && this.files.length > 0;
    }
    onDragEnter(e) {
        if (!this.disabled) {
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragOver(e) {
        if (!this.disabled) {
            DomHandler.addClass(this.content?.nativeElement, 'p-fileupload-highlight');
            this.dragHighlight = true;
            e.stopPropagation();
            e.preventDefault();
        }
    }
    onDragLeave(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
        }
    }
    onDrop(event) {
        if (!this.disabled) {
            DomHandler.removeClass(this.content?.nativeElement, 'p-fileupload-highlight');
            event.stopPropagation();
            event.preventDefault();
            let files = event.dataTransfer ? event.dataTransfer.files : event.target.files;
            let allowDrop = this.multiple || (files && files.length === 1);
            if (allowDrop) {
                this.onFileSelect(event);
            }
        }
    }
    onFocus() {
        this.focus = true;
    }
    onBlur() {
        this.focus = false;
    }
    formatSize(bytes) {
        const k = 1024;
        const dm = 3;
        const sizes = this.getTranslation(TranslationKeys.FILE_SIZE_TYPES);
        if (bytes === 0) {
            return `0 ${sizes[0]}`;
        }
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        const formattedSize = (bytes / Math.pow(k, i)).toFixed(dm);
        return `${formattedSize} ${sizes[i]}`;
    }
    onBasicUploaderClick() {
        if (this.hasFiles())
            this.upload();
        else
            this.basicFileInput?.nativeElement.click();
    }
    onBasicKeydown(event) {
        switch (event.code) {
            case 'Space':
            case 'Enter':
                this.onBasicUploaderClick();
                event.preventDefault();
                break;
        }
    }
    imageError(event) {
        this.onImageError.emit(event);
    }
    getBlockableElement() {
        return this.el.nativeElement.children[0];
    }
    get chooseButtonLabel() {
        return this.chooseLabel || this.config.getTranslation(TranslationKeys.CHOOSE);
    }
    get uploadButtonLabel() {
        return this.uploadLabel || this.config.getTranslation(TranslationKeys.UPLOAD);
    }
    get cancelButtonLabel() {
        return this.cancelLabel || this.config.getTranslation(TranslationKeys.CANCEL);
    }
    ngOnDestroy() {
        if (this.content && this.content.nativeElement) {
            if (this.dragOverListener) {
                this.dragOverListener();
                this.dragOverListener = null;
            }
        }
        if (this.translationSubscription) {
            this.translationSubscription.unsubscribe();
        }
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FileUpload, deps: [{ token: DOCUMENT }, { token: PLATFORM_ID }, { token: i0.Renderer2 }, { token: i0.ElementRef }, { token: i1.DomSanitizer }, { token: i0.NgZone }, { token: i2.HttpClient }, { token: i0.ChangeDetectorRef }, { token: i3.PrimeNGConfig }], target: i0.ɵɵFactoryTarget.Component });
    static ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "14.0.0", version: "17.2.2", type: FileUpload, selector: "p-fileUpload", inputs: { name: "name", url: "url", method: "method", multiple: "multiple", accept: "accept", disabled: "disabled", auto: "auto", withCredentials: "withCredentials", maxFileSize: "maxFileSize", invalidFileSizeMessageSummary: "invalidFileSizeMessageSummary", invalidFileSizeMessageDetail: "invalidFileSizeMessageDetail", invalidFileTypeMessageSummary: "invalidFileTypeMessageSummary", invalidFileTypeMessageDetail: "invalidFileTypeMessageDetail", invalidFileLimitMessageDetail: "invalidFileLimitMessageDetail", invalidFileLimitMessageSummary: "invalidFileLimitMessageSummary", style: "style", styleClass: "styleClass", previewWidth: "previewWidth", chooseLabel: "chooseLabel", uploadLabel: "uploadLabel", cancelLabel: "cancelLabel", chooseIcon: "chooseIcon", uploadIcon: "uploadIcon", cancelIcon: "cancelIcon", showUploadButton: "showUploadButton", showCancelButton: "showCancelButton", mode: "mode", headers: "headers", customUpload: "customUpload", fileLimit: "fileLimit", uploadStyleClass: "uploadStyleClass", cancelStyleClass: "cancelStyleClass", removeStyleClass: "removeStyleClass", chooseStyleClass: "chooseStyleClass", files: "files" }, outputs: { onBeforeUpload: "onBeforeUpload", onSend: "onSend", onUpload: "onUpload", onError: "onError", onClear: "onClear", onRemove: "onRemove", onSelect: "onSelect", onProgress: "onProgress", uploadHandler: "uploadHandler", onImageError: "onImageError" }, host: { classAttribute: "p-element" }, queries: [{ propertyName: "templates", predicate: PrimeTemplate }], viewQueries: [{ propertyName: "advancedFileInput", first: true, predicate: ["advancedfileinput"], descendants: true }, { propertyName: "basicFileInput", first: true, predicate: ["basicfileinput"], descendants: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true }], ngImport: i0, template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <span
                    class="p-button p-component p-fileupload-choose"
                    [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    pRipple
                    (click)="choose()"
                    (keydown.enter)="choose()"
                    tabindex="0"
                    [class]="chooseStyleClass"
                    [attr.data-pc-section]="'choosebutton'"
                >
                    <input #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled || isChooseDisabled()" [attr.title]="''" [attr.data-pc-section]="'input'" />
                    <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                    <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                </span>

                <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                    <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>
                <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                    <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!cancelIcon">
                        <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                        <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: files }"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input #basicfileinput type="file" [accept]="accept" [multiple]="multiple" [disabled]="disabled" (change)="onFileSelect($event)" *ngIf="!hasFiles()" (focus)="onFocus()" (blur)="onBlur()" [attr.data-pc-section]="'input'" />
            </span>
        </div>
    `, isInline: true, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"], dependencies: [{ kind: "directive", type: i0.forwardRef(() => i4.NgClass), selector: "[ngClass]", inputs: ["class", "ngClass"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgForOf), selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgIf), selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgTemplateOutlet), selector: "[ngTemplateOutlet]", inputs: ["ngTemplateOutletContext", "ngTemplateOutlet", "ngTemplateOutletInjector"] }, { kind: "directive", type: i0.forwardRef(() => i4.NgStyle), selector: "[ngStyle]", inputs: ["ngStyle"] }, { kind: "directive", type: i0.forwardRef(() => i5.ButtonDirective), selector: "[pButton]", inputs: ["iconPos", "loadingIcon", "label", "icon", "loading"] }, { kind: "component", type: i0.forwardRef(() => i5.Button), selector: "p-button", inputs: ["type", "iconPos", "icon", "badge", "label", "disabled", "loading", "loadingIcon", "raised", "rounded", "text", "plain", "severity", "outlined", "link", "size", "style", "styleClass", "badgeClass", "ariaLabel"], outputs: ["onClick", "onFocus", "onBlur"] }, { kind: "component", type: i0.forwardRef(() => i6.ProgressBar), selector: "p-progressBar", inputs: ["value", "showValue", "styleClass", "style", "unit", "mode", "color"] }, { kind: "component", type: i0.forwardRef(() => i7.Messages), selector: "p-messages", inputs: ["value", "closable", "style", "styleClass", "enableService", "key", "escape", "severity", "showTransitionOptions", "hideTransitionOptions"], outputs: ["valueChange"] }, { kind: "directive", type: i0.forwardRef(() => i8.Ripple), selector: "[pRipple]" }, { kind: "component", type: i0.forwardRef(() => PlusIcon), selector: "PlusIcon" }, { kind: "component", type: i0.forwardRef(() => UploadIcon), selector: "UploadIcon" }, { kind: "component", type: i0.forwardRef(() => TimesIcon), selector: "TimesIcon" }], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FileUpload, decorators: [{
            type: Component,
            args: [{ selector: 'p-fileUpload', template: `
        <div [ngClass]="'p-fileupload p-fileupload-advanced p-component'" [ngStyle]="style" [class]="styleClass" *ngIf="mode === 'advanced'" [attr.data-pc-name]="'fileupload'" [attr.data-pc-section]="'root'">
            <div class="p-fileupload-buttonbar" [attr.data-pc-section]="'buttonbar'">
                <span
                    class="p-button p-component p-fileupload-choose"
                    [ngClass]="{ 'p-focus': focus, 'p-disabled': disabled || isChooseDisabled() }"
                    (focus)="onFocus()"
                    (blur)="onBlur()"
                    pRipple
                    (click)="choose()"
                    (keydown.enter)="choose()"
                    tabindex="0"
                    [class]="chooseStyleClass"
                    [attr.data-pc-section]="'choosebutton'"
                >
                    <input #advancedfileinput type="file" (change)="onFileSelect($event)" [multiple]="multiple" [accept]="accept" [disabled]="disabled || isChooseDisabled()" [attr.title]="''" [attr.data-pc-section]="'input'" />
                    <span *ngIf="chooseIcon" [ngClass]="'p-button-icon p-button-icon-left'" [class]="chooseIcon" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon *ngIf="!chooseIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-label]="true" [attr.data-pc-section]="'chooseicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                    <span class="p-button-label" [attr.data-pc-section]="'choosebuttonlabel'">{{ chooseButtonLabel }}</span>
                </span>

                <p-button *ngIf="!auto && showUploadButton" type="button" [label]="uploadButtonLabel" (onClick)="upload()" [disabled]="!hasFiles() || isFileLimitExceeded()" [styleClass]="uploadStyleClass">
                    <span *ngIf="uploadIcon" [ngClass]="uploadIcon" [attr.aria-hidden]="true" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>
                <p-button *ngIf="!auto && showCancelButton" type="button" [label]="cancelButtonLabel" (onClick)="clear()" [disabled]="!hasFiles() || uploading" [styleClass]="cancelStyleClass">
                    <span *ngIf="cancelIcon" [ngClass]="cancelIcon" class="p-button-icon p-button-icon-left"></span>
                    <ng-container *ngIf="!cancelIcon">
                        <TimesIcon *ngIf="!cancelIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" [attr.aria-hidden]="true" />
                        <span *ngIf="cancelIconTemplate" class="p-button-icon p-button-icon-left" [attr.aria-hidden]="true">
                            <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </p-button>

                <ng-container *ngTemplateOutlet="toolbarTemplate"></ng-container>
            </div>
            <div #content class="p-fileupload-content" (dragenter)="onDragEnter($event)" (dragleave)="onDragLeave($event)" (drop)="onDrop($event)" [attr.data-pc-section]="'content'">
                <p-progressBar [value]="progress" [showValue]="false" *ngIf="hasFiles()"></p-progressBar>

                <p-messages [value]="msgs" [enableService]="false"></p-messages>

                <div class="p-fileupload-files" *ngIf="hasFiles()">
                    <div *ngIf="!fileTemplate">
                        <div class="p-fileupload-row" *ngFor="let file of files; let i = index">
                            <div><img [src]="file.objectURL" *ngIf="isImage(file)" [width]="previewWidth" (error)="imageError($event)" /></div>
                            <div class="p-fileupload-filename">{{ file.name }}</div>
                            <div>{{ formatSize(file.size) }}</div>
                            <div>
                                <button type="button" pButton (click)="remove($event, i)" [disabled]="uploading" class="p-button-icon-only" [class]="removeStyleClass">
                                    <TimesIcon *ngIf="!cancelIconTemplate" />
                                    <ng-template *ngTemplateOutlet="cancelIconTemplate"></ng-template>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div *ngIf="fileTemplate">
                        <ng-template ngFor [ngForOf]="files" [ngForTemplate]="fileTemplate"></ng-template>
                    </div>
                </div>
                <ng-container *ngTemplateOutlet="contentTemplate; context: { $implicit: files }"></ng-container>
            </div>
        </div>
        <div class="p-fileupload p-fileupload-basic p-component" *ngIf="mode === 'basic'" [attr.data-pc-name]="'fileupload'">
            <p-messages [value]="msgs" [enableService]="false"></p-messages>
            <span
                [ngClass]="{ 'p-button p-component p-fileupload-choose': true, 'p-button-icon-only': !basicButtonLabel, 'p-fileupload-choose-selected': hasFiles(), 'p-focus': focus, 'p-disabled': disabled }"
                [ngStyle]="style"
                [class]="styleClass"
                (click)="onBasicUploaderClick()"
                (keydown)="onBasicKeydown($event)"
                tabindex="0"
                pRipple
                [attr.data-pc-section]="'choosebutton'"
            >
                <ng-container *ngIf="hasFiles() && !auto; else chooseSection">
                    <span *ngIf="uploadIcon" class="p-button-icon p-button-icon-left" [ngClass]="uploadIcon"></span>
                    <ng-container *ngIf="!uploadIcon">
                        <UploadIcon *ngIf="!uploadIconTemplate" [styleClass]="'p-button-icon p-button-icon-left'" />
                        <span *ngIf="uploadIconTemplate" class="p-button-icon p-button-icon-left">
                            <ng-template *ngTemplateOutlet="uploadIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-container>
                <ng-template #chooseSection>
                    <span *ngIf="chooseIcon" class="p-button-icon p-button-icon-left pi" [ngClass]="chooseIcon"></span>
                    <ng-container *ngIf="!chooseIcon">
                        <PlusIcon [styleClass]="'p-button-icon p-button-icon-left pi'" *ngIf="!chooseIconTemplate" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'" />
                        <span *ngIf="chooseIconTemplate" class="p-button-icon p-button-icon-left pi" [attr.aria-hidden]="true" [attr.data-pc-section]="'uploadicon'">
                            <ng-template *ngTemplateOutlet="chooseIconTemplate"></ng-template>
                        </span>
                    </ng-container>
                </ng-template>
                <span *ngIf="basicButtonLabel" class="p-button-label" [attr.data-pc-section]="'label'">{{ basicButtonLabel }}</span>
                <input #basicfileinput type="file" [accept]="accept" [multiple]="multiple" [disabled]="disabled" (change)="onFileSelect($event)" *ngIf="!hasFiles()" (focus)="onFocus()" (blur)="onBlur()" [attr.data-pc-section]="'input'" />
            </span>
        </div>
    `, changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        class: 'p-element'
                    }, styles: ["@layer primeng{.p-fileupload-content{position:relative}.p-fileupload-row{display:flex;align-items:center}.p-fileupload-row>div{flex:1 1 auto;width:25%}.p-fileupload-row>div:last-child{text-align:right}.p-fileupload-content .p-progressbar{width:100%;position:absolute;top:0;left:0}.p-button.p-fileupload-choose{position:relative;overflow:hidden}.p-button.p-fileupload-choose input[type=file],.p-fileupload-choose.p-fileupload-choose-selected input[type=file]{display:none}.p-fluid .p-fileupload .p-button{width:auto}.p-fileupload-filename{word-break:break-all}}\n"] }]
        }], ctorParameters: () => [{ type: Document, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [PLATFORM_ID]
                }] }, { type: i0.Renderer2 }, { type: i0.ElementRef }, { type: i1.DomSanitizer }, { type: i0.NgZone }, { type: i2.HttpClient }, { type: i0.ChangeDetectorRef }, { type: i3.PrimeNGConfig }], propDecorators: { name: [{
                type: Input
            }], url: [{
                type: Input
            }], method: [{
                type: Input
            }], multiple: [{
                type: Input
            }], accept: [{
                type: Input
            }], disabled: [{
                type: Input
            }], auto: [{
                type: Input
            }], withCredentials: [{
                type: Input
            }], maxFileSize: [{
                type: Input
            }], invalidFileSizeMessageSummary: [{
                type: Input
            }], invalidFileSizeMessageDetail: [{
                type: Input
            }], invalidFileTypeMessageSummary: [{
                type: Input
            }], invalidFileTypeMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageDetail: [{
                type: Input
            }], invalidFileLimitMessageSummary: [{
                type: Input
            }], style: [{
                type: Input
            }], styleClass: [{
                type: Input
            }], previewWidth: [{
                type: Input
            }], chooseLabel: [{
                type: Input
            }], uploadLabel: [{
                type: Input
            }], cancelLabel: [{
                type: Input
            }], chooseIcon: [{
                type: Input
            }], uploadIcon: [{
                type: Input
            }], cancelIcon: [{
                type: Input
            }], showUploadButton: [{
                type: Input
            }], showCancelButton: [{
                type: Input
            }], mode: [{
                type: Input
            }], headers: [{
                type: Input
            }], customUpload: [{
                type: Input
            }], fileLimit: [{
                type: Input
            }], uploadStyleClass: [{
                type: Input
            }], cancelStyleClass: [{
                type: Input
            }], removeStyleClass: [{
                type: Input
            }], chooseStyleClass: [{
                type: Input
            }], onBeforeUpload: [{
                type: Output
            }], onSend: [{
                type: Output
            }], onUpload: [{
                type: Output
            }], onError: [{
                type: Output
            }], onClear: [{
                type: Output
            }], onRemove: [{
                type: Output
            }], onSelect: [{
                type: Output
            }], onProgress: [{
                type: Output
            }], uploadHandler: [{
                type: Output
            }], onImageError: [{
                type: Output
            }], templates: [{
                type: ContentChildren,
                args: [PrimeTemplate]
            }], advancedFileInput: [{
                type: ViewChild,
                args: ['advancedfileinput']
            }], basicFileInput: [{
                type: ViewChild,
                args: ['basicfileinput']
            }], content: [{
                type: ViewChild,
                args: ['content']
            }], files: [{
                type: Input
            }] } });
export class FileUploadModule {
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FileUploadModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.2.2", ngImport: i0, type: FileUploadModule, declarations: [FileUpload], imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon], exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FileUploadModule, imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon, SharedModule, ButtonModule, ProgressBarModule, MessagesModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.2.2", ngImport: i0, type: FileUploadModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [CommonModule, HttpClientModule, SharedModule, ButtonModule, ProgressBarModule, MessagesModule, RippleModule, PlusIcon, UploadIcon, TimesIcon],
                    exports: [FileUpload, SharedModule, ButtonModule, ProgressBarModule, MessagesModule],
                    declarations: [FileUpload]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZXVwbG9hZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9hcHAvY29tcG9uZW50cy9maWxldXBsb2FkL2ZpbGV1cGxvYWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUM1RSxPQUFPLEVBQWMsZ0JBQWdCLEVBQWEsYUFBYSxFQUFlLE1BQU0sc0JBQXNCLENBQUM7QUFDM0csT0FBTyxFQUdILHVCQUF1QixFQUV2QixTQUFTLEVBQ1QsZUFBZSxFQUVmLFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUNMLFFBQVEsRUFJUixNQUFNLEVBQ04sV0FBVyxFQUlYLFNBQVMsRUFDVCxpQkFBaUIsRUFDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUF1QyxhQUFhLEVBQUUsWUFBWSxFQUFFLGVBQWUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUNoSCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDOUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGFBQWEsQ0FBQztBQUN6QyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDOUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2hELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUNsRCxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFDbEQsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDeEQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7Ozs7O0FBSTlDOzs7R0FHRztBQXNISCxNQUFNLE9BQU8sVUFBVTtJQTZTVztJQUNHO0lBQ3JCO0lBQ0E7SUFDRDtJQUNBO0lBQ0M7SUFDRDtJ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WSxFQUFFLGlCQUFpQixFQUFFLGNBQWMsRUFBRSxZQUFZLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxTQUFTLGFBM3VCN0ksVUFBVSxFQTR1QkcsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjO3dHQUcxRSxnQkFBZ0IsWUFKZixZQUFZLEVBQUUsZ0JBQWdCLEVBQUUsWUFBWSxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxjQUFjLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUNoSSxZQUFZLEVBQUUsWUFBWSxFQUFFLGlCQUFpQixFQUFFLGNBQWM7OzJGQUcxRSxnQkFBZ0I7a0JBTDVCLFFBQVE7bUJBQUM7b0JBQ04sT0FBTyxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQztvQkFDdkosT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsY0FBYyxDQUFDO29CQUNwRixZQUFZLEVBQUUsQ0FBQyxVQUFVLENBQUM7aUJBQzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlLCBET0NVTUVOVCwgaXNQbGF0Zm9ybUJyb3dzZXIgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgSHR0cENsaWVudCwgSHR0cENsaWVudE1vZHVsZSwgSHR0cEV2ZW50LCBIdHRwRXZlbnRUeXBlLCBIdHRwSGVhZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7XG4gICAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgICBBZnRlclZpZXdJbml0LFxuICAgIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICAgIENoYW5nZURldGVjdG9yUmVmLFxuICAgIENvbXBvbmVudCxcbiAgICBDb250ZW50Q2hpbGRyZW4sXG4gICAgRWxlbWVudFJlZixcbiAgICBFdmVudEVtaXR0ZXIsXG4gICAgSW5qZWN0LFxuICAgIElucHV0LFxuICAgIE5nTW9kdWxlLFxuICAgIE5nWm9uZSxcbiAgICBPbkRlc3Ryb3ksXG4gICAgT25Jbml0LFxuICAgIE91dHB1dCxcbiAgICBQTEFURk9STV9JRCxcbiAgICBRdWVyeUxpc3QsXG4gICAgUmVuZGVyZXIyLFxuICAgIFRlbXBsYXRlUmVmLFxuICAgIFZpZXdDaGlsZCxcbiAgICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHsgQmxvY2thYmxlVUksIE1lc3NhZ2UsIFByaW1lTkdDb25maWcsIFByaW1lVGVtcGxhdGUsIFNoYXJlZE1vZHVsZSwgVHJhbnNsYXRpb25LZXlzIH0gZnJvbSAncHJpbWVuZy9hcGknO1xuaW1wb3J0IHsgQnV0dG9uTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9idXR0b24nO1xuaW1wb3J0IHsgRG9tSGFuZGxlciB9IGZyb20gJ3ByaW1lbmcvZG9tJztcbmltcG9ydCB7IFBsdXNJY29uIH0gZnJvbSAncHJpbWVuZy9pY29ucy9wbHVzJztcbmltcG9ydCB7IFRpbWVzSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdGltZXMnO1xuaW1wb3J0IHsgVXBsb2FkSWNvbiB9IGZyb20gJ3ByaW1lbmcvaWNvbnMvdXBsb2FkJztcbmltcG9ydCB7IE1lc3NhZ2VzTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBQcm9ncmVzc0Jhck1vZHVsZSB9IGZyb20gJ3ByaW1lbmcvcHJvZ3Jlc3NiYXInO1xuaW1wb3J0IHsgUmlwcGxlTW9kdWxlIH0gZnJvbSAncHJpbWVuZy9yaXBwbGUnO1xuaW1wb3J0IHsgVm9pZExpc3RlbmVyIH0gZnJvbSAncHJpbWVuZy90cy1oZWxwZXJzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgRmlsZUJlZm9yZVVwbG9hZEV2ZW50LCBGaWxlUHJvZ3Jlc3NFdmVudCwgRmlsZVJlbW92ZUV2ZW50LCBGaWxlU2VsZWN0RXZlbnQsIEZpbGVTZW5kRXZlbnQsIEZpbGVVcGxvYWRFcnJvckV2ZW50LCBGaWxlVXBsb2FkRXZlbnQsIEZpbGVVcGxvYWRIYW5kbGVyRXZlbnQgfSBmcm9tICcuL2ZpbGV1cGxvYWQuaW50ZXJmYWNlJztcbi8qKlxuICogRmlsZVVwbG9hZCBpcyBhbiBhZHZhbmNlZCB1cGxvYWRlciB3aXRoIGRyYWdkcm9wIHN1cHBvcnQsIG11bHRpIGZpbGUgdXBsb2FkcywgYXV0byB1cGxvYWRpbmcsIHByb2dyZXNzIHRyYWNraW5nIGFuZCB2YWxpZGF0aW9ucy5cbiAqIEBncm91cCBDb21wb25lbnRzXG4gKi9cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAncC1maWxlVXBsb2FkJyxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8ZGl2IFtuZ0NsYXNzXT1cIidwLWZpbGV1cGxvYWQgcC1maWxldXBsb2FkLWFkdmFuY2VkIHAtY29tcG9uZW50J1wiIFtuZ1N0eWxlXT1cInN0eWxlXCIgW2NsYXNzXT1cInN0eWxlQ2xhc3NcIiAqbmdJZj1cIm1vZGUgPT09ICdhZHZhbmNlZCdcIiBbYXR0ci5kYXRhLXBjLW5hbWVdPVwiJ2ZpbGV1cGxvYWQnXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidyb290J1wiPlxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1idXR0b25iYXJcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2J1dHRvbmJhcidcIj5cbiAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICBjbGFzcz1cInAtYnV0dG9uIHAtY29tcG9uZW50IHAtZmlsZXVwbG9hZC1jaG9vc2VcIlxuICAgICAgICAgICAgICAgICAgICBbbmdDbGFzc109XCJ7ICdwLWZvY3VzJzogZm9jdXMsICdwLWRpc2FibGVkJzogZGlzYWJsZWQgfHwgaXNDaG9vc2VEaXNhYmxlZCgpIH1cIlxuICAgICAgICAgICAgICAgICAgICAoZm9jdXMpPVwib25Gb2N1cygpXCJcbiAgICAgICAgICAgICAgICAgICAgKGJsdXIpPVwib25CbHVyKClcIlxuICAgICAgICAgICAgICAgICAgICBwUmlwcGxlXG4gICAgICAgICAgICAgICAgICAgIChjbGljayk9XCJjaG9vc2UoKVwiXG4gICAgICAgICAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cImNob29zZSgpXCJcbiAgICAgICAgICAgICAgICAgICAgdGFiaW5kZXg9XCIwXCJcbiAgICAgICAgICAgICAgICAgICAgW2NsYXNzXT1cImNob29zZVN0eWxlQ2xhc3NcIlxuICAgICAgICAgICAgICAgICAgICBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2Nob29zZWJ1dHRvbidcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgPGlucHV0ICNhZHZhbmNlZGZpbGVpbnB1dCB0eXBlPVwiZmlsZVwiIChjaGFuZ2UpPVwib25GaWxlU2VsZWN0KCRldmVudClcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbYWNjZXB0XT1cImFjY2VwdFwiIFtkaXNhYmxlZF09XCJkaXNhYmxlZCB8fCBpc0Nob29zZURpc2FibGVkKClcIiBbYXR0ci50aXRsZV09XCInJ1wiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uXCIgW25nQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0J1wiIFtjbGFzc109XCJjaG9vc2VJY29uXCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VpY29uJ1wiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiFjaG9vc2VJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8UGx1c0ljb24gKm5nSWY9XCIhY2hvb3NlSWNvblRlbXBsYXRlXCIgW3N0eWxlQ2xhc3NdPVwiJ3AtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0J1wiIFthdHRyLmFyaWEtbGFiZWxdPVwidHJ1ZVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2hvb3NlaWNvbidcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW2F0dHIuYXJpYS1sYWJlbF09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNob29zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInAtYnV0dG9uLWxhYmVsXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIidjaG9vc2VidXR0b25sYWJlbCdcIj57eyBjaG9vc2VCdXR0b25MYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+XG5cbiAgICAgICAgICAgICAgICA8cC1idXR0b24gKm5nSWY9XCIhYXV0byAmJiBzaG93VXBsb2FkQnV0dG9uXCIgdHlwZT1cImJ1dHRvblwiIFtsYWJlbF09XCJ1cGxvYWRCdXR0b25MYWJlbFwiIChvbkNsaWNrKT1cInVwbG9hZCgpXCIgW2Rpc2FibGVkXT1cIiFoYXNGaWxlcygpIHx8IGlzRmlsZUxpbWl0RXhjZWVkZWQoKVwiIFtzdHlsZUNsYXNzXT1cInVwbG9hZFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uXCIgW25nQ2xhc3NdPVwidXBsb2FkSWNvblwiIFthdHRyLmFyaWEtaGlkZGVuXT1cInRydWVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCI+PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiIXVwbG9hZEljb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxVcGxvYWRJY29uICpuZ0lmPVwiIXVwbG9hZEljb25UZW1wbGF0ZVwiIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCdcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJ1cGxvYWRJY29uVGVtcGxhdGVcIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInVwbG9hZEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvcC1idXR0b24+XG4gICAgICAgICAgICAgICAgPHAtYnV0dG9uICpuZ0lmPVwiIWF1dG8gJiYgc2hvd0NhbmNlbEJ1dHRvblwiIHR5cGU9XCJidXR0b25cIiBbbGFiZWxdPVwiY2FuY2VsQnV0dG9uTGFiZWxcIiAob25DbGljayk9XCJjbGVhcigpXCIgW2Rpc2FibGVkXT1cIiFoYXNGaWxlcygpIHx8IHVwbG9hZGluZ1wiIFtzdHlsZUNsYXNzXT1cImNhbmNlbFN0eWxlQ2xhc3NcIj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjYW5jZWxJY29uXCIgW25nQ2xhc3NdPVwiY2FuY2VsSWNvblwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY2FuY2VsSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjYW5jZWxJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQnXCIgW2F0dHIuYXJpYS1oaWRkZW5dPVwidHJ1ZVwiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNhbmNlbEljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnRcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICAgICAgPC9wLWJ1dHRvbj5cblxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJ0b29sYmFyVGVtcGxhdGVcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiAjY29udGVudCBjbGFzcz1cInAtZmlsZXVwbG9hZC1jb250ZW50XCIgKGRyYWdlbnRlcik9XCJvbkRyYWdFbnRlcigkZXZlbnQpXCIgKGRyYWdsZWF2ZSk9XCJvbkRyYWdMZWF2ZSgkZXZlbnQpXCIgKGRyb3ApPVwib25Ecm9wKCRldmVudClcIiBbYXR0ci5kYXRhLXBjLXNlY3Rpb25dPVwiJ2NvbnRlbnQnXCI+XG4gICAgICAgICAgICAgICAgPHAtcHJvZ3Jlc3NCYXIgW3ZhbHVlXT1cInByb2dyZXNzXCIgW3Nob3dWYWx1ZV09XCJmYWxzZVwiICpuZ0lmPVwiaGFzRmlsZXMoKVwiPjwvcC1wcm9ncmVzc0Jhcj5cblxuICAgICAgICAgICAgICAgIDxwLW1lc3NhZ2VzIFt2YWx1ZV09XCJtc2dzXCIgW2VuYWJsZVNlcnZpY2VdPVwiZmFsc2VcIj48L3AtbWVzc2FnZXM+XG5cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1maWxldXBsb2FkLWZpbGVzXCIgKm5nSWY9XCJoYXNGaWxlcygpXCI+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCIhZmlsZVRlbXBsYXRlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicC1maWxldXBsb2FkLXJvd1wiICpuZ0Zvcj1cImxldCBmaWxlIG9mIGZpbGVzOyBsZXQgaSA9IGluZGV4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj48aW1nIFtzcmNdPVwiZmlsZS5vYmplY3RVUkxcIiAqbmdJZj1cImlzSW1hZ2UoZmlsZSlcIiBbd2lkdGhdPVwicHJldmlld1dpZHRoXCIgKGVycm9yKT1cImltYWdlRXJyb3IoJGV2ZW50KVwiIC8+PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInAtZmlsZXVwbG9hZC1maWxlbmFtZVwiPnt7IGZpbGUubmFtZSB9fTwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXY+e3sgZm9ybWF0U2l6ZShmaWxlLnNpemUpIH19PC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgcEJ1dHRvbiAoY2xpY2spPVwicmVtb3ZlKCRldmVudCwgaSlcIiBbZGlzYWJsZWRdPVwidXBsb2FkaW5nXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uLW9ubHlcIiBbY2xhc3NdPVwicmVtb3ZlU3R5bGVDbGFzc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPFRpbWVzSWNvbiAqbmdJZj1cIiFjYW5jZWxJY29uVGVtcGxhdGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5nLXRlbXBsYXRlICpuZ1RlbXBsYXRlT3V0bGV0PVwiY2FuY2VsSWNvblRlbXBsYXRlXCI+PC9uZy10ZW1wbGF0ZT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgKm5nSWY9XCJmaWxlVGVtcGxhdGVcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSBuZ0ZvciBbbmdGb3JPZl09XCJmaWxlc1wiIFtuZ0ZvclRlbXBsYXRlXT1cImZpbGVUZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJjb250ZW50VGVtcGxhdGU7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBmaWxlcyB9XCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJwLWZpbGV1cGxvYWQgcC1maWxldXBsb2FkLWJhc2ljIHAtY29tcG9uZW50XCIgKm5nSWY9XCJtb2RlID09PSAnYmFzaWMnXCIgW2F0dHIuZGF0YS1wYy1uYW1lXT1cIidmaWxldXBsb2FkJ1wiPlxuICAgICAgICAgICAgPHAtbWVzc2FnZXMgW3ZhbHVlXT1cIm1zZ3NcIiBbZW5hYmxlU2VydmljZV09XCJmYWxzZVwiPjwvcC1tZXNzYWdlcz5cbiAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgW25nQ2xhc3NdPVwieyAncC1idXR0b24gcC1jb21wb25lbnQgcC1maWxldXBsb2FkLWNob29zZSc6IHRydWUsICdwLWJ1dHRvbi1pY29uLW9ubHknOiAhYmFzaWNCdXR0b25MYWJlbCwgJ3AtZmlsZXVwbG9hZC1jaG9vc2Utc2VsZWN0ZWQnOiBoYXNGaWxlcygpLCAncC1mb2N1cyc6IGZvY3VzLCAncC1kaXNhYmxlZCc6IGRpc2FibGVkIH1cIlxuICAgICAgICAgICAgICAgIFtuZ1N0eWxlXT1cInN0eWxlXCJcbiAgICAgICAgICAgICAgICBbY2xhc3NdPVwic3R5bGVDbGFzc1wiXG4gICAgICAgICAgICAgICAgKGNsaWNrKT1cIm9uQmFzaWNVcGxvYWRlckNsaWNrKClcIlxuICAgICAgICAgICAgICAgIChrZXlkb3duKT1cIm9uQmFzaWNLZXlkb3duKCRldmVudClcIlxuICAgICAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiXG4gICAgICAgICAgICAgICAgcFJpcHBsZVxuICAgICAgICAgICAgICAgIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInY2hvb3NlYnV0dG9uJ1wiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cImhhc0ZpbGVzKCkgJiYgIWF1dG87IGVsc2UgY2hvb3NlU2VjdGlvblwiPlxuICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cInVwbG9hZEljb25cIiBjbGFzcz1cInAtYnV0dG9uLWljb24gcC1idXR0b24taWNvbi1sZWZ0XCIgW25nQ2xhc3NdPVwidXBsb2FkSWNvblwiPjwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIiF1cGxvYWRJY29uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8VXBsb2FkSWNvbiAqbmdJZj1cIiF1cGxvYWRJY29uVGVtcGxhdGVcIiBbc3R5bGVDbGFzc109XCIncC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQnXCIgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwidXBsb2FkSWNvblRlbXBsYXRlXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cInVwbG9hZEljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAjY2hvb3NlU2VjdGlvbj5cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJjaG9vc2VJY29uXCIgY2xhc3M9XCJwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCBwaVwiIFtuZ0NsYXNzXT1cImNob29zZUljb25cIj48L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCIhY2hvb3NlSWNvblwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgPFBsdXNJY29uIFtzdHlsZUNsYXNzXT1cIidwLWJ1dHRvbi1pY29uIHAtYnV0dG9uLWljb24tbGVmdCBwaSdcIiAqbmdJZj1cIiFjaG9vc2VJY29uVGVtcGxhdGVcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid1cGxvYWRpY29uJ1wiIC8+XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiAqbmdJZj1cImNob29zZUljb25UZW1wbGF0ZVwiIGNsYXNzPVwicC1idXR0b24taWNvbiBwLWJ1dHRvbi1pY29uLWxlZnQgcGlcIiBbYXR0ci5hcmlhLWhpZGRlbl09XCJ0cnVlXCIgW2F0dHIuZGF0YS1wYy1zZWN0aW9uXT1cIid1cGxvYWRpY29uJ1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuZy10ZW1wbGF0ZSAqbmdUZW1wbGF0ZU91dGxldD1cImNob29zZUljb25UZW1wbGF0ZVwiPjwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDwvbmctdGVtcGxhdGU+XG4gICAgICAgICAgICAgICAgPHNwYW4gKm5nSWY9XCJiYXNpY0J1dHRvbkxhYmVsXCIgY2xhc3M9XCJwLWJ1dHRvbi1sYWJlbFwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInbGFiZWwnXCI+e3sgYmFzaWNCdXR0b25MYWJlbCB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8aW5wdXQgI2Jhc2ljZmlsZWlucHV0IHR5cGU9XCJmaWxlXCIgW2FjY2VwdF09XCJhY2NlcHRcIiBbbXVsdGlwbGVdPVwibXVsdGlwbGVcIiBbZGlzYWJsZWRdPVwiZGlzYWJsZWRcIiAoY2hhbmdlKT1cIm9uRmlsZVNlbGVjdCgkZXZlbnQpXCIgKm5nSWY9XCIhaGFzRmlsZXMoKVwiIChmb2N1cyk9XCJvbkZvY3VzKClcIiAoYmx1cik9XCJvbkJsdXIoKVwiIFthdHRyLmRhdGEtcGMtc2VjdGlvbl09XCInaW5wdXQnXCIgLz5cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgYCxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICAgIHN0eWxlVXJsczogWycuL2ZpbGV1cGxvYWQuY3NzJ10sXG4gICAgaG9zdDoge1xuICAgICAgICBjbGFzczogJ3AtZWxlbWVudCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZpbGVVcGxvYWQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkluaXQsIE9uRGVzdHJveSwgQmxvY2thYmxlVUkge1xuICAgIC8qKlxuICAgICAqIE5hbWUgb2YgdGhlIHJlcXVlc3QgcGFyYW1ldGVyIHRvIGlkZW50aWZ5IHRoZSBmaWxlcyBhdCBiYWNrZW5kLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBSZW1vdGUgdXJsIHRvIHVwbG9hZCB0aGUgZmlsZXMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgdXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogSFRUUCBtZXRob2QgdG8gc2VuZCB0aGUgZmlsZXMgdG8gdGhlIHVybCBzdWNoIGFzIFwicG9zdFwiIGFuZCBcInB1dFwiLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG1ldGhvZDogJ3Bvc3QnIHwgJ3B1dCcgfCB1bmRlZmluZWQgPSAncG9zdCc7XG4gICAgLyoqXG4gICAgICogVXNlZCB0byBzZWxlY3QgbXVsdGlwbGUgZmlsZXMgYXQgb25jZSBmcm9tIGZpbGUgZGlhbG9nLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIG11bHRpcGxlOiBib29sZWFuIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIENvbW1hLXNlcGFyYXRlZCBsaXN0IG9mIHBhdHRlcm4gdG8gcmVzdHJpY3QgdGhlIGFsbG93ZWQgZmlsZSB0eXBlcy4gQ2FuIGJlIGFueSBjb21iaW5hdGlvbiBvZiBlaXRoZXIgdGhlIE1JTUUgdHlwZXMgKHN1Y2ggYXMgXCJpbWFnZS8qXCIpIG9yIHRoZSBmaWxlIGV4dGVuc2lvbnMgKHN1Y2ggYXMgXCIuanBnXCIpLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIERpc2FibGVzIHRoZSB1cGxvYWQgZnVuY3Rpb25hbGl0eS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGVuIGVuYWJsZWQsIHVwbG9hZCBiZWdpbnMgYXV0b21hdGljYWxseSBhZnRlciBzZWxlY3Rpb24gaXMgY29tcGxldGVkLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGF1dG86IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ3Jvc3Mtc2l0ZSBBY2Nlc3MtQ29udHJvbCByZXF1ZXN0cyBzaG91bGQgYmUgbWFkZSB1c2luZyBjcmVkZW50aWFscyBzdWNoIGFzIGNvb2tpZXMsIGF1dGhvcml6YXRpb24gaGVhZGVycyBvciBUTFMgY2xpZW50IGNlcnRpZmljYXRlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB3aXRoQ3JlZGVudGlhbHM6IGJvb2xlYW4gfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTWF4aW11bSBmaWxlIHNpemUgYWxsb3dlZCBpbiBieXRlcy5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBtYXhGaWxlU2l6ZTogbnVtYmVyIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN1bW1hcnkgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHNpemUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVTaXplTWVzc2FnZVN1bW1hcnk6IHN0cmluZyA9ICd7MH06IEludmFsaWQgZmlsZSBzaXplLCAnO1xuICAgIC8qKlxuICAgICAqIERldGFpbCBtZXNzYWdlIG9mIHRoZSBpbnZhbGlkIGZpbGUgc2l6ZS5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBpbnZhbGlkRmlsZVNpemVNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnbWF4aW11bSB1cGxvYWQgc2l6ZSBpcyB7MH0uJztcbiAgICAvKipcbiAgICAgKiBTdW1tYXJ5IG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlVHlwZU1lc3NhZ2VTdW1tYXJ5OiBzdHJpbmcgPSAnezB9OiBJbnZhbGlkIGZpbGUgdHlwZSwgJztcbiAgICAvKipcbiAgICAgKiBEZXRhaWwgbWVzc2FnZSBvZiB0aGUgaW52YWxpZCBmaWxlIHR5cGUuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgaW52YWxpZEZpbGVUeXBlTWVzc2FnZURldGFpbDogc3RyaW5nID0gJ2FsbG93ZWQgZmlsZSB0eXBlczogezB9Lic7XG4gICAgLyoqXG4gICAgICogRGV0YWlsIG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlTGltaXRNZXNzYWdlRGV0YWlsOiBzdHJpbmcgPSAnbGltaXQgaXMgezB9IGF0IG1vc3QuJztcbiAgICAvKipcbiAgICAgKiBTdW1tYXJ5IG1lc3NhZ2Ugb2YgdGhlIGludmFsaWQgZmlsZSB0eXBlLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGludmFsaWRGaWxlTGltaXRNZXNzYWdlU3VtbWFyeTogc3RyaW5nID0gJ01heGltdW0gbnVtYmVyIG9mIGZpbGVzIGV4Y2VlZGVkLCAnO1xuICAgIC8qKlxuICAgICAqIElubGluZSBzdHlsZSBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZTogeyBba2xhc3M6IHN0cmluZ106IGFueSB9IHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBDbGFzcyBvZiB0aGUgZWxlbWVudC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBzdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogV2lkdGggb2YgdGhlIGltYWdlIHRodW1ibmFpbCBpbiBwaXhlbHMuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgcHJldmlld1dpZHRoOiBudW1iZXIgPSA1MDtcbiAgICAvKipcbiAgICAgKiBMYWJlbCBvZiB0aGUgY2hvb3NlIGJ1dHRvbi4gRGVmYXVsdHMgdG8gUHJpbWVORyBMb2NhbGUgY29uZmlndXJhdGlvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaG9vc2VMYWJlbDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIExhYmVsIG9mIHRoZSB1cGxvYWQgYnV0dG9uLiBEZWZhdWx0cyB0byBQcmltZU5HIExvY2FsZSBjb25maWd1cmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwbG9hZExhYmVsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogTGFiZWwgb2YgdGhlIGNhbmNlbCBidXR0b24uIERlZmF1bHRzIHRvIFByaW1lTkcgTG9jYWxlIGNvbmZpZ3VyYXRpb24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FuY2VsTGFiZWw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSBjaG9vc2UgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNob29zZUljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSB1cGxvYWQgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHVwbG9hZEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBJY29uIG9mIHRoZSBjYW5jZWwgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGNhbmNlbEljb246IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHNob3cgdGhlIHVwbG9hZCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgc2hvd1VwbG9hZEJ1dHRvbjogYm9vbGVhbiA9IHRydWU7XG4gICAgLyoqXG4gICAgICogV2hldGhlciB0byBzaG93IHRoZSBjYW5jZWwgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHNob3dDYW5jZWxCdXR0b246IGJvb2xlYW4gPSB0cnVlO1xuICAgIC8qKlxuICAgICAqIERlZmluZXMgdGhlIFVJIG9mIHRoZSBjb21wb25lbnQuXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgbW9kZTogJ2FkdmFuY2VkJyB8ICdiYXNpYycgfCB1bmRlZmluZWQgPSAnYWR2YW5jZWQnO1xuICAgIC8qKlxuICAgICAqIEh0dHBIZWFkZXJzIGNsYXNzIHJlcHJlc2VudHMgdGhlIGhlYWRlciBjb25maWd1cmF0aW9uIG9wdGlvbnMgZm9yIGFuIEhUVFAgcmVxdWVzdC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBoZWFkZXJzOiBIdHRwSGVhZGVycyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBXaGV0aGVyIHRvIHVzZSB0aGUgZGVmYXVsdCB1cGxvYWQgb3IgYSBtYW51YWwgaW1wbGVtZW50YXRpb24gZGVmaW5lZCBpbiB1cGxvYWRIYW5kbGVyIGNhbGxiYWNrLiBEZWZhdWx0cyB0byBQcmltZU5HIExvY2FsZSBjb25maWd1cmF0aW9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIGN1c3RvbVVwbG9hZDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBNYXhpbXVtIG51bWJlciBvZiBmaWxlcyB0aGF0IGNhbiBiZSB1cGxvYWRlZC5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBmaWxlTGltaXQ6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgdXBsb2FkIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSB1cGxvYWRTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogU3R5bGUgY2xhc3Mgb2YgdGhlIGNhbmNlbCBidXR0b24uXG4gICAgICogQGdyb3VwIFByb3BzXG4gICAgICovXG4gICAgQElucHV0KCkgY2FuY2VsU3R5bGVDbGFzczogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIC8qKlxuICAgICAqIFN0eWxlIGNsYXNzIG9mIHRoZSByZW1vdmUgYnV0dG9uLlxuICAgICAqIEBncm91cCBQcm9wc1xuICAgICAqL1xuICAgIEBJbnB1dCgpIHJlbW92ZVN0eWxlQ2xhc3M6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAvKipcbiAgICAgKiBTdHlsZSBjbGFzcyBvZiB0aGUgY2hvb3NlIGJ1dHRvbi5cbiAgICAgKiBAZ3JvdXAgUHJvcHNcbiAgICAgKi9cbiAgICBASW5wdXQoKSBjaG9vc2VTdHlsZUNsYXNzOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGJlZm9yZSBmaWxlIHVwbG9hZCBpcyBpbml0aWFsaXplZC5cbiAgICAgKiBAcGFyYW0ge0ZpbGVCZWZvcmVVcGxvYWRFdmVudH0gZXZlbnQgLSBDdXN0b20gdXBsb2FkIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkJlZm9yZVVwbG9hZDogRXZlbnRFbWl0dGVyPEZpbGVCZWZvcmVVcGxvYWRFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVCZWZvcmVVcGxvYWRFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBBbiBldmVudCBpbmRpY2F0aW5nIHRoYXQgdGhlIHJlcXVlc3Qgd2FzIHNlbnQgdG8gdGhlIHNlcnZlci4gVXNlZnVsIHdoZW4gYSByZXF1ZXN0IG1heSBiZSByZXRyaWVkIG11bHRpcGxlIHRpbWVzLCB0byBkaXN0aW5ndWlzaCBiZXR3ZWVuIHJldHJpZXMgb24gdGhlIGZpbmFsIGV2ZW50IHN0cmVhbS5cbiAgICAgKiBAcGFyYW0ge0ZpbGVTZW5kRXZlbnR9IGV2ZW50IC0gQ3VzdG9tIHNlbmQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uU2VuZDogRXZlbnRFbWl0dGVyPEZpbGVTZW5kRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlU2VuZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGZpbGUgdXBsb2FkIGlzIGNvbXBsZXRlLlxuICAgICAqIEBwYXJhbSB7RmlsZVVwbG9hZEV2ZW50fSBldmVudCAtIEN1c3RvbSB1cGxvYWQgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uVXBsb2FkOiBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSBpZiBmaWxlIHVwbG9hZCBmYWlscy5cbiAgICAgKiBAcGFyYW0ge0ZpbGVVcGxvYWRFcnJvckV2ZW50fSBldmVudCAtIEN1c3RvbSBlcnJvciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25FcnJvcjogRXZlbnRFbWl0dGVyPEZpbGVVcGxvYWRFcnJvckV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVVwbG9hZEVycm9yRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIHdoZW4gZmlsZXMgaW4gcXVldWUgYXJlIHJlbW92ZWQgd2l0aG91dCB1cGxvYWRpbmcgdXNpbmcgY2xlYXIgYWxsIGJ1dHRvbi5cbiAgICAgKiBAcGFyYW0ge0V2ZW50fSBldmVudCAtIEJyb3dzZXIgZXZlbnQuXG4gICAgICogQGdyb3VwIEVtaXRzXG4gICAgICovXG4gICAgQE91dHB1dCgpIG9uQ2xlYXI6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIENhbGxiYWNrIHRvIGludm9rZSB3aGVuIGEgZmlsZSBpcyByZW1vdmVkIHdpdGhvdXQgdXBsb2FkaW5nIHVzaW5nIGNsZWFyIGJ1dHRvbiBvZiBhIGZpbGUuXG4gICAgICogQHBhcmFtIHtGaWxlUmVtb3ZlRXZlbnR9IGV2ZW50IC0gUmVtb3ZlIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblJlbW92ZTogRXZlbnRFbWl0dGVyPEZpbGVSZW1vdmVFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVSZW1vdmVFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBmaWxlcyBhcmUgc2VsZWN0ZWQuXG4gICAgICogQHBhcmFtIHtGaWxlU2VsZWN0RXZlbnR9IGV2ZW50IC0gU2VsZWN0IGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvblNlbGVjdDogRXZlbnRFbWl0dGVyPEZpbGVTZWxlY3RFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEZpbGVTZWxlY3RFdmVudD4oKTtcbiAgICAvKipcbiAgICAgKiBDYWxsYmFjayB0byBpbnZva2Ugd2hlbiBmaWxlcyBhcmUgYmVpbmcgdXBsb2FkZWQuXG4gICAgICogQHBhcmFtIHtGaWxlUHJvZ3Jlc3NFdmVudH0gZXZlbnQgLSBQcm9ncmVzcyBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgb25Qcm9ncmVzczogRXZlbnRFbWl0dGVyPEZpbGVQcm9ncmVzc0V2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8RmlsZVByb2dyZXNzRXZlbnQ+KCk7XG4gICAgLyoqXG4gICAgICogQ2FsbGJhY2sgdG8gaW52b2tlIGluIGN1c3RvbSB1cGxvYWQgbW9kZSB0byB1cGxvYWQgdGhlIGZpbGVzIG1hbnVhbGx5LlxuICAgICAqIEBwYXJhbSB7RmlsZVVwbG9hZEhhbmRsZXJFdmVudH0gZXZlbnQgLSBVcGxvYWQgaGFuZGxlciBldmVudC5cbiAgICAgKiBAZ3JvdXAgRW1pdHNcbiAgICAgKi9cbiAgICBAT3V0cHV0KCkgdXBsb2FkSGFuZGxlcjogRXZlbnRFbWl0dGVyPEZpbGVVcGxvYWRIYW5kbGVyRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxGaWxlVXBsb2FkSGFuZGxlckV2ZW50PigpO1xuICAgIC8qKlxuICAgICAqIFRoaXMgZXZlbnQgaXMgdHJpZ2dlcmVkIGlmIGFuIGVycm9yIG9jY3VycyB3aGlsZSBsb2FkaW5nIGFuIGltYWdlIGZpbGUuXG4gICAgICogQHBhcmFtIHtFdmVudH0gZXZlbnQgLSBCcm93c2VyIGV2ZW50LlxuICAgICAqIEBncm91cCBFbWl0c1xuICAgICAqL1xuICAgIEBPdXRwdXQoKSBvbkltYWdlRXJyb3I6IEV2ZW50RW1pdHRlcjxFdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEV2ZW50PigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihQcmltZVRlbXBsYXRlKSB0ZW1wbGF0ZXM6IFF1ZXJ5TGlzdDxQcmltZVRlbXBsYXRlPiB8IHVuZGVmaW5lZDtcblxuICAgIEBWaWV3Q2hpbGQoJ2FkdmFuY2VkZmlsZWlucHV0JykgYWR2YW5jZWRGaWxlSW5wdXQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQgfCBhbnk7XG5cbiAgICBAVmlld0NoaWxkKCdiYXNpY2ZpbGVpbnB1dCcpIGJhc2ljRmlsZUlucHV0OiBFbGVtZW50UmVmIHwgdW5kZWZpbmVkO1xuXG4gICAgQFZpZXdDaGlsZCgnY29udGVudCcpIGNvbnRlbnQ6IEVsZW1lbnRSZWYgfCB1bmRlZmluZWQ7XG5cbiAgICBASW5wdXQoKSBzZXQgZmlsZXMoZmlsZXMpIHtcbiAgICAgICAgdGhpcy5fZmlsZXMgPSBbXTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGZpbGVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgZmlsZSA9IGZpbGVzW2ldO1xuXG4gICAgICAgICAgICBpZiAodGhpcy52YWxpZGF0ZShmaWxlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW1hZ2UoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgKDxhbnk+ZmlsZSkub2JqZWN0VVJMID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1tpXSkpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuX2ZpbGVzLnB1c2goZmlsZXNbaV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0IGZpbGVzKCk6IEZpbGVbXSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9maWxlcztcbiAgICB9XG5cbiAgICBwdWJsaWMgZ2V0IGJhc2ljQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuYXV0byB8fCAhdGhpcy5oYXNGaWxlcygpKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jaG9vc2VMYWJlbCBhcyBzdHJpbmc7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhpcy51cGxvYWRMYWJlbCA/PyB0aGlzLmZpbGVzWzBdLm5hbWU7XG4gICAgfVxuXG4gICAgcHVibGljIF9maWxlczogRmlsZVtdID0gW107XG5cbiAgICBwdWJsaWMgcHJvZ3Jlc3M6IG51bWJlciA9IDA7XG5cbiAgICBwdWJsaWMgZHJhZ0hpZ2hsaWdodDogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyBtc2dzOiBNZXNzYWdlW10gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgZmlsZVRlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+IHwgdW5kZWZpbmVkO1xuXG4gICAgcHVibGljIGNvbnRlbnRUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PiB8IHVuZGVmaW5lZDtcblxuICAgIHB1YmxpYyB0b29sYmFyVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjaG9vc2VJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICB1cGxvYWRJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBjYW5jZWxJY29uVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT4gfCB1bmRlZmluZWQ7XG5cbiAgICBwdWJsaWMgdXBsb2FkZWRGaWxlQ291bnQ6IG51bWJlciA9IDA7XG5cbiAgICBmb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIHVwbG9hZGluZzogYm9vbGVhbiB8IHVuZGVmaW5lZDtcblxuICAgIGR1cGxpY2F0ZUlFRXZlbnQ6IGJvb2xlYW4gfCB1bmRlZmluZWQ7IC8vIGZsYWcgdG8gcmVjb2duaXplIGR1cGxpY2F0ZSBvbmNoYW5nZSBldmVudCBmb3IgZmlsZSBpbnB1dFxuXG4gICAgdHJhbnNsYXRpb25TdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiB8IHVuZGVmaW5lZDtcblxuICAgIGRyYWdPdmVyTGlzdGVuZXI6IFZvaWRMaXN0ZW5lcjtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIGRvY3VtZW50OiBEb2N1bWVudCxcbiAgICAgICAgQEluamVjdChQTEFURk9STV9JRCkgcHJpdmF0ZSBwbGF0Zm9ybUlkOiBhbnksXG4gICAgICAgIHByaXZhdGUgcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgICAgICAgcHJpdmF0ZSBlbDogRWxlbWVudFJlZixcbiAgICAgICAgcHVibGljIHNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgICBwdWJsaWMgem9uZTogTmdab25lLFxuICAgICAgICBwcml2YXRlIGh0dHA6IEh0dHBDbGllbnQsXG4gICAgICAgIHB1YmxpYyBjZDogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICAgIHB1YmxpYyBjb25maWc6IFByaW1lTkdDb25maWdcbiAgICApIHt9XG5cbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XG4gICAgICAgIHRoaXMudGVtcGxhdGVzPy5mb3JFYWNoKChpdGVtKSA9PiB7XG4gICAgICAgICAgICBzd2l0Y2ggKGl0ZW0uZ2V0VHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnZmlsZSc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZVRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdjb250ZW50JzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb250ZW50VGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ3Rvb2xiYXInOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRvb2xiYXJUZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSAnY2hvb3NlaWNvbic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hvb3NlSWNvblRlbXBsYXRlID0gaXRlbS50ZW1wbGF0ZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICd1cGxvYWRpY29uJzpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGxvYWRJY29uVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgJ2NhbmNlbGljb24nOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNhbmNlbEljb25UZW1wbGF0ZSA9IGl0ZW0udGVtcGxhdGU7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlVGVtcGxhdGUgPSBpdGVtLnRlbXBsYXRlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKSB7XG4gICAgICAgIHRoaXMudHJhbnNsYXRpb25TdWJzY3JpcHRpb24gPSB0aGlzLmNvbmZpZy50cmFuc2xhdGlvbk9ic2VydmVyLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgICAgIGlmIChpc1BsYXRmb3JtQnJvd3Nlcih0aGlzLnBsYXRmb3JtSWQpKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnYWR2YW5jZWQnKSB7XG4gICAgICAgICAgICAgICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY29udGVudCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gdGhpcy5yZW5kZXJlci5saXN0ZW4odGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQsICdkcmFnb3ZlcicsIHRoaXMub25EcmFnT3Zlci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZ2V0VHJhbnNsYXRpb24ob3B0aW9uOiBzdHJpbmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKG9wdGlvbik7XG4gICAgfVxuXG4gICAgY2hvb3NlKCkge1xuICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Py5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgb25GaWxlU2VsZWN0KGV2ZW50OiBhbnkpIHtcbiAgICAgICAgaWYgKGV2ZW50LnR5cGUgIT09ICdkcm9wJyAmJiB0aGlzLmlzSUUxMSgpICYmIHRoaXMuZHVwbGljYXRlSUVFdmVudCkge1xuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVJRUV2ZW50ID0gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgaWYgKCF0aGlzLm11bHRpcGxlKSB7XG4gICAgICAgICAgICB0aGlzLmZpbGVzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICBsZXQgZmlsZXMgPSBldmVudC5kYXRhVHJhbnNmZXIgPyBldmVudC5kYXRhVHJhbnNmZXIuZmlsZXMgOiBldmVudC50YXJnZXQuZmlsZXM7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZmlsZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBmaWxlID0gZmlsZXNbaV07XG5cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0ZpbGVTZWxlY3RlZChmaWxlKSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnZhbGlkYXRlKGZpbGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzSW1hZ2UoZmlsZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGUub2JqZWN0VVJMID0gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFVybCh3aW5kb3cuVVJMLmNyZWF0ZU9iamVjdFVSTChmaWxlc1tpXSkpO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlcy5wdXNoKGZpbGVzW2ldKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLm9uU2VsZWN0LmVtaXQoeyBvcmlnaW5hbEV2ZW50OiBldmVudCwgZmlsZXM6IGZpbGVzLCBjdXJyZW50RmlsZXM6IHRoaXMuZmlsZXMgfSk7XG5cbiAgICAgICAgLy8gdGhpcyB3aWxsIGNoZWNrIHRoZSBmaWxlTGltaXQgd2l0aCB0aGUgdXBsb2FkZWQgZmlsZXNcbiAgICAgICAgdGhpcy5jaGVja0ZpbGVMaW1pdChmaWxlcyk7XG5cbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsZXMoKSAmJiB0aGlzLmF1dG8gJiYgISh0aGlzLm1vZGUgPT09ICdhZHZhbmNlZCcpICYmICF0aGlzLmlzRmlsZUxpbWl0RXhjZWVkZWQoKSkge1xuICAgICAgICAgICAgdGhpcy51cGxvYWQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChldmVudC50eXBlICE9PSAnZHJvcCcgJiYgdGhpcy5pc0lFMTEoKSkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcklFSW5wdXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGlzRmlsZVNlbGVjdGVkKGZpbGU6IEZpbGUpOiBib29sZWFuIHtcbiAgICAgICAgZm9yIChsZXQgc0ZpbGUgb2YgdGhpcy5maWxlcykge1xuICAgICAgICAgICAgaWYgKHNGaWxlLm5hbWUgKyBzRmlsZS50eXBlICsgc0ZpbGUuc2l6ZSA9PT0gZmlsZS5uYW1lICsgZmlsZS50eXBlICsgZmlsZS5zaXplKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgaXNJRTExKCkge1xuICAgICAgICBpZiAoaXNQbGF0Zm9ybUJyb3dzZXIodGhpcy5wbGF0Zm9ybUlkKSkge1xuICAgICAgICAgICAgcmV0dXJuICEhKHRoaXMuZG9jdW1lbnQuZGVmYXVsdFZpZXcgYXMgYW55KVsnTVNJbnB1dE1ldGhvZENvbnRleHQnXSAmJiAhISh0aGlzLmRvY3VtZW50IGFzIGFueSlbJ2RvY3VtZW50TW9kZSddO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgdmFsaWRhdGUoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICB0aGlzLm1zZ3MgPSB0aGlzLm1zZ3MgfHwgW107XG4gICAgICAgIGlmICh0aGlzLmFjY2VwdCAmJiAhdGhpcy5pc0ZpbGVUeXBlVmFsaWQoZmlsZSkpIHtcbiAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLmludmFsaWRGaWxlVHlwZU1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsIGZpbGUubmFtZSksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlVHlwZU1lc3NhZ2VEZXRhaWwucmVwbGFjZSgnezB9JywgdGhpcy5hY2NlcHQpXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLm1heEZpbGVTaXplICYmIGZpbGUuc2l6ZSA+IHRoaXMubWF4RmlsZVNpemUpIHtcbiAgICAgICAgICAgIHRoaXMubXNncy5wdXNoKHtcbiAgICAgICAgICAgICAgICBzZXZlcml0eTogJ2Vycm9yJyxcbiAgICAgICAgICAgICAgICBzdW1tYXJ5OiB0aGlzLmludmFsaWRGaWxlU2l6ZU1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsIGZpbGUubmFtZSksXG4gICAgICAgICAgICAgICAgZGV0YWlsOiB0aGlzLmludmFsaWRGaWxlU2l6ZU1lc3NhZ2VEZXRhaWwucmVwbGFjZSgnezB9JywgdGhpcy5mb3JtYXRTaXplKHRoaXMubWF4RmlsZVNpemUpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlzRmlsZVR5cGVWYWxpZChmaWxlOiBGaWxlKTogYm9vbGVhbiB7XG4gICAgICAgIGxldCBhY2NlcHRhYmxlVHlwZXMgPSB0aGlzLmFjY2VwdD8uc3BsaXQoJywnKS5tYXAoKHR5cGUpID0+IHR5cGUudHJpbSgpKTtcbiAgICAgICAgZm9yIChsZXQgdHlwZSBvZiBhY2NlcHRhYmxlVHlwZXMhKSB7XG4gICAgICAgICAgICBsZXQgYWNjZXB0YWJsZSA9IHRoaXMuaXNXaWxkY2FyZCh0eXBlKSA/IHRoaXMuZ2V0VHlwZUNsYXNzKGZpbGUudHlwZSkgPT09IHRoaXMuZ2V0VHlwZUNsYXNzKHR5cGUpIDogZmlsZS50eXBlID09IHR5cGUgfHwgdGhpcy5nZXRGaWxlRXh0ZW5zaW9uKGZpbGUpLnRvTG93ZXJDYXNlKCkgPT09IHR5cGUudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICAgICAgaWYgKGFjY2VwdGFibGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBnZXRUeXBlQ2xhc3MoZmlsZVR5cGU6IHN0cmluZyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBmaWxlVHlwZS5zdWJzdHJpbmcoMCwgZmlsZVR5cGUuaW5kZXhPZignLycpKTtcbiAgICB9XG5cbiAgICBpc1dpbGRjYXJkKGZpbGVUeXBlOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIGZpbGVUeXBlLmluZGV4T2YoJyonKSAhPT0gLTE7XG4gICAgfVxuXG4gICAgZ2V0RmlsZUV4dGVuc2lvbihmaWxlOiBGaWxlKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuICcuJyArIGZpbGUubmFtZS5zcGxpdCgnLicpLnBvcCgpO1xuICAgIH1cblxuICAgIGlzSW1hZ2UoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gL15pbWFnZVxcLy8udGVzdChmaWxlLnR5cGUpO1xuICAgIH1cblxuICAgIG9uSW1hZ2VMb2FkKGltZzogYW55KSB7XG4gICAgICAgIHdpbmRvdy5VUkwucmV2b2tlT2JqZWN0VVJMKGltZy5zcmMpO1xuICAgIH1cbiAgICAvKipcbiAgICAgKiBVcGxvYWRzIHRoZSBzZWxlY3RlZCBmaWxlcy5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgdXBsb2FkKCkge1xuICAgICAgICBpZiAodGhpcy5jdXN0b21VcGxvYWQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmZpbGVMaW1pdCkge1xuICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZWRGaWxlQ291bnQgKz0gdGhpcy5maWxlcy5sZW5ndGg7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRoaXMudXBsb2FkSGFuZGxlci5lbWl0KHtcbiAgICAgICAgICAgICAgICBmaWxlczogdGhpcy5maWxlc1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIHRoaXMuY2QubWFya0ZvckNoZWNrKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm1zZ3MgPSBbXTtcbiAgICAgICAgICAgIGxldCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuXG4gICAgICAgICAgICB0aGlzLm9uQmVmb3JlVXBsb2FkLmVtaXQoe1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YVxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5maWxlcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgICAgIGZvcm1EYXRhLmFwcGVuZCh0aGlzLm5hbWUhLCB0aGlzLmZpbGVzW2ldLCB0aGlzLmZpbGVzW2ldLm5hbWUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLmh0dHBcbiAgICAgICAgICAgICAgICAucmVxdWVzdCg8c3RyaW5nPnRoaXMubWV0aG9kLCB0aGlzLnVybCBhcyBzdHJpbmcsIHtcbiAgICAgICAgICAgICAgICAgICAgYm9keTogZm9ybURhdGEsXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHRoaXMuaGVhZGVycyxcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0UHJvZ3Jlc3M6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIG9ic2VydmU6ICdldmVudHMnLFxuICAgICAgICAgICAgICAgICAgICB3aXRoQ3JlZGVudGlhbHM6IHRoaXMud2l0aENyZWRlbnRpYWxzXG4gICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAoZXZlbnQ6IEh0dHBFdmVudDxhbnk+KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIEh0dHBFdmVudFR5cGUuU2VudDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5vblNlbmQuZW1pdCh7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBldmVudCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvcm1EYXRhOiBmb3JtRGF0YVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FzZSBIdHRwRXZlbnRUeXBlLlJlc3BvbnNlOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnVwbG9hZGluZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gMDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbJ3N0YXR1cyddID49IDIwMCAmJiBldmVudFsnc3RhdHVzJ10gPCAzMDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmZpbGVMaW1pdCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkZWRGaWxlQ291bnQgKz0gdGhpcy5maWxlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25VcGxvYWQuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBmaWxlczogdGhpcy5maWxlcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMub25FcnJvci5lbWl0KHsgZmlsZXM6IHRoaXMuZmlsZXMgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgSHR0cEV2ZW50VHlwZS5VcGxvYWRQcm9ncmVzczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXZlbnRbJ2xvYWRlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnByb2dyZXNzID0gTWF0aC5yb3VuZCgoZXZlbnRbJ2xvYWRlZCddICogMTAwKSAvIGV2ZW50Wyd0b3RhbCddISk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uUHJvZ3Jlc3MuZW1pdCh7IG9yaWdpbmFsRXZlbnQ6IGV2ZW50LCBwcm9ncmVzczogdGhpcy5wcm9ncmVzcyB9KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNkLm1hcmtGb3JDaGVjaygpO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoZXJyb3I6IEVycm9yRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudXBsb2FkaW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRXJyb3IuZW1pdCh7IGZpbGVzOiB0aGlzLmZpbGVzLCBlcnJvcjogZXJyb3IgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgfVxuICAgIC8qKlxuICAgICAqIENsZWFycyB0aGUgZmlsZXMgbGlzdC5cbiAgICAgKiBAZ3JvdXAgTWV0aG9kXG4gICAgICovXG4gICAgY2xlYXIoKSB7XG4gICAgICAgIHRoaXMuZmlsZXMgPSBbXTtcbiAgICAgICAgdGhpcy51cGxvYWRlZEZpbGVDb3VudCA9IDA7XG4gICAgICAgIHRoaXMub25DbGVhci5lbWl0KCk7XG4gICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5jZC5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG5cbiAgICByZW1vdmUoZXZlbnQ6IEV2ZW50LCBpbmRleDogbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuY2xlYXJJbnB1dEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5vblJlbW92ZS5lbWl0KHsgb3JpZ2luYWxFdmVudDogZXZlbnQsIGZpbGU6IHRoaXMuZmlsZXNbaW5kZXhdIH0pO1xuICAgICAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIHRoaXMuY2hlY2tGaWxlTGltaXQodGhpcy5maWxlcyk7XG4gICAgfVxuXG4gICAgaXNGaWxlTGltaXRFeGNlZWRlZCgpIHtcbiAgICAgICAgY29uc3QgaXNBdXRvTW9kZSA9IHRoaXMuYXV0bztcbiAgICAgICAgY29uc3QgdG90YWxGaWxlQ291bnQgPSBpc0F1dG9Nb2RlID8gdGhpcy5maWxlcy5sZW5ndGggOiB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQ7XG5cbiAgICAgICAgaWYgKHRoaXMuZmlsZUxpbWl0ICYmIHRoaXMuZmlsZUxpbWl0IDw9IHRvdGFsRmlsZUNvdW50ICYmIHRoaXMuZm9jdXMpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXMgPSBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8IHRvdGFsRmlsZUNvdW50O1xuICAgIH1cblxuICAgIGlzQ2hvb3NlRGlzYWJsZWQoKSB7XG4gICAgICAgIGlmICh0aGlzLmF1dG8pIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8PSB0aGlzLmZpbGVzLmxlbmd0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZpbGVMaW1pdCAmJiB0aGlzLmZpbGVMaW1pdCA8PSB0aGlzLmZpbGVzLmxlbmd0aCArIHRoaXMudXBsb2FkZWRGaWxlQ291bnQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjaGVja0ZpbGVMaW1pdChmaWxlczogRmlsZVtdKSB7XG4gICAgICAgIHRoaXMubXNncyA/Pz0gW107XG4gICAgICAgIGNvbnN0IGhhc0V4aXN0aW5nVmFsaWRhdGlvbk1lc3NhZ2VzID0gdGhpcy5tc2dzLmxlbmd0aCA+IDAgJiYgdGhpcy5maWxlTGltaXQgPCBmaWxlcy5sZW5ndGg7XG4gICAgICAgIGlmICh0aGlzLmlzRmlsZUxpbWl0RXhjZWVkZWQoKSB8fCBoYXNFeGlzdGluZ1ZhbGlkYXRpb25NZXNzYWdlcykge1xuICAgICAgICAgICAgdGhpcy5tc2dzLnB1c2goe1xuICAgICAgICAgICAgICAgIHNldmVyaXR5OiAnZXJyb3InLFxuICAgICAgICAgICAgICAgIHN1bW1hcnk6IHRoaXMuaW52YWxpZEZpbGVMaW1pdE1lc3NhZ2VTdW1tYXJ5LnJlcGxhY2UoJ3swfScsICh0aGlzLmZpbGVMaW1pdCBhcyBudW1iZXIpLnRvU3RyaW5nKCkpLFxuICAgICAgICAgICAgICAgIGRldGFpbDogdGhpcy5pbnZhbGlkRmlsZUxpbWl0TWVzc2FnZURldGFpbC5yZXBsYWNlKCd7MH0nLCAodGhpcy5maWxlTGltaXQgYXMgbnVtYmVyKS50b1N0cmluZygpKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcklucHV0RWxlbWVudCgpIHtcbiAgICAgICAgaWYgKHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQgJiYgdGhpcy5hZHZhbmNlZEZpbGVJbnB1dC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLmJhc2ljRmlsZUlucHV0ICYmIHRoaXMuYmFzaWNGaWxlSW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5iYXNpY0ZpbGVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjbGVhcklFSW5wdXQoKSB7XG4gICAgICAgIGlmICh0aGlzLmFkdmFuY2VkRmlsZUlucHV0ICYmIHRoaXMuYWR2YW5jZWRGaWxlSW5wdXQubmF0aXZlRWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5kdXBsaWNhdGVJRUV2ZW50ID0gdHJ1ZTsgLy9JRTExIGZpeCB0byBwcmV2ZW50IG9uRmlsZUNoYW5nZSB0cmlnZ2VyIGFnYWluXG4gICAgICAgICAgICB0aGlzLmFkdmFuY2VkRmlsZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGhhc0ZpbGVzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5maWxlcyAmJiB0aGlzLmZpbGVzLmxlbmd0aCA+IDA7XG4gICAgfVxuXG4gICAgb25EcmFnRW50ZXIoZTogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ092ZXIoZTogRHJhZ0V2ZW50KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5hZGRDbGFzcyh0aGlzLmNvbnRlbnQ/Lm5hdGl2ZUVsZW1lbnQsICdwLWZpbGV1cGxvYWQtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICB0aGlzLmRyYWdIaWdobGlnaHQgPSB0cnVlO1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJhZ0xlYXZlKGV2ZW50OiBEcmFnRXZlbnQpIHtcbiAgICAgICAgaWYgKCF0aGlzLmRpc2FibGVkKSB7XG4gICAgICAgICAgICBEb21IYW5kbGVyLnJlbW92ZUNsYXNzKHRoaXMuY29udGVudD8ubmF0aXZlRWxlbWVudCwgJ3AtZmlsZXVwbG9hZC1oaWdobGlnaHQnKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uRHJvcChldmVudDogYW55KSB7XG4gICAgICAgIGlmICghdGhpcy5kaXNhYmxlZCkge1xuICAgICAgICAgICAgRG9tSGFuZGxlci5yZW1vdmVDbGFzcyh0aGlzLmNvbnRlbnQ/Lm5hdGl2ZUVsZW1lbnQsICdwLWZpbGV1cGxvYWQtaGlnaGxpZ2h0Jyk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIGxldCBmaWxlcyA9IGV2ZW50LmRhdGFUcmFuc2ZlciA/IGV2ZW50LmRhdGFUcmFuc2Zlci5maWxlcyA6IGV2ZW50LnRhcmdldC5maWxlcztcbiAgICAgICAgICAgIGxldCBhbGxvd0Ryb3AgPSB0aGlzLm11bHRpcGxlIHx8IChmaWxlcyAmJiBmaWxlcy5sZW5ndGggPT09IDEpO1xuXG4gICAgICAgICAgICBpZiAoYWxsb3dEcm9wKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5vbkZpbGVTZWxlY3QoZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgb25Gb2N1cygpIHtcbiAgICAgICAgdGhpcy5mb2N1cyA9IHRydWU7XG4gICAgfVxuXG4gICAgb25CbHVyKCkge1xuICAgICAgICB0aGlzLmZvY3VzID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZm9ybWF0U2l6ZShieXRlczogbnVtYmVyKSB7XG4gICAgICAgIGNvbnN0IGsgPSAxMDI0O1xuICAgICAgICBjb25zdCBkbSA9IDM7XG4gICAgICAgIGNvbnN0IHNpemVzID0gdGhpcy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuRklMRV9TSVpFX1RZUEVTKTtcblxuICAgICAgICBpZiAoYnl0ZXMgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBgMCAke3NpemVzWzBdfWA7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyhieXRlcykgLyBNYXRoLmxvZyhrKSk7XG4gICAgICAgIGNvbnN0IGZvcm1hdHRlZFNpemUgPSAoYnl0ZXMgLyBNYXRoLnBvdyhrLCBpKSkudG9GaXhlZChkbSk7XG5cbiAgICAgICAgcmV0dXJuIGAke2Zvcm1hdHRlZFNpemV9ICR7c2l6ZXNbaV19YDtcbiAgICB9XG5cbiAgICBvbkJhc2ljVXBsb2FkZXJDbGljaygpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzRmlsZXMoKSkgdGhpcy51cGxvYWQoKTtcbiAgICAgICAgZWxzZSB0aGlzLmJhc2ljRmlsZUlucHV0Py5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gICAgfVxuXG4gICAgb25CYXNpY0tleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcbiAgICAgICAgc3dpdGNoIChldmVudC5jb2RlKSB7XG4gICAgICAgICAgICBjYXNlICdTcGFjZSc6XG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgdGhpcy5vbkJhc2ljVXBsb2FkZXJDbGljaygpO1xuXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGltYWdlRXJyb3IoZXZlbnQ6IEV2ZW50KSB7XG4gICAgICAgIHRoaXMub25JbWFnZUVycm9yLmVtaXQoZXZlbnQpO1xuICAgIH1cblxuICAgIGdldEJsb2NrYWJsZUVsZW1lbnQoKTogSFRNTEVsZW1lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5lbC5uYXRpdmVFbGVtZW50LmNoaWxkcmVuWzBdO1xuICAgIH1cblxuICAgIGdldCBjaG9vc2VCdXR0b25MYWJlbCgpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdGhpcy5jaG9vc2VMYWJlbCB8fCB0aGlzLmNvbmZpZy5nZXRUcmFuc2xhdGlvbihUcmFuc2xhdGlvbktleXMuQ0hPT1NFKTtcbiAgICB9XG5cbiAgICBnZXQgdXBsb2FkQnV0dG9uTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudXBsb2FkTGFiZWwgfHwgdGhpcy5jb25maWcuZ2V0VHJhbnNsYXRpb24oVHJhbnNsYXRpb25LZXlzLlVQTE9BRCk7XG4gICAgfVxuXG4gICAgZ2V0IGNhbmNlbEJ1dHRvbkxhYmVsKCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiB0aGlzLmNhbmNlbExhYmVsIHx8IHRoaXMuY29uZmlnLmdldFRyYW5zbGF0aW9uKFRyYW5zbGF0aW9uS2V5cy5DQU5DRUwpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCkge1xuICAgICAgICBpZiAodGhpcy5jb250ZW50ICYmIHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmFnT3Zlckxpc3RlbmVyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5kcmFnT3Zlckxpc3RlbmVyID0gbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLnRyYW5zbGF0aW9uU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW0NvbW1vbk1vZHVsZSwgSHR0cENsaWVudE1vZHVsZSwgU2hhcmVkTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFByb2dyZXNzQmFyTW9kdWxlLCBNZXNzYWdlc01vZHVsZSwgUmlwcGxlTW9kdWxlLCBQbHVzSWNvbiwgVXBsb2FkSWNvbiwgVGltZXNJY29uXSxcbiAgICBleHBvcnRzOiBbRmlsZVVwbG9hZCwgU2hhcmVkTW9kdWxlLCBCdXR0b25Nb2R1bGUsIFByb2dyZXNzQmFyTW9kdWxlLCBNZXNzYWdlc01vZHVsZV0sXG4gICAgZGVjbGFyYXRpb25zOiBbRmlsZVVwbG9hZF1cbn0pXG5leHBvcnQgY2xhc3MgRmlsZVVwbG9hZE1vZHVsZSB7fVxuIl19