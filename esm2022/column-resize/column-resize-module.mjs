/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { NgModule } from '@angular/core';
import { CdkColumnResize } from './column-resize-directives/column-resize';
import { CdkColumnResizeFlex } from './column-resize-directives/column-resize-flex';
import { CdkDefaultEnabledColumnResize } from './column-resize-directives/default-enabled-column-resize';
import { CdkDefaultEnabledColumnResizeFlex } from './column-resize-directives/default-enabled-column-resize-flex';
import * as i0 from "@angular/core";
/**
 * One of two NgModules for use with CdkColumnResize.
 * When using this module, columns are resizable by default.
 */
export class CdkColumnResizeDefaultEnabledModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeDefaultEnabledModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeDefaultEnabledModule, declarations: [CdkDefaultEnabledColumnResize, CdkDefaultEnabledColumnResizeFlex], exports: [CdkDefaultEnabledColumnResize, CdkDefaultEnabledColumnResizeFlex] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeDefaultEnabledModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeDefaultEnabledModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CdkDefaultEnabledColumnResize, CdkDefaultEnabledColumnResizeFlex],
                    exports: [CdkDefaultEnabledColumnResize, CdkDefaultEnabledColumnResizeFlex],
                }]
        }] });
/**
 * One of two NgModules for use with CdkColumnResize.
 * When using this module, columns are not resizable by default.
 */
export class CdkColumnResizeModule {
    static { this.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule }); }
    static { this.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeModule, declarations: [CdkColumnResize, CdkColumnResizeFlex], exports: [CdkColumnResize, CdkColumnResizeFlex] }); }
    static { this.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeModule }); }
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "16.1.1", ngImport: i0, type: CdkColumnResizeModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [CdkColumnResize, CdkColumnResizeFlex],
                    exports: [CdkColumnResize, CdkColumnResizeFlex],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sdW1uLXJlc2l6ZS1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY2RrLWV4cGVyaW1lbnRhbC9jb2x1bW4tcmVzaXplL2NvbHVtbi1yZXNpemUtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3pFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ2xGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLDBEQUEwRCxDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLCtEQUErRCxDQUFDOztBQUVoSDs7O0dBR0c7QUFLSCxNQUFNLE9BQU8sbUNBQW1DOzhHQUFuQyxtQ0FBbUM7K0dBQW5DLG1DQUFtQyxpQkFIL0IsNkJBQTZCLEVBQUUsaUNBQWlDLGFBQ3JFLDZCQUE2QixFQUFFLGlDQUFpQzsrR0FFL0QsbUNBQW1DOzsyRkFBbkMsbUNBQW1DO2tCQUovQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLDZCQUE2QixFQUFFLGlDQUFpQyxDQUFDO29CQUNoRixPQUFPLEVBQUUsQ0FBQyw2QkFBNkIsRUFBRSxpQ0FBaUMsQ0FBQztpQkFDNUU7O0FBR0Q7OztHQUdHO0FBS0gsTUFBTSxPQUFPLHFCQUFxQjs4R0FBckIscUJBQXFCOytHQUFyQixxQkFBcUIsaUJBSGpCLGVBQWUsRUFBRSxtQkFBbUIsYUFDekMsZUFBZSxFQUFFLG1CQUFtQjsrR0FFbkMscUJBQXFCOzsyRkFBckIscUJBQXFCO2tCQUpqQyxRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRSxDQUFDLGVBQWUsRUFBRSxtQkFBbUIsQ0FBQztvQkFDcEQsT0FBTyxFQUFFLENBQUMsZUFBZSxFQUFFLG1CQUFtQixDQUFDO2lCQUNoRCIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtDZGtDb2x1bW5SZXNpemV9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2NvbHVtbi1yZXNpemUnO1xuaW1wb3J0IHtDZGtDb2x1bW5SZXNpemVGbGV4fSBmcm9tICcuL2NvbHVtbi1yZXNpemUtZGlyZWN0aXZlcy9jb2x1bW4tcmVzaXplLWZsZXgnO1xuaW1wb3J0IHtDZGtEZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZX0gZnJvbSAnLi9jb2x1bW4tcmVzaXplLWRpcmVjdGl2ZXMvZGVmYXVsdC1lbmFibGVkLWNvbHVtbi1yZXNpemUnO1xuaW1wb3J0IHtDZGtEZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZUZsZXh9IGZyb20gJy4vY29sdW1uLXJlc2l6ZS1kaXJlY3RpdmVzL2RlZmF1bHQtZW5hYmxlZC1jb2x1bW4tcmVzaXplLWZsZXgnO1xuXG4vKipcbiAqIE9uZSBvZiB0d28gTmdNb2R1bGVzIGZvciB1c2Ugd2l0aCBDZGtDb2x1bW5SZXNpemUuXG4gKiBXaGVuIHVzaW5nIHRoaXMgbW9kdWxlLCBjb2x1bW5zIGFyZSByZXNpemFibGUgYnkgZGVmYXVsdC5cbiAqL1xuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbQ2RrRGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemUsIENka0RlZmF1bHRFbmFibGVkQ29sdW1uUmVzaXplRmxleF0sXG4gIGV4cG9ydHM6IFtDZGtEZWZhdWx0RW5hYmxlZENvbHVtblJlc2l6ZSwgQ2RrRGVmYXVsdEVuYWJsZWRDb2x1bW5SZXNpemVGbGV4XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrQ29sdW1uUmVzaXplRGVmYXVsdEVuYWJsZWRNb2R1bGUge31cblxuLyoqXG4gKiBPbmUgb2YgdHdvIE5nTW9kdWxlcyBmb3IgdXNlIHdpdGggQ2RrQ29sdW1uUmVzaXplLlxuICogV2hlbiB1c2luZyB0aGlzIG1vZHVsZSwgY29sdW1ucyBhcmUgbm90IHJlc2l6YWJsZSBieSBkZWZhdWx0LlxuICovXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtDZGtDb2x1bW5SZXNpemUsIENka0NvbHVtblJlc2l6ZUZsZXhdLFxuICBleHBvcnRzOiBbQ2RrQ29sdW1uUmVzaXplLCBDZGtDb2x1bW5SZXNpemVGbGV4XSxcbn0pXG5leHBvcnQgY2xhc3MgQ2RrQ29sdW1uUmVzaXplTW9kdWxlIHt9XG4iXX0=