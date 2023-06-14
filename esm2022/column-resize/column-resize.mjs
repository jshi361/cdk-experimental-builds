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
export class ColumnResize {
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
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.0", ngImport: i0, type: ColumnResize, deps: [], target: i0.ɵɵFactoryTarget.Directive }); }
    static { this.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "16.1.0", type: ColumnResize, ngImport: i0 }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.0", ngImport: i0, type: ColumnResize, decorators: [{
            type: Directive
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jZGstZXhwZXJpbWVudGFsL2NvbHVtbi1yZXNpemUvY29sdW1uLXJlc2l6ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7O0dBTUc7QUFFSCxPQUFPLEVBQWdCLFNBQVMsRUFBZ0MsTUFBTSxlQUFlLENBQUM7QUFDdEYsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQy9DLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RixPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFHaEUsT0FBTyxFQUFDLG9CQUFvQixFQUFFLHVCQUF1QixFQUFDLE1BQU0sYUFBYSxDQUFDOztBQUcxRSxNQUFNLHFCQUFxQixHQUFHLG1DQUFtQyxDQUFDO0FBQ2xFLE1BQU0seUJBQXlCLEdBQUcsdUNBQXVDLENBQUM7QUFFMUUsSUFBSSxNQUFNLEdBQUcsQ0FBQyxDQUFDO0FBRWY7OztHQUdHO0FBRUgsTUFBTSxPQUFnQixZQUFZO0lBRGxDO1FBRXFCLGNBQVMsR0FBRyxJQUFJLE9BQU8sRUFBUSxDQUFDO1FBWW5ELHlDQUF5QztRQUN0QixlQUFVLEdBQUcsR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO0tBNEUvQztJQXZFQyxlQUFlO1FBQ2IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFjLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDO1FBRXZFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx1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UyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FmdGVyVmlld0luaXQsIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgTmdab25lLCBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtmcm9tRXZlbnQsIG1lcmdlLCBTdWJqZWN0fSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIG1hcFRvLCBwYWlyd2lzZSwgc3RhcnRXaXRoLCB0YWtlLCB0YWtlVW50aWx9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtfY2xvc2VzdH0gZnJvbSAnQGFuZ3VsYXIvY2RrLWV4cGVyaW1lbnRhbC9wb3BvdmVyLWVkaXQnO1xuXG5pbXBvcnQge0NvbHVtblJlc2l6ZU5vdGlmaWVyLCBDb2x1bW5SZXNpemVOb3RpZmllclNvdXJjZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLW5vdGlmaWVyJztcbmltcG9ydCB7SEVBREVSX0NFTExfU0VMRUNUT1IsIFJFU0laRV9PVkVSTEFZX1NFTEVDVE9SfSBmcm9tICcuL3NlbGVjdG9ycyc7XG5pbXBvcnQge0hlYWRlclJvd0V2ZW50RGlzcGF0Y2hlcn0gZnJvbSAnLi9ldmVudC1kaXNwYXRjaGVyJztcblxuY29uc3QgSE9WRVJfT1JfQUNUSVZFX0NMQVNTID0gJ2Nkay1jb2x1bW4tcmVzaXplLWhvdmVyLW9yLWFjdGl2ZSc7XG5jb25zdCBXSVRIX1JFU0laRURfQ09MVU1OX0NMQVNTID0gJ2Nkay1jb2x1bW4tcmVzaXplLXdpdGgtcmVzaXplZC1jb2x1bW4nO1xuXG5sZXQgbmV4dElkID0gMDtcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciBDb2x1bW5SZXNpemUgZGlyZWN0aXZlcyB3aGljaCBhdHRhY2ggdG8gbWF0LXRhYmxlIGVsZW1lbnRzIHRvXG4gKiBwcm92aWRlIGNvbW1vbiBldmVudHMgYW5kIHNlcnZpY2VzIGZvciBjb2x1bW4gcmVzaXppbmcuXG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIENvbHVtblJlc2l6ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCByZWFkb25seSBkZXN0cm95ZWQgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIC8qIFB1YmxpY2x5IGFjY2Vzc2libGUgaW50ZXJmYWNlIGZvciB0cmlnZ2VyaW5nIGFuZCBiZWluZyBub3RpZmllZCBvZiByZXNpemVzLiAqL1xuICBhYnN0cmFjdCByZWFkb25seSBjb2x1bW5SZXNpemVOb3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXI7XG5cbiAgLyogRWxlbWVudFJlZiB0aGF0IHRoaXMgZGlyZWN0aXZlIGlzIGF0dGFjaGVkIHRvLiBFeHBvc2VkIEZvciB1c2UgYnkgY29sdW1uLWxldmVsIGRpcmVjdGl2ZXMgKi9cbiAgYWJzdHJhY3QgcmVhZG9ubHkgZWxlbWVudFJlZjogRWxlbWVudFJlZjxIVE1MRWxlbWVudD47XG5cbiAgcHJvdGVjdGVkIGFic3RyYWN0IHJlYWRvbmx5IGV2ZW50RGlzcGF0Y2hlcjogSGVhZGVyUm93RXZlbnREaXNwYXRjaGVyO1xuICBwcm90ZWN0ZWQgYWJzdHJhY3QgcmVhZG9ubHkgbmdab25lOiBOZ1pvbmU7XG4gIHByb3RlY3RlZCBhYnN0cmFjdCByZWFkb25seSBub3RpZmllcjogQ29sdW1uUmVzaXplTm90aWZpZXJTb3VyY2U7XG5cbiAgLyoqIFVuaXF1ZSBJRCBmb3IgdGhpcyB0YWJsZSBpbnN0YW5jZS4gKi9cbiAgcHJvdGVjdGVkIHJlYWRvbmx5IHNlbGVjdG9ySWQgPSBgJHsrK25leHRJZH1gO1xuXG4gIC8qKiBUaGUgaWQgYXR0cmlidXRlIG9mIHRoZSB0YWJsZSwgaWYgc3BlY2lmaWVkLiAqL1xuICBpZD86IHN0cmluZztcblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQhLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRVbmlxdWVDc3NDbGFzcygpKTtcblxuICAgIHRoaXMuX2xpc3RlbkZvclJvd0hvdmVyRXZlbnRzKCk7XG4gICAgdGhpcy5fbGlzdGVuRm9yUmVzaXplQWN0aXZpdHkoKTtcbiAgICB0aGlzLl9saXN0ZW5Gb3JIb3ZlckFjdGl2aXR5KCk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmRlc3Ryb3llZC5uZXh0KCk7XG4gICAgdGhpcy5kZXN0cm95ZWQuY29tcGxldGUoKTtcbiAgfVxuXG4gIC8qKiBHZXRzIHRoZSB1bmlxdWUgQ1NTIGNsYXNzIG5hbWUgZm9yIHRoaXMgdGFibGUgaW5zdGFuY2UuICovXG4gIGdldFVuaXF1ZUNzc0NsYXNzKCkge1xuICAgIHJldHVybiBgY2RrLWNvbHVtbi1yZXNpemUtJHt0aGlzLnNlbGVjdG9ySWR9YDtcbiAgfVxuXG4gIC8qKiBDYWxsZWQgd2hlbiBhIGNvbHVtbiBpbiB0aGUgdGFibGUgaXMgcmVzaXplZC4gQXBwbGllcyBhIGNzcyBjbGFzcyB0byB0aGUgdGFibGUgZWxlbWVudC4gKi9cbiAgc2V0UmVzaXplZCgpIHtcbiAgICB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCEuY2xhc3NMaXN0LmFkZChXSVRIX1JFU0laRURfQ09MVU1OX0NMQVNTKTtcbiAgfVxuXG4gIHByaXZhdGUgX2xpc3RlbkZvclJvd0hvdmVyRXZlbnRzKCkge1xuICAgIHRoaXMubmdab25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsZW1lbnQgPSB0aGlzLmVsZW1lbnRSZWYubmF0aXZlRWxlbWVudCE7XG5cbiAgICAgIGZyb21FdmVudDxNb3VzZUV2ZW50PihlbGVtZW50LCAnbW91c2VvdmVyJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgbWFwKGV2ZW50ID0+IF9jbG9zZXN0KGV2ZW50LnRhcmdldCwgSEVBREVSX0NFTExfU0VMRUNUT1IpKSxcbiAgICAgICAgICB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpLFxuICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5ldmVudERpc3BhdGNoZXIuaGVhZGVyQ2VsbEhvdmVyZWQpO1xuICAgICAgZnJvbUV2ZW50PE1vdXNlRXZlbnQ+KGVsZW1lbnQsICdtb3VzZWxlYXZlJylcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgZXZlbnQgPT5cbiAgICAgICAgICAgICAgISFldmVudC5yZWxhdGVkVGFyZ2V0ICYmXG4gICAgICAgICAgICAgICEoZXZlbnQucmVsYXRlZFRhcmdldCBhcyBFbGVtZW50KS5tYXRjaGVzKFJFU0laRV9PVkVSTEFZX1NFTEVDVE9SKSxcbiAgICAgICAgICApLFxuICAgICAgICAgIG1hcFRvKG51bGwpLFxuICAgICAgICAgIHRha2VVbnRpbCh0aGlzLmRlc3Ryb3llZCksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLmV2ZW50RGlzcGF0Y2hlci5oZWFkZXJDZWxsSG92ZXJlZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9saXN0ZW5Gb3JSZXNpemVBY3Rpdml0eSgpIHtcbiAgICBtZXJnZShcbiAgICAgIHRoaXMuZXZlbnREaXNwYXRjaGVyLm92ZXJsYXlIYW5kbGVBY3RpdmVGb3JDZWxsLnBpcGUobWFwVG8odW5kZWZpbmVkKSksXG4gICAgICB0aGlzLm5vdGlmaWVyLnRyaWdnZXJSZXNpemUucGlwZShtYXBUbyh1bmRlZmluZWQpKSxcbiAgICAgIHRoaXMubm90aWZpZXIucmVzaXplQ29tcGxldGVkLnBpcGUobWFwVG8odW5kZWZpbmVkKSksXG4gICAgKVxuICAgICAgLnBpcGUodGFrZSgxKSwgdGFrZVVudGlsKHRoaXMuZGVzdHJveWVkKSlcbiAgICAgIC5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICB0aGlzLnNldFJlc2l6ZWQoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfbGlzdGVuRm9ySG92ZXJBY3Rpdml0eSgpIHtcbiAgICB0aGlzLmV2ZW50RGlzcGF0Y2hlci5oZWFkZXJSb3dIb3ZlcmVkT3JBY3RpdmVEaXN0aW5jdFxuICAgICAgLnBpcGUoc3RhcnRXaXRoKG51bGwpLCBwYWlyd2lzZSgpLCB0YWtlVW50aWwodGhpcy5kZXN0cm95ZWQpKVxuICAgICAgLnN1YnNjcmliZSgoW3ByZXZpb3VzUm93LCBob3ZlcmVkUm93XSkgPT4ge1xuICAgICAgICBpZiAoaG92ZXJlZFJvdykge1xuICAgICAgICAgIGhvdmVyZWRSb3cuY2xhc3NMaXN0LmFkZChIT1ZFUl9PUl9BQ1RJVkVfQ0xBU1MpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwcmV2aW91c1Jvdykge1xuICAgICAgICAgIHByZXZpb3VzUm93LmNsYXNzTGlzdC5yZW1vdmUoSE9WRVJfT1JfQUNUSVZFX0NMQVNTKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==