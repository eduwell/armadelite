/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { Injector } from '../di/injector';
import { Type } from '../type';
<<<<<<< Updated upstream
=======
import { ComponentFactory } from './component_factory';
>>>>>>> Stashed changes
import { ComponentFactoryResolver } from './component_factory_resolver';
/**
 * Represents an instance of an NgModule created via a {@link NgModuleFactory}.
 *
 * `NgModuleRef` provides access to the NgModule Instance as well other objects related to this
 * NgModule Instance.
 *
 * @stable
 */
export declare abstract class NgModuleRef<T> {
    /**
     * The injector that contains all of the providers of the NgModule.
     */
    readonly abstract injector: Injector;
    /**
     * The ComponentFactoryResolver to get hold of the ComponentFactories
     * declared in the `entryComponents` property of the module.
     */
    readonly abstract componentFactoryResolver: ComponentFactoryResolver;
    /**
     * The NgModule instance.
     */
    readonly abstract instance: T;
    /**
     * Destroys the module instance and all of the data structures associated with it.
     */
    abstract destroy(): void;
    /**
     * Allows to register a callback that will be called when the module is destroyed.
     */
    abstract onDestroy(callback: () => void): void;
}
export interface InternalNgModuleRef<T> extends NgModuleRef<T> {
    _bootstrapComponents: Type<any>[];
}
/**
 * @experimental
 */
<<<<<<< Updated upstream
export declare abstract class NgModuleFactory<T> {
    readonly abstract moduleType: Type<T>;
    abstract create(parentInjector: Injector | null): NgModuleRef<T>;
=======
export declare class NgModuleFactory<T> {
    private _injectorClass;
    private _moduleType;
    constructor(_injectorClass: {
        new (parentInjector: Injector): NgModuleInjector<T>;
    }, _moduleType: Type<T>);
    readonly moduleType: Type<T>;
    create(parentInjector: Injector | null): NgModuleRef<T>;
}
export declare abstract class NgModuleInjector<T> implements Injector, NgModuleRef<T> {
    parent: Injector;
    bootstrapFactories: ComponentFactory<any>[];
    instance: T;
    private _destroyListeners;
    private _destroyed;
    private _cmpFactoryResolver;
    constructor(parent: Injector, factories: ComponentFactory<any>[], bootstrapFactories: ComponentFactory<any>[]);
    create(): void;
    abstract createInternal(): T;
    get(token: any, notFoundValue?: any): any;
    abstract getInternal(token: any, notFoundValue: any): any;
    readonly injector: Injector;
    readonly componentFactoryResolver: ComponentFactoryResolver;
    destroy(): void;
    onDestroy(callback: () => void): void;
    abstract destroyInternal(): void;
>>>>>>> Stashed changes
}
