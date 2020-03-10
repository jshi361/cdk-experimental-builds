/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AfterViewInit, ElementRef, Injector, NgZone, OnDestroy, Type, ViewContainerRef } from '@angular/core';
import { Directionality } from '@angular/cdk/bidi';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { CdkColumnDef } from '@angular/cdk/table';
import { ReplaySubject } from 'rxjs';
import { ResizeOverlayHandle } from './overlay-handle';
import { ColumnResize } from './column-resize';
import { ColumnResizeNotifierSource } from './column-resize-notifier';
import { HeaderRowEventDispatcher } from './event-dispatcher';
import { ResizeStrategy } from './resize-strategy';
/**
 * Base class for Resizable directives which are applied to column headers to make those columns
 * resizable.
 */
export declare abstract class Resizable<HandleComponent extends ResizeOverlayHandle> implements AfterViewInit, OnDestroy {
    protected minWidthPxInternal: number;
    protected maxWidthPxInternal: number;
    protected inlineHandle?: HTMLElement;
    protected overlayRef?: OverlayRef;
    protected readonly destroyed: ReplaySubject<void>;
    protected abstract readonly columnDef: CdkColumnDef;
    protected abstract readonly columnResize: ColumnResize;
    protected abstract readonly directionality: Directionality;
    protected abstract readonly document: Document;
    protected abstract readonly elementRef: ElementRef;
    protected abstract readonly eventDispatcher: HeaderRowEventDispatcher;
    protected abstract readonly injector: Injector;
    protected abstract readonly ngZone: NgZone;
    protected abstract readonly overlay: Overlay;
    protected abstract readonly resizeNotifier: ColumnResizeNotifierSource;
    protected abstract readonly resizeStrategy: ResizeStrategy;
    protected abstract readonly viewContainerRef: ViewContainerRef;
    /** The minimum width to allow the column to be sized to. */
    get minWidthPx(): number;
    set minWidthPx(value: number);
    /** The maximum width to allow the column to be sized to. */
    get maxWidthPx(): number;
    set maxWidthPx(value: number);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    protected abstract getInlineHandleCssClassName(): string;
    protected abstract getOverlayHandleComponentType(): Type<HandleComponent>;
    private _createOverlayForHandle;
    private _listenForRowHoverEvents;
    private _listenForResizeEvents;
    private _completeResizeOperation;
    private _cleanUpAfterResize;
    private _createHandlePortal;
    private _showHandleOverlay;
    private _updateOverlayHandleHeight;
    private _applySize;
    private _applyMinWidthPx;
    private _applyMaxWidthPx;
    private _appendInlineHandle;
}
