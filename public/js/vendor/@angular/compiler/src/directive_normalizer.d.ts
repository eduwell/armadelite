/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ViewEncapsulation } from '@angular/core';
import { CompileDirectiveMetadata, CompileStylesheetMetadata, CompileTemplateMetadata } from './compile_metadata';
import { CompilerConfig } from './config';
import { HtmlParser } from './ml_parser/html_parser';
import { ResourceLoader } from './resource_loader';
import { UrlResolver } from './url_resolver';
import { SyncAsync } from './util';
export interface PrenormalizedTemplateMetadata {
    ngModuleType: any;
    componentType: any;
    moduleUrl: string;
    template: string | null;
    templateUrl: string | null;
    styles: string[];
    styleUrls: string[];
    interpolation: [string, string] | null;
    encapsulation: ViewEncapsulation | null;
    animations: any[];
    preserveWhitespaces: boolean | null;
}
export declare class DirectiveNormalizer {
    private _resourceLoader;
    private _urlResolver;
    private _htmlParser;
    private _config;
    private _resourceLoaderCache;
    constructor(_resourceLoader: ResourceLoader, _urlResolver: UrlResolver, _htmlParser: HtmlParser, _config: CompilerConfig);
    clearCache(): void;
    clearCacheFor(normalizedDirective: CompileDirectiveMetadata): void;
    private _fetch(url);
<<<<<<< Updated upstream
    normalizeTemplate(prenormData: PrenormalizedTemplateMetadata): SyncAsync<CompileTemplateMetadata>;
    normalizeTemplateOnly(prenomData: PrenormalizedTemplateMetadata): SyncAsync<CompileTemplateMetadata>;
    normalizeLoadedTemplate(prenormData: PrenormalizedTemplateMetadata, template: string, templateAbsUrl: string): CompileTemplateMetadata;
    normalizeExternalStylesheets(templateMeta: CompileTemplateMetadata): SyncAsync<CompileTemplateMetadata>;
=======
    normalizeTemplate(prenormData: PrenormalizedTemplateMetadata): SyncAsyncResult<CompileTemplateMetadata>;
    normalizeTemplateSync(prenomData: PrenormalizedTemplateMetadata): CompileTemplateMetadata;
    normalizeTemplateAsync(prenomData: PrenormalizedTemplateMetadata): Promise<CompileTemplateMetadata>;
    normalizeLoadedTemplate(prenormData: PrenormalizedTemplateMetadata, template: string, templateAbsUrl: string): CompileTemplateMetadata;
    normalizeExternalStylesheets(templateMeta: CompileTemplateMetadata): Promise<CompileTemplateMetadata>;
>>>>>>> Stashed changes
    private _loadMissingExternalStylesheets(styleUrls, loadedStylesheets?);
    normalizeStylesheet(stylesheet: CompileStylesheetMetadata): CompileStylesheetMetadata;
}
