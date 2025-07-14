/// <reference path="fourslash.ts" />

//// @Filename: mod.ts
//// /** @deprecated please don't use this */
//// export const depr = 'deprecated';
//// 
//// /** Please use this one */
//// export const notDeprecated = 'not deprecated';
//// 
//// /** @deprecated please import { notDeprecated } instead */
//// export default notDeprecated;

//// @Filename: index.ts
//// import defaultExport/*0*/, { depr, notDeprecated } from './mod.js';
//// 
//// console.log(defaultExport/*1*/);
//// console.log(depr/*2*/);
//// console.log(notDeprecated/*3*/);

verify.baselineQuickInfo();