import {isPresent} from 'angular2/src/facade/lang';
import * as viewModule from './view';
import {RenderViewRef} from 'angular2/src/render/api';

// This is a workaround for privacy in Dart as we don't have library parts
export function internalView(viewRef: ViewRef): viewModule.AppView {
  return viewRef._view;
}

// This is a workaround for privacy in Dart as we don't have library parts
export function internalProtoView(protoViewRef: ProtoViewRef): viewModule.AppProtoView {
  return isPresent(protoViewRef) ? protoViewRef._protoView : null;
}

/**
 * A reference to an Angular View.
 *
 * A View is a fundemental building block of Application UI. A View is the smallest set of
 * elements which are created and destroyed together. A View can chane properties on the elements
 * within the view, but it can not change the structure of those elements.
 *
 * To change structure of the elements, the Views can contain zero or more {@link ViewContainerRef}s
 * which allow the views to be nested.
 *
 * ## Example
 *
 * Given this template
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ng-for="var item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * The above example we have two {@link ProtoViewRef}s:
 *
 * Outter {@link ProtoViewRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ng-for var-item [ng-for-of]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link ProtoViewRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separet {@link ProtoViewRef}s.
 *
 * The outter/inner {@link ProtoViewRef}s are then assambled into views like so:
 *
 * ```
 * <!-- ViewRef: outter-0 -->
 * Count: 2
 * <ul>
 *   <template view-container-ref></template>
 *   <!-- ViewRef: inner-1 --><li>first</li><!-- /ViewRef: inner-1 -->
 *   <!-- ViewRef: inner-2 --><li>second</li><!-- /ViewRef: inner-2 -->
 * </ul>
 * <!-- /ViewRef: outter-0 -->
 * ```
 *
 * @exportedAs angular2/view
 */
export class ViewRef {
  constructor(public _view: viewModule.AppView) {}

  /**
   * Return {@link RenderViewRef}
   */
  get render(): RenderViewRef { return this._view.render; }

  /**
   * Set local variable for a view.
   *
   *
   */
  setLocal(contextName: string, value: any): void { this._view.setLocal(contextName, value); }
}

/**
 * A reference to an an Angular ProtoView.
 *
 * A ProtoView is a reference to a template for easy creation of views.
 * (See {@link AppViewManager#createViewInContainer} and {@link AppViewManager#createRootHostView}).
 *
 * A `ProtoView` is a foctary for creating `View`s.
 *
 * ## Example
 *
 * Given this template
 *
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <li *ng-for="var item of items">{{item}}</li>
 * </ul>
 * ```
 *
 * The above example we have two {@link ProtoViewRef}s:
 *
 * Outter {@link ProtoViewRef}:
 * ```
 * Count: {{items.length}}
 * <ul>
 *   <template ng-for var-item [ng-for-of]="items"></template>
 * </ul>
 * ```
 *
 * Inner {@link ProtoViewRef}:
 * ```
 *   <li>{{item}}</li>
 * ```
 *
 * Notice that the original template is broken down into two separet {@link ProtoViewRef}s.
 *
 * @exportedAs angular2/view
 */
export class ProtoViewRef {
  /**
   * @private
   */
  constructor(public _protoView: viewModule.AppProtoView) {}
}
