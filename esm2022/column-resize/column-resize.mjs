/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Directive } from '@angular/core';
import { fromEvent, merge, Subject } from 'rxjs';
import { filter, map, mapTo, pairwise, startWith, take, takeUntil } from 'rxjs/operators';
import { _closest } from '@angular/cdk-experimental/popover-edit';
import { HEADER_CELL_SELECTOR, RESIZE_OVERLAY_SELECTOR } from './selectors';
import * as i0 from "@angular/core";
const HOVER_OR_ACTIVE_CLASS = 'cdk-column-resize-hover-or-active';
const WITH_RESIZED_COLUMN_CLASS = 'cdk-column-resize-with-resized-column';
let nextId = 0;
/**
 * Base class for ColumnResize directives which attach to mat-table elements to
 * provide common events and services for column resizing.
 */
class ColumnResize {
    constructor() {
        this.destroyed = new Subject();
        /** Unique ID for this table instance. */
        this.selectorId = `${++nextId}`;
    }
    ngAfterViewInit() {
        this.elementRef.nativeElement.classList.add(this.getUniqueCssClass());
        this._listenForRowHoverEvents();
        this._listenForResizeActivity();
        this._listenForHoverActivity();
    }
    ngOnDestroy() {
        this.destroyed.next();
        this.destroyed.complete();
    }
    /** Gets the unique CSS class name for this table instance. */
    getUniqueCssClass() {
        return `cdk-column-resize-${this.selectorId}`;
    }
    /** Called when a column in the table is resized. Applies a css class to the table element. */
    setResized() {
        this.elementRef.nativeElement.classList.add(WITH_RESIZED_COLUMN_CLASS);
    }
    _listenForRowHoverEvents() {
        this.ngZone.runOutsideAngular(() => {
            const element = this.elementRef.nativeElement;
            fromEvent(element, 'mouseover')
                .pipe(map(event => _closest(event.target, HEADER_CELL_SELECTOR)), takeUntil(this.destroyed))
                .subscribe(this.eventDispatcher.headerCellHovered);
            fromEvent(element, 'mouseleave')
                .pipe(filter(event => !!event.relatedTarget &&
                !event.relatedTarget.matches(RESIZE_OVERLAY_SELECTOR)), mapTo(null), takeUntil(this.destroyed))
                .subscribe(this.eventDispatcher.headerCellHovered);
        });
    }
    _listenForResizeActivity() {
        merge(this.eventDispatcher.overlayHandleActiveForCell.pipe(mapTo(undefined)), this.notifier.triggerResize.pipe(mapTo(undefined)), this.notifier.resizeCompleted.pipe(mapTo(undefined)))
            .pipe(take(1), takeUntil(this.destroyed))
            .subscribe(() => {
            this.setResized();
        });
    }
    _listenForHoverActivity() {
        this.eventDispatcher.headerRowHoveredOrActiveDistinct
            .pipe(startWith(null), pairwise(), takeUntil(this.destroyed))
            .subscribe(([previousRow, hoveredRow]) => {
            if (hoveredRow) {
                hoveredRow.classList.add(HOVER_OR_ACTIVE_CLASS);
            }
            if (previousRow) {
                previousRow.classList.remove(HOVER_OR_ACTIVE_CLASS);
            }
        });
    }
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: ColumnResize, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.0.0-next.7", type: ColumnResize, ngImport: i0 }); }
}
export { ColumnResize };
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.0.0-next.7", ngImport: i0, type: ColumnResize, decorators: [{
            type: Directive
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWdCLFNBQVMsRUFBZ0MsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFHaEUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sYUFBYSxDQUFDOztBQUcxRSxNQUFNLHFCQUFxQixHQUFHLG1DQUFtQyxDQUFDO0FBQ2xFLE1BQU0seUJBQXlCLEdBQUcsdUNBQXVDLENBQUM7QUFFMUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7OztHQUdHO0FBQ0gsTUFDc0IsWUFBWTtJQURsQztRQUVxQixjQUFTLEdBQUcsSUFBSSxPQUFPLEVBQVEsQ0FBQztRQVluRCx5Q0FBeUM7UUFDdEIsZUFBVSxHQUFHLEdBQUcsRUFBRSxNQUFNLEVBQUUsQ0FBQztLQTRFL0M7SUF2RUMsZUFBZTtRQUNiLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQztRQUV2RSxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsdUJBQXVC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QyxTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbmltcG9ydCB7QWZ0ZXJWaWV3SW5pdCwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBOZ1pvbmUsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2Zyb21FdmVudCwgbWVyZ2UsIFN1YmplY3R9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgbWFwVG8sIHBhaXJ3aXNlLCBzdGFydFdpdGgsIHRha2UsIHRha2VVbnRpbH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge19jbG9zZXN0fSBmcm9tICdAYW5ndWxhci9jZGstZXhwZXJpbWVudGFsL3BvcG92ZXItZWRpdCc7XG5cbmltcG9ydCB7Q29sdW1uUmVzaXplTm90aWZpZXIsIENvbHVtblJlc2l6ZU5vdGlmaWVyU291cmNlfSBmcm9tICcuL2NvbHVtbi1yZXNpemUtbm90aWZpZXInO1xuaW1wb3J0IHtIRUFERVJfQ0VMTF9TRUxFQ1RPUiwgUkVTSVpFX09WRVJMQVlfU0VMRUNUT1J9IGZyb20gJy4vc2VsZWN0b3JzJztcbmltcG9ydCB7SGVhZGVyUm93RXZlbnREaXNwYXRjaGVyfSBmcm9tICcuL2V2ZW50LWRpc3BhdGNoZXInO1xuXG5jb25zdCBIT1ZFUl9PUl9BQ1RJVkVfQ0xBU1MgPSAnY2RrLWNvbHVtbi1yZXNpemUtaG92ZXItb3ItYWN0aXZlJztcbmNvbnN0IFdJVEhfUkVTSVpFRF9DT0xVTU5fQ0xBU1MgPSAnY2RrLWNvbHVtbi1yZXNpemUtd2l0aC1yZXNpemVkLWNvbHVtbic7XG5cbmxldCBuZXh0SWQgPSAwO1xuXG4vKipcbiAqIEJhc2UgY2xhc3MgZm9yIENvbHVtblJlc2l6ZSBkaXJlY3RpdmVzIHdoaWNoIGF0dGFjaCB0byBtYXQtdGFibGUgZWxlbWVudHMgdG9cbiAqIHByb3ZpZGUgY29tbW9uIGV2ZW50cyBhbmQgc2VydmljZXMgZm9yIGNvbHVtbiByZXNpemluZy5cbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQ29sdW1uUmVzaXplIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIHJlYWRvbmx5IGRlc3Ryb3llZCA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgLyogUHVibGljbHkgYWNjZXNzaWJsZSBpbnRlcmZhY2UgZm9yIHRyaWdnZXJpbmcgYW5kIGJlaW5nIG5vdGlmaWVkIG9mIHJlc2l6ZXMuICovXG4gIGFic3RyYWN0IHJlYWRvbmx5IGNvbHVtblJlc2l6ZU5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllcjtcblxuICAvKiBFbGVtZW50UmVmIHRoYXQgdGhpcyBkaXJlY3RpdmUgaXMgYXR0YWNoZWQgdG8uIEV4cG9zZWQgRm9yIHVzZSBieSBjb2x1bW4tbGV2ZWwgZGlyZWN0aXZlcyAqL1xuICBhYnN0cmFjdCByZWFkb25seSBlbGVtZW50UmVmOiBFbGVtZW50UmVmPEhUTUxFbGVtZW50PjtcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgZXZlbnREaXNwYXRjaGVyOiBIZWFkZXJSb3dFdmVudERpc3BhdGNoZXI7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBuZ1pvbmU6IE5nWm9uZTtcbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IG5vdGlmaWVyOiBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZTtcblxuICAvKiogVW5pcXVlIElEIGZvciB0aGlzIHRhYmxlIGluc3RhbmNlLiAqL1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgc2VsZWN0b3JJZCA9IGAkeysrbmV4dElkfWA7XG5cbiAgLyoqIFRoZSBpZCBhdHRyaWJ1dGUgb2YgdGhlIHRhYmxlLCBpZiBzcGVjaWZpZWQuICovXG4gIGlkPzogc3RyaW5nO1xuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCEuY2xhc3NMaXN0LmFkZCh0aGlzLmdldFVuaXF1ZUNzc0NsYXNzKCkpO1xuXG4gICAgdGhpcy5fbGlzdGVuRm9yUm93SG92ZXJFdmVudHMoKTtcbiAgICB0aGlzLl9saXN0ZW5Gb3JSZXNpemVBY3Rpdml0eSgpO1xuICAgIHRoaXMuX2xpc3RlbkZvckhvdmVyQWN0aXZpdHkoKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZGVzdHJveWVkLm5leHQoKTtcbiAgICB0aGlzLmRlc3Ryb3llZC5jb21wbGV0ZSgpO1xuICB9XG5cbiAgLyoqIEdldHMgdGhlIHVuaXF1ZSBDU1MgY2xhc3MgbmFtZSBmb3IgdGhpcyB0YWJsZSBpbnN0YW5jZS4gKi9cbiAgZ2V0VW5pcXVlQ3NzQ2xhc3MoKSB7XG4gICAgcmV0dXJuIGBjZGstY29sdW1uLXJlc2l6ZS0ke3RoaXMuc2VsZWN0b3JJZH1gO1xuICB9XG5cbiAgLyoqIENhbGxlZCB3aGVuIGEgY29sdW1uIGluIHRoZSB0YWJsZSBpcyByZXNpemVkLiBBcHBsaWVzIGEgY3NzIGNsYXNzIHRvIHRoZSB0YWJsZSBlbGVtZW50LiAqL1xuICBzZXRSZXNpemVkKCkge1xuICAgIHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50IS5jbGFzc0xpc3QuYWRkKFdJVEhfUkVTSVpFRF9DT0xVTU5fQ0xBU1MpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuRm9yUm93SG92ZXJFdmVudHMoKSB7XG4gICAgdGhpcy5uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgY29uc3QgZWxlbWVudCA9IHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50ITtcblxuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGVsZW1lbnQsICdtb3VzZW92ZXInKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoZXZlbnQgPT4gX2Nsb3Nlc3QoZXZlbnQudGFyZ2V0LCBIRUFERVJfQ0VMTF9TRUxFQ1RPUikpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLmV2ZW50RGlzcGF0Y2hlci5oZWFkZXJDZWxsSG92ZXJlZCk7XG4gICAgICBmcm9tRXZlbnQ8TW91c2VFdmVudD4oZWxlbWVudCwgJ21vdXNlbGVhdmUnKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICBldmVudCA9PlxuICAgICAgICAgICAgICAhIWV2ZW50LnJlbGF0ZWRUYXJnZXQgJiZcbiAgICAgICAgICAgICAgIShldmVudC5yZWxhdGVkVGFyZ2V0IGFzIEVsZW1lbnQpLm1hdGNoZXMoUkVTSVpFX09WRVJMQVlfU0VMRUNUT1IpLFxuICAgICAgICAgICksXG4gICAgICAgICAgbWFwVG8obnVsbCksXG4gICAgICAgICAgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSxcbiAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuZXZlbnREaXNwYXRjaGVyLmhlYWRlckNlbGxIb3ZlcmVkKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbkZvclJlc2l6ZUFjdGl2aXR5KCkge1xuICAgIG1lcmdlKFxuICAgICAgdGhpcy5ldmVudERpc3BhdGNoZXIub3ZlcmxheUhhbmRsZUFjdGl2ZUZvckNlbGwucGlwZShtYXBUbyh1bmRlZmluZWQpKSxcbiAgICAgIHRoaXMubm90aWZpZXIudHJpZ2dlclJlc2l6ZS5waXBlKG1hcFRvKHVuZGVmaW5lZCkpLFxuICAgICAgdGhpcy5ub3RpZmllci5yZXNpemVDb21wbGV0ZWQucGlwZShtYXBUbyh1bmRlZmluZWQpKSxcbiAgICApXG4gICAgICAucGlwZSh0YWtlKDEpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0UmVzaXplZCgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5Gb3JIb3ZlckFjdGl2aXR5KCkge1xuICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLmhlYWRlclJvd0hvdmVyZWRPckFjdGl2ZURpc3RpbmN0XG4gICAgICAucGlwZShzdGFydFdpdGgobnVsbCksIHBhaXJ3aXNlKCksIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCkpXG4gICAgICAuc3Vic2NyaWJlKChbcHJldmlvdXNSb3csIGhvdmVyZWRSb3ddKSA9PiB7XG4gICAgICAgIGlmIChob3ZlcmVkUm93KSB7XG4gICAgICAgICAgaG92ZXJlZFJvdy5jbGFzc0xpc3QuYWRkKEhPVkVSX09SX0FDVElWRV9DTEFTUyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHByZXZpb3VzUm93KSB7XG4gICAgICAgICAgcHJldmlvdXNSb3cuY2xhc3NMaXN0LnJlbW92ZShIT1ZFUl9PUl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19