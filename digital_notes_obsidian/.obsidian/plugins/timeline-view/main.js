"use strict";
var __defProp = Object.defineProperty;
var __typeError = (msg) => {
  throw TypeError(msg);
};
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
var _name, _type, _getMetadataTypeManager, _ObsidianNotePropertyRepository_instances, loadRegisteredProperties_fn, _vault, _metadata, _files, _filter, _query, _tFile, _metadata2, _style, _layoutItem, _selector, _collapsed, _value, _TimelineNoteItem_instances, getCachedValue_fn, calculateValue_fn, _name2, _type2, _valueSelector, _selectedProperty, _saveSelectedPropertyName, _noteProperties, _name3, _savePreference, _preferInts, _TimelinePropertySelector_instances, savePropertyPreference_fn, _filter2, _notes, _onQueryChange, _displayText, _plugin, _noteProperties2, _notes2, _loadedSettings, _ObsidianSettingsTimelineTab_instances, getSettings_fn, updateSettings_fn;
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
const obsidian = require("obsidian");
function _interopNamespaceDefault(e) {
  const n = Object.create(null, { [Symbol.toStringTag]: { value: "Module" } });
  if (e) {
    for (const k in e) {
      if (k !== "default") {
        const d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: () => e[k]
        });
      }
    }
  }
  n.default = e;
  return Object.freeze(n);
}
const obsidian__namespace = /* @__PURE__ */ _interopNamespaceDefault(obsidian);
function getMetadataTypeManager(app) {
  const metadataTypeManager = "metadataTypeManager" in app ? app.metadataTypeManager : void 0;
  if (!metadataTypeManager) {
    console.warn(
      `[Timeline View] Could not find metadataTypeManager in app`
    );
    return void 0;
  }
  if (typeof metadataTypeManager !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager is not an object in app`
    );
    return void 0;
  }
  if (!validMetadataTypeManager(metadataTypeManager)) {
    console.warn(
      `[Timeline View] MetadataTypeManager is not of expected shape in app`
    );
    return void 0;
  }
  return metadataTypeManager;
}
function validMetadataTypeManager(metadataTypeManager) {
  if (!("properties" in metadataTypeManager) || !metadataTypeManager.properties) {
    console.warn(
      `[Timeline View] MetadataTypeManager does not have properties`
    );
    return false;
  }
  if (typeof metadataTypeManager.properties !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties is not an object`
    );
    return false;
  }
  if (!validMetadataTypeProperties(metadataTypeManager.properties)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties is not of expected shape`
    );
    return false;
  }
  if (!("types" in metadataTypeManager) || !metadataTypeManager.types) {
    console.warn(`[Timeline View] MetadataTypeManager does not have types`);
    return false;
  }
  if (typeof metadataTypeManager.types !== "object") {
    console.warn(
      `[Timeline View] MetadataTypeManager.types is not an object`
    );
    return false;
  }
  if (!validMetadataTypeTypes(metadataTypeManager.types)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.types is not of expected shape`
    );
    return false;
  }
  return true;
}
function validMetadataTypeProperties(properties) {
  if (!("aliases" in properties) || properties.aliases === null) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.aliases is null or undefined`
    );
    return false;
  }
  if (!validProperty("aliases", properties.aliases)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.aliases is not of expected shape`
    );
    return false;
  }
  properties.aliases;
  if (!("cssclasses" in properties) || properties.cssclasses === null) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.cssclasses is null or undefined`
    );
    return false;
  }
  if (!validProperty("cssclasses", properties.cssclasses)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.cssclasses is not of expected shape`
    );
    return false;
  }
  properties.cssclasses;
  if (!("tags" in properties) || properties.tags === null) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.tags is null or undefined`
    );
    return false;
  }
  if (!validProperty("tags", properties.tags)) {
    console.warn(
      `[Timeline View] MetadataTypeManager.properties.tags is not of expected shape`
    );
    return false;
  }
  properties.tags;
  for (const [key, value] of Object.entries(properties)) {
    if (!validProperty(key, value)) {
      return false;
    }
  }
  return true;
}
function validProperty(name, property) {
  if (typeof property !== "object" || property === null) {
    return false;
  }
  if (!("name" in property) || !("type" in property) || !("count" in property)) {
    return false;
  }
  if (typeof property.name !== "string") {
    return false;
  }
  if (typeof property.type !== "string") {
    return false;
  }
  if (typeof property.count !== "number") {
    return false;
  }
  return true;
}
function validMetadataTypeTypes(types) {
  if (!("aliases" in types) || !("cssclasses" in types) || !("tags" in types)) {
    return false;
  }
  if (!validPropertyType("aliases", types.aliases) && !validPropertyType("cssclasses", types.cssclasses) && !validPropertyType("tags", types.tags)) {
    return false;
  }
  for (const [key, value] of Object.entries(types)) {
    if (!validPropertyType(key, value)) {
      return false;
    }
  }
  return true;
}
function validPropertyType(name, type) {
  if (typeof type !== "object" || type === null) {
    return false;
  }
  if (!("name" in type) || !("type" in type)) {
    return false;
  }
  if (typeof type.name !== "string") {
    return false;
  }
  if (typeof type.type !== "string") {
    return false;
  }
  return true;
}
class NoteProperty {
  constructor(name, type) {
    __privateAdd(this, _name);
    __privateAdd(this, _type);
    __privateSet(this, _name, name);
    __privateSet(this, _type, type);
  }
  name() {
    return __privateGet(this, _name);
  }
  type() {
    return __privateGet(this, _type);
  }
  selectFrom(note) {
    return note.properties()[__privateGet(this, _name)];
  }
}
_name = new WeakMap();
_type = new WeakMap();
class ObsidianNotePropertyRepository {
  constructor(readPropertyTypes, getMetadataTypeManager2) {
    __privateAdd(this, _ObsidianNotePropertyRepository_instances);
    __privateAdd(this, _getMetadataTypeManager);
    this.readPropertyTypes = readPropertyTypes;
    __privateSet(this, _getMetadataTypeManager, () => {
      const metadataTypeManager = getMetadataTypeManager2();
      if (metadataTypeManager)
        __privateSet(this, _getMetadataTypeManager, () => metadataTypeManager);
      return metadataTypeManager;
    });
  }
  async getPropertyByName(name) {
    var _a;
    const registeredProperties = await __privateMethod(this, _ObsidianNotePropertyRepository_instances, loadRegisteredProperties_fn).call(this);
    return (_a = registeredProperties.find((it) => it.name() === name)) != null ? _a : null;
  }
  async listPropertiesOfTypes(types) {
    var _a;
    const unregisteredProperties = (_a = __privateGet(this, _getMetadataTypeManager).call(this)) == null ? void 0 : _a.properties;
    if (unregisteredProperties) {
      const properties = [];
      for (const property of Object.values(unregisteredProperties)) {
        if (types.includes(property.type)) {
          properties.push(
            new NoteProperty(property.name, property.type)
          );
        }
      }
      return properties;
    } else {
      const properties = (await __privateMethod(this, _ObsidianNotePropertyRepository_instances, loadRegisteredProperties_fn).call(this)).filter(
        (property) => types.includes(property.type())
      );
      return properties;
    }
  }
}
_getMetadataTypeManager = new WeakMap();
_ObsidianNotePropertyRepository_instances = new WeakSet();
loadRegisteredProperties_fn = async function() {
  let json = {};
  try {
    const rawText = await this.readPropertyTypes();
    json = JSON.parse(rawText);
  } catch (err) {
    console.error("[Timeline View]", err);
  }
  const registeredProperties = [];
  if (!("types" in json)) {
    return registeredProperties;
  }
  const types = json.types;
  if (types == null || typeof types !== "object") {
    return registeredProperties;
  }
  for (const [propertyName, maybePropertyType] of Object.entries(types)) {
    if (typeof maybePropertyType === "string") {
      registeredProperties.push(
        new NoteProperty(propertyName, maybePropertyType)
      );
    }
  }
  return registeredProperties;
};
function isFileFilter(obj) {
  return obj != null && typeof obj === "object" && "appliesTo" in obj && typeof obj.appliesTo === "function";
}
function or(a, b) {
  a = Array.isArray(a) ? matchAll(a) : a;
  b = Array.isArray(b) ? matchAll(b) : b;
  return new OrFilter(a, b);
}
class OrFilter {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  async appliesTo(file) {
    return await this.a.appliesTo(file) || await this.b.appliesTo(file);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function matchAll(...filters) {
  if (filters.length === 1) {
    if (Array.isArray(filters[0])) {
      return combine$1(filters[0]);
    }
  }
  return combine$1(filters);
}
function combine$1(filters) {
  if (filters.length === 1)
    return filters[0];
  if (filters.length === 0)
    return MatchNone;
  return MatchAllFilter.flattened(filters);
}
const MatchNone = {
  async appliesTo(file) {
    return false;
  },
  and(filter) {
    return this;
  },
  or(filter) {
    return filter;
  }
};
class MatchAllFilter {
  constructor(filters) {
    this.filters = filters;
  }
  static flattened(filters) {
    if (!filters.some((filter) => filter instanceof MatchAllFilter)) {
      return new MatchAllFilter(filters);
    }
    return new MatchAllFilter(
      filters.flatMap((filter) => {
        if (filter instanceof MatchAllFilter) {
          return filter.filters;
        }
        return [filter];
      })
    );
  }
  async appliesTo(file) {
    return Promise.all(
      this.filters.map((filter) => filter.appliesTo(file))
    ).then((all) => all.every((it) => it));
  }
  and(filter) {
    if (filter instanceof MatchAllFilter) {
      return new MatchAllFilter(this.filters.concat(filter.filters));
    }
    return new MatchAllFilter(
      this.filters.concat(filter)
    );
  }
  or(filter) {
    return or(this, filter);
  }
}
class FileContentFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file) {
    const content2 = await file.vault.cachedRead(file);
    return this.checker.matches(content2);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function isParentParser(parser) {
  return "containsNestedGroupParser" in parser && typeof parser.containsNestedGroupParser === "function";
}
function isStringChecker(obj) {
  return obj != null && typeof obj === "object" && "matches" in obj && typeof obj.matches === "function";
}
class FileNameFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file2) {
    return this.checker.matches(file2.basename);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class FilePathFilter {
  constructor(checker) {
    this.checker = checker;
  }
  async appliesTo(file) {
    return this.checker.matches(file.path);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return matchAll(this, filter);
  }
}
class Or {
  constructor(a, b) {
    this.a = a;
    this.b = b;
  }
  matches(test) {
    return this.a.matches(test) || this.b.matches(test);
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
function group(...checkers) {
  if (checkers.length === 1) {
    if (Array.isArray(checkers[0])) {
      return combine(checkers[0]);
    }
  }
  return combine(checkers);
}
function combine(checkers) {
  if (checkers.length === 1)
    return checkers[0];
  return new Group(checkers);
}
class Group {
  constructor(checkers) {
    this.checkers = checkers;
  }
  matches(test) {
    return this.checkers.every((checker) => checker.matches(test));
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this.checkers.concat([checker]));
  }
}
class Phrase {
  constructor(phrase2, matchCase = true) {
    this.phrase = phrase2;
    this.matchCase = matchCase;
  }
  matches(test) {
    if (this.matchCase)
      return test.includes(this.phrase);
    return test.toLocaleUpperCase().includes(this.phrase.toLocaleUpperCase());
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
class SubQueryPhraseParser {
  constructor(matchCase = true, buffer = "") {
    this.matchCase = matchCase;
    this.buffer = buffer;
  }
  parse(char) {
    switch (char) {
      case `\\`: {
        return new EscapedSubQueryPhraseParser(this.buffer, this.matchCase);
      }
      case `"`: {
        return null;
      }
    }
    return new SubQueryPhraseParser(this.matchCase, this.buffer + char);
  }
  end() {
    if (this.buffer.length > 0) {
      return new Phrase(this.buffer, this.matchCase);
    }
  }
}
class EscapedSubQueryPhraseParser extends SubQueryPhraseParser {
  constructor(buffer, matchCase = true) {
    super(matchCase, buffer);
  }
  parse(char) {
    return new SubQueryPhraseParser(
      this.matchCase,
      this.buffer + char
    );
  }
}
function not(checker) {
  if (checker instanceof Not) {
    return checker.not();
  }
  return new Not(checker);
}
class Not {
  constructor(checker) {
    this.checker = checker;
  }
  matches(test) {
    return !this.checker.matches(test);
  }
  not() {
    return this.checker;
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
const Word = Phrase;
class SubQueryWordParser {
  constructor(buffer, matchCase) {
    this.buffer = buffer;
    this.matchCase = matchCase;
  }
  parse(char) {
    if (char === ` `) {
      return null;
    }
    return new SubQueryWordParser(
      this.buffer + char,
      this.matchCase
    );
  }
  end() {
    if (this.buffer.length > 0) {
      return new Word(this.buffer, this.matchCase);
    }
  }
}
class SubQueryEitherParser {
  constructor(aChecker, bChecker, matchCase, internalParser = new DefaultSubQueryParser(matchCase)) {
    this.aChecker = aChecker;
    this.bChecker = bChecker;
    this.matchCase = matchCase;
    this.internalParser = internalParser;
  }
  static start(aChecker, matchCase = true) {
    return new SubQueryEitherParser(
      aChecker,
      group(),
      matchCase
    );
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return new SubQueryEitherParser(
        this.aChecker,
        this.nextChecker(),
        this.matchCase,
        new DefaultSubQueryParser(this.matchCase)
      );
    }
    return new SubQueryEitherParser(
      this.aChecker,
      this.bChecker,
      this.matchCase,
      nextParser
    );
  }
  nextChecker() {
    const next = this.internalParser.end();
    if (next != null) {
      return this.bChecker.and(next);
    }
    return this.bChecker;
  }
  end() {
    return this.aChecker.or(this.nextChecker());
  }
}
class SubQueryGroupParser {
  constructor(internalCheckers, internalParser, matchCase) {
    this.internalCheckers = internalCheckers;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(matchCase) {
    return new SubQueryGroupParser(
      [],
      new DefaultSubQueryParser(matchCase),
      matchCase
    );
  }
  parse(char) {
    if (char === `)` && !this.containsNestedGroupParser()) {
      return null;
    }
    const nextParser = this.internalParser.parse(char);
    if (nextParser != null) {
      return new SubQueryGroupParser(
        this.internalCheckers,
        nextParser,
        this.matchCase
      );
    } else {
      if (this.internalParser instanceof SubQueryWordParser) {
        switch (this.internalParser.buffer.toLocaleLowerCase()) {
          case "or": {
            return new SubQueryGroupParser(
              [],
              SubQueryEitherParser.start(
                group(this.internalCheckers),
                this.matchCase
              ),
              this.matchCase
            );
          }
          case "and": {
            return new SubQueryGroupParser(
              this.internalCheckers,
              new DefaultSubQueryParser(this.matchCase),
              this.matchCase
            );
          }
        }
      }
      return new SubQueryGroupParser(
        this.endInternalParser(),
        new DefaultSubQueryParser(this.matchCase),
        this.matchCase
      );
    }
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  endInternalParser() {
    const checker = this.internalParser.end();
    if (checker != null) {
      return this.internalCheckers.concat([checker]);
    }
    return this.internalCheckers;
  }
  end() {
    return group(this.endInternalParser());
  }
}
class SubQueryNegatedParser {
  constructor(matchCase, internalParser = new DefaultSubQueryParser(matchCase)) {
    this.matchCase = matchCase;
    this.internalParser = internalParser;
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new SubQueryNegatedParser(this.matchCase, nextParser);
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end() {
    const result = this.internalParser.end();
    if (isStringChecker(result)) {
      return not(result);
    }
  }
}
class DefaultSubQueryParser {
  constructor(matchCase) {
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `-`: {
        return new SubQueryNegatedParser(this.matchCase);
      }
      case `"`: {
        return new SubQueryPhraseParser(this.matchCase);
      }
      case `(`: {
        return SubQueryGroupParser.start(this.matchCase);
      }
      case ` `: {
        return this;
      }
      default: {
        return new SubQueryWordParser(char, this.matchCase);
      }
    }
  }
  end() {
  }
}
class MetadataTagFilter {
  constructor(checker) {
    this.checker = checker;
  }
  appliesTo(metadata) {
    const tags = metadata == null ? void 0 : metadata.tags;
    if (tags != null) {
      if (tags.some((tag) => this.checker.matches(`#${tag.tag}`))) {
        return true;
      }
    }
    const frontmatter = metadata == null ? void 0 : metadata.frontmatter;
    if (frontmatter == null)
      return false;
    if (this.checkTags(frontmatter.tag)) {
      return true;
    }
    if (this.checkTags(frontmatter.tags)) {
      return true;
    }
    return false;
  }
  checkTags(tags) {
    if (tags == null) {
      return false;
    }
    if (typeof tags === "string") {
      const match = this.checker.matches(tags);
      return match;
    }
    if (Array.isArray(tags)) {
      const match = tags.some((tag) => this.checker.matches(tag));
      return match;
    }
  }
}
class FileTagsFilter {
  constructor(tagChecker, metadata) {
    __publicField(this, "metadataFilter");
    this.metadata = metadata;
    this.metadataFilter = new MetadataTagFilter(tagChecker);
  }
  async appliesTo(file) {
    const cache = this.metadata.getFileCache(file);
    return this.metadataFilter.appliesTo(cache);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class OperatorParser {
  constructor(operator, metadata, internalParser, matchCase) {
    this.operator = operator;
    this.metadata = metadata;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(operator, metadata, matchCase) {
    return new OperatorParser(
      operator,
      metadata,
      new DefaultSubQueryParser(matchCase),
      matchCase
    );
  }
  parse(char) {
    if (this.operator === "tag" && char === "#")
      return this;
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new OperatorParser(
      this.operator,
      this.metadata,
      nextParser,
      this.matchCase
    );
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof SubQueryGroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end(activeFilter) {
    const checker = this.internalParser.end();
    if (isStringChecker(checker)) {
      switch (this.operator) {
        case "file": {
          return activeFilter.and(new FileNameFilter(checker));
        }
        case "path": {
          return activeFilter.and(new FilePathFilter(checker));
        }
        case "content": {
          return activeFilter.and(new FileContentFilter(checker));
        }
        case "tag": {
          return activeFilter.and(
            new FileTagsFilter(checker, this.metadata)
          );
        }
      }
    }
    return activeFilter;
  }
}
class MetatdataPropertyFilter {
  constructor(property, value) {
    this.property = property;
    this.value = value;
  }
  appliesTo(metadata) {
    const properties = metadata == null ? void 0 : metadata.frontmatter;
    if (properties == null)
      return false;
    const keys = Object.keys(properties).filter(
      (key) => this.property.matches(key)
    );
    if (keys.length === 0)
      return false;
    if (this.value == null)
      return true;
    return keys.some((key) => {
      var _a;
      const value = (_a = properties[key]) == null ? void 0 : _a.toString();
      if (value == null)
        return false;
      return this.value.matches(value);
    });
  }
}
class FilePropertyFilter {
  constructor(metadata, property, value) {
    __publicField(this, "metadataFilter");
    this.metadata = metadata;
    this.metadataFilter = new MetatdataPropertyFilter(property, value);
  }
  async appliesTo(file) {
    const cache = this.metadata.getFileCache(file);
    return this.metadataFilter.appliesTo(cache);
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
function negate(filters) {
  if (Array.isArray(filters)) {
    return negateSingle(matchAll(filters));
  }
  return negateSingle(filters);
}
function negateSingle(filter) {
  if (filter instanceof Negation)
    return filter.negate();
  return new Negation(filter);
}
class Negation {
  constructor(negated) {
    this.negated = negated;
  }
  async appliesTo(file) {
    return !this.negated.appliesTo(file);
  }
  negate() {
    return this.negated;
  }
  and(filter) {
    return matchAll(this, filter);
  }
  or(filter) {
    return or(this, filter);
  }
}
class EitherPerser {
  constructor(metadata, filterType, matchCase, collectedBFilters = [], internalParser = new DefaultParser(metadata, filterType, matchCase)) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.matchCase = matchCase;
    this.collectedBFilters = collectedBFilters;
    this.internalParser = internalParser;
  }
  static start(metadata, filterType, matchCase) {
    return new EitherPerser(metadata, filterType, matchCase);
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      const filterOrChecker = this.internalParser.end(EmtpyFilter);
      if (isFileFilter(filterOrChecker)) {
        return new EitherPerser(
          this.metadata,
          this.filterType,
          this.matchCase,
          this.collectedBFilters.concat([filterOrChecker])
        );
      }
      return new EitherPerser(
        this.metadata,
        this.filterType,
        this.matchCase
      );
    }
    return new EitherPerser(
      this.metadata,
      this.filterType,
      this.matchCase,
      this.collectedBFilters,
      nextParser
    );
  }
  end(activeFilter) {
    const filterOrChecker = this.internalParser.end(EmtpyFilter);
    if (isFileFilter(filterOrChecker)) {
      return activeFilter.or(matchAll(this.collectedBFilters.concat([filterOrChecker])));
    }
    return activeFilter;
  }
}
class WordParser {
  constructor(subParser, filterType, metadata, matchCase) {
    this.subParser = subParser;
    this.filterType = filterType;
    this.metadata = metadata;
    this.matchCase = matchCase;
  }
  static start(buffer, filterType, metadata, matchCase) {
    return new WordParser(
      new SubQueryWordParser(buffer, matchCase),
      filterType,
      metadata,
      matchCase
    );
  }
  get buffer() {
    return this.subParser.buffer;
  }
  parse(char) {
    if (char === `:`) {
      const buffer = this.subParser.buffer;
      switch (buffer) {
        case `file`:
        case `path`:
        case "content":
        case "tag": {
          return OperatorParser.start(buffer, this.metadata, this.matchCase);
        }
      }
      return new DefaultParser(this.metadata);
    }
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      switch (this.buffer.toLocaleLowerCase()) {
        case "or": {
          return EitherPerser.start(this.metadata, this.filterType, this.matchCase);
        }
        case "and": {
          return new DefaultParser(this.metadata);
        }
      }
      return null;
    }
    return new WordParser(
      nextParser,
      this.filterType,
      this.metadata,
      this.matchCase
    );
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
class GroupParser {
  constructor(metadata, filterType, internalFilter, internalParser, matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.internalFilter = internalFilter;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(metadata, filterType, matchCase) {
    return new GroupParser(
      metadata,
      filterType,
      EmtpyFilter,
      new DefaultParser(metadata, filterType, matchCase),
      matchCase
    );
  }
  parse(char) {
    if (char === `)` && !this.containsNestedGroupParser()) {
      return null;
    }
    const nextParser = this.internalParser.parse(char);
    if (nextParser != null) {
      return new GroupParser(
        this.metadata,
        this.filterType,
        this.internalFilter,
        nextParser,
        this.matchCase
      );
    } else {
      const filter = this.endInternalParser();
      return new GroupParser(
        this.metadata,
        this.filterType,
        filter,
        new DefaultParser(
          this.metadata,
          this.filterType,
          this.matchCase
        ),
        this.matchCase
      );
    }
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof GroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  endInternalParser() {
    const filter = this.internalParser.end(this.internalFilter);
    if (isFileFilter(filter)) {
      return filter;
    }
    return this.internalFilter;
  }
  end(activeFilter) {
    const filter = this.endInternalParser();
    return activeFilter.and(filter);
  }
}
class NegatedParser {
  constructor(metadata, filterType, internalParser, matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.internalParser = internalParser;
    this.matchCase = matchCase;
  }
  static start(metadata, filterType, matchCase) {
    return new NegatedParser(
      metadata,
      filterType,
      new DefaultParser(metadata, filterType, matchCase),
      matchCase
    );
  }
  parse(char) {
    const nextParser = this.internalParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    return new NegatedParser(
      this.metadata,
      this.filterType,
      nextParser,
      this.matchCase
    );
  }
  containsNestedGroupParser() {
    return this.internalParser instanceof GroupParser || isParentParser(this.internalParser) && this.internalParser.containsNestedGroupParser();
  }
  end(activeFilter) {
    const result = this.internalParser.end(EmtpyFilter);
    if (isFileFilter(result)) {
      return activeFilter.and(negate(result));
    }
    return activeFilter;
  }
}
class PhraseParser {
  constructor(filterType, matchCase = true) {
    __publicField(this, "subParser");
    this.filterType = filterType;
    this.subParser = new SubQueryPhraseParser(matchCase);
  }
  parse(char) {
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    this.subParser = nextParser;
    return this;
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
function regex(regex2, matchCase = false) {
  if (typeof regex2 === "string" || regex2 instanceof RegExp) {
    return new Regex(new RegExp(regex2));
  }
  return new Regex(new RegExp(regex2.join("")));
}
class Regex {
  constructor(regex2, matchCase = false) {
    __publicField(this, "regex");
    if (matchCase && regex2.flags.includes("i")) {
      this.regex = new RegExp(regex2, regex2.flags.split("").filter((it) => it !== "i").join(""));
    } else if (!matchCase && !regex2.flags.includes("i")) {
      this.regex = new RegExp(regex2, regex2.flags + "i");
    } else {
      this.regex = regex2;
    }
  }
  matches(test) {
    return this.regex.test(test);
  }
  or(checker) {
    return new Or(this, checker);
  }
  and(checker) {
    return group(this, checker);
  }
}
class SubQueryRegexParser {
  constructor(matchCase = true) {
    __publicField(this, "escaped", false);
    __publicField(this, "buffer", "");
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `\\`: {
        if (!this.escaped) {
          this.escaped = true;
          return this;
        }
      }
      case `/`: {
        if (!this.escaped) {
          return null;
        }
      }
    }
    this.escaped = false;
    this.buffer += char;
    return this;
  }
  end() {
    if (this.buffer.length > 0) {
      return regex(this.buffer, this.matchCase);
    }
  }
}
class RegexParser {
  constructor(filterType, matchCase = true) {
    __publicField(this, "subParser");
    this.filterType = filterType;
    this.subParser = new SubQueryRegexParser(matchCase);
  }
  parse(char) {
    const nextParser = this.subParser.parse(char);
    if (nextParser == null) {
      return null;
    }
    this.subParser = nextParser;
    return this;
  }
  end(activeFilter) {
    const checker = this.subParser.end();
    if (checker != null) {
      return activeFilter.and(this.filterType(checker));
    }
    return activeFilter;
  }
}
function parseProperty(metadata) {
  return new PropertyNameParser([], metadata);
}
class PropertyNameParser {
  constructor(checkers, metadata, parser = new DefaultSubQueryParser()) {
    this.checkers = checkers;
    this.metadata = metadata;
    this.parser = parser;
  }
  parse(char) {
    if (char === `]`) {
      return null;
    }
    if (char === `:`) {
      return new PropertyValueParser(
        group(this.endInternalParser()),
        this.metadata
      );
    }
    const next = this.parser.parse(char);
    if (next == null) {
      return new PropertyNameParser(
        this.endInternalParser(),
        this.metadata
      );
    }
    return new PropertyNameParser(this.checkers, this.metadata, next);
  }
  endInternalParser() {
    const checker = this.parser.end();
    if (checker != null) {
      return this.checkers.concat([checker]);
    }
    return this.checkers;
  }
  end(activeFilter) {
    return activeFilter.and(
      new FilePropertyFilter(
        this.metadata,
        group(this.endInternalParser())
      )
    );
  }
}
class PropertyValueParser {
  constructor(property, metadata, checkers = [], parser = new DefaultSubQueryParser()) {
    this.property = property;
    this.metadata = metadata;
    this.checkers = checkers;
    this.parser = parser;
  }
  parse(char) {
    if (char === `]`) {
      return null;
    }
    const next = this.parser.parse(char);
    if (next == null) {
      return new PropertyValueParser(
        this.property,
        this.metadata,
        this.endInternalParser(),
        new DefaultSubQueryParser()
      );
    }
    return new PropertyValueParser(
      this.property,
      this.metadata,
      this.checkers,
      next
    );
  }
  endInternalParser() {
    const checker = this.parser.end();
    if (checker != null) {
      return this.checkers.concat([checker]);
    }
    return this.checkers;
  }
  end(activeFilter) {
    return activeFilter.and(
      new FilePropertyFilter(
        this.metadata,
        this.property,
        group(this.endInternalParser())
      )
    );
  }
}
class DefaultParser {
  constructor(metadata, filterType = (checker) => new FileContentFilter(checker), matchCase) {
    this.metadata = metadata;
    this.filterType = filterType;
    this.matchCase = matchCase;
  }
  parse(char) {
    switch (char) {
      case `-`: {
        return NegatedParser.start(this.metadata, this.filterType, this.matchCase);
      }
      case `"`: {
        return new PhraseParser(this.filterType, this.matchCase);
      }
      case `/`: {
        return new RegexParser(this.filterType, this.matchCase);
      }
      case `(`: {
        return GroupParser.start(this.metadata, this.filterType, this.matchCase);
      }
      case `[`: {
        return parseProperty(this.metadata);
      }
      case ` `: {
        return null;
      }
      default: {
        return WordParser.start(char, this.filterType, this.metadata, this.matchCase);
      }
    }
  }
  end(activeFilter) {
    return activeFilter;
  }
}
const EmtpyFilter = {
  async appliesTo(file) {
    return false;
  },
  and(filter) {
    return filter;
  },
  or(filter) {
    return filter;
  }
};
function parse(query, metadata, filter = EmtpyFilter) {
  query = query.trim();
  let parser = new DefaultParser(metadata);
  for (const char of query) {
    const nextParser = parser.parse(char);
    if (nextParser == null) {
      const checker2 = parser.end(filter);
      if (isFileFilter(checker2)) {
        filter = checker2;
      }
      parser = new DefaultParser(metadata);
    } else {
      parser = nextParser;
    }
  }
  const checker = parser.end(filter);
  if (isFileFilter(checker)) {
    return checker;
  }
  return filter;
}
function truncate(value) {
  if (value === void 0) {
    return void 0;
  }
  return Math.trunc(value);
}
function exists(value) {
  return value !== null && value !== void 0;
}
class ObsidianNoteRepository {
  constructor(vault, metadata, files) {
    __privateAdd(this, _vault);
    __privateAdd(this, _metadata);
    __privateAdd(this, _files);
    __privateSet(this, _vault, vault);
    __privateSet(this, _metadata, metadata);
    __privateSet(this, _files, files);
  }
  async createNote(note) {
    let count = 0;
    let name = "Untitled.md";
    while (await __privateGet(this, _vault).adapter.exists(name)) {
      count++;
      name = `Untitled ${count}.md`;
    }
    const tFile = await __privateGet(this, _vault).create(name, "", {
      ctime: truncate(note.created),
      mtime: truncate(note.modified)
    });
    if (note.properties) {
      __privateGet(this, _files).processFrontMatter(tFile, (frontmatter) => {
        Object.assign(frontmatter, note.properties);
      });
    }
    return new ObsidianNote(tFile, __privateGet(this, _metadata));
  }
  async modifyNote(note, modification) {
    const tFile = this.getFileFromNote(note);
    if (tFile == null) {
      return;
    }
    if (modification.created != null || modification.modified != null) {
      await __privateGet(this, _vault).adapter.write(
        tFile.path,
        await __privateGet(this, _vault).adapter.read(tFile.path),
        {
          ctime: truncate(modification.created),
          mtime: truncate(modification.modified)
        }
      );
    }
    if (modification.property != null) {
      const property = modification.property;
      await __privateGet(this, _files).processFrontMatter(tFile, (frontmatter) => {
        for (const [key, value] of Object.entries(property)) {
          frontmatter[key] = value;
        }
      });
    }
  }
  getNoteForFile(file) {
    return new ObsidianNote(file, __privateGet(this, _metadata));
  }
  getFileFromNote(note) {
    if (note instanceof ObsidianNote) {
      return note.file();
    }
    return null;
  }
  listAll() {
    const vault = __privateGet(this, _vault);
    const metadata = __privateGet(this, _metadata);
    return function* () {
      for (const tFile of vault.getMarkdownFiles()) {
        yield new ObsidianNote(tFile, metadata);
      }
    }();
  }
  async listAllMatchingFilter(filter) {
    const vault = __privateGet(this, _vault);
    const metadata = __privateGet(this, _metadata);
    const processFile = filter instanceof ObsidianNoteFilter ? async (tFile) => {
      if (await filter.fileFilter().appliesTo(tFile)) {
        return new ObsidianNote(tFile, metadata);
      }
      return null;
    } : async (tFile) => {
      const note = new ObsidianNote(tFile, metadata);
      if (await filter.matches(note)) {
        return note;
      }
      return null;
    };
    const notesOrNull = await Promise.all(
      vault.getMarkdownFiles().map(processFile)
    );
    return notesOrNull.filter(exists);
  }
  getNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), MatchAllEmptyQuery),
      query
    );
  }
  getInclusiveNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), MatchAllEmptyQuery),
      query
    );
  }
  getExclusiveNoteFilterForQuery(query) {
    return new ObsidianNoteFilter(
      parse(query, __privateGet(this, _metadata), EmtpyFilter),
      query
    );
  }
}
_vault = new WeakMap();
_metadata = new WeakMap();
_files = new WeakMap();
class ObsidianNoteFilter {
  constructor(filter, query) {
    __privateAdd(this, _filter);
    __privateAdd(this, _query);
    __privateSet(this, _filter, filter);
    __privateSet(this, _query, query);
  }
  fileFilter() {
    return __privateGet(this, _filter);
  }
  query() {
    return __privateGet(this, _query);
  }
  async matches(note) {
    if (note instanceof ObsidianNote) {
      return await __privateGet(this, _filter).appliesTo(note.file());
    }
    return false;
  }
}
_filter = new WeakMap();
_query = new WeakMap();
class ObsidianNote {
  constructor(tFile, metadata) {
    __privateAdd(this, _tFile);
    __privateAdd(this, _metadata2);
    __privateSet(this, _tFile, tFile);
    __privateSet(this, _metadata2, metadata);
  }
  id() {
    return __privateGet(this, _tFile).path;
  }
  file() {
    return __privateGet(this, _tFile);
  }
  name() {
    return __privateGet(this, _tFile).basename;
  }
  created() {
    return __privateGet(this, _tFile).stat.ctime;
  }
  modified() {
    return __privateGet(this, _tFile).stat.mtime;
  }
  properties() {
    var _a, _b;
    return (_b = (_a = __privateGet(this, _metadata2).getFileCache(__privateGet(this, _tFile))) == null ? void 0 : _a.frontmatter) != null ? _b : {};
  }
}
_tFile = new WeakMap();
_metadata2 = new WeakMap();
const MatchAllEmptyQuery = {
  async appliesTo(file) {
    return true;
  },
  and(filter) {
    return filter;
  },
  or(filter) {
    return filter;
  }
};
async function createNewTimeline(notes, order, filter) {
  const includedNotes = Array.from(await notes.listAllMatchingFilter(filter));
  order.sortNotes(includedNotes);
  const firstNote = includedNotes.at(0);
  const lastNote = includedNotes.at(-1);
  const minValue = firstNote ? order.selectValueFromNote(firstNote) : 0;
  const maxValue = lastNote ? order.selectValueFromNote(lastNote) : minValue;
  const range2 = maxValue - minValue;
  const focalValue = minValue + range2 / 2;
  return {
    focalValue,
    filter,
    order
  };
}
function noop() {
}
const identity = (x) => x;
function assign(tar, src) {
  for (const k in src) tar[k] = src[k];
  return (
    /** @type {T & S} */
    tar
  );
}
function run(fn) {
  return fn();
}
function blank_object() {
  return /* @__PURE__ */ Object.create(null);
}
function run_all(fns) {
  fns.forEach(run);
}
function is_function(thing) {
  return typeof thing === "function";
}
function safe_not_equal(a, b) {
  return a != a ? b == b : a !== b || a && typeof a === "object" || typeof a === "function";
}
function is_empty(obj) {
  return Object.keys(obj).length === 0;
}
function subscribe(store, ...callbacks) {
  if (store == null) {
    for (const callback of callbacks) {
      callback(void 0);
    }
    return noop;
  }
  const unsub = store.subscribe(...callbacks);
  return unsub.unsubscribe ? () => unsub.unsubscribe() : unsub;
}
function get_store_value(store) {
  let value;
  subscribe(store, (_) => value = _)();
  return value;
}
function component_subscribe(component, store, callback) {
  component.$$.on_destroy.push(subscribe(store, callback));
}
function create_slot(definition, ctx, $$scope, fn) {
  if (definition) {
    const slot_ctx = get_slot_context(definition, ctx, $$scope, fn);
    return definition[0](slot_ctx);
  }
}
function get_slot_context(definition, ctx, $$scope, fn) {
  return definition[1] && fn ? assign($$scope.ctx.slice(), definition[1](fn(ctx))) : $$scope.ctx;
}
function get_slot_changes(definition, $$scope, dirty, fn) {
  if (definition[2] && fn) {
    const lets = definition[2](fn(dirty));
    if ($$scope.dirty === void 0) {
      return lets;
    }
    if (typeof lets === "object") {
      const merged = [];
      const len = Math.max($$scope.dirty.length, lets.length);
      for (let i = 0; i < len; i += 1) {
        merged[i] = $$scope.dirty[i] | lets[i];
      }
      return merged;
    }
    return $$scope.dirty | lets;
  }
  return $$scope.dirty;
}
function update_slot_base(slot, slot_definition, ctx, $$scope, slot_changes, get_slot_context_fn) {
  if (slot_changes) {
    const slot_context = get_slot_context(slot_definition, ctx, $$scope, get_slot_context_fn);
    slot.p(slot_context, slot_changes);
  }
}
function get_all_dirty_from_scope($$scope) {
  if ($$scope.ctx.length > 32) {
    const dirty = [];
    const length = $$scope.ctx.length / 32;
    for (let i = 0; i < length; i++) {
      dirty[i] = -1;
    }
    return dirty;
  }
  return -1;
}
function exclude_internal_props(props) {
  const result = {};
  for (const k in props) if (k[0] !== "$") result[k] = props[k];
  return result;
}
function compute_rest_props(props, keys) {
  const rest = {};
  keys = new Set(keys);
  for (const k in props) if (!keys.has(k) && k[0] !== "$") rest[k] = props[k];
  return rest;
}
function set_store_value(store, ret, value) {
  store.set(value);
  return ret;
}
function action_destroyer(action_result) {
  return action_result && is_function(action_result.destroy) ? action_result.destroy : noop;
}
const is_client = typeof window !== "undefined";
let now = is_client ? () => window.performance.now() : () => Date.now();
let raf = is_client ? (cb) => requestAnimationFrame(cb) : noop;
const tasks = /* @__PURE__ */ new Set();
function run_tasks(now2) {
  tasks.forEach((task) => {
    if (!task.c(now2)) {
      tasks.delete(task);
      task.f();
    }
  });
  if (tasks.size !== 0) raf(run_tasks);
}
function loop(callback) {
  let task;
  if (tasks.size === 0) raf(run_tasks);
  return {
    promise: new Promise((fulfill) => {
      tasks.add(task = { c: callback, f: fulfill });
    }),
    abort() {
      tasks.delete(task);
    }
  };
}
function append(target, node) {
  target.appendChild(node);
}
function get_root_for_style(node) {
  if (!node) return document;
  const root = node.getRootNode ? node.getRootNode() : node.ownerDocument;
  if (root && /** @type {ShadowRoot} */
  root.host) {
    return (
      /** @type {ShadowRoot} */
      root
    );
  }
  return node.ownerDocument;
}
function append_empty_stylesheet(node) {
  const style_element = element("style");
  style_element.textContent = "/* empty */";
  append_stylesheet(get_root_for_style(node), style_element);
  return style_element.sheet;
}
function append_stylesheet(node, style) {
  append(
    /** @type {Document} */
    node.head || node,
    style
  );
  return style.sheet;
}
function insert(target, node, anchor) {
  target.insertBefore(node, anchor || null);
}
function detach(node) {
  if (node.parentNode) {
    node.parentNode.removeChild(node);
  }
}
function destroy_each(iterations, detaching) {
  for (let i = 0; i < iterations.length; i += 1) {
    if (iterations[i]) iterations[i].d(detaching);
  }
}
function element(name) {
  return document.createElement(name);
}
function svg_element(name) {
  return document.createElementNS("http://www.w3.org/2000/svg", name);
}
function text(data) {
  return document.createTextNode(data);
}
function space() {
  return text(" ");
}
function empty() {
  return text("");
}
function listen(node, event, handler, options) {
  node.addEventListener(event, handler, options);
  return () => node.removeEventListener(event, handler, options);
}
function prevent_default(fn) {
  return function(event) {
    event.preventDefault();
    return fn.call(this, event);
  };
}
function stop_propagation(fn) {
  return function(event) {
    event.stopPropagation();
    return fn.call(this, event);
  };
}
function self(fn) {
  return function(event) {
    if (event.target === this) fn.call(this, event);
  };
}
function attr(node, attribute, value) {
  if (value == null) node.removeAttribute(attribute);
  else if (node.getAttribute(attribute) !== value) node.setAttribute(attribute, value);
}
const always_set_through_set_attribute = ["width", "height"];
function set_attributes(node, attributes) {
  const descriptors = Object.getOwnPropertyDescriptors(node.__proto__);
  for (const key in attributes) {
    if (attributes[key] == null) {
      node.removeAttribute(key);
    } else if (key === "style") {
      node.style.cssText = attributes[key];
    } else if (key === "__value") {
      node.value = node[key] = attributes[key];
    } else if (descriptors[key] && descriptors[key].set && always_set_through_set_attribute.indexOf(key) === -1) {
      node[key] = attributes[key];
    } else {
      attr(node, key, attributes[key]);
    }
  }
}
function children(element2) {
  return Array.from(element2.childNodes);
}
function set_data(text2, data) {
  data = "" + data;
  if (text2.data === data) return;
  text2.data = /** @type {string} */
  data;
}
function set_input_value(input, value) {
  input.value = value == null ? "" : value;
}
function set_style(node, key, value, important) {
  if (value == null) {
    node.style.removeProperty(key);
  } else {
    node.style.setProperty(key, value, "");
  }
}
function select_option(select, value, mounting) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    if (option.__value === value) {
      option.selected = true;
      return;
    }
  }
  if (!mounting || value !== void 0) {
    select.selectedIndex = -1;
  }
}
function select_options(select, value) {
  for (let i = 0; i < select.options.length; i += 1) {
    const option = select.options[i];
    option.selected = ~value.indexOf(option.__value);
  }
}
let crossorigin;
function is_crossorigin() {
  if (crossorigin === void 0) {
    crossorigin = false;
    try {
      if (typeof window !== "undefined" && window.parent) {
        void window.parent.document;
      }
    } catch (error) {
      crossorigin = true;
    }
  }
  return crossorigin;
}
function add_iframe_resize_listener(node, fn) {
  const computed_style = getComputedStyle(node);
  if (computed_style.position === "static") {
    node.style.position = "relative";
  }
  const iframe = element("iframe");
  iframe.setAttribute(
    "style",
    "display: block; position: absolute; top: 0; left: 0; width: 100%; height: 100%; overflow: hidden; border: 0; opacity: 0; pointer-events: none; z-index: -1;"
  );
  iframe.setAttribute("aria-hidden", "true");
  iframe.tabIndex = -1;
  const crossorigin2 = is_crossorigin();
  let unsubscribe;
  if (crossorigin2) {
    iframe.src = "data:text/html,<script>onresize=function(){parent.postMessage(0,'*')}<\/script>";
    unsubscribe = listen(
      window,
      "message",
      /** @param {MessageEvent} event */
      (event) => {
        if (event.source === iframe.contentWindow) fn();
      }
    );
  } else {
    iframe.src = "about:blank";
    iframe.onload = () => {
      unsubscribe = listen(iframe.contentWindow, "resize", fn);
      fn();
    };
  }
  append(node, iframe);
  return () => {
    if (crossorigin2) {
      unsubscribe();
    } else if (unsubscribe && iframe.contentWindow) {
      unsubscribe();
    }
    detach(iframe);
  };
}
function toggle_class(element2, name, toggle) {
  element2.classList.toggle(name, !!toggle);
}
function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
  return new CustomEvent(type, { detail, bubbles, cancelable });
}
const managed_styles = /* @__PURE__ */ new Map();
let active = 0;
function hash(str) {
  let hash2 = 5381;
  let i = str.length;
  while (i--) hash2 = (hash2 << 5) - hash2 ^ str.charCodeAt(i);
  return hash2 >>> 0;
}
function create_style_information(doc, node) {
  const info = { stylesheet: append_empty_stylesheet(node), rules: {} };
  managed_styles.set(doc, info);
  return info;
}
function create_rule(node, a, b, duration, delay, ease, fn, uid = 0) {
  const step = 16.666 / duration;
  let keyframes = "{\n";
  for (let p = 0; p <= 1; p += step) {
    const t = a + (b - a) * ease(p);
    keyframes += p * 100 + `%{${fn(t, 1 - t)}}
`;
  }
  const rule = keyframes + `100% {${fn(b, 1 - b)}}
}`;
  const name = `__svelte_${hash(rule)}_${uid}`;
  const doc = get_root_for_style(node);
  const { stylesheet, rules } = managed_styles.get(doc) || create_style_information(doc, node);
  if (!rules[name]) {
    rules[name] = true;
    stylesheet.insertRule(`@keyframes ${name} ${rule}`, stylesheet.cssRules.length);
  }
  const animation = node.style.animation || "";
  node.style.animation = `${animation ? `${animation}, ` : ""}${name} ${duration}ms linear ${delay}ms 1 both`;
  active += 1;
  return name;
}
function delete_rule(node, name) {
  const previous = (node.style.animation || "").split(", ");
  const next = previous.filter(
    name ? (anim) => anim.indexOf(name) < 0 : (anim) => anim.indexOf("__svelte") === -1
    // remove all Svelte animations
  );
  const deleted = previous.length - next.length;
  if (deleted) {
    node.style.animation = next.join(", ");
    active -= deleted;
    if (!active) clear_rules();
  }
}
function clear_rules() {
  raf(() => {
    if (active) return;
    managed_styles.forEach((info) => {
      const { ownerNode } = info.stylesheet;
      if (ownerNode) detach(ownerNode);
    });
    managed_styles.clear();
  });
}
let current_component;
function set_current_component(component) {
  current_component = component;
}
function get_current_component() {
  if (!current_component) throw new Error("Function called outside component initialization");
  return current_component;
}
function onMount(fn) {
  get_current_component().$$.on_mount.push(fn);
}
function onDestroy(fn) {
  get_current_component().$$.on_destroy.push(fn);
}
function createEventDispatcher() {
  const component = get_current_component();
  return (type, detail, { cancelable = false } = {}) => {
    const callbacks = component.$$.callbacks[type];
    if (callbacks) {
      const event = custom_event(
        /** @type {string} */
        type,
        detail,
        { cancelable }
      );
      callbacks.slice().forEach((fn) => {
        fn.call(component, event);
      });
      return !event.defaultPrevented;
    }
    return true;
  };
}
function setContext(key, context) {
  get_current_component().$$.context.set(key, context);
  return context;
}
function getContext(key) {
  return get_current_component().$$.context.get(key);
}
function bubble(component, event) {
  const callbacks = component.$$.callbacks[event.type];
  if (callbacks) {
    callbacks.slice().forEach((fn) => fn.call(this, event));
  }
}
const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
function add_flush_callback(fn) {
  flush_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length) binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function flush_render_callbacks(fns) {
  const filtered = [];
  const targets = [];
  render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
  targets.forEach((c) => c());
  render_callbacks = filtered;
}
let promise;
function wait() {
  if (!promise) {
    promise = Promise.resolve();
    promise.then(() => {
      promise = null;
    });
  }
  return promise;
}
function dispatch(node, direction, kind) {
  node.dispatchEvent(custom_event(`${direction ? "intro" : "outro"}${kind}`));
}
const outroing = /* @__PURE__ */ new Set();
let outros;
function group_outros() {
  outros = {
    r: 0,
    c: [],
    p: outros
    // parent group
  };
}
function check_outros() {
  if (!outros.r) {
    run_all(outros.c);
  }
  outros = outros.p;
}
function transition_in(block, local) {
  if (block && block.i) {
    outroing.delete(block);
    block.i(local);
  }
}
function transition_out(block, local, detach2, callback) {
  if (block && block.o) {
    if (outroing.has(block)) return;
    outroing.add(block);
    outros.c.push(() => {
      outroing.delete(block);
      if (callback) {
        if (detach2) block.d(1);
        callback();
      }
    });
    block.o(local);
  } else if (callback) {
    callback();
  }
}
const null_transition = { duration: 0 };
function create_bidirectional_transition(node, fn, params, intro) {
  const options = { direction: "both" };
  let config = fn(node, params, options);
  let t = intro ? 0 : 1;
  let running_program = null;
  let pending_program = null;
  let animation_name = null;
  let original_inert_value;
  function clear_animation() {
    if (animation_name) delete_rule(node, animation_name);
  }
  function init2(program, duration) {
    const d = (
      /** @type {Program['d']} */
      program.b - t
    );
    duration *= Math.abs(d);
    return {
      a: t,
      b: program.b,
      d,
      duration,
      start: program.start,
      end: program.start + duration,
      group: program.group
    };
  }
  function go(b) {
    const {
      delay = 0,
      duration = 300,
      easing = identity,
      tick = noop,
      css
    } = config || null_transition;
    const program = {
      start: now() + delay,
      b
    };
    if (!b) {
      program.group = outros;
      outros.r += 1;
    }
    if ("inert" in node) {
      if (b) {
        if (original_inert_value !== void 0) {
          node.inert = original_inert_value;
        }
      } else {
        original_inert_value = /** @type {HTMLElement} */
        node.inert;
        node.inert = true;
      }
    }
    if (running_program || pending_program) {
      pending_program = program;
    } else {
      if (css) {
        clear_animation();
        animation_name = create_rule(node, t, b, duration, delay, easing, css);
      }
      if (b) tick(0, 1);
      running_program = init2(program, duration);
      add_render_callback(() => dispatch(node, b, "start"));
      loop((now2) => {
        if (pending_program && now2 > pending_program.start) {
          running_program = init2(pending_program, duration);
          pending_program = null;
          dispatch(node, running_program.b, "start");
          if (css) {
            clear_animation();
            animation_name = create_rule(
              node,
              t,
              running_program.b,
              running_program.duration,
              0,
              easing,
              config.css
            );
          }
        }
        if (running_program) {
          if (now2 >= running_program.end) {
            tick(t = running_program.b, 1 - t);
            dispatch(node, running_program.b, "end");
            if (!pending_program) {
              if (running_program.b) {
                clear_animation();
              } else {
                if (!--running_program.group.r) run_all(running_program.group.c);
              }
            }
            running_program = null;
          } else if (now2 >= running_program.start) {
            const p = now2 - running_program.start;
            t = running_program.a + running_program.d * easing(p / running_program.duration);
            tick(t, 1 - t);
          }
        }
        return !!(running_program || pending_program);
      });
    }
  }
  return {
    run(b) {
      if (is_function(config)) {
        wait().then(() => {
          const opts = { direction: b ? "in" : "out" };
          config = config(opts);
          go(b);
        });
      } else {
        go(b);
      }
    },
    end() {
      clear_animation();
      running_program = pending_program = null;
    }
  };
}
function ensure_array_like(array_like_or_iterator) {
  return (array_like_or_iterator == null ? void 0 : array_like_or_iterator.length) !== void 0 ? array_like_or_iterator : Array.from(array_like_or_iterator);
}
function outro_and_destroy_block(block, lookup) {
  transition_out(block, 1, 1, () => {
    lookup.delete(block.key);
  });
}
function update_keyed_each(old_blocks, dirty, get_key, dynamic, ctx, list, lookup, node, destroy, create_each_block2, next, get_context) {
  let o = old_blocks.length;
  let n = list.length;
  let i = o;
  const old_indexes = {};
  while (i--) old_indexes[old_blocks[i].key] = i;
  const new_blocks = [];
  const new_lookup = /* @__PURE__ */ new Map();
  const deltas = /* @__PURE__ */ new Map();
  const updates = [];
  i = n;
  while (i--) {
    const child_ctx = get_context(ctx, list, i);
    const key = get_key(child_ctx);
    let block = lookup.get(key);
    if (!block) {
      block = create_each_block2(key, child_ctx);
      block.c();
    } else {
      updates.push(() => block.p(child_ctx, dirty));
    }
    new_lookup.set(key, new_blocks[i] = block);
    if (key in old_indexes) deltas.set(key, Math.abs(i - old_indexes[key]));
  }
  const will_move = /* @__PURE__ */ new Set();
  const did_move = /* @__PURE__ */ new Set();
  function insert2(block) {
    transition_in(block, 1);
    block.m(node, next);
    lookup.set(block.key, block);
    next = block.first;
    n--;
  }
  while (o && n) {
    const new_block = new_blocks[n - 1];
    const old_block = old_blocks[o - 1];
    const new_key = new_block.key;
    const old_key = old_block.key;
    if (new_block === old_block) {
      next = new_block.first;
      o--;
      n--;
    } else if (!new_lookup.has(old_key)) {
      destroy(old_block, lookup);
      o--;
    } else if (!lookup.has(new_key) || will_move.has(new_key)) {
      insert2(new_block);
    } else if (did_move.has(old_key)) {
      o--;
    } else if (deltas.get(new_key) > deltas.get(old_key)) {
      did_move.add(new_key);
      insert2(new_block);
    } else {
      will_move.add(old_key);
      o--;
    }
  }
  while (o--) {
    const old_block = old_blocks[o];
    if (!new_lookup.has(old_block.key)) destroy(old_block, lookup);
  }
  while (n) insert2(new_blocks[n - 1]);
  run_all(updates);
  return new_blocks;
}
function get_spread_update(levels, updates) {
  const update2 = {};
  const to_null_out = {};
  const accounted_for = { $$scope: 1 };
  let i = levels.length;
  while (i--) {
    const o = levels[i];
    const n = updates[i];
    if (n) {
      for (const key in o) {
        if (!(key in n)) to_null_out[key] = 1;
      }
      for (const key in n) {
        if (!accounted_for[key]) {
          update2[key] = n[key];
          accounted_for[key] = 1;
        }
      }
      levels[i] = n;
    } else {
      for (const key in o) {
        accounted_for[key] = 1;
      }
    }
  }
  for (const key in to_null_out) {
    if (!(key in update2)) update2[key] = void 0;
  }
  return update2;
}
function get_spread_object(spread_props) {
  return typeof spread_props === "object" && spread_props !== null ? spread_props : {};
}
function bind(component, name, callback) {
  const index = component.$$.props[name];
  if (index !== void 0) {
    component.$$.bound[index] = callback;
    callback(component.$$.ctx[index]);
  }
}
function create_component(block) {
  block && block.c();
}
function mount_component(component, target, anchor) {
  const { fragment, after_update } = component.$$;
  fragment && fragment.m(target, anchor);
  add_render_callback(() => {
    const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
    if (component.$$.on_destroy) {
      component.$$.on_destroy.push(...new_on_destroy);
    } else {
      run_all(new_on_destroy);
    }
    component.$$.on_mount = [];
  });
  after_update.forEach(add_render_callback);
}
function destroy_component(component, detaching) {
  const $$ = component.$$;
  if ($$.fragment !== null) {
    flush_render_callbacks($$.after_update);
    run_all($$.on_destroy);
    $$.fragment && $$.fragment.d(detaching);
    $$.on_destroy = $$.fragment = null;
    $$.ctx = [];
  }
}
function make_dirty(component, i) {
  if (component.$$.dirty[0] === -1) {
    dirty_components.push(component);
    schedule_update();
    component.$$.dirty.fill(0);
  }
  component.$$.dirty[i / 31 | 0] |= 1 << i % 31;
}
function init(component, options, instance2, create_fragment2, not_equal, props, append_styles = null, dirty = [-1]) {
  const parent_component = current_component;
  set_current_component(component);
  const $$ = component.$$ = {
    fragment: null,
    ctx: [],
    // state
    props,
    update: noop,
    not_equal,
    bound: blank_object(),
    // lifecycle
    on_mount: [],
    on_destroy: [],
    on_disconnect: [],
    before_update: [],
    after_update: [],
    context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
    // everything else
    callbacks: blank_object(),
    dirty,
    skip_bound: false,
    root: options.target || parent_component.$$.root
  };
  append_styles && append_styles($$.root);
  let ready = false;
  $$.ctx = instance2 ? instance2(component, options.props || {}, (i, ret, ...rest) => {
    const value = rest.length ? rest[0] : ret;
    if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
      if (!$$.skip_bound && $$.bound[i]) $$.bound[i](value);
      if (ready) make_dirty(component, i);
    }
    return ret;
  }) : [];
  $$.update();
  ready = true;
  run_all($$.before_update);
  $$.fragment = create_fragment2 ? create_fragment2($$.ctx) : false;
  if (options.target) {
    if (options.hydrate) {
      const nodes = children(options.target);
      $$.fragment && $$.fragment.l(nodes);
      nodes.forEach(detach);
    } else {
      $$.fragment && $$.fragment.c();
    }
    if (options.intro) transition_in(component.$$.fragment);
    mount_component(component, options.target, options.anchor);
    flush();
  }
  set_current_component(parent_component);
}
class SvelteComponent {
  constructor() {
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$");
    /**
     * ### PRIVATE API
     *
     * Do not use, may change at any time
     *
     * @type {any}
     */
    __publicField(this, "$$set");
  }
  /** @returns {void} */
  $destroy() {
    destroy_component(this, 1);
    this.$destroy = noop;
  }
  /**
   * @template {Extract<keyof Events, string>} K
   * @param {K} type
   * @param {((e: Events[K]) => void) | null | undefined} callback
   * @returns {() => void}
   */
  $on(type, callback) {
    if (!is_function(callback)) {
      return noop;
    }
    const callbacks = this.$$.callbacks[type] || (this.$$.callbacks[type] = []);
    callbacks.push(callback);
    return () => {
      const index = callbacks.indexOf(callback);
      if (index !== -1) callbacks.splice(index, 1);
    };
  }
  /**
   * @param {Partial<Props>} props
   * @returns {void}
   */
  $set(props) {
    if (this.$$set && !is_empty(props)) {
      this.$$.skip_bound = true;
      this.$$set(props);
      this.$$.skip_bound = false;
    }
  }
}
const PUBLIC_VERSION = "4";
const subscriber_queue = [];
function writable(value, start = noop) {
  let stop;
  const subscribers = /* @__PURE__ */ new Set();
  function set(new_value) {
    if (safe_not_equal(value, new_value)) {
      value = new_value;
      if (stop) {
        const run_queue = !subscriber_queue.length;
        for (const subscriber of subscribers) {
          subscriber[1]();
          subscriber_queue.push(subscriber, value);
        }
        if (run_queue) {
          for (let i = 0; i < subscriber_queue.length; i += 2) {
            subscriber_queue[i][0](subscriber_queue[i + 1]);
          }
          subscriber_queue.length = 0;
        }
      }
    }
  }
  function update2(fn) {
    set(fn(value));
  }
  function subscribe2(run2, invalidate = noop) {
    const subscriber = [run2, invalidate];
    subscribers.add(subscriber);
    if (subscribers.size === 1) {
      stop = start(set, update2) || noop;
    }
    run2(value);
    return () => {
      subscribers.delete(subscriber);
      if (subscribers.size === 0 && stop) {
        stop();
        stop = null;
      }
    };
  }
  return { set, update: update2, subscribe: subscribe2 };
}
function titleEl(itemView) {
  if (!itemView.titleEl) {
    return void 0;
  }
  return itemView.titleEl;
}
function workspaceLeafExt(leaf) {
  if ("updateHeader" in leaf && typeof leaf.updateHeader === "function" && leaf.updateHeader != null) {
    return leaf;
  }
  return null;
}
function preventOpenFileWhen(component, condition) {
  const openFile = component.leaf.openFile;
  component.leaf.openFile = async (file, openState) => {
    if (condition(file, openState)) {
      return;
    }
    return openFile.call(component.leaf, file, openState);
  };
  const onClose = component.onClose;
  component.onClose = () => {
    component.leaf.openFile = openFile;
    onClose.call(component);
  };
}
function writableProperties(object, onChildModified) {
  const children2 = /* @__PURE__ */ new Map();
  const childNamespaces = /* @__PURE__ */ new Map();
  return {
    make(key, defaultValue) {
      let child = children2.get(String(key));
      if (child) {
        return child;
      }
      if (key in object) {
        child = writable(object[key]);
      } else {
        child = writable(defaultValue);
      }
      child.subscribe((newValue) => {
        if (object[key] !== newValue) {
          object[key] = newValue;
          onChildModified(key, newValue);
        }
      });
      children2.set(String(key), child);
      return child;
    },
    namespace(name) {
      let childNamespace = childNamespaces.get(String(name));
      if (childNamespace) {
        return childNamespace;
      }
      const childObj = object[name] || {};
      childNamespace = writableProperties(
        childObj,
        (key, newObj) => {
          childObj[key] = newObj;
          object[name] = childObj;
          onChildModified(name, childObj);
        }
      );
      childNamespaces.set(String(name), childNamespace);
      return childNamespace;
    }
  };
}
if (typeof window !== "undefined")
  (window.__svelte || (window.__svelte = { v: /* @__PURE__ */ new Set() })).v.add(PUBLIC_VERSION);
class ValuePerPixelScale {
  constructor(valuePerPixel) {
    this.valuePerPixel = valuePerPixel;
  }
  toPixels(value) {
    return Math.floor(value / this.valuePerPixel);
  }
  toValue(pixels) {
    return pixels * this.valuePerPixel;
  }
}
class TimelineNavigationSvelteImpl {
  constructor(scaleProperty, items, setFocalValue, availableWidth) {
    __publicField(this, "scale");
    this.scaleProperty = scaleProperty;
    this.items = items;
    this.setFocalValue = setFocalValue;
    this.availableWidth = availableWidth;
    this.scale = new ValuePerPixelScale(1);
    scaleProperty.subscribe((newValue) => {
      this.scale = newValue;
    });
  }
  zoomIn(constraints) {
    const valuePerPixel = this.scale.toValue(1);
    let orderOfMagnitude = Math.floor(Math.log10(valuePerPixel));
    const scaleBase = Math.pow(10, orderOfMagnitude);
    let multiple = Math.floor(valuePerPixel / scaleBase);
    multiple -= 1;
    if (multiple === 0) {
      multiple = 9;
      orderOfMagnitude -= 1;
    }
    const newScale = this.scaleProperty.set(
      new ValuePerPixelScale(multiple * Math.pow(10, orderOfMagnitude))
    );
    if (constraints != null) {
      const { keepValue, at } = constraints;
      this.setFocalValue(() => keepValue - newScale.toValue(at));
    }
  }
  zoomOut(constraints) {
    const valuePerPixel = this.scale.toValue(1);
    let orderOfMagnitude = Math.floor(Math.log10(valuePerPixel));
    const scaleBase = Math.pow(10, orderOfMagnitude);
    let multiple = Math.floor(valuePerPixel / scaleBase);
    multiple += 1;
    if (multiple === 10) {
      multiple = 1;
      orderOfMagnitude += 1;
    }
    const newScale = this.scaleProperty.set(
      new ValuePerPixelScale(multiple * Math.pow(10, orderOfMagnitude))
    );
    if (constraints != null) {
      const { keepValue, at } = constraints;
      this.setFocalValue(() => keepValue - newScale.toValue(at));
    }
  }
  zoomToFit(items = this.items.get(), width = this.availableWidth()) {
    const minimum = this.minimumValue(items);
    const maximum = this.maximumValue(items);
    const span = maximum - minimum;
    if (span === 0) {
      this.scaleProperty.set(new ValuePerPixelScale(1));
      this.setFocalValue(() => minimum);
      return;
    }
    this.scaleProperty.set(new ValuePerPixelScale(span / width));
    const centerValue = this.centerValue(items);
    this.setFocalValue(() => centerValue);
  }
  scrollToFirst() {
    const minimum = this.minimumValue();
    this.scrollToValue(minimum);
  }
  scrollToValue(value) {
    this.setFocalValue(() => value);
  }
  minimumValue(items = this.items.get()) {
    let minimumValue;
    for (const item of items) {
      if (minimumValue === void 0 || item.value() < minimumValue) {
        minimumValue = item.value();
      }
    }
    if (minimumValue === void 0) {
      minimumValue = 0;
    }
    return minimumValue;
  }
  maximumValue(items = this.items.get()) {
    let maximumValue;
    for (const item of items) {
      if (maximumValue === void 0 || item.value() > maximumValue) {
        maximumValue = item.value();
      }
    }
    if (maximumValue === void 0) {
      maximumValue = 0;
    }
    return maximumValue;
  }
  centerValue(items = this.items.get()) {
    const minimumValue = this.minimumValue(items);
    const maximumValue = this.maximumValue(items);
    return (maximumValue - minimumValue) / 2 + minimumValue;
  }
}
function timelineNavigation(scale, items, focalValue, availableWidth) {
  return new TimelineNavigationSvelteImpl(
    scale,
    items,
    focalValue,
    availableWidth
  );
}
function displayDateValue(value, scale) {
  const date = new Date(value);
  const dateString = date.toLocaleDateString();
  if (scale < 24 * 60 * 60 * 1e3) {
    if (scale < 1e3) {
      return dateString + " " + date.toLocaleTimeString() + " " + date.getMilliseconds() + "ms";
    }
    return dateString + " " + date.toLocaleTimeString();
  }
  return dateString;
}
class DateValueDisplay {
  constructor() {
    __publicField(this, "labelStepValue");
    this.labelStepValue = 1001;
  }
  displayValue(value) {
    return displayDateValue(value, this.labelStepValue);
  }
  getSmallestLabelStepValue(scale) {
    const factors = {
      1e3: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1e3],
      12: [1, 2, 3, 4, 6, 12],
      24: [1, 2, 3, 4, 6, 12, 24],
      60: [1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60],
      365: [1, 2, 73, 365]
    };
    const units = {
      millisecond: 1e3,
      second: 60,
      minute: 60,
      hour: 24,
      day: 365,
      year: 1e3
    };
    const unitMultiples = {
      millisecond: 1,
      second: 1e3,
      minute: 60 * 1e3,
      hour: 60 * 60 * 1e3,
      day: 24 * 60 * 60 * 1e3,
      year: 365 * 24 * 60 * 60 * 1e3
    };
    const minStepWidths = {
      millisecond: 256,
      second: 160,
      minute: 160,
      hour: 160,
      day: 128,
      year: 128
    };
    outer: for (const [unit, maximum] of Object.entries(units)) {
      const unitFactors = factors[maximum];
      const unitMultiple = unitMultiples[unit];
      const minStepWidth = minStepWidths[unit];
      const minStepValue = scale.toValue(minStepWidth);
      for (const factor of unitFactors) {
        const total = unitMultiple * factor;
        if (total >= minStepValue) {
          this.labelStepValue = total;
          break outer;
        }
      }
    }
    this.labelStepValue = getSmallestMultipleOf10Above(scale.toValue(128));
    return this.labelStepValue;
  }
  labels(labelCount, labelStepValue, firstLabelValue) {
    if (labelCount < 1 || Number.isNaN(labelCount)) {
      labelCount = 1;
    }
    const values = new Array(Math.ceil(labelCount)).fill(0).map((_, i) => firstLabelValue + i * labelStepValue);
    return values.map((value) => ({ text: this.displayValue(value), value }));
  }
}
function timelineDateValueDisplay() {
  return new DateValueDisplay();
}
const numericValueDisplay = {
  labels(labelCount, labelStepValue, firstLabelValue) {
    if (labelCount < 1 || Number.isNaN(labelCount)) {
      labelCount = 1;
    }
    const values = new Array(Math.ceil(labelCount)).fill(0).map((_, i) => firstLabelValue + i * labelStepValue);
    return values.map((value) => ({ text: this.displayValue(value), value }));
  },
  getSmallestLabelStepValue(scale) {
    const minStepWidth = 64;
    const minStepValue = scale.toValue(minStepWidth);
    return getSmallestMultipleOf10Above(minStepValue);
  },
  displayValue(value) {
    return value.toLocaleString();
  }
};
function getSmallestMultipleOf10Above(minStepValue) {
  const log = Math.floor(Math.log10(minStepValue));
  const orderOfMagnitude = Math.pow(10, log);
  for (const multiple of [1, 2.5, 5]) {
    const option = multiple * orderOfMagnitude;
    if (Math.floor(option) === option && option > minStepValue) {
      return option;
    }
  }
  return orderOfMagnitude * 10;
}
function timelineNumericValueDisplay() {
  return numericValueDisplay;
}
function create_fragment$C(ctx) {
  let div;
  let t;
  let div_style_value;
  return {
    c() {
      div = element("div");
      t = text(
        /*text*/
        ctx[0]
      );
      attr(div, "class", "label svelte-1rdsdcl");
      attr(
        div,
        "data-value",
        /*text*/
        ctx[0]
      );
      attr(div, "style", div_style_value = "left: " + /*position*/
      ctx[1] + "px;" + /*style*/
      ctx[2]);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, t);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*text*/
      1) set_data(
        t,
        /*text*/
        ctx2[0]
      );
      if (dirty & /*text*/
      1) {
        attr(
          div,
          "data-value",
          /*text*/
          ctx2[0]
        );
      }
      if (dirty & /*position, style*/
      6 && div_style_value !== (div_style_value = "left: " + /*position*/
      ctx2[1] + "px;" + /*style*/
      ctx2[2])) {
        attr(div, "style", div_style_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function instance$z($$self, $$props, $$invalidate) {
  let { text: text2 } = $$props;
  let { position } = $$props;
  let { style = "" } = $$props;
  $$self.$$set = ($$props2) => {
    if ("text" in $$props2) $$invalidate(0, text2 = $$props2.text);
    if ("position" in $$props2) $$invalidate(1, position = $$props2.position);
    if ("style" in $$props2) $$invalidate(2, style = $$props2.style);
  };
  return [text2, position, style];
}
class RulerLabel extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$z, create_fragment$C, safe_not_equal, { text: 0, position: 1, style: 2 });
  }
}
function hoverTooltip(element2, args) {
  const tooltip = document.createElement("div");
  tooltip.className = "tooltip " + args.className;
  tooltip.innerText = args.label;
  const tooltipArrow = document.createElement("div");
  tooltipArrow.className = "tooltip-arrow";
  tooltip.appendChild(tooltipArrow);
  function position({ elementPosition, styles }) {
    const clientBounds = element2.getBoundingClientRect();
    const relativePosition = (elementPosition != null ? elementPosition : hoverTooltip.center)(
      clientBounds
    );
    tooltip.setCssStyles({
      ...styles,
      top: `${relativePosition.y}px`,
      left: `${relativePosition.x}px`
    });
  }
  position(args);
  if (args.visible) {
    document.body.appendChild(tooltip);
  }
  let observer = new MutationObserver(() => position(args));
  observer.observe(element2, { attributes: true });
  return {
    destroy() {
      observer.disconnect();
      tooltip.remove();
    },
    update(args2) {
      tooltip.innerText = args2.label;
      if (tooltipArrow.parentElement !== tooltip) {
        tooltip.appendChild(tooltipArrow);
      }
      tooltip.className = "tooltip " + args2.className;
      position(args2);
      observer.disconnect();
      observer = new MutationObserver(() => position(args2));
      observer.observe(element2, { attributes: true });
      if (args2.visible && tooltip.parentElement != document.body) {
        document.body.appendChild(tooltip);
      } else if (!args2.visible && tooltip.parentElement == document.body) {
        tooltip.remove();
      }
    }
  };
}
hoverTooltip.center = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.bottom = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.bottom
  };
};
hoverTooltip.top = function(rect) {
  return {
    x: rect.x + rect.width / 2,
    y: rect.top
  };
};
hoverTooltip.left = function(rect) {
  return {
    x: rect.left,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.right = function(rect) {
  return {
    x: rect.right,
    y: rect.y + rect.height / 2
  };
};
hoverTooltip.topLeft = function(rect) {
  return {
    x: rect.left,
    y: rect.top
  };
};
hoverTooltip.topRight = function(rect) {
  return {
    x: rect.right,
    y: rect.top
  };
};
hoverTooltip.bottomLeft = function(rect) {
  return {
    x: rect.left,
    y: rect.bottom
  };
};
hoverTooltip.bottomRight = function(rect) {
  return {
    x: rect.right,
    y: rect.bottom
  };
};
function create_fragment$B(ctx) {
  let div;
  let hoverTooltip_action;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      set_style(
        div,
        "left",
        /*x*/
        ctx[0] + "px"
      );
      attr(div, "class", "svelte-1d9cqje");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = action_destroyer(hoverTooltip_action = hoverTooltip.call(
          null,
          div,
          /*tooltip*/
          ctx[1]
        ));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*x*/
      1) {
        set_style(
          div,
          "left",
          /*x*/
          ctx2[0] + "px"
        );
      }
      if (hoverTooltip_action && is_function(hoverTooltip_action.update) && dirty & /*tooltip*/
      2) hoverTooltip_action.update.call(
        null,
        /*tooltip*/
        ctx2[1]
      );
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$y($$self, $$props, $$invalidate) {
  let { x } = $$props;
  let { label } = $$props;
  let tooltip = {
    label,
    visible: true,
    className: "mod-top",
    elementPosition: hoverTooltip.top
  };
  $$self.$$set = ($$props2) => {
    if ("x" in $$props2) $$invalidate(0, x = $$props2.x);
    if ("label" in $$props2) $$invalidate(2, label = $$props2.label);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*x, label*/
    5) {
      $$invalidate(1, tooltip = {
        label,
        visible: true,
        className: "mod-top",
        elementPosition: hoverTooltip.top
      });
    }
  };
  return [x, tooltip, label];
}
class Playhead extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$y, create_fragment$B, safe_not_equal, { x: 0, label: 2 });
  }
}
function get_each_context$3(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[15] = list[i];
  return child_ctx;
}
function create_if_block$a(ctx) {
  let playhead;
  let current;
  playhead = new Playhead({
    props: {
      x: (
        /*mousePosition*/
        ctx[5].x
      ),
      label: (
        /*mousePosition*/
        ctx[5].value
      )
    }
  });
  return {
    c() {
      create_component(playhead.$$.fragment);
    },
    m(target, anchor) {
      mount_component(playhead, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const playhead_changes = {};
      if (dirty & /*mousePosition*/
      32) playhead_changes.x = /*mousePosition*/
      ctx2[5].x;
      if (dirty & /*mousePosition*/
      32) playhead_changes.label = /*mousePosition*/
      ctx2[5].value;
      playhead.$set(playhead_changes);
    },
    i(local) {
      if (current) return;
      transition_in(playhead.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(playhead.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(playhead, detaching);
    }
  };
}
function create_each_block$3(key_1, ctx) {
  let first;
  let rulerlabel;
  let current;
  rulerlabel = new RulerLabel({
    props: {
      text: (
        /*label*/
        ctx[15].text
      ),
      position: (
        /*scale*/
        ctx[1].toPixels(
          /*label*/
          ctx[15].value - /*focalValue*/
          ctx[2]
        ) + /*width*/
        ctx[3] / 2
      )
    }
  });
  return {
    key: key_1,
    first: null,
    c() {
      first = empty();
      create_component(rulerlabel.$$.fragment);
      this.first = first;
    },
    m(target, anchor) {
      insert(target, first, anchor);
      mount_component(rulerlabel, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const rulerlabel_changes = {};
      if (dirty & /*labels*/
      64) rulerlabel_changes.text = /*label*/
      ctx[15].text;
      if (dirty & /*scale, labels, focalValue, width*/
      78) rulerlabel_changes.position = /*scale*/
      ctx[1].toPixels(
        /*label*/
        ctx[15].value - /*focalValue*/
        ctx[2]
      ) + /*width*/
      ctx[3] / 2;
      rulerlabel.$set(rulerlabel_changes);
    },
    i(local) {
      if (current) return;
      transition_in(rulerlabel.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(rulerlabel.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(first);
      }
      destroy_component(rulerlabel, detaching);
    }
  };
}
function create_fragment$A(ctx) {
  let div;
  let t0;
  let rulerlabel;
  let t1;
  let each_blocks = [];
  let each_1_lookup = /* @__PURE__ */ new Map();
  let div_resize_listener;
  let current;
  let mounted;
  let dispose;
  let if_block = (
    /*mousePosition*/
    ctx[5] != null && create_if_block$a(ctx)
  );
  rulerlabel = new RulerLabel({
    props: {
      text: "1234567890-:/APM",
      position: 0,
      style: "position:relative;visibility:hidden;"
    }
  });
  let each_value = ensure_array_like(
    /*labels*/
    ctx[6]
  );
  const get_key = (ctx2) => (
    /*label*/
    ctx2[15].value
  );
  for (let i = 0; i < each_value.length; i += 1) {
    let child_ctx = get_each_context$3(ctx, each_value, i);
    let key = get_key(child_ctx);
    each_1_lookup.set(key, each_blocks[i] = create_each_block$3(key, child_ctx));
  }
  return {
    c() {
      div = element("div");
      if (if_block) if_block.c();
      t0 = space();
      create_component(rulerlabel.$$.fragment);
      t1 = space();
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "ruler svelte-ity3s");
      set_style(
        div,
        "--label-width",
        /*labelStepWidth*/
        ctx[4] + "px"
      );
      attr(div, "role", "slider");
      attr(div, "aria-valuemin", Number.NEGATIVE_INFINITY);
      attr(div, "aria-valuemax", Number.POSITIVE_INFINITY);
      attr(
        div,
        "aria-valuenow",
        /*focalValue*/
        ctx[2]
      );
      attr(div, "tabindex", "0");
      add_render_callback(() => (
        /*div_elementresize_handler*/
        ctx[13].call(div)
      ));
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (if_block) if_block.m(div, null);
      append(div, t0);
      mount_component(rulerlabel, div, null);
      append(div, t1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
      div_resize_listener = add_iframe_resize_listener(
        div,
        /*div_elementresize_handler*/
        ctx[13].bind(div)
      );
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div,
            "mousemove",
            /*onMeasureMouseLocation*/
            ctx[7]
          ),
          listen(
            div,
            "mouseleave",
            /*stopMeasureMouseLocation*/
            ctx[8]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (
        /*mousePosition*/
        ctx2[5] != null
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*mousePosition*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$a(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(div, t0);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (dirty & /*labels, scale, focalValue, width*/
      78) {
        each_value = ensure_array_like(
          /*labels*/
          ctx2[6]
        );
        group_outros();
        each_blocks = update_keyed_each(each_blocks, dirty, get_key, 1, ctx2, each_value, each_1_lookup, div, outro_and_destroy_block, create_each_block$3, null, get_each_context$3);
        check_outros();
      }
      if (!current || dirty & /*labelStepWidth*/
      16) {
        set_style(
          div,
          "--label-width",
          /*labelStepWidth*/
          ctx2[4] + "px"
        );
      }
      if (!current || dirty & /*focalValue*/
      4) {
        attr(
          div,
          "aria-valuenow",
          /*focalValue*/
          ctx2[2]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(rulerlabel.$$.fragment, local);
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(rulerlabel.$$.fragment, local);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (if_block) if_block.d();
      destroy_component(rulerlabel);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].d();
      }
      div_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function getLabelCount(stepWidth, fullWidth) {
  if (stepWidth === 0) {
    return 0;
  }
  return Math.ceil(fullWidth / stepWidth) + 1;
}
function getFirstLabelValue(focalValue2, scale2, labelStepValue2, width2) {
  const valueOnLeftSide = focalValue2 - scale2.toValue(width2 / 2);
  if (labelStepValue2 === 0) {
    return valueOnLeftSide;
  }
  return Math.floor(valueOnLeftSide / labelStepValue2) * labelStepValue2;
}
function instance$x($$self, $$props, $$invalidate) {
  let labelStepValue;
  let labelStepWidth;
  let labelCount;
  let firstLabelValue;
  let labels;
  let { display } = $$props;
  let { scale } = $$props;
  let { focalValue } = $$props;
  let width = 0;
  let { clientHeight: height = 0 } = $$props;
  const dispatch2 = createEventDispatcher();
  let mousePosition;
  function onMeasureMouseLocation(event) {
    const x = event.clientX - event.currentTarget.getBoundingClientRect().left;
    const distanceToCenter = width / 2 - x;
    let value = Math.floor(focalValue - scale.toValue(distanceToCenter));
    if (Object.is(value, -0)) {
      value = 0;
    }
    if (display) {
      $$invalidate(5, mousePosition = { value: display.displayValue(value), x });
      dispatch2("mouseMeasurement", mousePosition);
    }
  }
  function stopMeasureMouseLocation(event) {
    $$invalidate(5, mousePosition = void 0);
    dispatch2("mouseMeasurement", mousePosition);
  }
  function div_elementresize_handler() {
    width = this.clientWidth;
    height = this.clientHeight;
    $$invalidate(3, width);
    $$invalidate(0, height);
  }
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2) $$invalidate(9, display = $$props2.display);
    if ("scale" in $$props2) $$invalidate(1, scale = $$props2.scale);
    if ("focalValue" in $$props2) $$invalidate(2, focalValue = $$props2.focalValue);
    if ("clientHeight" in $$props2) $$invalidate(0, height = $$props2.clientHeight);
  };
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty & /*display, scale*/
    514) {
      $$invalidate(11, labelStepValue = (_a = display == null ? void 0 : display.getSmallestLabelStepValue(scale)) != null ? _a : 0);
    }
    if ($$self.$$.dirty & /*scale, labelStepValue*/
    2050) {
      $$invalidate(4, labelStepWidth = scale.toPixels(labelStepValue));
    }
    if ($$self.$$.dirty & /*labelStepWidth, width*/
    24) {
      $$invalidate(12, labelCount = getLabelCount(labelStepWidth, width));
    }
    if ($$self.$$.dirty & /*focalValue, scale, labelStepValue, width*/
    2062) {
      $$invalidate(10, firstLabelValue = getFirstLabelValue(focalValue, scale, labelStepValue, width));
    }
    if ($$self.$$.dirty & /*display, labelCount, labelStepValue, firstLabelValue*/
    7680) {
      $$invalidate(6, labels = (_b = display == null ? void 0 : display.labels(labelCount, labelStepValue, firstLabelValue)) != null ? _b : []);
    }
  };
  return [
    height,
    scale,
    focalValue,
    width,
    labelStepWidth,
    mousePosition,
    labels,
    onMeasureMouseLocation,
    stopMeasureMouseLocation,
    display,
    firstLabelValue,
    labelStepValue,
    labelCount,
    div_elementresize_handler
  ];
}
class TimelineRuler extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$x, create_fragment$A, safe_not_equal, {
      display: 9,
      scale: 1,
      focalValue: 2,
      clientHeight: 0
    });
  }
}
class TimelineLayoutItem {
  constructor(item, centerX = 0, centerY = 0, radius = 0) {
    this.item = item;
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
  }
  left() {
    return this.centerX - this.radius;
  }
  right() {
    return this.centerX + this.radius;
  }
  top() {
    return this.centerY - this.radius;
  }
  bottom() {
    return this.centerY + this.radius;
  }
}
class TimelineItemElementStyle {
  constructor(css) {
    __publicField(this, "fill");
    __publicField(this, "stroke");
    __publicField(this, "strokeWidth");
    this.fill = css.backgroundColor;
    this.stroke = css.borderColor;
    this.strokeWidth = parseFloat(css.borderWidth);
  }
  equals(other) {
    if (!(other instanceof TimelineItemElementStyle)) {
      return false;
    }
    return other.fill === this.fill && other.stroke === this.stroke && other.strokeWidth === this.strokeWidth;
  }
}
class TimelineItemElement {
  constructor(layoutItem, offsetLeft = 0, offsetRight2 = 0, offsetTop = 0, offsetWidth = 0, offsetHeight = 0, offsetBottom2 = 0, offsetCenterX2 = 0, offsetCenterY2 = 0) {
    __privateAdd(this, _style);
    __privateAdd(this, _layoutItem);
    __publicField(this, "visible");
    this.offsetLeft = offsetLeft;
    this.offsetRight = offsetRight2;
    this.offsetTop = offsetTop;
    this.offsetWidth = offsetWidth;
    this.offsetHeight = offsetHeight;
    this.offsetBottom = offsetBottom2;
    this.offsetCenterX = offsetCenterX2;
    this.offsetCenterY = offsetCenterY2;
    __privateSet(this, _layoutItem, layoutItem);
  }
  contains(x, y) {
    return this.offsetLeft <= x && x < this.offsetRight && this.offsetTop <= y && y < this.offsetBottom;
  }
  intersects(x, y, width, height) {
    return (x >= this.offsetLeft && x < this.offsetRight || this.offsetLeft >= x && this.offsetLeft < x + width) && (y >= this.offsetTop && y < this.offsetBottom || this.offsetTop >= y && this.offsetTop < y + height);
  }
  set style(style) {
    __privateSet(this, _style, style);
  }
  get layoutItem() {
    return __privateGet(this, _layoutItem);
  }
  set layoutItem(item) {
    __privateSet(this, _layoutItem, item);
    this.visible = void 0;
  }
  get backgroundColor() {
    var _a, _b;
    return (_b = this.layoutItem.item.color()) != null ? _b : (_a = __privateGet(this, _style)) == null ? void 0 : _a.fill;
  }
  get borderColor() {
    var _a;
    return (_a = __privateGet(this, _style)) == null ? void 0 : _a.stroke;
  }
  get strokeWidth() {
    var _a;
    return (_a = __privateGet(this, _style)) == null ? void 0 : _a.strokeWidth;
  }
}
_style = new WeakMap();
_layoutItem = new WeakMap();
function renderLayout(context, viewport, layout, dragPreview) {
  context.beginPath();
  context.clearRect(0, 0, viewport.width, viewport.height);
  renderItems(context, viewport, layout);
  if (dragPreview != null && dragPreview.getCount() > 0) {
    renderItems(context, viewport, dragPreview);
  }
}
function renderItems(context, viewport, items) {
  var _a, _b, _c;
  const PI2 = 2 * Math.PI;
  const defaultColor = context.fillStyle;
  const defaultBorderColor = context.strokeStyle;
  const defaultStrokeWidth = 0;
  let currentBorderColor = defaultBorderColor;
  let currentFillColor = defaultColor;
  let currentStrokeWidth = 2;
  context.beginPath();
  for (const item of items) {
    if (item.visible === false) continue;
    if (item.offsetTop > viewport.height || item.offsetBottom < 0) continue;
    if (item.offsetLeft > viewport.width || item.offsetRight < 0) continue;
    const color = (_a = item.backgroundColor) != null ? _a : defaultColor;
    const borderColor = (_b = item.borderColor) != null ? _b : defaultBorderColor;
    const strokeWidth = (_c = item.strokeWidth) != null ? _c : defaultStrokeWidth;
    if (color !== currentFillColor || borderColor !== currentBorderColor || strokeWidth !== currentStrokeWidth) {
      context.fill();
      if (currentStrokeWidth > 0) {
        context.stroke();
      }
      context.beginPath();
      context.fillStyle = color;
      currentFillColor = color;
      context.strokeStyle = borderColor;
      currentBorderColor = borderColor;
      context.lineWidth = strokeWidth;
      currentStrokeWidth = strokeWidth;
    }
    context.moveTo(item.offsetRight, item.offsetCenterY);
    context.arc(
      item.offsetCenterX,
      item.offsetCenterY,
      item.offsetWidth / 2,
      0,
      PI2
    );
  }
  context.closePath();
  context.fill();
  if (currentStrokeWidth > 0) {
    context.stroke();
  }
}
function layoutPoints(viewport, point, scale, sortedItems, previousLayout = []) {
  var _a;
  const pointRadius = Math.floor(point.width / 2);
  const lastXByRow = [];
  let prev;
  if (previousLayout.length > sortedItems.length) {
    previousLayout = previousLayout.slice(0, sortedItems.length);
  }
  for (let i = 0; i < sortedItems.length; i++) {
    const item = sortedItems[i];
    const absolutePixelCenter = scale.toPixels(item.value());
    const relativePixelCenter = absolutePixelCenter;
    const relativeLeftMargin = relativePixelCenter - pointRadius - point.margin.horizontal;
    let row;
    if (relativeLeftMargin === (prev == null ? void 0 : prev.relativeLeftMargin)) {
      row = findNextAvailableRow(
        relativeLeftMargin,
        lastXByRow,
        prev.row
      );
    } else {
      row = findNextAvailableRow(relativeLeftMargin, lastXByRow);
    }
    const layoutItem = (_a = previousLayout[i]) != null ? _a : new TimelineLayoutItem(item);
    layoutItem.item = item;
    layoutItem.centerX = relativePixelCenter;
    layoutItem.centerY = viewport.padding.top + point.margin.vertical + pointRadius + row * (point.width + point.margin.vertical);
    layoutItem.radius = point.width / 2;
    lastXByRow[row] = layoutItem.centerX + layoutItem.radius;
    prev = { relativeLeftMargin, row, value: item.value() };
    previousLayout[i] = layoutItem;
  }
  return previousLayout;
}
function findNextAvailableRow(relativeLeftMargin, lastXByRow, startIndex = 0) {
  for (let rowIndex = startIndex; rowIndex < lastXByRow.length; rowIndex++) {
    const x = lastXByRow[rowIndex];
    if (x < relativeLeftMargin) {
      return rowIndex;
    }
  }
  return lastXByRow.length;
}
function create_fragment$z(ctx) {
  let div1;
  let div0;
  let mounted;
  let dispose;
  let div1_levels = [
    /*$$restProps*/
    ctx[12],
    { role: "scrollbar" },
    {
      "aria-orientation": (
        /*orientation*/
        ctx[0]
      )
    },
    { "aria-controls": (
      /*controls*/
      ctx[1]
    ) },
    { "aria-valuenow": (
      /*value*/
      ctx[3]
    ) },
    { "aria-valuemin": (
      /*min*/
      ctx[4]
    ) },
    { "aria-valuemax": (
      /*max*/
      ctx[5]
    ) },
    { tabindex: (
      /*tabindex*/
      ctx[2]
    ) }
  ];
  let div_data_1 = {};
  for (let i = 0; i < div1_levels.length; i += 1) {
    div_data_1 = assign(div_data_1, div1_levels[i]);
  }
  return {
    c() {
      div1 = element("div");
      div0 = element("div");
      attr(div0, "role", "presentation");
      attr(div0, "class", "thumb svelte-1bqbpo3");
      set_style(
        div0,
        "--percent",
        /*percent*/
        ctx[8]
      );
      set_style(
        div0,
        "--value",
        /*percentValue*/
        ctx[9]
      );
      toggle_class(
        div0,
        "dragging",
        /*dragging*/
        ctx[7]
      );
      set_attributes(div1, div_data_1);
      toggle_class(
        div1,
        "unneeded",
        /*percent*/
        ctx[8] >= 0.99999999999
      );
      toggle_class(div1, "svelte-1bqbpo3", true);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      append(div1, div0);
      ctx[16](div0);
      if (!mounted) {
        dispose = [
          listen(div0, "mousedown", stop_propagation(
            /*onThumbMouseDown*/
            ctx[10]
          )),
          listen(div1, "mousedown", self(
            /*onBarMouseDown*/
            ctx[11]
          ))
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*percent*/
      256) {
        set_style(
          div0,
          "--percent",
          /*percent*/
          ctx2[8]
        );
      }
      if (dirty & /*percentValue*/
      512) {
        set_style(
          div0,
          "--value",
          /*percentValue*/
          ctx2[9]
        );
      }
      if (dirty & /*dragging*/
      128) {
        toggle_class(
          div0,
          "dragging",
          /*dragging*/
          ctx2[7]
        );
      }
      set_attributes(div1, div_data_1 = get_spread_update(div1_levels, [
        dirty & /*$$restProps*/
        4096 && /*$$restProps*/
        ctx2[12],
        { role: "scrollbar" },
        dirty & /*orientation*/
        1 && {
          "aria-orientation": (
            /*orientation*/
            ctx2[0]
          )
        },
        dirty & /*controls*/
        2 && { "aria-controls": (
          /*controls*/
          ctx2[1]
        ) },
        dirty & /*value*/
        8 && { "aria-valuenow": (
          /*value*/
          ctx2[3]
        ) },
        dirty & /*min*/
        16 && { "aria-valuemin": (
          /*min*/
          ctx2[4]
        ) },
        dirty & /*max*/
        32 && { "aria-valuemax": (
          /*max*/
          ctx2[5]
        ) },
        dirty & /*tabindex*/
        4 && { tabindex: (
          /*tabindex*/
          ctx2[2]
        ) }
      ]));
      toggle_class(
        div1,
        "unneeded",
        /*percent*/
        ctx2[8] >= 0.99999999999
      );
      toggle_class(div1, "svelte-1bqbpo3", true);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      ctx[16](null);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$w($$self, $$props, $$invalidate) {
  let span;
  let percent;
  let scrollSpan;
  let percentValue;
  const omit_props_names = ["orientation", "controls", "tabindex", "value", "visibleAmount", "min", "max"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  const dispatch2 = createEventDispatcher();
  let { orientation = "vertical" } = $$props;
  let { controls } = $$props;
  let { tabindex } = $$props;
  let { value } = $$props;
  let { visibleAmount } = $$props;
  let { min = 0 } = $$props;
  let { max = 100 } = $$props;
  let thumb;
  let dragging = false;
  function onThumbMouseDown(e) {
    const startScreenX = e.screenX;
    const startScreenY = e.screenY;
    const startValue = value;
    const startPercent = percent;
    const startMin = min;
    const startMax = max;
    let lastScreenX = e.screenX;
    let lastScreenY = e.screenY;
    function mouseMoveListener(e2) {
      if (!dragging) {
        $$invalidate(7, dragging = true);
        dispatch2("dragstart");
      }
      const deltaScreenX = e2.screenX - lastScreenX;
      const deltaScreenY = e2.screenY - lastScreenY;
      lastScreenX = e2.screenX;
      lastScreenY = e2.screenY;
      const deltaXSinceStart = e2.screenX - startScreenX;
      const deltaYSinceStart = e2.screenY - startScreenY;
      let deltaPixels = 0;
      let deltaPixelsSinceStart = 0;
      if (orientation === "horizontal") {
        deltaPixels = deltaScreenX;
        deltaPixelsSinceStart = deltaXSinceStart;
      } else {
        deltaPixels = deltaScreenY;
        deltaPixelsSinceStart = deltaYSinceStart;
      }
      const deltaValue = deltaPixels / startPercent;
      const deltaValueSinceStart = deltaPixelsSinceStart / startPercent;
      const newValue = Math.max(startMin, Math.min(startMax, startValue + deltaValueSinceStart));
      dispatch2("change", {
        dragging: true,
        deltaPixels,
        deltaPixelsSinceStart,
        deltaValue,
        deltaValueSinceStart,
        value: newValue,
        ratio: startPercent,
        startValue
      });
    }
    function mouseUpListener(e2) {
      if (dragging) {
        $$invalidate(7, dragging = false);
        dispatch2("dragend");
      }
      window.removeEventListener("mousemove", mouseMoveListener);
      window.removeEventListener("mouseup", mouseUpListener);
    }
    window.addEventListener("mousemove", mouseMoveListener);
    window.addEventListener("mouseup", mouseUpListener);
  }
  function onBarMouseDown(e) {
    const startX = e.offsetX;
    const startY = e.offsetY;
    const direction = (orientation === "horizontal" ? e.offsetX < thumb.offsetLeft : e.offsetY < thumb.offsetTop) ? -1 : 1;
    function incrementValue() {
      if (orientation === "horizontal") {
        if (thumb.offsetLeft <= startX && thumb.offsetLeft + thumb.offsetWidth >= startX) {
          return;
        }
      } else {
        if (thumb.offsetTop <= startY && thumb.offsetTop + thumb.offsetHeight >= startY) {
          return;
        }
      }
      let deltaValue = direction * visibleAmount;
      const targetValue = value + deltaValue;
      const newValue = Math.max(min, Math.min(max, targetValue));
      if (newValue !== targetValue) {
        deltaValue = newValue - value;
      }
      const deltaPixels = deltaValue * percent;
      dispatch2("change", {
        dragging: false,
        value: newValue,
        deltaValue,
        deltaPixels,
        ratio: percent
      });
    }
    incrementValue();
    const interval = setInterval(incrementValue, 50);
    function mouseUpListener() {
      clearInterval(interval);
      window.removeEventListener("mouseup", mouseUpListener);
    }
    window.addEventListener("mouseup", mouseUpListener);
  }
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      thumb = $$value;
      $$invalidate(6, thumb);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(12, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("orientation" in $$new_props) $$invalidate(0, orientation = $$new_props.orientation);
    if ("controls" in $$new_props) $$invalidate(1, controls = $$new_props.controls);
    if ("tabindex" in $$new_props) $$invalidate(2, tabindex = $$new_props.tabindex);
    if ("value" in $$new_props) $$invalidate(3, value = $$new_props.value);
    if ("visibleAmount" in $$new_props) $$invalidate(13, visibleAmount = $$new_props.visibleAmount);
    if ("min" in $$new_props) $$invalidate(4, min = $$new_props.min);
    if ("max" in $$new_props) $$invalidate(5, max = $$new_props.max);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*max, min*/
    48) {
      $$invalidate(15, span = max - min);
    }
    if ($$self.$$.dirty & /*span, visibleAmount*/
    40960) {
      $$invalidate(8, percent = span === 0 ? 1 : visibleAmount / span);
    }
    if ($$self.$$.dirty & /*span, visibleAmount*/
    40960) {
      $$invalidate(14, scrollSpan = Math.max(0, span - visibleAmount));
    }
    if ($$self.$$.dirty & /*scrollSpan, value, min*/
    16408) {
      $$invalidate(9, percentValue = scrollSpan === 0 ? 0 : (value - min) / scrollSpan);
    }
  };
  return [
    orientation,
    controls,
    tabindex,
    value,
    min,
    max,
    thumb,
    dragging,
    percent,
    percentValue,
    onThumbMouseDown,
    onBarMouseDown,
    $$restProps,
    visibleAmount,
    scrollSpan,
    span,
    div0_binding
  ];
}
class Scrollbar extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$w, create_fragment$z, safe_not_equal, {
      orientation: 0,
      controls: 1,
      tabindex: 2,
      value: 3,
      visibleAmount: 13,
      min: 4,
      max: 5
    });
  }
}
function cubicOut(t) {
  const f = t - 1;
  return f * f * f + 1;
}
function quintOut(t) {
  return --t * t * t * t * t + 1;
}
function fade(node, { delay = 0, duration = 400, easing = identity } = {}) {
  const o = +getComputedStyle(node).opacity;
  return {
    delay,
    duration,
    easing,
    css: (t) => `opacity: ${t * o}`
  };
}
function slide(node, { delay = 0, duration = 400, easing = cubicOut, axis = "y" } = {}) {
  const style = getComputedStyle(node);
  const opacity = +style.opacity;
  const primary_property = axis === "y" ? "height" : "width";
  const primary_property_value = parseFloat(style[primary_property]);
  const secondary_properties = axis === "y" ? ["top", "bottom"] : ["left", "right"];
  const capitalized_secondary_properties = secondary_properties.map(
    (e) => `${e[0].toUpperCase()}${e.slice(1)}`
  );
  const padding_start_value = parseFloat(style[`padding${capitalized_secondary_properties[0]}`]);
  const padding_end_value = parseFloat(style[`padding${capitalized_secondary_properties[1]}`]);
  const margin_start_value = parseFloat(style[`margin${capitalized_secondary_properties[0]}`]);
  const margin_end_value = parseFloat(style[`margin${capitalized_secondary_properties[1]}`]);
  const border_width_start_value = parseFloat(
    style[`border${capitalized_secondary_properties[0]}Width`]
  );
  const border_width_end_value = parseFloat(
    style[`border${capitalized_secondary_properties[1]}Width`]
  );
  return {
    delay,
    duration,
    easing,
    css: (t) => `overflow: hidden;opacity: ${Math.min(t * 20, 1) * opacity};${primary_property}: ${t * primary_property_value}px;padding-${secondary_properties[0]}: ${t * padding_start_value}px;padding-${secondary_properties[1]}: ${t * padding_end_value}px;margin-${secondary_properties[0]}: ${t * margin_start_value}px;margin-${secondary_properties[1]}: ${t * margin_end_value}px;border-${secondary_properties[0]}-width: ${t * border_width_start_value}px;border-${secondary_properties[1]}-width: ${t * border_width_end_value}px;`
  };
}
function create_fragment$y(ctx) {
  let div;
  let hoverTooltip_action;
  let div_transition;
  let style_top = `${/*position*/
  ctx[0].offsetTop}px`;
  let style_left = `${/*position*/
  ctx[0].offsetLeft}px`;
  let current;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", "timeline-item hover svelte-oanm08");
      attr(
        div,
        "aria-label",
        /*label*/
        ctx[2]
      );
      set_style(div, "top", style_top);
      set_style(div, "left", style_left);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          action_destroyer(hoverTooltip_action = hoverTooltip.call(null, div, {
            visible: (
              /*hovered*/
              ctx[1]
            ),
            label: (
              /*label*/
              ctx[2]
            ),
            className: "timeline-item-tooltip"
          })),
          listen(
            div,
            "introend",
            /*introend_handler*/
            ctx[6]
          ),
          listen(
            div,
            "outrostart",
            /*outrostart_handler*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*label*/
      4) {
        attr(
          div,
          "aria-label",
          /*label*/
          ctx2[2]
        );
      }
      if (hoverTooltip_action && is_function(hoverTooltip_action.update) && dirty & /*hovered, label*/
      6) hoverTooltip_action.update.call(null, {
        visible: (
          /*hovered*/
          ctx2[1]
        ),
        label: (
          /*label*/
          ctx2[2]
        ),
        className: "timeline-item-tooltip"
      });
      if (dirty & /*position*/
      1 && style_top !== (style_top = `${/*position*/
      ctx2[0].offsetTop}px`)) {
        set_style(div, "top", style_top);
      }
      if (dirty & /*position*/
      1 && style_left !== (style_left = `${/*position*/
      ctx2[0].offsetLeft}px`)) {
        set_style(div, "left", style_left);
      }
    },
    i(local) {
      if (current) return;
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, true);
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      if (local) {
        if (!div_transition) div_transition = create_bidirectional_transition(div, fade, { duration: 500 }, false);
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (detaching && div_transition) div_transition.end();
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$v($$self, $$props, $$invalidate) {
  let label;
  let { display } = $$props;
  let { position } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  let hovered = false;
  const introend_handler = () => $$invalidate(1, hovered = true);
  const outrostart_handler = () => $$invalidate(1, hovered = false);
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2) $$invalidate(3, display = $$props2.display);
    if ("position" in $$props2) $$invalidate(0, position = $$props2.position);
    if ("name" in $$props2) $$invalidate(4, name = $$props2.name);
    if ("value" in $$props2) $$invalidate(5, value = $$props2.value);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*name, display, value*/
    56) {
      $$invalidate(2, label = `${name}: ${display.displayValue(value)}`);
    }
  };
  return [
    position,
    hovered,
    label,
    display,
    name,
    value,
    introend_handler,
    outrostart_handler
  ];
}
class Hover extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$v, create_fragment$y, safe_not_equal, {
      display: 3,
      position: 0,
      name: 4,
      value: 5
    });
  }
}
function create_fragment$x(ctx) {
  let div;
  return {
    c() {
      div = element("div");
      attr(div, "class", "timeline-item focus svelte-d55p53");
      set_style(
        div,
        "top",
        /*focus*/
        ctx[0].offsetTop + "px"
      );
      set_style(
        div,
        "left",
        /*focus*/
        ctx[0].offsetLeft + "px"
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*focus*/
      1) {
        set_style(
          div,
          "top",
          /*focus*/
          ctx2[0].offsetTop + "px"
        );
      }
      if (dirty & /*focus*/
      1) {
        set_style(
          div,
          "left",
          /*focus*/
          ctx2[0].offsetLeft + "px"
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
    }
  };
}
function instance$u($$self, $$props, $$invalidate) {
  let { focus } = $$props;
  $$self.$$set = ($$props2) => {
    if ("focus" in $$props2) $$invalidate(0, focus = $$props2.focus);
  };
  return [focus];
}
class FocusedItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$u, create_fragment$x, safe_not_equal, { focus: 0 });
  }
}
function create_if_block$9(ctx) {
  let div;
  let div_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(div, "class", div_class_value = "timeline-selection-area " + /*className*/
      ctx[1] + " svelte-15kyiad");
      attr(
        div,
        "role",
        /*role*/
        ctx[2]
      );
      attr(
        div,
        "tabindex",
        /*tabindex*/
        ctx[3]
      );
      set_style(div, "position", `absolute`);
      set_style(
        div,
        "left",
        /*area*/
        ctx[0].offsetLeft + "px"
      );
      set_style(
        div,
        "top",
        /*area*/
        ctx[0].offsetTop + "px"
      );
      set_style(
        div,
        "width",
        /*area*/
        ctx[0].offsetWidth + "px"
      );
      set_style(
        div,
        "height",
        /*area*/
        ctx[0].offsetHeight + "px"
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = [
          listen(
            div,
            "wheel",
            /*wheel_handler*/
            ctx[4]
          ),
          listen(
            div,
            "mousedown",
            /*mousedown_handler*/
            ctx[5]
          ),
          listen(
            div,
            "mouseup",
            /*mouseup_handler*/
            ctx[6]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty & /*className*/
      2 && div_class_value !== (div_class_value = "timeline-selection-area " + /*className*/
      ctx2[1] + " svelte-15kyiad")) {
        attr(div, "class", div_class_value);
      }
      if (dirty & /*role*/
      4) {
        attr(
          div,
          "role",
          /*role*/
          ctx2[2]
        );
      }
      if (dirty & /*tabindex*/
      8) {
        attr(
          div,
          "tabindex",
          /*tabindex*/
          ctx2[3]
        );
      }
      if (dirty & /*area*/
      1) {
        set_style(
          div,
          "left",
          /*area*/
          ctx2[0].offsetLeft + "px"
        );
      }
      if (dirty & /*area*/
      1) {
        set_style(
          div,
          "top",
          /*area*/
          ctx2[0].offsetTop + "px"
        );
      }
      if (dirty & /*area*/
      1) {
        set_style(
          div,
          "width",
          /*area*/
          ctx2[0].offsetWidth + "px"
        );
      }
      if (dirty & /*area*/
      1) {
        set_style(
          div,
          "height",
          /*area*/
          ctx2[0].offsetHeight + "px"
        );
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function create_fragment$w(ctx) {
  let if_block_anchor;
  let if_block = (
    /*area*/
    ctx[0] != null && create_if_block$9(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (
        /*area*/
        ctx2[0] != null
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
        } else {
          if_block = create_if_block$9(ctx2);
          if_block.c();
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        if_block.d(1);
        if_block = null;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$t($$self, $$props, $$invalidate) {
  let { area } = $$props;
  let { class: className = "" } = $$props;
  let { role = void 0 } = $$props;
  let { tabindex = 0 } = $$props;
  function wheel_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("area" in $$props2) $$invalidate(0, area = $$props2.area);
    if ("class" in $$props2) $$invalidate(1, className = $$props2.class);
    if ("role" in $$props2) $$invalidate(2, role = $$props2.role);
    if ("tabindex" in $$props2) $$invalidate(3, tabindex = $$props2.tabindex);
  };
  return [
    area,
    className,
    role,
    tabindex,
    wheel_handler,
    mousedown_handler,
    mouseup_handler
  ];
}
class CanvasSelectionArea extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$t, create_fragment$w, safe_not_equal, { area: 0, class: 1, role: 2, tabindex: 3 });
  }
}
function create_if_block$8(ctx) {
  let canvasselectionarea;
  let current;
  canvasselectionarea = new CanvasSelectionArea({
    props: {
      class: "selected " + /*dragging*/
      (ctx[2] && "dragging"),
      area: (
        /*bounds*/
        ctx[0]
      ),
      role: "gridcell",
      tabindex: 0
    }
  });
  canvasselectionarea.$on(
    "mousedown",
    /*mousedown_handler*/
    ctx[3]
  );
  canvasselectionarea.$on(
    "mouseup",
    /*mouseup_handler*/
    ctx[4]
  );
  canvasselectionarea.$on(
    "wheel",
    /*wheel_handler*/
    ctx[5]
  );
  return {
    c() {
      create_component(canvasselectionarea.$$.fragment);
    },
    m(target, anchor) {
      mount_component(canvasselectionarea, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const canvasselectionarea_changes = {};
      if (dirty & /*dragging*/
      4) canvasselectionarea_changes.class = "selected " + /*dragging*/
      (ctx2[2] && "dragging");
      if (dirty & /*bounds*/
      1) canvasselectionarea_changes.area = /*bounds*/
      ctx2[0];
      canvasselectionarea.$set(canvasselectionarea_changes);
    },
    i(local) {
      if (current) return;
      transition_in(canvasselectionarea.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(canvasselectionarea.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(canvasselectionarea, detaching);
    }
  };
}
function create_fragment$v(ctx) {
  let if_block_anchor;
  let current;
  let if_block = (
    /*bounds*/
    ctx[0] != null && /*selectedItemCount*/
    ctx[1] > 1 && create_if_block$8(ctx)
  );
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (
        /*bounds*/
        ctx2[0] != null && /*selectedItemCount*/
        ctx2[1] > 1
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*bounds, selectedItemCount*/
          3) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$8(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (if_block) if_block.d(detaching);
    }
  };
}
function instance$s($$self, $$props, $$invalidate) {
  let { bounds } = $$props;
  let { selectedItemCount } = $$props;
  let { dragging } = $$props;
  function mousedown_handler(event) {
    bubble.call(this, $$self, event);
  }
  function mouseup_handler(event) {
    bubble.call(this, $$self, event);
  }
  function wheel_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("bounds" in $$props2) $$invalidate(0, bounds = $$props2.bounds);
    if ("selectedItemCount" in $$props2) $$invalidate(1, selectedItemCount = $$props2.selectedItemCount);
    if ("dragging" in $$props2) $$invalidate(2, dragging = $$props2.dragging);
  };
  return [
    bounds,
    selectedItemCount,
    dragging,
    mousedown_handler,
    mouseup_handler,
    wheel_handler
  ];
}
class SelectedBounds extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$s, create_fragment$v, safe_not_equal, {
      bounds: 0,
      selectedItemCount: 1,
      dragging: 2
    });
  }
}
function create_fragment$u(ctx) {
  let div;
  let hoverTooltip_action;
  let style_top = `${/*position*/
  ctx[0].offsetTop}px`;
  let style_left = `${/*position*/
  ctx[0].offsetLeft}px`;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      attr(
        div,
        "aria-label",
        /*label*/
        ctx[1]
      );
      attr(div, "class", "svelte-1embv5v");
      set_style(div, "top", style_top);
      set_style(div, "left", style_left);
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (!mounted) {
        dispose = action_destroyer(hoverTooltip_action = hoverTooltip.call(null, div, {
          visible: true,
          label: (
            /*label*/
            ctx[1]
          ),
          className: "timeline-item-tooltip"
        }));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*label*/
      2) {
        attr(
          div,
          "aria-label",
          /*label*/
          ctx2[1]
        );
      }
      if (hoverTooltip_action && is_function(hoverTooltip_action.update) && dirty & /*label*/
      2) hoverTooltip_action.update.call(null, {
        visible: true,
        label: (
          /*label*/
          ctx2[1]
        ),
        className: "timeline-item-tooltip"
      });
      if (dirty & /*position*/
      1 && style_top !== (style_top = `${/*position*/
      ctx2[0].offsetTop}px`)) {
        set_style(div, "top", style_top);
      }
      if (dirty & /*position*/
      1 && style_left !== (style_left = `${/*position*/
      ctx2[0].offsetLeft}px`)) {
        set_style(div, "left", style_left);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$r($$self, $$props, $$invalidate) {
  let label;
  let { display } = $$props;
  let { position } = $$props;
  let { name } = $$props;
  let { value } = $$props;
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2) $$invalidate(2, display = $$props2.display);
    if ("position" in $$props2) $$invalidate(0, position = $$props2.position);
    if ("name" in $$props2) $$invalidate(3, name = $$props2.name);
    if ("value" in $$props2) $$invalidate(4, value = $$props2.value);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*name, display, value*/
    28) {
      $$invalidate(1, label = `${name}: ${display.displayValue(value)}`);
    }
  };
  return [position, label, display, name, value];
}
class DraggedItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$r, create_fragment$u, safe_not_equal, {
      display: 2,
      position: 0,
      name: 3,
      value: 4
    });
  }
}
function create_fragment$t(ctx) {
  let svg;
  let pattern;
  let line;
  let pattern_y_value;
  let pattern_height_value;
  let rect;
  return {
    c() {
      svg = svg_element("svg");
      pattern = svg_element("pattern");
      line = svg_element("line");
      rect = svg_element("rect");
      attr(line, "x1", "0");
      attr(
        line,
        "y1",
        /*rowCenterOffset*/
        ctx[2]
      );
      attr(line, "x2", "100%");
      attr(
        line,
        "y2",
        /*rowCenterOffset*/
        ctx[2]
      );
      attr(line, "class", "svelte-1wjx61o");
      attr(
        pattern,
        "id",
        /*backgroundPatternId*/
        ctx[3]
      );
      attr(pattern, "patternUnits", "userSpaceOnUse");
      attr(pattern, "x", 0);
      attr(pattern, "y", pattern_y_value = -/*scrollTop*/
      ctx[0]);
      attr(pattern, "height", pattern_height_value = /*spacingBetweenItems*/
      ctx[1] * 2);
      attr(pattern, "width", "100%");
      attr(rect, "x", "0");
      attr(rect, "y", "0");
      attr(rect, "width", "100%");
      attr(rect, "height", "100%");
      attr(rect, "fill", "url(#" + /*backgroundPatternId*/
      ctx[3] + ")");
      attr(svg, "class", "stage-background svelte-1wjx61o");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, pattern);
      append(pattern, line);
      append(svg, rect);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*rowCenterOffset*/
      4) {
        attr(
          line,
          "y1",
          /*rowCenterOffset*/
          ctx2[2]
        );
      }
      if (dirty & /*rowCenterOffset*/
      4) {
        attr(
          line,
          "y2",
          /*rowCenterOffset*/
          ctx2[2]
        );
      }
      if (dirty & /*scrollTop*/
      1 && pattern_y_value !== (pattern_y_value = -/*scrollTop*/
      ctx2[0])) {
        attr(pattern, "y", pattern_y_value);
      }
      if (dirty & /*spacingBetweenItems*/
      2 && pattern_height_value !== (pattern_height_value = /*spacingBetweenItems*/
      ctx2[1] * 2)) {
        attr(pattern, "height", pattern_height_value);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function instance$q($$self, $$props, $$invalidate) {
  let spacingBetweenItems;
  let rowCenterOffset;
  let { scrollTop } = $$props;
  let { itemDimensions } = $$props;
  let { viewport } = $$props;
  const backgroundPatternId = Math.random().toString(36).slice(2);
  $$self.$$set = ($$props2) => {
    if ("scrollTop" in $$props2) $$invalidate(0, scrollTop = $$props2.scrollTop);
    if ("itemDimensions" in $$props2) $$invalidate(4, itemDimensions = $$props2.itemDimensions);
    if ("viewport" in $$props2) $$invalidate(5, viewport = $$props2.viewport);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*itemDimensions*/
    16) {
      $$invalidate(1, spacingBetweenItems = itemDimensions.height + itemDimensions.margin.vertical);
    }
    if ($$self.$$.dirty & /*spacingBetweenItems, viewport*/
    34) {
      $$invalidate(2, rowCenterOffset = spacingBetweenItems / 2 + viewport.padding.top + 0.5);
    }
  };
  return [
    scrollTop,
    spacingBetweenItems,
    rowCenterOffset,
    backgroundPatternId,
    itemDimensions,
    viewport
  ];
}
class Background extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$q, create_fragment$t, safe_not_equal, {
      scrollTop: 0,
      itemDimensions: 4,
      viewport: 5
    });
  }
}
function create_if_block_2$1(ctx) {
  let hover_1;
  let current;
  hover_1 = new Hover({
    props: {
      display: (
        /*display*/
        ctx[0]
      ),
      position: (
        /*hover*/
        ctx[22].element
      ),
      name: (
        /*hover*/
        ctx[22].element.layoutItem.item.name()
      ),
      value: (
        /*hover*/
        ctx[22].element.layoutItem.item.value()
      )
    }
  });
  return {
    c() {
      create_component(hover_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(hover_1, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const hover_1_changes = {};
      if (dirty[0] & /*display*/
      1) hover_1_changes.display = /*display*/
      ctx2[0];
      if (dirty[0] & /*hover*/
      4194304) hover_1_changes.position = /*hover*/
      ctx2[22].element;
      if (dirty[0] & /*hover*/
      4194304) hover_1_changes.name = /*hover*/
      ctx2[22].element.layoutItem.item.name();
      if (dirty[0] & /*hover*/
      4194304) hover_1_changes.value = /*hover*/
      ctx2[22].element.layoutItem.item.value();
      hover_1.$set(hover_1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(hover_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(hover_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(hover_1, detaching);
    }
  };
}
function create_if_block_1$1(ctx) {
  let draggeditem;
  let current;
  draggeditem = new DraggedItem({
    props: {
      display: (
        /*display*/
        ctx[0]
      ),
      position: (
        /*dragPreview*/
        ctx[6].at(0)
      ),
      name: (
        /*dragPreview*/
        ctx[6].at(0).item.name()
      ),
      value: (
        /*dragPreview*/
        ctx[6].at(0).value
      )
    }
  });
  return {
    c() {
      create_component(draggeditem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(draggeditem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const draggeditem_changes = {};
      if (dirty[0] & /*display*/
      1) draggeditem_changes.display = /*display*/
      ctx2[0];
      if (dirty[0] & /*dragPreview*/
      64) draggeditem_changes.position = /*dragPreview*/
      ctx2[6].at(0);
      if (dirty[0] & /*dragPreview*/
      64) draggeditem_changes.name = /*dragPreview*/
      ctx2[6].at(0).item.name();
      if (dirty[0] & /*dragPreview*/
      64) draggeditem_changes.value = /*dragPreview*/
      ctx2[6].at(0).value;
      draggeditem.$set(draggeditem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(draggeditem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(draggeditem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(draggeditem, detaching);
    }
  };
}
function create_if_block$7(ctx) {
  let focuseditem;
  let current;
  focuseditem = new FocusedItem({
    props: { focus: (
      /*focus*/
      ctx[23].element
    ) }
  });
  return {
    c() {
      create_component(focuseditem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(focuseditem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const focuseditem_changes = {};
      if (dirty[0] & /*focus*/
      8388608) focuseditem_changes.focus = /*focus*/
      ctx2[23].element;
      focuseditem.$set(focuseditem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(focuseditem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(focuseditem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(focuseditem, detaching);
    }
  };
}
function create_fragment$s(ctx) {
  var _a, _b;
  let div7;
  let background;
  let t0;
  let div4;
  let div0;
  let t1;
  let div1;
  let t2;
  let div2;
  let t3;
  let div3;
  let t4;
  let div5;
  let t5;
  let div6;
  let div6_resize_listener;
  let t6;
  let selectionarea;
  let t7;
  let canvas_1;
  let t8;
  let selectedbounds;
  let t9;
  let t10;
  let show_if = (
    /*dragPreview*/
    ctx[6] != null && /*display*/
    ctx[0] != null && /*dragPreview*/
    ctx[6].getCount() === 1
  );
  let t11;
  let t12;
  let scrollbar0;
  let t13;
  let scrollbar1;
  let t14;
  let div8;
  let div8_resize_listener;
  let current;
  let mounted;
  let dispose;
  background = new Background({
    props: {
      scrollTop: (
        /*scrollTop*/
        ctx[7]
      ),
      itemDimensions: (
        /*item*/
        ctx[19]
      ),
      viewport: (
        /*viewport*/
        ctx[5]
      )
    }
  });
  selectionarea = new CanvasSelectionArea({
    props: { area: (
      /*selection*/
      (_a = ctx[21]) == null ? void 0 : _a.area
    ) }
  });
  selectedbounds = new SelectedBounds({
    props: {
      dragging: (
        /*dragPreview*/
        ctx[6] != null
      ),
      bounds: (
        /*selection*/
        ctx[21].bounds
      ),
      selectedItemCount: (
        /*selection*/
        (_b = ctx[21].selectedItems.size) != null ? _b : 0
      )
    }
  });
  selectedbounds.$on(
    "mousedown",
    /*prepareDragSelection*/
    ctx[34]
  );
  selectedbounds.$on(
    "mouseup",
    /*mouseup_handler*/
    ctx[58]
  );
  selectedbounds.$on(
    "wheel",
    /*handleScroll*/
    ctx[32]
  );
  let if_block0 = (
    /*hover*/
    ctx[22] != null && /*display*/
    ctx[0] != null && create_if_block_2$1(ctx)
  );
  let if_block1 = show_if && create_if_block_1$1(ctx);
  let if_block2 = (
    /*focus*/
    ctx[23] != null && create_if_block$7(ctx)
  );
  scrollbar0 = new Scrollbar({
    props: {
      style: `height: ${/*scrollbarHeight*/
      ctx[12]}px;`,
      orientation: "horizontal",
      controls: "stage",
      tabindex: (
        /*sortedItems*/
        ctx[1].length
      ),
      value: (
        /*hScrollValue*/
        ctx[27]
      ),
      visibleAmount: (
        /*visibleHAmount*/
        ctx[28]
      ),
      min: (
        /*minHScrollValue*/
        ctx[29]
      ),
      max: (
        /*maxHScrollValue*/
        ctx[30]
      )
    }
  });
  scrollbar0.$on(
    "change",
    /*handleHScroll*/
    ctx[39]
  );
  scrollbar0.$on(
    "dragstart",
    /*dragstart_handler*/
    ctx[59]
  );
  scrollbar0.$on(
    "dragend",
    /*dragend_handler*/
    ctx[60]
  );
  scrollbar1 = new Scrollbar({
    props: {
      style: `width: ${/*scrollbarWidth*/
      ctx[13]}px;`,
      orientation: "vertical",
      controls: "stage",
      tabindex: (
        /*sortedItems*/
        ctx[1].length + 1
      ),
      value: (
        /*scrollTop*/
        ctx[7]
      ),
      visibleAmount: (
        /*visibleVAmount*/
        ctx[26]
      ),
      min: 0,
      max: (
        /*scrollHeight*/
        ctx[25]
      )
    }
  });
  scrollbar1.$on(
    "change",
    /*handleVScroll*/
    ctx[40]
  );
  scrollbar1.$on(
    "dragstart",
    /*dragstart_handler_1*/
    ctx[61]
  );
  scrollbar1.$on(
    "dragend",
    /*dragend_handler_1*/
    ctx[62]
  );
  return {
    c() {
      div7 = element("div");
      create_component(background.$$.fragment);
      t0 = space();
      div4 = element("div");
      div0 = element("div");
      t1 = space();
      div1 = element("div");
      t2 = space();
      div2 = element("div");
      t3 = space();
      div3 = element("div");
      t4 = space();
      div5 = element("div");
      t5 = space();
      div6 = element("div");
      t6 = space();
      create_component(selectionarea.$$.fragment);
      t7 = space();
      canvas_1 = element("canvas");
      t8 = space();
      create_component(selectedbounds.$$.fragment);
      t9 = space();
      if (if_block0) if_block0.c();
      t10 = space();
      if (if_block1) if_block1.c();
      t11 = space();
      if (if_block2) if_block2.c();
      t12 = space();
      create_component(scrollbar0.$$.fragment);
      t13 = space();
      create_component(scrollbar1.$$.fragment);
      t14 = space();
      div8 = element("div");
      attr(div0, "class", "timeline-item svelte-1sin58r");
      attr(div1, "class", "timeline-item svelte-1sin58r");
      attr(div2, "class", "timeline-item selected svelte-1sin58r");
      attr(div3, "class", "timeline-item focused svelte-1sin58r");
      set_style(div4, "display", "flex");
      set_style(div4, "flex-direction", "row");
      attr(div5, "class", "timeline-item svelte-1sin58r");
      attr(div6, "class", "bottom-right-padding-measure svelte-1sin58r");
      add_render_callback(() => (
        /*div6_elementresize_handler*/
        ctx[53].call(div6)
      ));
      attr(canvas_1, "tabindex", 0);
      attr(canvas_1, "class", "svelte-1sin58r");
      attr(div7, "id", "stage");
      attr(div7, "class", "svelte-1sin58r");
      toggle_class(
        div7,
        "has-hover",
        /*hover*/
        ctx[22] != null
      );
      toggle_class(
        div7,
        "editable",
        /*editable*/
        ctx[3]
      );
      attr(div8, "class", "scrollbar-style-measurer svelte-1sin58r");
      add_render_callback(() => (
        /*div8_elementresize_handler*/
        ctx[64].call(div8)
      ));
    },
    m(target, anchor) {
      insert(target, div7, anchor);
      mount_component(background, div7, null);
      append(div7, t0);
      append(div7, div4);
      append(div4, div0);
      ctx[48](div0);
      append(div4, t1);
      append(div4, div1);
      ctx[49](div1);
      append(div4, t2);
      append(div4, div2);
      ctx[50](div2);
      append(div4, t3);
      append(div4, div3);
      ctx[51](div3);
      append(div7, t4);
      append(div7, div5);
      ctx[52](div5);
      append(div7, t5);
      append(div7, div6);
      div6_resize_listener = add_iframe_resize_listener(
        div6,
        /*div6_elementresize_handler*/
        ctx[53].bind(div6)
      );
      append(div7, t6);
      mount_component(selectionarea, div7, null);
      append(div7, t7);
      append(div7, canvas_1);
      ctx[54](canvas_1);
      append(div7, t8);
      mount_component(selectedbounds, div7, null);
      append(div7, t9);
      if (if_block0) if_block0.m(div7, null);
      append(div7, t10);
      if (if_block1) if_block1.m(div7, null);
      append(div7, t11);
      if (if_block2) if_block2.m(div7, null);
      append(div7, t12);
      mount_component(scrollbar0, div7, null);
      append(div7, t13);
      mount_component(scrollbar1, div7, null);
      ctx[63](div7);
      insert(target, t14, anchor);
      insert(target, div8, anchor);
      div8_resize_listener = add_iframe_resize_listener(
        div8,
        /*div8_elementresize_handler*/
        ctx[64].bind(div8)
      );
      current = true;
      if (!mounted) {
        dispose = [
          listen(canvas_1, "wheel", stop_propagation(
            /*handleScroll*/
            ctx[32]
          ), true),
          listen(
            canvas_1,
            "mouseleave",
            /*mouseleave_handler*/
            ctx[55]
          ),
          listen(
            canvas_1,
            "mousemove",
            /*handleMouseMove*/
            ctx[38]
          ),
          listen(
            canvas_1,
            "mousedown",
            /*handleMouseDown*/
            ctx[33]
          ),
          listen(
            canvas_1,
            "mouseup",
            /*handleMouseUp*/
            ctx[35]
          ),
          listen(
            canvas_1,
            "dblclick",
            /*handleDblClick*/
            ctx[36]
          ),
          listen(
            canvas_1,
            "focus",
            /*focus_handler*/
            ctx[56]
          ),
          listen(
            canvas_1,
            "keydown",
            /*keydown_handler*/
            ctx[57]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      var _a2, _b2;
      const background_changes = {};
      if (dirty[0] & /*scrollTop*/
      128) background_changes.scrollTop = /*scrollTop*/
      ctx2[7];
      if (dirty[0] & /*item*/
      524288) background_changes.itemDimensions = /*item*/
      ctx2[19];
      if (dirty[0] & /*viewport*/
      32) background_changes.viewport = /*viewport*/
      ctx2[5];
      background.$set(background_changes);
      const selectionarea_changes = {};
      if (dirty[0] & /*selection*/
      2097152) selectionarea_changes.area = /*selection*/
      (_a2 = ctx2[21]) == null ? void 0 : _a2.area;
      selectionarea.$set(selectionarea_changes);
      const selectedbounds_changes = {};
      if (dirty[0] & /*dragPreview*/
      64) selectedbounds_changes.dragging = /*dragPreview*/
      ctx2[6] != null;
      if (dirty[0] & /*selection*/
      2097152) selectedbounds_changes.bounds = /*selection*/
      ctx2[21].bounds;
      if (dirty[0] & /*selection*/
      2097152) selectedbounds_changes.selectedItemCount = /*selection*/
      (_b2 = ctx2[21].selectedItems.size) != null ? _b2 : 0;
      selectedbounds.$set(selectedbounds_changes);
      if (
        /*hover*/
        ctx2[22] != null && /*display*/
        ctx2[0] != null
      ) {
        if (if_block0) {
          if_block0.p(ctx2, dirty);
          if (dirty[0] & /*hover, display*/
          4194305) {
            transition_in(if_block0, 1);
          }
        } else {
          if_block0 = create_if_block_2$1(ctx2);
          if_block0.c();
          transition_in(if_block0, 1);
          if_block0.m(div7, t10);
        }
      } else if (if_block0) {
        group_outros();
        transition_out(if_block0, 1, 1, () => {
          if_block0 = null;
        });
        check_outros();
      }
      if (dirty[0] & /*dragPreview, display*/
      65) show_if = /*dragPreview*/
      ctx2[6] != null && /*display*/
      ctx2[0] != null && /*dragPreview*/
      ctx2[6].getCount() === 1;
      if (show_if) {
        if (if_block1) {
          if_block1.p(ctx2, dirty);
          if (dirty[0] & /*dragPreview, display*/
          65) {
            transition_in(if_block1, 1);
          }
        } else {
          if_block1 = create_if_block_1$1(ctx2);
          if_block1.c();
          transition_in(if_block1, 1);
          if_block1.m(div7, t11);
        }
      } else if (if_block1) {
        group_outros();
        transition_out(if_block1, 1, 1, () => {
          if_block1 = null;
        });
        check_outros();
      }
      if (
        /*focus*/
        ctx2[23] != null
      ) {
        if (if_block2) {
          if_block2.p(ctx2, dirty);
          if (dirty[0] & /*focus*/
          8388608) {
            transition_in(if_block2, 1);
          }
        } else {
          if_block2 = create_if_block$7(ctx2);
          if_block2.c();
          transition_in(if_block2, 1);
          if_block2.m(div7, t12);
        }
      } else if (if_block2) {
        group_outros();
        transition_out(if_block2, 1, 1, () => {
          if_block2 = null;
        });
        check_outros();
      }
      const scrollbar0_changes = {};
      if (dirty[0] & /*scrollbarHeight*/
      4096) scrollbar0_changes.style = `height: ${/*scrollbarHeight*/
      ctx2[12]}px;`;
      if (dirty[0] & /*sortedItems*/
      2) scrollbar0_changes.tabindex = /*sortedItems*/
      ctx2[1].length;
      if (dirty[0] & /*hScrollValue*/
      134217728) scrollbar0_changes.value = /*hScrollValue*/
      ctx2[27];
      if (dirty[0] & /*visibleHAmount*/
      268435456) scrollbar0_changes.visibleAmount = /*visibleHAmount*/
      ctx2[28];
      if (dirty[0] & /*minHScrollValue*/
      536870912) scrollbar0_changes.min = /*minHScrollValue*/
      ctx2[29];
      if (dirty[0] & /*maxHScrollValue*/
      1073741824) scrollbar0_changes.max = /*maxHScrollValue*/
      ctx2[30];
      scrollbar0.$set(scrollbar0_changes);
      const scrollbar1_changes = {};
      if (dirty[0] & /*scrollbarWidth*/
      8192) scrollbar1_changes.style = `width: ${/*scrollbarWidth*/
      ctx2[13]}px;`;
      if (dirty[0] & /*sortedItems*/
      2) scrollbar1_changes.tabindex = /*sortedItems*/
      ctx2[1].length + 1;
      if (dirty[0] & /*scrollTop*/
      128) scrollbar1_changes.value = /*scrollTop*/
      ctx2[7];
      if (dirty[0] & /*visibleVAmount*/
      67108864) scrollbar1_changes.visibleAmount = /*visibleVAmount*/
      ctx2[26];
      if (dirty[0] & /*scrollHeight*/
      33554432) scrollbar1_changes.max = /*scrollHeight*/
      ctx2[25];
      scrollbar1.$set(scrollbar1_changes);
      if (!current || dirty[0] & /*hover*/
      4194304) {
        toggle_class(
          div7,
          "has-hover",
          /*hover*/
          ctx2[22] != null
        );
      }
      if (!current || dirty[0] & /*editable*/
      8) {
        toggle_class(
          div7,
          "editable",
          /*editable*/
          ctx2[3]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(background.$$.fragment, local);
      transition_in(selectionarea.$$.fragment, local);
      transition_in(selectedbounds.$$.fragment, local);
      transition_in(if_block0);
      transition_in(if_block1);
      transition_in(if_block2);
      transition_in(scrollbar0.$$.fragment, local);
      transition_in(scrollbar1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(background.$$.fragment, local);
      transition_out(selectionarea.$$.fragment, local);
      transition_out(selectedbounds.$$.fragment, local);
      transition_out(if_block0);
      transition_out(if_block1);
      transition_out(if_block2);
      transition_out(scrollbar0.$$.fragment, local);
      transition_out(scrollbar1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div7);
        detach(t14);
        detach(div8);
      }
      destroy_component(background);
      ctx[48](null);
      ctx[49](null);
      ctx[50](null);
      ctx[51](null);
      ctx[52](null);
      div6_resize_listener();
      destroy_component(selectionarea);
      ctx[54](null);
      destroy_component(selectedbounds);
      if (if_block0) if_block0.d();
      if (if_block1) if_block1.d();
      if (if_block2) if_block2.d();
      destroy_component(scrollbar0);
      destroy_component(scrollbar1);
      ctx[63](null);
      div8_resize_listener();
      mounted = false;
      run_all(dispose);
    }
  };
}
function selectionBounds(elements2) {
  let minX = Number.POSITIVE_INFINITY;
  let minY = Number.POSITIVE_INFINITY;
  let maxX = Number.NEGATIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;
  for (const element2 of elements2) {
    if (element2.offsetLeft < minX) {
      minX = element2.offsetLeft;
    }
    if (element2.offsetTop < minY) {
      minY = element2.offsetTop;
    }
    if (element2.offsetRight > maxX) {
      maxX = element2.offsetRight;
    }
    if (element2.offsetBottom > maxY) {
      maxY = element2.offsetBottom;
    }
  }
  return {
    offsetLeft: minX,
    offsetTop: minY,
    offsetWidth: maxX - minX,
    offsetHeight: maxY - minY
  };
}
function instance$p($$self, $$props, $$invalidate) {
  let scrollbarWidth;
  let scrollbarHeight;
  const dispatch2 = createEventDispatcher();
  let { display } = $$props;
  let { sortedItems } = $$props;
  let { scale } = $$props;
  let { focalValue } = $$props;
  let { width = 0 } = $$props;
  let { clientWidth = 0 } = $$props;
  let { clientHeight = 0 } = $$props;
  let { editable } = $$props;
  let { onPreviewNewItemValue = (_, value) => value } = $$props;
  let { oncontextmenu = () => {
  } } = $$props;
  let canvas;
  const pointElements = {
    base: void 0,
    nextCol: void 0,
    selected: void 0,
    focused: void 0,
    nextRow: void 0
  };
  let stageCSSTarget;
  let innerWidth = 0;
  let innerHeight = 0;
  const viewport = {
    width: 0,
    height: 0,
    padding: { top: 0, right: 0, bottom: 0, left: 0 }
  };
  const item = {
    width: 0,
    height: 0,
    margin: { horizontal: 0, vertical: 0 }
  };
  let layoutNeeded = true;
  let scrollNeeded = true;
  let redrawNeeded = true;
  const resizeObserver = new ResizeObserver((a) => {
    if (canvas == null || Object.values(pointElements).some((el) => el == null) || stageCSSTarget == null) {
      return;
    }
    if (stageCSSTarget.offsetHeight === 0 && stageCSSTarget.offsetWidth === 0) {
      return;
    }
    $$invalidate(19, item.width = Math.round(pointElements.base.clientWidth), item);
    $$invalidate(19, item.height = Math.round(pointElements.base.clientHeight), item);
    $$invalidate(19, item.margin.horizontal = Math.round(Math.max(0, pointElements.nextCol.offsetLeft - (pointElements.base.offsetLeft + item.width))), item);
    $$invalidate(19, item.margin.vertical = Math.round(Math.max(0, pointElements.nextRow.offsetTop - (pointElements.base.offsetTop + item.height))), item);
    item.height + item.margin.vertical;
    $$invalidate(5, viewport.padding.top = Math.max(0, pointElements.base.offsetTop - item.margin.vertical), viewport), $$invalidate(5, viewport.padding.left = Math.max(0, pointElements.base.offsetLeft - item.margin.horizontal), viewport), $$invalidate(5, viewport.padding.right = stageCSSTarget.clientWidth - viewport.padding.left - innerWidth, viewport), $$invalidate(5, viewport.padding.bottom = stageCSSTarget.clientHeight - viewport.padding.top - innerHeight, viewport), $$invalidate(5, viewport.width = stageCSSTarget.clientWidth, viewport);
    $$invalidate(5, viewport.height = stageCSSTarget.clientHeight, viewport);
    viewport.padding.top + item.height / 2 + item.margin.vertical / 2;
    const reportedWidth = viewport.width - viewport.padding.left - viewport.padding.right - item.width - item.margin.horizontal;
    if (width != reportedWidth) {
      $$invalidate(41, width = reportedWidth);
    }
    layoutNeeded = true;
  });
  function handleScroll(event) {
    if (event.shiftKey) {
      dispatch2("scrollX", scale.toValue(event.deltaY));
    } else if (event.ctrlKey) {
      const mouseOffsetX = event.clientX - stageCSSTarget.getBoundingClientRect().left;
      const xRelativeToMiddle = mouseOffsetX - viewport.width / 2;
      const zoomFocusValue = focalValue + scale.toValue(xRelativeToMiddle);
      if (event.deltaY > 0) {
        dispatch2(`zoomOut`, {
          keepValue: zoomFocusValue,
          at: xRelativeToMiddle,
          within: viewport.width
        });
      } else if (event.deltaY < 0) {
        dispatch2(`zoomIn`, {
          keepValue: zoomFocusValue,
          at: xRelativeToMiddle,
          within: viewport.width
        });
      }
    } else {
      const newScroll = Math.max(0, scrollTop + event.deltaY / 16);
      if (scrollTop != newScroll) {
        $$invalidate(7, scrollTop = newScroll);
        scrollNeeded = true;
      }
    }
  }
  let focusCausedByClick = false;
  let mouseDownOn = null;
  class DragPreviewElement {
    constructor(element2, value, offsetCenterX, backgroundColor, borderColor, strokeWidth) {
      this.element = element2;
      this.value = value;
      this.offsetCenterX = offsetCenterX;
      this.backgroundColor = backgroundColor;
      this.borderColor = borderColor;
      this.strokeWidth = strokeWidth;
    }
    get item() {
      return this.element.layoutItem.item;
    }
    get offsetCenterY() {
      return this.offsetTop + this.element.offsetHeight / 2;
    }
    get offsetLeft() {
      return this.offsetCenterX - this.element.offsetWidth / 2;
    }
    get offsetTop() {
      return this.element.offsetTop;
    }
    get offsetRight() {
      return this.offsetCenterX + this.element.offsetWidth / 2;
    }
    get offsetBottom() {
      return this.offsetTop + this.element.offsetHeight;
    }
    get offsetWidth() {
      return this.element.offsetWidth;
    }
    get offsetHeight() {
      return this.element.offsetHeight;
    }
  }
  class DragPreview {
    constructor() {
      __publicField(this, "items", /* @__PURE__ */ new Set());
      __publicField(this, "elements", []);
    }
    add(element2) {
      this.elements.push(element2);
      this.items.add(element2.item);
    }
    [Symbol.iterator]() {
      return this.elements[Symbol.iterator]();
    }
    movedItems() {
      return this.elements.map((element2, index) => {
        return element2;
      });
    }
    has(item2) {
      return this.items.has(item2);
    }
    getCount() {
      return this.items.size;
    }
    at(index) {
      return this.elements[index];
    }
  }
  let dragPreview = null;
  function clearSelection() {
    if (selection.selectedItems.size > 0) {
      redrawNeeded = true;
    }
    $$invalidate(
      21,
      selection.selectedItems = /* @__PURE__ */ new Map(),
      selection
    );
    $$invalidate(21, selection.bounds = null, selection);
    $$invalidate(21, selection);
  }
  function selectElement(element2) {
    if (selection.selectedItems.has(element2.layoutItem.item.id())) return;
    clearSelection();
    $$invalidate(
      21,
      selection.selectedItems = /* @__PURE__ */ new Map([[element2.layoutItem.item.id(), element2]]),
      selection
    );
    redrawNeeded = true;
    $$invalidate(21, selection);
  }
  function selectElements(elements2) {
    clearSelection();
    $$invalidate(21, selection.selectedItems = new Map(elements2.map((it) => [it.layoutItem.item.id(), it])), selection);
    if (selection.selectedItems.size > 1) {
      $$invalidate(21, selection.bounds = selectionBounds(selection.selectedItems.values()), selection);
    }
    redrawNeeded = true;
    $$invalidate(21, selection);
  }
  function shouldExtendSelection(event) {
    return obsidian.Platform.isMacOS && event.metaKey || event.ctrlKey;
  }
  function includeElementInSelection(element2) {
    selection.selectedItems.set(element2.layoutItem.item.id(), element2);
    if (selection.selectedItems.size > 1) {
      $$invalidate(21, selection.bounds = selectionBounds(selection.selectedItems.values()), selection);
    }
    redrawNeeded = true;
    $$invalidate(21, selection);
  }
  function includeElementsInSelection(elements2) {
    for (const element2 of elements2) {
      selection.selectedItems.set(element2.layoutItem.item.id(), element2);
    }
    if (selection.selectedItems.size > 1) {
      $$invalidate(21, selection.bounds = selectionBounds(selection.selectedItems.values()), selection);
    }
    $$invalidate(21, selection);
    redrawNeeded = true;
  }
  function createSelectionArea(x, y, width2, height) {
    $$invalidate(
      21,
      selection.area = {
        offsetLeft: x,
        offsetTop: y,
        offsetWidth: width2,
        offsetHeight: height
      },
      selection
    );
  }
  function handleMouseDown(event) {
    $$invalidate(20, focusCausedByClick = true);
    if (hover == null || hover.element == null) {
      $$invalidate(23, focus = null);
      if (!shouldExtendSelection(event)) {
        clearSelection();
      }
      prepareMultiSelectDraw(event);
      return;
    }
    if (event.button === 2) {
      focusOn(hover.element, elements.arr.indexOf(hover.element));
      return;
    }
    mouseDownOn = hover.element;
    if (!selection.selectedItems.has(mouseDownOn.layoutItem.item.id())) {
      if (shouldExtendSelection(event)) {
        includeElementInSelection(mouseDownOn);
      } else {
        selectElement(mouseDownOn);
      }
    }
    prepareDragSelection(event);
  }
  function prepareDragSelection(event) {
    const selectedItems = Array.from(selection.selectedItems.values());
    if (selectedItems.length === 0) {
      return;
    }
    const startItemBackground = selectedItems[0].backgroundColor;
    const startItemBorder = selectedItems[0].borderColor;
    const startItemBorderWidth = selectedItems[0].strokeWidth;
    const startViewportBounds = stageCSSTarget.getBoundingClientRect();
    const startMouseValue = focalValue - scale.toValue(viewport.width / 2) - scale.toValue(stageCSSTarget.getBoundingClientRect().left) + scale.toValue(event.clientX);
    function dragItemListener(event2) {
      const mouseX = event2.clientX;
      const mouseValue = focalValue - scale.toValue(viewport.width / 2) - scale.toValue(stageCSSTarget.getBoundingClientRect().left) + scale.toValue(event2.clientX);
      $$invalidate(6, dragPreview = dragPreview != null ? dragPreview : new DragPreview());
      for (let i = 0; i < selectedItems.length; i++) {
        const item2 = selectedItems[i];
        const newItemValue = onPreviewNewItemValue(selectedItems[i].layoutItem.item, selectedItems[i].layoutItem.item.value() + (mouseValue - startMouseValue));
        const offsetCenterX = scale.toPixels(newItemValue - focalValue) + viewport.width / 2;
        if (dragPreview.at(i) != null) {
          dragPreview.at(i).value = newItemValue;
          dragPreview.at(i).offsetCenterX = offsetCenterX;
        } else {
          dragPreview.add(new DragPreviewElement(item2, newItemValue, offsetCenterX, startItemBackground, startItemBorder, startItemBorderWidth));
        }
      }
      $$invalidate(6, dragPreview);
      if (mouseX < startViewportBounds.left + viewport.padding.left) {
        const delta = mouseX - (startViewportBounds.left + viewport.padding.left);
        dispatch2("scrollX", scale.toValue(delta));
      } else if (mouseX > startViewportBounds.right - viewport.padding.right) {
        const delta = mouseX - (startViewportBounds.right - viewport.padding.right);
        dispatch2("scrollX", scale.toValue(delta));
      }
    }
    function releaseItemListener() {
      if (dragPreview != null) {
        dispatch2("moveItems", dragPreview.movedItems(), { cancelable: true });
      }
      $$invalidate(6, dragPreview = null);
      window.removeEventListener("mousemove", dragItemListener);
      window.removeEventListener("mouseup", releaseItemListener);
    }
    if (editable) {
      window.addEventListener("mouseup", releaseItemListener);
      window.addEventListener("mousemove", dragItemListener);
    }
  }
  let selection = {
    area: null,
    bounds: null,
    selectedItems: /* @__PURE__ */ new Map()
  };
  function prepareMultiSelectDraw(event) {
    const startViewportBounds = stageCSSTarget.getBoundingClientRect();
    const startX = event.clientX - startViewportBounds.left;
    const startY = event.clientY - startViewportBounds.top;
    const startFocalValue = focalValue;
    const startScrollTop = scrollTop;
    let isDragging = false;
    function dragSelectionArea(event2) {
      const scrolledStartX = startX - scale.toPixels(focalValue - startFocalValue);
      const scrolledStartY = startY - scrollTop - startScrollTop;
      const endX = event2.clientX - startViewportBounds.left;
      const endY = event2.clientY - startViewportBounds.top;
      const minX = Math.min(scrolledStartX, endX);
      const minY = Math.min(scrolledStartY, endY);
      const maxX = Math.max(scrolledStartX, endX);
      const maxY = Math.max(scrolledStartY, endY);
      const width2 = maxX - minX;
      const height = maxY - minY;
      if (!isDragging && width2 < 5 && height < 5) {
        return;
      }
      isDragging = true;
      const selectedItems = [];
      for (let i = 0; i < elements.arr.length; i++) {
        const element2 = elements.arr[i];
        if (element2.offsetLeft > maxX) {
          break;
        }
        if (element2.intersects(minX, minY, width2, height)) {
          selectedItems.push(element2);
        }
      }
      createSelectionArea(minX, minY, width2, height);
      if (shouldExtendSelection(event2)) {
        includeElementsInSelection(selectedItems);
      } else {
        selectElements(selectedItems);
      }
      if (event2.clientX < startViewportBounds.left + viewport.padding.left) {
        const delta = event2.clientX - (startViewportBounds.left + viewport.padding.left);
        dispatch2("scrollX", scale.toValue(delta));
      } else if (event2.clientX > startViewportBounds.right - viewport.padding.right) {
        const delta = event2.clientX - (startViewportBounds.right - viewport.padding.right);
        dispatch2("scrollX", scale.toValue(delta));
      }
      if (event2.clientY < startViewportBounds.top + viewport.padding.top) {
        const delta = event2.clientY - (startViewportBounds.top + viewport.padding.top);
        $$invalidate(7, scrollTop += delta);
      } else if (event2.clientY > startViewportBounds.bottom) {
        const delta = event2.clientY - (startViewportBounds.bottom - viewport.padding.bottom);
        $$invalidate(7, scrollTop += delta);
      }
    }
    function releaseSelectionArea() {
      $$invalidate(21, selection.area = null, selection);
      $$invalidate(21, selection);
      window.removeEventListener("mousemove", dragSelectionArea);
      window.removeEventListener("mouseup", releaseSelectionArea);
    }
    window.addEventListener("mouseup", releaseSelectionArea);
    window.addEventListener("mousemove", dragSelectionArea);
  }
  function handleMouseUp(event) {
    if (event.button === 2) {
      if (hover == null || hover.element == null) {
        return;
      }
      oncontextmenu(event, [hover.element.layoutItem.item]);
      return;
    }
    if (mouseDownOn == null) {
      return;
    }
    const mouseWasDownOn = mouseDownOn;
    mouseDownOn = null;
    if (hover == null || hover.element == null) {
      return;
    }
    if (hover.element !== mouseWasDownOn) {
      return;
    }
    $$invalidate(23, focus = null);
    const hoveredItem = hover.element.layoutItem.item;
    $$invalidate(22, hover = null);
    if (!shouldExtendSelection(event)) {
      dispatch2("select", { item: hoveredItem, causedBy: event });
    }
  }
  function handleDblClick(event) {
    if (!editable) {
      return;
    }
    if (hover != null) {
      return;
    }
    const leftValue = focalValue - scale.toValue(viewport.width / 2);
    const valueFromLeft = scale.toValue(event.offsetX);
    const value = leftValue + valueFromLeft;
    dispatch2("create", { value });
  }
  let elements = {
    arr: [],
    getCount() {
      return this.arr.length;
    },
    [Symbol.iterator]() {
      return this.arr[Symbol.iterator]();
    }
  };
  let hover = null;
  let focus = null;
  function verticalScrollToFocusItem(element2) {
    if (element2.offsetTop < 0) {
      $$invalidate(7, scrollTop = element2.layoutItem.top());
      scrollNeeded = true;
    } else if (element2.offsetBottom > viewport.height) {
      $$invalidate(7, scrollTop = element2.layoutItem.bottom() - viewport.height);
      scrollNeeded = true;
    }
  }
  function focusOn(element2, index, skipEvent = false) {
    if (!skipEvent) {
      dispatch2("focus", element2.layoutItem.item);
    }
    $$invalidate(23, focus = { element: element2, index });
    redrawNeeded = true;
    verticalScrollToFocusItem(element2);
    if (focus.element.offsetLeft < 0) {
      dispatch2("scrollToValue", focus.element.layoutItem.item.value());
    } else if (focus.element.offsetRight > viewport.width) {
      dispatch2("scrollToValue", focus.element.layoutItem.item.value());
    }
  }
  function focusNextItem(back = false) {
    const index = focus == null ? 0 : back ? focus.index - 1 : focus.index + 1;
    if (index < elements.arr.length && index >= 0) {
      focusOn(elements.arr[index], index);
      return true;
    } else {
      $$invalidate(23, focus = null);
      return false;
    }
  }
  function focusOnItem(item2) {
    const index = elements.arr.findIndex((element2) => element2.layoutItem.item === item2);
    if (index >= 0) {
      focusOn(elements.arr[index], index, true);
    }
  }
  function handleMouseMove(event) {
    detectHover(event);
  }
  let scrollbarDragging = false;
  function detectHover(event) {
    if (!scrollbarDragging && dragPreview == null && selection.area == null) {
      for (let i = 0; i < elements.arr.length; i++) {
        const element2 = elements.arr[i];
        if (element2.contains(event.offsetX, event.offsetY)) {
          $$invalidate(22, hover = {
            element: element2,
            pos: [event.offsetX, event.offsetY]
          });
          return;
        }
      }
    }
    $$invalidate(22, hover = null);
  }
  function onPointsOrScaleChanged(points, scale2) {
    if (focus) {
      const index = points.items.findIndex((item2) => item2 === focus.element.layoutItem.item);
      if (index >= 0) {
        $$invalidate(23, focus = { index, element: elements.arr[index] });
      } else {
        $$invalidate(23, focus = null);
      }
    }
    layoutNeeded = true;
  }
  function onFocalValueChanged(_) {
    scrollNeeded = true;
  }
  function invalidateColors() {
    redrawNeeded = true;
  }
  let scrollTop = 0;
  function onScrollTopChanged(_) {
    scrollNeeded = true;
  }
  let scrollHeight = 0;
  let visibleVAmount = 0;
  let scrollbarMeasurerFullWidth = 0;
  let scrollbarMeasurerInnerWidth = 0;
  let scrollbarMeasurerFullHeight = 0;
  let scrollbarMeasurerInnerHeight = 0;
  let hScrollValue = 0;
  let visibleHAmount = viewport.width;
  let minHScrollValue = 0;
  let maxHScrollValue = 0;
  function handleHScroll(event) {
    dispatch2("scrollToValue", focalValue + scale.toValue(event.detail.deltaPixels) / event.detail.ratio);
  }
  function handleVScroll(event) {
    $$invalidate(7, scrollTop = event.detail.value);
  }
  onMount(() => {
    if (canvas == null || Object.values(pointElements).some((el) => el == null) || stageCSSTarget == null) {
      return;
    }
    resizeObserver.observe(canvas);
    Object.values(pointElements).forEach((element2) => resizeObserver.observe(element2));
    resizeObserver.observe(stageCSSTarget);
    function draw(layout = [], pointStyle) {
      var _a, _b, _c, _d, _e;
      if (canvas == null) return;
      if (canvas.width != viewport.width) $$invalidate(14, canvas.width = viewport.width, canvas);
      if (canvas.height != viewport.height) $$invalidate(14, canvas.height = viewport.height, canvas);
      const renderContext = canvas.getContext("2d");
      if (renderContext == null) return;
      if (layoutNeeded) {
        layout = layoutPoints(viewport, item, scale, sortedItems.items, layout);
        if (layout.length > 0) {
          $$invalidate(25, scrollHeight = 0);
          for (const bounds of layout) {
            $$invalidate(25, scrollHeight = Math.max(scrollHeight, bounds.bottom() + item.margin.vertical + viewport.padding.bottom));
          }
        } else {
          $$invalidate(25, scrollHeight = 0);
        }
        if (focus != null) {
          if (focus.index > layout.length) {
            $$invalidate(23, focus = null);
          }
        }
      }
      if (scrollNeeded || layoutNeeded) {
        if (elements.arr.length > layout.length) {
          elements.arr = elements.arr.slice(0, layout.length);
        }
        const scrollLeft = scale.toPixels(focalValue) - viewport.width / 2;
        $$invalidate(7, scrollTop = Math.max(0, Math.min(scrollTop, scrollHeight - viewport.height)));
        $$invalidate(26, visibleVAmount = viewport.height);
        for (let i = 0; i < layout.length; i++) {
          const item2 = layout[i];
          const element2 = (_a = elements.arr[i]) != null ? _a : new TimelineItemElement(item2);
          element2.layoutItem = item2;
          element2.offsetCenterX = item2.centerX - scrollLeft;
          element2.offsetCenterY = item2.centerY - scrollTop;
          element2.offsetLeft = element2.offsetCenterX - item2.radius;
          element2.offsetTop = element2.offsetCenterY - item2.radius;
          element2.offsetWidth = item2.radius * 2;
          element2.offsetHeight = item2.radius * 2;
          element2.offsetRight = element2.offsetLeft + element2.offsetWidth;
          element2.offsetBottom = element2.offsetTop + element2.offsetHeight;
          if (selection.selectedItems.has(item2.item.id())) {
            selection.selectedItems.set(item2.item.id(), element2);
          }
          elements.arr[i] = element2;
        }
        $$invalidate(21, selection.bounds = selectionBounds(selection.selectedItems.values()), selection);
        $$invalidate(28, visibleHAmount = scale.toValue(viewport.width));
        $$invalidate(27, hScrollValue = focalValue - scale.toValue(viewport.width / 2));
        const leftMostValue = ((_c = (_b = sortedItems.items[0]) == null ? void 0 : _b.value()) != null ? _c : 0) - scale.toValue(viewport.padding.left + item.width / 2);
        const rightMostValue = ((_e = (_d = sortedItems.items[sortedItems.length - 1]) == null ? void 0 : _d.value()) != null ? _e : 0) - scale.toValue(viewport.padding.left + item.width / 2);
        $$invalidate(29, minHScrollValue = Math.min(focalValue - scale.toValue(viewport.width / 2), leftMostValue));
        $$invalidate(30, maxHScrollValue = Math.max(focalValue + scale.toValue(viewport.width / 2), rightMostValue));
        if (hover != null) {
          detectHover({
            offsetX: hover.pos[0],
            offsetY: hover.pos[1]
          });
        }
        if (focus) {
          $$invalidate(23, focus.element = elements.arr[focus.index], focus);
          if (!focus.element) {
            $$invalidate(23, focus = null);
          } else {
            if (layoutNeeded) {
              verticalScrollToFocusItem(focus.element);
            }
            $$invalidate(23, focus);
          }
        }
        $$invalidate(21, selection.bounds = selectionBounds(selection.selectedItems.values()), selection);
        $$invalidate(21, selection);
      }
      const currentPointStyle = new TimelineItemElementStyle(getComputedStyle(pointElements.base));
      if (redrawNeeded || scrollNeeded || layoutNeeded || !currentPointStyle.equals(pointStyle)) {
        let dragPreviewed = dragPreview != null;
        const hasSelectedItems = selection.selectedItems.size > 0;
        elements.arr.forEach((el) => el.style = currentPointStyle);
        if (hasSelectedItems || dragPreviewed) {
          const selectedStyle = new TimelineItemElementStyle(getComputedStyle(pointElements.selected));
          for (let i = 0; i < elements.arr.length; i++) {
            const element2 = elements.arr[i];
            if (dragPreviewed && dragPreview.has(element2.layoutItem.item)) {
              element2.visible = false;
              continue;
            }
            if (hasSelectedItems && selection.selectedItems.has(element2.layoutItem.item.id())) {
              element2.style = selectedStyle;
            }
          }
        }
        renderLayout(renderContext, viewport, elements, dragPreview);
      }
      layoutNeeded = false;
      scrollNeeded = false;
      redrawNeeded = false;
      requestAnimationFrame(() => draw(layout, currentPointStyle));
    }
    requestAnimationFrame(() => draw());
  });
  function div0_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements.base = $$value;
      $$invalidate(15, pointElements);
    });
  }
  function div1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements.nextCol = $$value;
      $$invalidate(15, pointElements);
    });
  }
  function div2_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements.selected = $$value;
      $$invalidate(15, pointElements);
    });
  }
  function div3_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements.focused = $$value;
      $$invalidate(15, pointElements);
    });
  }
  function div5_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      pointElements.nextRow = $$value;
      $$invalidate(15, pointElements);
    });
  }
  function div6_elementresize_handler() {
    innerWidth = this.offsetWidth;
    innerHeight = this.offsetHeight;
    $$invalidate(17, innerWidth);
    $$invalidate(18, innerHeight);
  }
  function canvas_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvas = $$value;
      $$invalidate(14, canvas);
    });
  }
  const mouseleave_handler = () => $$invalidate(22, hover = null);
  const focus_handler = (e) => {
    if (!focusCausedByClick && focusNextItem()) {
      e.stopPropagation();
      e.preventDefault();
    }
    $$invalidate(20, focusCausedByClick = false);
  };
  const keydown_handler = (event) => {
    switch (event.key) {
      case "ArrowLeft":
        dispatch2("scrollX", scale.toValue(-10));
        break;
      case "ArrowRight":
        dispatch2("scrollX", scale.toValue(10));
        break;
      case "ArrowUp":
        $$invalidate(7, scrollTop = Math.max(0, scrollTop - 10));
        break;
      case "ArrowDown":
        $$invalidate(7, scrollTop = Math.min(scrollHeight - viewport.height, scrollTop + 10));
        break;
      case "PageUp":
        $$invalidate(7, scrollTop = Math.max(0, scrollTop - viewport.height));
        break;
      case "PageDown":
        $$invalidate(7, scrollTop = Math.min(scrollHeight - viewport.height, scrollTop + viewport.height));
        break;
      case "Home":
        $$invalidate(7, scrollTop = 0);
        break;
      case "End":
        $$invalidate(7, scrollTop = scrollHeight - viewport.height);
        break;
      case "Tab":
        if (focusNextItem(event.shiftKey)) {
          event.stopPropagation();
          event.preventDefault();
        }
        break;
    }
  };
  const mouseup_handler = (e) => {
    if (e.button === 2) {
      oncontextmenu(e, Array.from(selection.selectedItems.values()).map((it) => it.layoutItem.item));
    }
  };
  const dragstart_handler = () => {
    $$invalidate(24, scrollbarDragging = true);
  };
  const dragend_handler = () => {
    $$invalidate(24, scrollbarDragging = false);
  };
  const dragstart_handler_1 = () => {
    $$invalidate(24, scrollbarDragging = true);
  };
  const dragend_handler_1 = () => {
    $$invalidate(24, scrollbarDragging = false);
  };
  function div7_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      stageCSSTarget = $$value;
      $$invalidate(16, stageCSSTarget);
    });
  }
  function div8_elementresize_handler() {
    scrollbarMeasurerInnerHeight = this.clientHeight;
    scrollbarMeasurerInnerWidth = this.clientWidth;
    scrollbarMeasurerFullHeight = this.offsetHeight;
    scrollbarMeasurerFullWidth = this.offsetWidth;
    $$invalidate(11, scrollbarMeasurerInnerHeight);
    $$invalidate(9, scrollbarMeasurerInnerWidth);
    $$invalidate(10, scrollbarMeasurerFullHeight);
    $$invalidate(8, scrollbarMeasurerFullWidth);
  }
  $$self.$$set = ($$props2) => {
    if ("display" in $$props2) $$invalidate(0, display = $$props2.display);
    if ("sortedItems" in $$props2) $$invalidate(1, sortedItems = $$props2.sortedItems);
    if ("scale" in $$props2) $$invalidate(2, scale = $$props2.scale);
    if ("focalValue" in $$props2) $$invalidate(44, focalValue = $$props2.focalValue);
    if ("width" in $$props2) $$invalidate(41, width = $$props2.width);
    if ("clientWidth" in $$props2) $$invalidate(42, clientWidth = $$props2.clientWidth);
    if ("clientHeight" in $$props2) $$invalidate(43, clientHeight = $$props2.clientHeight);
    if ("editable" in $$props2) $$invalidate(3, editable = $$props2.editable);
    if ("onPreviewNewItemValue" in $$props2) $$invalidate(45, onPreviewNewItemValue = $$props2.onPreviewNewItemValue);
    if ("oncontextmenu" in $$props2) $$invalidate(4, oncontextmenu = $$props2.oncontextmenu);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*dragPreview*/
    64) {
      scrollNeeded = true;
    }
    if ($$self.$$.dirty[0] & /*sortedItems, scale*/
    6) {
      onPointsOrScaleChanged(sortedItems);
    }
    if ($$self.$$.dirty[1] & /*focalValue*/
    8192) {
      onFocalValueChanged();
    }
    if ($$self.$$.dirty[0] & /*scrollTop*/
    128) {
      onScrollTopChanged();
    }
    if ($$self.$$.dirty[0] & /*scrollbarMeasurerFullWidth, scrollbarMeasurerInnerWidth*/
    768) {
      $$invalidate(13, scrollbarWidth = scrollbarMeasurerFullWidth - scrollbarMeasurerInnerWidth);
    }
    if ($$self.$$.dirty[0] & /*viewport, scrollbarWidth*/
    8224) {
      $$invalidate(42, clientWidth = viewport.width - scrollbarWidth);
    }
    if ($$self.$$.dirty[0] & /*scrollbarMeasurerFullHeight, scrollbarMeasurerInnerHeight*/
    3072) {
      $$invalidate(12, scrollbarHeight = scrollbarMeasurerFullHeight - scrollbarMeasurerInnerHeight);
    }
    if ($$self.$$.dirty[0] & /*viewport, scrollbarHeight*/
    4128) {
      $$invalidate(43, clientHeight = viewport.height - scrollbarHeight);
    }
  };
  return [
    display,
    sortedItems,
    scale,
    editable,
    oncontextmenu,
    viewport,
    dragPreview,
    scrollTop,
    scrollbarMeasurerFullWidth,
    scrollbarMeasurerInnerWidth,
    scrollbarMeasurerFullHeight,
    scrollbarMeasurerInnerHeight,
    scrollbarHeight,
    scrollbarWidth,
    canvas,
    pointElements,
    stageCSSTarget,
    innerWidth,
    innerHeight,
    item,
    focusCausedByClick,
    selection,
    hover,
    focus,
    scrollbarDragging,
    scrollHeight,
    visibleVAmount,
    hScrollValue,
    visibleHAmount,
    minHScrollValue,
    maxHScrollValue,
    dispatch2,
    handleScroll,
    handleMouseDown,
    prepareDragSelection,
    handleMouseUp,
    handleDblClick,
    focusNextItem,
    handleMouseMove,
    handleHScroll,
    handleVScroll,
    width,
    clientWidth,
    clientHeight,
    focalValue,
    onPreviewNewItemValue,
    focusOnItem,
    invalidateColors,
    div0_binding,
    div1_binding,
    div2_binding,
    div3_binding,
    div5_binding,
    div6_elementresize_handler,
    canvas_1_binding,
    mouseleave_handler,
    focus_handler,
    keydown_handler,
    mouseup_handler,
    dragstart_handler,
    dragend_handler,
    dragstart_handler_1,
    dragend_handler_1,
    div7_binding,
    div8_elementresize_handler
  ];
}
class CanvasStage extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$p,
      create_fragment$s,
      safe_not_equal,
      {
        display: 0,
        sortedItems: 1,
        scale: 2,
        focalValue: 44,
        width: 41,
        clientWidth: 42,
        clientHeight: 43,
        editable: 3,
        onPreviewNewItemValue: 45,
        oncontextmenu: 4,
        focusOnItem: 46,
        invalidateColors: 47
      },
      null,
      [-1, -1, -1]
    );
  }
  get focusOnItem() {
    return this.$$.ctx[46];
  }
  get invalidateColors() {
    return this.$$.ctx[47];
  }
}
function create_key_block(ctx) {
  let div;
  return {
    c() {
      div = element("div");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      ctx[2](div);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      ctx[2](null);
    }
  };
}
function create_fragment$r(ctx) {
  let previous_key = (
    /*id*/
    ctx[0]
  );
  let key_block_anchor;
  let key_block = create_key_block(ctx);
  return {
    c() {
      key_block.c();
      key_block_anchor = empty();
    },
    m(target, anchor) {
      key_block.m(target, anchor);
      insert(target, key_block_anchor, anchor);
    },
    p(ctx2, [dirty]) {
      if (dirty & /*id*/
      1 && safe_not_equal(previous_key, previous_key = /*id*/
      ctx2[0])) {
        key_block.d(1);
        key_block = create_key_block(ctx2);
        key_block.c();
        key_block.m(key_block_anchor.parentNode, key_block_anchor);
      } else {
        key_block.p(ctx2, dirty);
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(key_block_anchor);
      }
      key_block.d(detaching);
    }
  };
}
function instance$o($$self, $$props, $$invalidate) {
  let { id } = $$props;
  let parent;
  function createIcon(id2, parent2) {
    if (parent2 == null) return;
    parent2.empty();
    obsidian__namespace.setIcon(parent2, id2);
    const svgElement = parent2.firstChild;
    if (svgElement instanceof SVGElement) {
      parent2.replaceWith(svgElement);
    }
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      parent = $$value;
      $$invalidate(1, parent);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("id" in $$props2) $$invalidate(0, id = $$props2.id);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*id, parent*/
    3) {
      createIcon(id, parent);
    }
  };
  return [id, parent, div_binding];
}
class LucideIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$o, create_fragment$r, safe_not_equal, { id: 0 });
  }
  get id() {
    return this.$$.ctx[0];
  }
  set id(id) {
    this.$$set({ id });
    flush();
  }
}
function create_fragment$q(ctx) {
  let button;
  let current;
  let mounted;
  let dispose;
  const default_slot_template = (
    /*#slots*/
    ctx[4].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  let button_levels = [
    /*$$restProps*/
    ctx[2]
  ];
  let button_data = {};
  for (let i = 0; i < button_levels.length; i += 1) {
    button_data = assign(button_data, button_levels[i]);
  }
  return {
    c() {
      button = element("button");
      if (default_slot) default_slot.c();
      set_attributes(button, button_data);
    },
    m(target, anchor) {
      insert(target, button, anchor);
      if (default_slot) {
        default_slot.m(button, null);
      }
      if (button.autofocus) button.focus();
      current = true;
      if (!mounted) {
        dispose = [
          listen(button, "click", prevent_default(
            /*handleClick*/
            ctx[0]
          )),
          listen(
            button,
            "keydown",
            /*handleKeydown*/
            ctx[1]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
      set_attributes(button, button_data = get_spread_update(button_levels, [dirty & /*$$restProps*/
      4 && /*$$restProps*/
      ctx2[2]]));
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(button);
      }
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$n($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch2 = createEventDispatcher();
  function handleClick(event) {
    dispatch2("action", { inputEvent: event });
  }
  function handleKeydown(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch2("action", { inputEvent: event });
    }
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };
  return [handleClick, handleKeydown, $$restProps, $$scope, slots];
}
class ActionButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$n, create_fragment$q, safe_not_equal, {});
  }
}
function create_default_slot_4(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "plus" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_default_slot_3(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "minus" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_default_slot_2(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "scan" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_default_slot_1$2(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "arrow-left-to-line" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_default_slot$a(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "arrow-left" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_fragment$p(ctx) {
  let menu;
  let li0;
  let actionbutton0;
  let t0;
  let li1;
  let actionbutton1;
  let t1;
  let li2;
  let actionbutton2;
  let t2;
  let li3;
  let actionbutton3;
  let t3;
  let li4;
  let actionbutton4;
  let current;
  actionbutton0 = new ActionButton({
    props: {
      "aria-label": "Zoom In",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_4] },
      $$scope: { ctx }
    }
  });
  actionbutton0.$on(
    "action",
    /*triggerZoomIn*/
    ctx[0]
  );
  actionbutton1 = new ActionButton({
    props: {
      "aria-label": "Zoom Out",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_3] },
      $$scope: { ctx }
    }
  });
  actionbutton1.$on(
    "action",
    /*triggerZoomOut*/
    ctx[1]
  );
  actionbutton2 = new ActionButton({
    props: {
      "aria-label": "Zoom to Fit",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_2] },
      $$scope: { ctx }
    }
  });
  actionbutton2.$on(
    "action",
    /*triggerZoomToFit*/
    ctx[2]
  );
  actionbutton3 = new ActionButton({
    props: {
      "aria-label": "Scroll to Zero",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot_1$2] },
      $$scope: { ctx }
    }
  });
  actionbutton3.$on(
    "action",
    /*triggerScrollToZero*/
    ctx[3]
  );
  actionbutton4 = new ActionButton({
    props: {
      "aria-label": "Scroll to First",
      class: "clickable-icon",
      $$slots: { default: [create_default_slot$a] },
      $$scope: { ctx }
    }
  });
  actionbutton4.$on(
    "action",
    /*triggerScrollToFirst*/
    ctx[4]
  );
  return {
    c() {
      menu = element("menu");
      li0 = element("li");
      create_component(actionbutton0.$$.fragment);
      t0 = space();
      li1 = element("li");
      create_component(actionbutton1.$$.fragment);
      t1 = space();
      li2 = element("li");
      create_component(actionbutton2.$$.fragment);
      t2 = space();
      li3 = element("li");
      create_component(actionbutton3.$$.fragment);
      t3 = space();
      li4 = element("li");
      create_component(actionbutton4.$$.fragment);
      attr(li0, "class", "control-item svelte-180woxh");
      attr(li1, "class", "control-item svelte-180woxh");
      attr(li2, "class", "control-item svelte-180woxh");
      attr(li3, "class", "control-item svelte-180woxh");
      attr(li4, "class", "control-item svelte-180woxh");
      attr(menu, "class", "timeline-navigation-controls svelte-180woxh");
    },
    m(target, anchor) {
      insert(target, menu, anchor);
      append(menu, li0);
      mount_component(actionbutton0, li0, null);
      append(menu, t0);
      append(menu, li1);
      mount_component(actionbutton1, li1, null);
      append(menu, t1);
      append(menu, li2);
      mount_component(actionbutton2, li2, null);
      append(menu, t2);
      append(menu, li3);
      mount_component(actionbutton3, li3, null);
      append(menu, t3);
      append(menu, li4);
      mount_component(actionbutton4, li4, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const actionbutton0_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton0_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton0.$set(actionbutton0_changes);
      const actionbutton1_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton1.$set(actionbutton1_changes);
      const actionbutton2_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton2_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton2.$set(actionbutton2_changes);
      const actionbutton3_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton3_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton3.$set(actionbutton3_changes);
      const actionbutton4_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton4_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton4.$set(actionbutton4_changes);
    },
    i(local) {
      if (current) return;
      transition_in(actionbutton0.$$.fragment, local);
      transition_in(actionbutton1.$$.fragment, local);
      transition_in(actionbutton2.$$.fragment, local);
      transition_in(actionbutton3.$$.fragment, local);
      transition_in(actionbutton4.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton0.$$.fragment, local);
      transition_out(actionbutton1.$$.fragment, local);
      transition_out(actionbutton2.$$.fragment, local);
      transition_out(actionbutton3.$$.fragment, local);
      transition_out(actionbutton4.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(menu);
      }
      destroy_component(actionbutton0);
      destroy_component(actionbutton1);
      destroy_component(actionbutton2);
      destroy_component(actionbutton3);
      destroy_component(actionbutton4);
    }
  };
}
function instance$m($$self, $$props, $$invalidate) {
  let { navigation } = $$props;
  function triggerZoomIn() {
    navigation.zoomIn();
  }
  function triggerZoomOut() {
    navigation.zoomOut();
  }
  function triggerZoomToFit() {
    navigation.zoomToFit();
  }
  function triggerScrollToZero() {
    navigation.scrollToValue(0);
  }
  function triggerScrollToFirst() {
    navigation.scrollToFirst();
  }
  $$self.$$set = ($$props2) => {
    if ("navigation" in $$props2) $$invalidate(5, navigation = $$props2.navigation);
  };
  return [
    triggerZoomIn,
    triggerZoomOut,
    triggerZoomToFit,
    triggerScrollToZero,
    triggerScrollToFirst,
    navigation
  ];
}
class TimelineNavigationControls extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$m, create_fragment$p, safe_not_equal, { navigation: 5 });
  }
}
function create_else_block$1(ctx) {
  let actionbutton;
  let current;
  actionbutton = new ActionButton({
    props: {
      id: "toggle-button",
      class: "close-button clickable-icon",
      "aria-label": "Close",
      $$slots: { default: [create_default_slot_1$1] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*action_handler_1*/
    ctx[5]
  );
  return {
    c() {
      create_component(actionbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actionbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actionbutton, detaching);
    }
  };
}
function create_if_block$6(ctx) {
  let actionbutton;
  let current;
  actionbutton = new ActionButton({
    props: {
      id: "toggle-button",
      class: "open-button clickable-icon",
      "aria-label": "Open",
      $$slots: { default: [create_default_slot$9] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*action_handler*/
    ctx[4]
  );
  return {
    c() {
      create_component(actionbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actionbutton, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      64) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actionbutton, detaching);
    }
  };
}
function create_default_slot_1$1(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "x" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_default_slot$9(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "settings" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_fragment$o(ctx) {
  let form;
  let current_block_type_index;
  let if_block;
  let t;
  let form_class_value;
  let current;
  let mounted;
  let dispose;
  const if_block_creators = [create_if_block$6, create_else_block$1];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (!/*isOpen*/
    ctx2[0]) return 0;
    return 1;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  const default_slot_template = (
    /*#slots*/
    ctx[2].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
  return {
    c() {
      form = element("form");
      if_block.c();
      t = space();
      if (default_slot) default_slot.c();
      attr(form, "class", form_class_value = "timeline-settings control-group" + /*isOpen*/
      (ctx[0] ? " open" : " closed") + " svelte-1cwwnb1");
    },
    m(target, anchor) {
      insert(target, form, anchor);
      if_blocks[current_block_type_index].m(form, null);
      append(form, t);
      if (default_slot) {
        default_slot.m(form, null);
      }
      current = true;
      if (!mounted) {
        dispose = listen(form, "submit", stop_propagation(prevent_default(
          /*submit_handler*/
          ctx[3]
        )));
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(ctx2, dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
          if_block.c();
        } else {
          if_block.p(ctx2, dirty);
        }
        transition_in(if_block, 1);
        if_block.m(form, t);
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*isOpen*/
      1 && form_class_value !== (form_class_value = "timeline-settings control-group" + /*isOpen*/
      (ctx2[0] ? " open" : " closed") + " svelte-1cwwnb1")) {
        attr(form, "class", form_class_value);
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(form);
      }
      if_blocks[current_block_type_index].d();
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      dispose();
    }
  };
}
function instance$l($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { collapsable } = $$props;
  let isOpen = !collapsable.isCollapsed();
  function onNewCollapsable(collapsable2) {
    $$invalidate(0, isOpen = !collapsable2.isCollapsed());
  }
  function onOpenChanged(collapsed) {
    if (collapsed) {
      collapsable.collapse();
    } else {
      collapsable.expand();
    }
    $$invalidate(0, isOpen = !collapsable.isCollapsed());
  }
  function submit_handler(event) {
    bubble.call(this, $$self, event);
  }
  const action_handler = () => $$invalidate(0, isOpen = true);
  const action_handler_1 = () => $$invalidate(0, isOpen = false);
  $$self.$$set = ($$props2) => {
    if ("collapsable" in $$props2) $$invalidate(1, collapsable = $$props2.collapsable);
    if ("$$scope" in $$props2) $$invalidate(6, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*collapsable*/
    2) {
      onNewCollapsable(collapsable);
    }
    if ($$self.$$.dirty & /*isOpen*/
    1) {
      onOpenChanged(!isOpen);
    }
  };
  return [
    isOpen,
    collapsable,
    slots,
    submit_handler,
    action_handler,
    action_handler_1,
    $$scope
  ];
}
class TimelineSettings extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$l, create_fragment$o, safe_not_equal, { collapsable: 1 });
  }
}
function create_fragment$n(ctx) {
  let input;
  let input_aria_label_value;
  let mounted;
  let dispose;
  let input_levels = [
    { type: "color" },
    {
      "aria-label": input_aria_label_value = "Click to change color\nDrag to reorder groups"
    },
    /*$$restProps*/
    ctx[2]
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      input = element("input");
      set_attributes(input, input_data);
      toggle_class(input, "svelte-1q65o6o", true);
    },
    m(target, anchor) {
      insert(target, input, anchor);
      if (input.autofocus) input.focus();
      set_input_value(
        input,
        /*color*/
        ctx[1]
      );
      if (!mounted) {
        dispose = [
          listen(
            input,
            "input",
            /*input_input_handler*/
            ctx[5]
          ),
          listen(input, "mousedown", function() {
            if (is_function(
              /*onmousedown*/
              ctx[0]
            )) ctx[0].apply(this, arguments);
          })
        ];
        mounted = true;
      }
    },
    p(new_ctx, [dirty]) {
      ctx = new_ctx;
      set_attributes(input, input_data = get_spread_update(input_levels, [
        { type: "color" },
        { "aria-label": input_aria_label_value },
        dirty & /*$$restProps*/
        4 && /*$$restProps*/
        ctx[2]
      ]));
      if (dirty & /*color*/
      2) {
        set_input_value(
          input,
          /*color*/
          ctx[1]
        );
      }
      toggle_class(input, "svelte-1q65o6o", true);
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$k($$self, $$props, $$invalidate) {
  const omit_props_names = ["colorable", "onchanged", "onmousedown"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { colorable } = $$props;
  let { onchanged = void 0 } = $$props;
  let { onmousedown = void 0 } = $$props;
  let color = colorable.color();
  function onNewColorable(colorable2) {
    $$invalidate(1, color = colorable2.color());
  }
  function onColorInput(color2) {
    if (color2 !== colorable.color()) {
      colorable.recolor(color2);
      color2 = colorable.color();
      if (onchanged != null) onchanged(color2);
    }
  }
  function input_input_handler() {
    color = this.value;
    $$invalidate(1, color);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(2, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("colorable" in $$new_props) $$invalidate(3, colorable = $$new_props.colorable);
    if ("onchanged" in $$new_props) $$invalidate(4, onchanged = $$new_props.onchanged);
    if ("onmousedown" in $$new_props) $$invalidate(0, onmousedown = $$new_props.onmousedown);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*colorable*/
    8) {
      onNewColorable(colorable);
    }
    if ($$self.$$.dirty & /*color*/
    2) {
      onColorInput(color);
    }
  };
  return [onmousedown, color, $$restProps, colorable, onchanged, input_input_handler];
}
class GroupColorInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$k, create_fragment$n, safe_not_equal, {
      colorable: 3,
      onchanged: 4,
      onmousedown: 0
    });
  }
}
function create_fragment$m(ctx) {
  let input;
  let mounted;
  let dispose;
  return {
    c() {
      input = element("input");
      attr(input, "type", "text");
      attr(input, "spellcheck", "false");
      attr(input, "placeholder", "Enter query...");
    },
    m(target, anchor) {
      insert(target, input, anchor);
      set_input_value(
        input,
        /*query*/
        ctx[0]
      );
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[3]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*query*/
      1 && input.value !== /*query*/
      ctx2[0]) {
        set_input_value(
          input,
          /*query*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(input);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$j($$self, $$props, $$invalidate) {
  let { queriable } = $$props;
  let { onchanged = void 0 } = $$props;
  let query = queriable.query();
  function onNewQueriable(queriable2) {
    $$invalidate(0, query = queriable2.query());
  }
  function onQueryInput(query2) {
    if (query2 !== queriable.query()) {
      queriable.filterByQuery(query2);
      query2 = queriable.query();
      if (onchanged != null) {
        onchanged(query2);
      }
    }
  }
  function input_input_handler() {
    query = this.value;
    $$invalidate(0, query);
  }
  $$self.$$set = ($$props2) => {
    if ("queriable" in $$props2) $$invalidate(1, queriable = $$props2.queriable);
    if ("onchanged" in $$props2) $$invalidate(2, onchanged = $$props2.onchanged);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*queriable*/
    2) {
      onNewQueriable(queriable);
    }
    if ($$self.$$.dirty & /*query*/
    1) {
      onQueryInput(query);
    }
  };
  return [query, queriable, onchanged, input_input_handler];
}
class GroupQueryInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$j, create_fragment$m, safe_not_equal, { queriable: 1, onchanged: 2 });
  }
}
function create_default_slot$8(ctx) {
  let svg;
  let line0;
  let line1;
  return {
    c() {
      svg = svg_element("svg");
      line0 = svg_element("line");
      line1 = svg_element("line");
      attr(line0, "x1", "18");
      attr(line0, "y1", "6");
      attr(line0, "x2", "6");
      attr(line0, "y2", "18");
      attr(line1, "x1", "6");
      attr(line1, "y1", "6");
      attr(line1, "x2", "18");
      attr(line1, "y2", "18");
      attr(svg, "xmlns", "http://www.w3.org/2000/svg");
      attr(svg, "width", "24");
      attr(svg, "height", "24");
      attr(svg, "viewBox", "0 0 24 24");
      attr(svg, "fill", "none");
      attr(svg, "stroke", "currentColor");
      attr(svg, "stroke-width", "2");
      attr(svg, "stroke-linecap", "round");
      attr(svg, "stroke-linejoin", "round");
      attr(svg, "class", "svg-icon lucide-x");
    },
    m(target, anchor) {
      insert(target, svg, anchor);
      append(svg, line0);
      append(svg, line1);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(svg);
      }
    }
  };
}
function create_fragment$l(ctx) {
  let li;
  let groupqueryinput;
  let t0;
  let groupcolorinput;
  let t1;
  let actionbutton;
  let li_class_value;
  let current;
  groupqueryinput = new GroupQueryInput({
    props: {
      queriable: (
        /*group*/
        ctx[0]
      ),
      onchanged: (
        /*onRequeried*/
        ctx[4] ? (
          /*func*/
          ctx[9]
        ) : void 0
      )
    }
  });
  groupcolorinput = new GroupColorInput({
    props: {
      colorable: (
        /*group*/
        ctx[0]
      ),
      onchanged: (
        /*onRecolored*/
        ctx[3] ? (
          /*func_1*/
          ctx[10]
        ) : void 0
      ),
      onmousedown: (
        /*onPressDragHandle*/
        ctx[6] ? (
          /*onDragHandeMouseDown*/
          ctx[8]
        ) : void 0
      )
    }
  });
  actionbutton = new ActionButton({
    props: {
      class: "clickable-icon",
      "aria-label": "Delete group",
      $$slots: { default: [create_default_slot$8] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on("action", function() {
    if (is_function(
      /*onRemove*/
      ctx[5]
    )) ctx[5].apply(this, arguments);
  });
  return {
    c() {
      var _a;
      li = element("li");
      create_component(groupqueryinput.$$.fragment);
      t0 = space();
      create_component(groupcolorinput.$$.fragment);
      t1 = space();
      create_component(actionbutton.$$.fragment);
      attr(li, "class", li_class_value = "timeline-view-color-group " + /*className*/
      ((_a = ctx[1]) != null ? _a : "") + " svelte-1lhylhn");
      attr(
        li,
        "style",
        /*style*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, li, anchor);
      mount_component(groupqueryinput, li, null);
      append(li, t0);
      mount_component(groupcolorinput, li, null);
      append(li, t1);
      mount_component(actionbutton, li, null);
      ctx[11](li);
      current = true;
    },
    p(new_ctx, [dirty]) {
      var _a;
      ctx = new_ctx;
      const groupqueryinput_changes = {};
      if (dirty & /*group*/
      1) groupqueryinput_changes.queriable = /*group*/
      ctx[0];
      if (dirty & /*onRequeried, group*/
      17) groupqueryinput_changes.onchanged = /*onRequeried*/
      ctx[4] ? (
        /*func*/
        ctx[9]
      ) : void 0;
      groupqueryinput.$set(groupqueryinput_changes);
      const groupcolorinput_changes = {};
      if (dirty & /*group*/
      1) groupcolorinput_changes.colorable = /*group*/
      ctx[0];
      if (dirty & /*onRecolored, group*/
      9) groupcolorinput_changes.onchanged = /*onRecolored*/
      ctx[3] ? (
        /*func_1*/
        ctx[10]
      ) : void 0;
      if (dirty & /*onPressDragHandle*/
      64) groupcolorinput_changes.onmousedown = /*onPressDragHandle*/
      ctx[6] ? (
        /*onDragHandeMouseDown*/
        ctx[8]
      ) : void 0;
      groupcolorinput.$set(groupcolorinput_changes);
      const actionbutton_changes = {};
      if (dirty & /*$$scope*/
      4096) {
        actionbutton_changes.$$scope = { dirty, ctx };
      }
      actionbutton.$set(actionbutton_changes);
      if (!current || dirty & /*className*/
      2 && li_class_value !== (li_class_value = "timeline-view-color-group " + /*className*/
      ((_a = ctx[1]) != null ? _a : "") + " svelte-1lhylhn")) {
        attr(li, "class", li_class_value);
      }
      if (!current || dirty & /*style*/
      4) {
        attr(
          li,
          "style",
          /*style*/
          ctx[2]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(groupqueryinput.$$.fragment, local);
      transition_in(groupcolorinput.$$.fragment, local);
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(groupqueryinput.$$.fragment, local);
      transition_out(groupcolorinput.$$.fragment, local);
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(li);
      }
      destroy_component(groupqueryinput);
      destroy_component(groupcolorinput);
      destroy_component(actionbutton);
      ctx[11](null);
    }
  };
}
function instance$i($$self, $$props, $$invalidate) {
  let { group: group2 } = $$props;
  let { class: className = void 0 } = $$props;
  let { style = void 0 } = $$props;
  let { onRecolored = void 0 } = $$props;
  let { onRequeried = void 0 } = $$props;
  let { onRemove = void 0 } = $$props;
  let { onPressDragHandle = void 0 } = $$props;
  let element2 = null;
  function onDragHandeMouseDown(event) {
    if (onPressDragHandle && element2) {
      const currentTarget = element2;
      onPressDragHandle({
        get currentTarget() {
          return currentTarget;
        },
        offsetX: event.offsetX + event.currentTarget.offsetLeft,
        offsetY: event.offsetY + event.currentTarget.offsetTop,
        clientX: event.clientX,
        clientY: event.clientY
      });
    }
  }
  const func2 = () => onRequeried(group2);
  const func_1 = () => onRecolored(group2);
  function li_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(7, element2);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("group" in $$props2) $$invalidate(0, group2 = $$props2.group);
    if ("class" in $$props2) $$invalidate(1, className = $$props2.class);
    if ("style" in $$props2) $$invalidate(2, style = $$props2.style);
    if ("onRecolored" in $$props2) $$invalidate(3, onRecolored = $$props2.onRecolored);
    if ("onRequeried" in $$props2) $$invalidate(4, onRequeried = $$props2.onRequeried);
    if ("onRemove" in $$props2) $$invalidate(5, onRemove = $$props2.onRemove);
    if ("onPressDragHandle" in $$props2) $$invalidate(6, onPressDragHandle = $$props2.onPressDragHandle);
  };
  return [
    group2,
    className,
    style,
    onRecolored,
    onRequeried,
    onRemove,
    onPressDragHandle,
    element2,
    onDragHandeMouseDown,
    func2,
    func_1,
    li_binding
  ];
}
class GroupListItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$i, create_fragment$l, safe_not_equal, {
      group: 0,
      class: 1,
      style: 2,
      onRecolored: 3,
      onRequeried: 4,
      onRemove: 5,
      onPressDragHandle: 6
    });
  }
}
function create_default_slot$7(ctx) {
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[1].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[3],
    null
  );
  return {
    c() {
      if (default_slot) default_slot.c();
    },
    m(target, anchor) {
      if (default_slot) {
        default_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        8)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[3],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[3]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[3],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (default_slot) default_slot.d(detaching);
    }
  };
}
function create_fragment$k(ctx) {
  let actionbutton;
  let current;
  const actionbutton_spread_levels = [
    { class: "mod-cta" },
    /*$$restProps*/
    ctx[0]
  ];
  let actionbutton_props = {
    $$slots: { default: [create_default_slot$7] },
    $$scope: { ctx }
  };
  for (let i = 0; i < actionbutton_spread_levels.length; i += 1) {
    actionbutton_props = assign(actionbutton_props, actionbutton_spread_levels[i]);
  }
  actionbutton = new ActionButton({ props: actionbutton_props });
  actionbutton.$on(
    "action",
    /*action_handler*/
    ctx[2]
  );
  return {
    c() {
      create_component(actionbutton.$$.fragment);
    },
    m(target, anchor) {
      mount_component(actionbutton, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const actionbutton_changes = dirty & /*$$restProps*/
      1 ? get_spread_update(actionbutton_spread_levels, [actionbutton_spread_levels[0], get_spread_object(
        /*$$restProps*/
        ctx2[0]
      )]) : {};
      if (dirty & /*$$scope*/
      8) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(actionbutton, detaching);
    }
  };
}
function instance$h($$self, $$props, $$invalidate) {
  const omit_props_names = [];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  function action_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(0, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("$$scope" in $$new_props) $$invalidate(3, $$scope = $$new_props.$$scope);
  };
  return [$$restProps, slots, action_handler, $$scope];
}
class CTAButton extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$h, create_fragment$k, safe_not_equal, {});
  }
}
function get_each_context_1$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  child_ctx[22] = i;
  return child_ctx;
}
function get_each_context$2(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[20] = list[i];
  child_ctx[22] = i;
  return child_ctx;
}
function get_else_ctx(ctx) {
  const child_ctx = ctx.slice();
  const constants_0 = (
    /*drag*/
    child_ctx[4].index
  );
  child_ctx[23] = constants_0;
  return child_ctx;
}
function create_else_block(ctx) {
  let t;
  let dialog;
  let grouplistitem;
  let current;
  function func_4(...args) {
    return (
      /*func_4*/
      ctx[16](
        /*dragIndex*/
        ctx[23],
        ...args
      )
    );
  }
  let each_value_1 = ensure_array_like(
    /*groups*/
    ctx[0].groups().filter(func_4)
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$2(get_each_context_1$2(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  grouplistitem = new GroupListItem({
    props: {
      group: (
        /*groups*/
        ctx[0].groups()[
          /*dragIndex*/
          ctx[23]
        ]
      ),
      style: "width:" + /*drag*/
      ctx[4].imgPos.width + "px;height:" + /*drag*/
      ctx[4].imgPos.height + "px;pointer-events:none;"
    }
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      dialog = element("dialog");
      create_component(grouplistitem.$$.fragment);
      dialog.open = true;
      set_style(
        dialog,
        "top",
        /*drag*/
        ctx[4].imgPos.top + "px"
      );
      set_style(
        dialog,
        "left",
        /*drag*/
        ctx[4].imgPos.left + "px"
      );
      attr(dialog, "class", "svelte-w4tgxd");
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, t, anchor);
      insert(target, dialog, anchor);
      mount_component(grouplistitem, dialog, null);
      ctx[17](dialog);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      if (dirty & /*groups, drag*/
      17) {
        each_value_1 = ensure_array_like(
          /*groups*/
          ctx[0].groups().filter(func_4)
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$2(ctx, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(t.parentNode, t);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      const grouplistitem_changes = {};
      if (dirty & /*groups, drag*/
      17) grouplistitem_changes.group = /*groups*/
      ctx[0].groups()[
        /*dragIndex*/
        ctx[23]
      ];
      if (dirty & /*drag*/
      16) grouplistitem_changes.style = "width:" + /*drag*/
      ctx[4].imgPos.width + "px;height:" + /*drag*/
      ctx[4].imgPos.height + "px;pointer-events:none;";
      grouplistitem.$set(grouplistitem_changes);
      if (!current || dirty & /*drag*/
      16) {
        set_style(
          dialog,
          "top",
          /*drag*/
          ctx[4].imgPos.top + "px"
        );
      }
      if (!current || dirty & /*drag*/
      16) {
        set_style(
          dialog,
          "left",
          /*drag*/
          ctx[4].imgPos.left + "px"
        );
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(grouplistitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(grouplistitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
        detach(dialog);
      }
      destroy_each(each_blocks, detaching);
      destroy_component(grouplistitem);
      ctx[17](null);
    }
  };
}
function create_if_block$5(ctx) {
  let each_1_anchor;
  let current;
  let each_value = ensure_array_like(
    /*groups*/
    ctx[0].groups()
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      each_1_anchor = empty();
    },
    m(target, anchor) {
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(target, anchor);
        }
      }
      insert(target, each_1_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty & /*groups, onGroupColored, onGroupQueried, removeGroup, primeDrag*/
      327) {
        each_value = ensure_array_like(
          /*groups*/
          ctx2[0].groups()
        );
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$2(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block$2(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(each_1_anchor.parentNode, each_1_anchor);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(each_1_anchor);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_each_block_1$2(ctx) {
  let grouplistitem;
  let current;
  grouplistitem = new GroupListItem({
    props: {
      group: (
        /*group*/
        ctx[20]
      ),
      class: (
        /*drag*/
        ctx[4].overIndex >= 0 && /*index*/
        ctx[22] >= /*drag*/
        ctx[4].overIndex ? "displaced" : ""
      )
    }
  });
  return {
    c() {
      create_component(grouplistitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(grouplistitem, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const grouplistitem_changes = {};
      if (dirty & /*groups, drag*/
      17) grouplistitem_changes.group = /*group*/
      ctx2[20];
      if (dirty & /*drag*/
      16) grouplistitem_changes.class = /*drag*/
      ctx2[4].overIndex >= 0 && /*index*/
      ctx2[22] >= /*drag*/
      ctx2[4].overIndex ? "displaced" : "";
      grouplistitem.$set(grouplistitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(grouplistitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(grouplistitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(grouplistitem, detaching);
    }
  };
}
function create_each_block$2(ctx) {
  let grouplistitem;
  let current;
  function func2(...args) {
    return (
      /*func*/
      ctx[12](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  function func_1(...args) {
    return (
      /*func_1*/
      ctx[13](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  function func_2() {
    return (
      /*func_2*/
      ctx[14](
        /*index*/
        ctx[22]
      )
    );
  }
  function func_3(...args) {
    return (
      /*func_3*/
      ctx[15](
        /*index*/
        ctx[22],
        ...args
      )
    );
  }
  grouplistitem = new GroupListItem({
    props: {
      group: (
        /*group*/
        ctx[20]
      ),
      onRecolored: func2,
      onRequeried: func_1,
      onRemove: func_2,
      onPressDragHandle: func_3
    }
  });
  return {
    c() {
      create_component(grouplistitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(grouplistitem, target, anchor);
      current = true;
    },
    p(new_ctx, dirty) {
      ctx = new_ctx;
      const grouplistitem_changes = {};
      if (dirty & /*groups*/
      1) grouplistitem_changes.group = /*group*/
      ctx[20];
      if (dirty & /*onGroupColored*/
      2) grouplistitem_changes.onRecolored = func2;
      if (dirty & /*onGroupQueried*/
      4) grouplistitem_changes.onRequeried = func_1;
      grouplistitem.$set(grouplistitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(grouplistitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(grouplistitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(grouplistitem, detaching);
    }
  };
}
function create_default_slot$6(ctx) {
  let t;
  return {
    c() {
      t = text("New group");
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_fragment$j(ctx) {
  let ol;
  let current_block_type_index;
  let if_block;
  let t;
  let div;
  let ctabutton;
  let current;
  const if_block_creators = [create_if_block$5, create_else_block];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*drag*/
      ctx2[4] == null
    ) return 0;
    return 1;
  }
  function select_block_ctx(ctx2, index) {
    if (index === 1) return get_else_ctx(ctx2);
    return ctx2;
  }
  current_block_type_index = select_block_type(ctx);
  if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](select_block_ctx(ctx, current_block_type_index));
  ctabutton = new CTAButton({
    props: {
      $$slots: { default: [create_default_slot$6] },
      $$scope: { ctx }
    }
  });
  ctabutton.$on(
    "action",
    /*addGroup*/
    ctx[7]
  );
  return {
    c() {
      var _a, _b;
      ol = element("ol");
      if_block.c();
      t = space();
      div = element("div");
      create_component(ctabutton.$$.fragment);
      attr(ol, "class", "group-list svelte-w4tgxd");
      attr(ol, "role", "list");
      toggle_class(
        ol,
        "dragging",
        /*drag*/
        ctx[4] != null
      );
      set_style(ol, "--form-height", `${/*drag*/
      (_b = (_a = ctx[4]) == null ? void 0 : _a.offsetHeight) != null ? _b : 0}px`);
      attr(div, "class", "graph-color-button-container svelte-w4tgxd");
    },
    m(target, anchor) {
      insert(target, ol, anchor);
      if_blocks[current_block_type_index].m(ol, null);
      ctx[18](ol);
      insert(target, t, anchor);
      insert(target, div, anchor);
      mount_component(ctabutton, div, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      var _a, _b;
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index === previous_block_index) {
        if_blocks[current_block_type_index].p(select_block_ctx(ctx2, current_block_type_index), dirty);
      } else {
        group_outros();
        transition_out(if_blocks[previous_block_index], 1, 1, () => {
          if_blocks[previous_block_index] = null;
        });
        check_outros();
        if_block = if_blocks[current_block_type_index];
        if (!if_block) {
          if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](select_block_ctx(ctx2, current_block_type_index));
          if_block.c();
        } else {
          if_block.p(select_block_ctx(ctx2, current_block_type_index), dirty);
        }
        transition_in(if_block, 1);
        if_block.m(ol, null);
      }
      if (!current || dirty & /*drag*/
      16) {
        toggle_class(
          ol,
          "dragging",
          /*drag*/
          ctx2[4] != null
        );
      }
      if (dirty & /*drag*/
      16) {
        set_style(ol, "--form-height", `${/*drag*/
        (_b = (_a = ctx2[4]) == null ? void 0 : _a.offsetHeight) != null ? _b : 0}px`);
      }
      const ctabutton_changes = {};
      if (dirty & /*$$scope*/
      33554432) {
        ctabutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      ctabutton.$set(ctabutton_changes);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(ctabutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(ctabutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(ol);
        detach(t);
        detach(div);
      }
      if_blocks[current_block_type_index].d();
      ctx[18](null);
      destroy_component(ctabutton);
    }
  };
}
function instance$g($$self, $$props, $$invalidate) {
  let { groups } = $$props;
  let { onGroupAppended = void 0 } = $$props;
  let { onGroupsReordered = void 0 } = $$props;
  let { onGroupRemoved = void 0 } = $$props;
  let { onGroupColored = void 0 } = $$props;
  let { onGroupQueried = void 0 } = $$props;
  let drag = null;
  let groupListElement;
  function primeDrag(index, start) {
    const dragIndex = index;
    const groupHeight = start.currentTarget.offsetHeight;
    const groupWidth = start.currentTarget.offsetWidth;
    const offsetHeight = groupListElement.clientHeight / groups.groups().length;
    function mousemove(event) {
      $$invalidate(4, drag = {
        index: dragIndex,
        offsetHeight,
        overIndex: Math.max(0, Math.floor((event.clientY - groupListElement.getBoundingClientRect().top) / offsetHeight)),
        imgPos: {
          top: event.clientY - start.offsetY,
          left: event.clientX - start.offsetX,
          height: groupHeight,
          width: groupWidth
        }
      });
    }
    function endDrag() {
      window.removeEventListener("mousemove", mousemove);
      window.removeEventListener("mouseup", endDrag);
      if (drag != null) {
        moveGroup(dragIndex, Math.min(groups.groups().length - 1, drag.overIndex));
      }
      $$invalidate(4, drag = null);
    }
    window.addEventListener("mousemove", mousemove);
    window.addEventListener("mouseup", endDrag);
  }
  let dragDialog;
  function addGroup() {
    const group2 = groups.appendNewGroup();
    onGroupAppended == null ? void 0 : onGroupAppended(group2, groups);
    $$invalidate(0, groups);
  }
  function moveGroup(from, to) {
    const group2 = groups.moveGroup(from, to);
    if (group2 == null) {
      return;
    }
    onGroupsReordered == null ? void 0 : onGroupsReordered(from, to, group2, groups);
    $$invalidate(0, groups);
  }
  function removeGroup(index) {
    const group2 = groups.removeGroup(index);
    console.log("removed group");
    console.log("groups:", groups.groups().map((it) => ({ query: it.query(), color: it.color() })));
    onGroupRemoved == null ? void 0 : onGroupRemoved(index, group2, groups);
    $$invalidate(0, groups);
  }
  const func2 = (index, group2) => onGroupColored == null ? void 0 : onGroupColored(index, group2);
  const func_1 = (index, group2) => onGroupQueried == null ? void 0 : onGroupQueried(index, group2);
  const func_2 = (index) => removeGroup(index);
  const func_3 = (index, event) => primeDrag(index, event);
  const func_4 = (dragIndex, _, index) => index !== dragIndex;
  function dialog_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dragDialog = $$value;
      $$invalidate(3, dragDialog);
    });
  }
  function ol_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      groupListElement = $$value;
      $$invalidate(5, groupListElement);
    });
  }
  $$self.$$set = ($$props2) => {
    if ("groups" in $$props2) $$invalidate(0, groups = $$props2.groups);
    if ("onGroupAppended" in $$props2) $$invalidate(9, onGroupAppended = $$props2.onGroupAppended);
    if ("onGroupsReordered" in $$props2) $$invalidate(10, onGroupsReordered = $$props2.onGroupsReordered);
    if ("onGroupRemoved" in $$props2) $$invalidate(11, onGroupRemoved = $$props2.onGroupRemoved);
    if ("onGroupColored" in $$props2) $$invalidate(1, onGroupColored = $$props2.onGroupColored);
    if ("onGroupQueried" in $$props2) $$invalidate(2, onGroupQueried = $$props2.onGroupQueried);
  };
  $$self.$$.update = () => {
    var _a, _b;
    if ($$self.$$.dirty & /*dragDialog*/
    8) {
      if (dragDialog != null) {
        if (dragDialog.parentElement != dragDialog.ownerDocument.body) {
          (_b = (_a = dragDialog.ownerDocument) == null ? void 0 : _a.body) == null ? void 0 : _b.appendChild(dragDialog);
        }
      }
    }
  };
  return [
    groups,
    onGroupColored,
    onGroupQueried,
    dragDialog,
    drag,
    groupListElement,
    primeDrag,
    addGroup,
    removeGroup,
    onGroupAppended,
    onGroupsReordered,
    onGroupRemoved,
    func2,
    func_1,
    func_2,
    func_3,
    func_4,
    dialog_binding,
    ol_binding
  ];
}
class TimelineGroupsList extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$g, create_fragment$j, safe_not_equal, {
      groups: 0,
      onGroupAppended: 9,
      onGroupsReordered: 10,
      onGroupRemoved: 11,
      onGroupColored: 1,
      onGroupQueried: 2
    });
  }
}
class SortedArray {
  constructor(selector, ...items) {
    __publicField(this, "_items", []);
    items.sort((a, b) => selector(a) - selector(b));
    this._items = items;
  }
  get items() {
    return this._items;
  }
  get length() {
    return this._items.length;
  }
  [Symbol.iterator]() {
    return this._items[Symbol.iterator]();
  }
}
class MutableSortedArray extends SortedArray {
  constructor(selector, ...items) {
    super(selector, ...items);
    __privateAdd(this, _selector);
    __privateSet(this, _selector, selector);
  }
  add(item) {
    if (this.items.length === 0) {
      this._items.push(item);
      return;
    }
    const itemValue = __privateGet(this, _selector).call(this, item);
    if (this._items.length === 1) {
      if (__privateGet(this, _selector).call(this, this._items[0]) > itemValue) {
        this._items.unshift(item);
      } else {
        this._items.push(item);
      }
      return;
    }
    const findInsertionIndex = (low, high) => {
      if (high <= low) {
        return low;
      }
      const mid = low + high >> 1;
      const midItemValue = __privateGet(this, _selector).call(this, this._items[mid]);
      if (midItemValue === itemValue) {
        return mid;
      }
      if (midItemValue > itemValue) {
        return findInsertionIndex(low, mid);
      }
      return findInsertionIndex(mid + 1, high);
    };
    const insertionIndex = findInsertionIndex(0, this._items.length);
    this._items.splice(insertionIndex, 0, item);
  }
  remove(item) {
    if (this.items.length === 0) {
      return;
    }
    const itemValue = __privateGet(this, _selector).call(this, item);
    const findRemoveIndex = (low, high) => {
      if (high < low) {
        return -1;
      }
      const mid = low + high >> 1;
      if (mid < 0 || mid >= this._items.length) {
        return -1;
      }
      const midItemValue = __privateGet(this, _selector).call(this, this._items[mid]);
      if (midItemValue === itemValue) {
        let checkStart = mid;
        do {
          if (this._items[checkStart] === item) {
            return checkStart;
          }
          checkStart = checkStart - 1;
        } while (checkStart >= 0 && __privateGet(this, _selector).call(this, this._items[checkStart]) === itemValue);
        let checkEnd = mid + 1;
        while (checkEnd < this._items.length && __privateGet(this, _selector).call(this, this._items[checkEnd]) === itemValue) {
          if (this._items[checkEnd] === item) {
            return checkEnd;
          }
          checkEnd++;
        }
        return -1;
      }
      if (midItemValue > itemValue) {
        return findRemoveIndex(low, mid - 1);
      } else {
        return findRemoveIndex(mid + 1, high);
      }
    };
    const removeIndex = findRemoveIndex(0, this._items.length);
    if (removeIndex >= 0) {
      this._items.splice(removeIndex, 1);
    }
  }
}
_selector = new WeakMap();
function create_default_slot$5(ctx) {
  let lucideicon;
  let t0;
  let t1;
  let current;
  lucideicon = new LucideIcon({ props: { id: "right-triangle" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
      t0 = space();
      t1 = text(
        /*name*/
        ctx[1]
      );
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      insert(target, t0, anchor);
      insert(target, t1, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (!current || dirty & /*name*/
      2) set_data(
        t1,
        /*name*/
        ctx2[1]
      );
    },
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t0);
        detach(t1);
      }
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_if_block$4(ctx) {
  let div;
  let div_transition;
  let current;
  const default_slot_template = (
    /*#slots*/
    ctx[5].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[6],
    null
  );
  return {
    c() {
      div = element("div");
      if (default_slot) default_slot.c();
      attr(div, "class", "content");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      if (default_slot) {
        default_slot.m(div, null);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        64)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[6],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[6]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[6],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(default_slot, local);
      if (local) {
        add_render_callback(() => {
          if (!current) return;
          if (!div_transition) div_transition = create_bidirectional_transition(
            div,
            slide,
            {
              delay: 0,
              duration: 200,
              easing: quintOut,
              axis: "y"
            },
            true
          );
          div_transition.run(1);
        });
      }
      current = true;
    },
    o(local) {
      transition_out(default_slot, local);
      if (local) {
        if (!div_transition) div_transition = create_bidirectional_transition(
          div,
          slide,
          {
            delay: 0,
            duration: 200,
            easing: quintOut,
            axis: "y"
          },
          false
        );
        div_transition.run(0);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      if (default_slot) default_slot.d(detaching);
      if (detaching && div_transition) div_transition.end();
    }
  };
}
function create_fragment$i(ctx) {
  let section;
  let actionbutton;
  let t;
  let section_class_value;
  let current;
  actionbutton = new ActionButton({
    props: {
      tabindex: (
        /*tabindex*/
        ctx[3]
      ),
      class: "header clickable-icon collapse-icon " + /*collapsed*/
      (ctx[0] ? "is-collapsed" : ""),
      $$slots: { default: [create_default_slot$5] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*toggleCollapse*/
    ctx[4]
  );
  let if_block = !/*collapsed*/
  ctx[0] && create_if_block$4(ctx);
  return {
    c() {
      section = element("section");
      create_component(actionbutton.$$.fragment);
      t = space();
      if (if_block) if_block.c();
      attr(section, "class", section_class_value = "collapsable" + /*collapsed*/
      (ctx[0] ? " collapsed" : "") + " " + /*className*/
      ctx[2] + " svelte-1dp90dm");
    },
    m(target, anchor) {
      insert(target, section, anchor);
      mount_component(actionbutton, section, null);
      append(section, t);
      if (if_block) if_block.m(section, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      const actionbutton_changes = {};
      if (dirty & /*tabindex*/
      8) actionbutton_changes.tabindex = /*tabindex*/
      ctx2[3];
      if (dirty & /*collapsed*/
      1) actionbutton_changes.class = "header clickable-icon collapse-icon " + /*collapsed*/
      (ctx2[0] ? "is-collapsed" : "");
      if (dirty & /*$$scope, name*/
      66) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
      if (!/*collapsed*/
      ctx2[0]) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*collapsed*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$4(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(section, null);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      if (!current || dirty & /*collapsed, className*/
      5 && section_class_value !== (section_class_value = "collapsable" + /*collapsed*/
      (ctx2[0] ? " collapsed" : "") + " " + /*className*/
      ctx2[2] + " svelte-1dp90dm")) {
        attr(section, "class", section_class_value);
      }
    },
    i(local) {
      if (current) return;
      transition_in(actionbutton.$$.fragment, local);
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(actionbutton.$$.fragment, local);
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(section);
      }
      destroy_component(actionbutton);
      if (if_block) if_block.d();
    }
  };
}
function instance$f($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { name } = $$props;
  let { class: className = "" } = $$props;
  let { tabindex = 0 } = $$props;
  let { collapsed = true } = $$props;
  function toggleCollapse() {
    $$invalidate(0, collapsed = !collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2) $$invalidate(1, name = $$props2.name);
    if ("class" in $$props2) $$invalidate(2, className = $$props2.class);
    if ("tabindex" in $$props2) $$invalidate(3, tabindex = $$props2.tabindex);
    if ("collapsed" in $$props2) $$invalidate(0, collapsed = $$props2.collapsed);
    if ("$$scope" in $$props2) $$invalidate(6, $$scope = $$props2.$$scope);
  };
  return [collapsed, name, className, tabindex, toggleCollapse, slots, $$scope];
}
class CollapsableSection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$f, create_fragment$i, safe_not_equal, {
      name: 1,
      class: 2,
      tabindex: 3,
      collapsed: 0
    });
  }
}
function create_if_block$3(ctx) {
  let span;
  let lucideicon;
  let t0;
  let t1_value = (
    /*pendingGroupUpdates*/
    ctx[0].toLocaleString() + ""
  );
  let t1;
  let t2;
  let current;
  lucideicon = new LucideIcon({ props: { id: "loader-2" } });
  return {
    c() {
      span = element("span");
      create_component(lucideicon.$$.fragment);
      t0 = space();
      t1 = text(t1_value);
      t2 = text(" pending");
      attr(span, "class", "group-update-progress svelte-q72r02");
      attr(span, "role", "progressbar");
      attr(
        span,
        "aria-valuenow",
        /*pendingGroupUpdates*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, span, anchor);
      mount_component(lucideicon, span, null);
      append(span, t0);
      append(span, t1);
      append(span, t2);
      current = true;
    },
    p(ctx2, dirty) {
      if ((!current || dirty & /*pendingGroupUpdates*/
      1) && t1_value !== (t1_value = /*pendingGroupUpdates*/
      ctx2[0].toLocaleString() + "")) set_data(t1, t1_value);
      if (!current || dirty & /*pendingGroupUpdates*/
      1) {
        attr(
          span,
          "aria-valuenow",
          /*pendingGroupUpdates*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(span);
      }
      destroy_component(lucideicon);
    }
  };
}
function create_default_slot$4(ctx) {
  let t;
  let timelinegroupslist;
  let current;
  let if_block = (
    /*pendingGroupUpdates*/
    ctx[0] > 0 && create_if_block$3(ctx)
  );
  timelinegroupslist = new TimelineGroupsList({
    props: {
      groups: (
        /*groups*/
        ctx[1]
      ),
      onGroupAppended: (
        /*onGroupAppended*/
        ctx[2]
      ),
      onGroupsReordered: (
        /*onGroupsReordered*/
        ctx[3]
      ),
      onGroupRemoved: (
        /*onGroupRemoved*/
        ctx[4]
      ),
      onGroupColored: (
        /*onGroupColored*/
        ctx[5]
      ),
      onGroupQueried: (
        /*onGroupQueried*/
        ctx[6]
      )
    }
  });
  return {
    c() {
      if (if_block) if_block.c();
      t = space();
      create_component(timelinegroupslist.$$.fragment);
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(timelinegroupslist, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*pendingGroupUpdates*/
        ctx2[0] > 0
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty & /*pendingGroupUpdates*/
          1) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$3(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
      const timelinegroupslist_changes = {};
      if (dirty & /*groups*/
      2) timelinegroupslist_changes.groups = /*groups*/
      ctx2[1];
      if (dirty & /*onGroupAppended*/
      4) timelinegroupslist_changes.onGroupAppended = /*onGroupAppended*/
      ctx2[2];
      if (dirty & /*onGroupsReordered*/
      8) timelinegroupslist_changes.onGroupsReordered = /*onGroupsReordered*/
      ctx2[3];
      if (dirty & /*onGroupRemoved*/
      16) timelinegroupslist_changes.onGroupRemoved = /*onGroupRemoved*/
      ctx2[4];
      if (dirty & /*onGroupColored*/
      32) timelinegroupslist_changes.onGroupColored = /*onGroupColored*/
      ctx2[5];
      if (dirty & /*onGroupQueried*/
      64) timelinegroupslist_changes.onGroupQueried = /*onGroupQueried*/
      ctx2[6];
      timelinegroupslist.$set(timelinegroupslist_changes);
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(timelinegroupslist.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(timelinegroupslist.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (if_block) if_block.d(detaching);
      destroy_component(timelinegroupslist, detaching);
    }
  };
}
function create_fragment$h(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[9](value);
  }
  let collapsablesection_props = {
    name: "Groups",
    class: "timeline-settings-groups-section",
    $$slots: { default: [create_default_slot$4] },
    $$scope: { ctx }
  };
  if (
    /*collapsed*/
    ctx[7] !== void 0
  ) {
    collapsablesection_props.collapsed = /*collapsed*/
    ctx[7];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const collapsablesection_changes = {};
      if (dirty & /*$$scope, groups, onGroupAppended, onGroupsReordered, onGroupRemoved, onGroupColored, onGroupQueried, pendingGroupUpdates*/
      4223) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty & /*collapsed*/
      128) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*collapsed*/
        ctx2[7];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
    },
    i(local) {
      if (current) return;
      transition_in(collapsablesection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(collapsablesection, detaching);
    }
  };
}
function instance$e($$self, $$props, $$invalidate) {
  let { pendingGroupUpdates } = $$props;
  let { collapsable } = $$props;
  let { groups } = $$props;
  let { onGroupAppended = void 0 } = $$props;
  let { onGroupsReordered = void 0 } = $$props;
  let { onGroupRemoved = void 0 } = $$props;
  let { onGroupColored = void 0 } = $$props;
  let { onGroupQueried = void 0 } = $$props;
  let collapsed = collapsable.isCollapsed();
  function onCollapsableChanged(collapsable2) {
    $$invalidate(7, collapsed = collapsable2.isCollapsed());
  }
  function onCollapsedChanged(collapsed2) {
    if (collapsed2) {
      collapsable.collapse();
    } else {
      collapsable.expand();
    }
    collapsed2 = collapsable.isCollapsed();
  }
  function collapsablesection_collapsed_binding(value) {
    collapsed = value;
    $$invalidate(7, collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("pendingGroupUpdates" in $$props2) $$invalidate(0, pendingGroupUpdates = $$props2.pendingGroupUpdates);
    if ("collapsable" in $$props2) $$invalidate(8, collapsable = $$props2.collapsable);
    if ("groups" in $$props2) $$invalidate(1, groups = $$props2.groups);
    if ("onGroupAppended" in $$props2) $$invalidate(2, onGroupAppended = $$props2.onGroupAppended);
    if ("onGroupsReordered" in $$props2) $$invalidate(3, onGroupsReordered = $$props2.onGroupsReordered);
    if ("onGroupRemoved" in $$props2) $$invalidate(4, onGroupRemoved = $$props2.onGroupRemoved);
    if ("onGroupColored" in $$props2) $$invalidate(5, onGroupColored = $$props2.onGroupColored);
    if ("onGroupQueried" in $$props2) $$invalidate(6, onGroupQueried = $$props2.onGroupQueried);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*collapsable*/
    256) {
      onCollapsableChanged(collapsable);
    }
    if ($$self.$$.dirty & /*collapsed*/
    128) {
      onCollapsedChanged(collapsed);
    }
  };
  return [
    pendingGroupUpdates,
    groups,
    onGroupAppended,
    onGroupsReordered,
    onGroupRemoved,
    onGroupColored,
    onGroupQueried,
    collapsed,
    collapsable,
    collapsablesection_collapsed_binding
  ];
}
class TimelineGroupsSettingsSection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$e, create_fragment$h, safe_not_equal, {
      pendingGroupUpdates: 0,
      collapsable: 8,
      groups: 1,
      onGroupAppended: 2,
      onGroupsReordered: 3,
      onGroupRemoved: 4,
      onGroupColored: 5,
      onGroupQueried: 6
    });
  }
}
class ObservableCollapsable {
  constructor(collapsed = true) {
    __privateAdd(this, _collapsed);
    __privateSet(this, _collapsed, collapsed);
  }
  isCollapsed() {
    return __privateGet(this, _collapsed);
  }
  collapse() {
    __privateSet(this, _collapsed, true);
    this.onChange();
  }
  expand() {
    __privateSet(this, _collapsed, false);
    this.onChange();
  }
  onChange() {
  }
}
_collapsed = new WeakMap();
function get_each_context$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i][0];
  child_ctx[2] = list[i][1];
  return child_ctx;
}
function get_each_context_1$1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[5] = list[i];
  return child_ctx;
}
function create_each_block_1$1(ctx) {
  let span;
  return {
    c() {
      span = element("span");
      span.textContent = `${/*binding*/
      ctx[5]}`;
      attr(span, "class", "setting-hotkey");
    },
    m(target, anchor) {
      insert(target, span, anchor);
    },
    p: noop,
    d(detaching) {
      if (detaching) {
        detach(span);
      }
    }
  };
}
function create_each_block$1(ctx) {
  let div2;
  let div0;
  let t2;
  let div1;
  let t3;
  let each_value_1 = ensure_array_like(
    /*bindings*/
    ctx[2]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1$1(get_each_context_1$1(ctx, each_value_1, i));
  }
  return {
    c() {
      div2 = element("div");
      div0 = element("div");
      div0.textContent = `${/*key*/
      ctx[1][0].toLocaleUpperCase()}${/*key*/
      ctx[1].slice(1)}`;
      t2 = space();
      div1 = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t3 = space();
      attr(div0, "class", "instruction-label");
      attr(div1, "class", "instruction-desc svelte-1xilpa8");
      attr(div2, "class", "instruction svelte-1xilpa8");
    },
    m(target, anchor) {
      insert(target, div2, anchor);
      append(div2, div0);
      append(div2, t2);
      append(div2, div1);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div1, null);
        }
      }
      append(div2, t3);
    },
    p(ctx2, dirty) {
      if (dirty & /*Object, allBindings*/
      1) {
        each_value_1 = ensure_array_like(
          /*bindings*/
          ctx2[2]
        );
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1$1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block_1$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div1, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value_1.length;
      }
    },
    d(detaching) {
      if (detaching) {
        detach(div2);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function create_fragment$g(ctx) {
  let div;
  let each_value = ensure_array_like(Object.entries(
    /*allBindings*/
    ctx[0]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
  }
  return {
    c() {
      div = element("div");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(div, "class", "timeline-help svelte-1xilpa8");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(div, null);
        }
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*Object, allBindings*/
      1) {
        each_value = ensure_array_like(Object.entries(
          /*allBindings*/
          ctx2[0]
        ));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context$1(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block$1(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(div, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$d($$self) {
  const allBindings = {
    pan: ["Scroll", "Home", "End", "Page Up", "Page Down", "Arrow Up", "Arrow Down"],
    "pan horizontal": ["Shift + Scroll", "Arrow Left", "Arrow Right"],
    zoom: ["Ctrl + Scroll"],
    "zoom to fit": ["Shift + Space"],
    "focus on item": ["Right Click"],
    "focus on next item": ["Tab"],
    "focus on previous item": ["Shift + Tab"],
    "move items in selection": ["Click + Drag"],
    "extend selection": ["Ctrl + Click"],
    "create new item": ["Double Click"]
  };
  return [allBindings];
}
class TimelineInteractionsHelp extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$d, create_fragment$g, safe_not_equal, {});
  }
}
const get_additional_settings_slot_changes = (dirty) => ({});
const get_additional_settings_slot_context = (ctx) => ({});
function create_default_slot_1(ctx) {
  let t;
  let timelinegroupssettingssection;
  let current;
  const additional_settings_slot_template = (
    /*#slots*/
    ctx[36]["additional-settings"]
  );
  const additional_settings_slot = create_slot(
    additional_settings_slot_template,
    ctx,
    /*$$scope*/
    ctx[48],
    get_additional_settings_slot_context
  );
  const timelinegroupssettingssection_spread_levels = [
    {
      collapsable: (
        /*groupsSectionCollapable*/
        ctx[12]
      )
    },
    { groups: (
      /*groups*/
      ctx[1]
    ) },
    {
      pendingGroupUpdates: (
        /*pendingGroupUpdates*/
        ctx[4]
      )
    },
    /*groupEvents*/
    ctx[2]
  ];
  let timelinegroupssettingssection_props = {};
  for (let i = 0; i < timelinegroupssettingssection_spread_levels.length; i += 1) {
    timelinegroupssettingssection_props = assign(timelinegroupssettingssection_props, timelinegroupssettingssection_spread_levels[i]);
  }
  timelinegroupssettingssection = new TimelineGroupsSettingsSection({
    props: timelinegroupssettingssection_props
  });
  return {
    c() {
      if (additional_settings_slot) additional_settings_slot.c();
      t = space();
      create_component(timelinegroupssettingssection.$$.fragment);
    },
    m(target, anchor) {
      if (additional_settings_slot) {
        additional_settings_slot.m(target, anchor);
      }
      insert(target, t, anchor);
      mount_component(timelinegroupssettingssection, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (additional_settings_slot) {
        if (additional_settings_slot.p && (!current || dirty[1] & /*$$scope*/
        131072)) {
          update_slot_base(
            additional_settings_slot,
            additional_settings_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[48],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[48]
            ) : get_slot_changes(
              additional_settings_slot_template,
              /*$$scope*/
              ctx2[48],
              dirty,
              get_additional_settings_slot_changes
            ),
            get_additional_settings_slot_context
          );
        }
      }
      const timelinegroupssettingssection_changes = dirty[0] & /*groupsSectionCollapable, groups, pendingGroupUpdates, groupEvents*/
      4118 ? get_spread_update(timelinegroupssettingssection_spread_levels, [
        dirty[0] & /*groupsSectionCollapable*/
        4096 && {
          collapsable: (
            /*groupsSectionCollapable*/
            ctx2[12]
          )
        },
        dirty[0] & /*groups*/
        2 && { groups: (
          /*groups*/
          ctx2[1]
        ) },
        dirty[0] & /*pendingGroupUpdates*/
        16 && {
          pendingGroupUpdates: (
            /*pendingGroupUpdates*/
            ctx2[4]
          )
        },
        dirty[0] & /*groupEvents*/
        4 && get_spread_object(
          /*groupEvents*/
          ctx2[2]
        )
      ]) : {};
      timelinegroupssettingssection.$set(timelinegroupssettingssection_changes);
    },
    i(local) {
      if (current) return;
      transition_in(additional_settings_slot, local);
      transition_in(timelinegroupssettingssection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(additional_settings_slot, local);
      transition_out(timelinegroupssettingssection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (additional_settings_slot) additional_settings_slot.d(detaching);
      destroy_component(timelinegroupssettingssection, detaching);
    }
  };
}
function create_default_slot$3(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "help" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
function create_fragment$f(ctx) {
  let div1;
  let timelineruler;
  let updating_clientHeight;
  let t0;
  let canvasstage;
  let updating_width;
  let updating_clientWidth;
  let t1;
  let menu;
  let timelinenavigationcontrols;
  let t2;
  let timelinesettings;
  let t3;
  let div0;
  let actionbutton;
  let style___ruler_height = `${/*rulerHeight*/
  ctx[10]}px`;
  let style___stage_client_width = `${/*stageClientWidth*/
  ctx[8]}px`;
  let current;
  function timelineruler_clientHeight_binding(value) {
    ctx[37](value);
  }
  let timelineruler_props = {
    display: (
      /*display*/
      ctx[3]
    ),
    scale: (
      /*$scale*/
      ctx[15]
    ),
    focalValue: (
      /*$focalValue*/
      ctx[14]
    )
  };
  if (
    /*rulerHeight*/
    ctx[10] !== void 0
  ) {
    timelineruler_props.clientHeight = /*rulerHeight*/
    ctx[10];
  }
  timelineruler = new TimelineRuler({ props: timelineruler_props });
  binding_callbacks.push(() => bind(timelineruler, "clientHeight", timelineruler_clientHeight_binding));
  function canvasstage_width_binding(value) {
    ctx[39](value);
  }
  function canvasstage_clientWidth_binding(value) {
    ctx[40](value);
  }
  let canvasstage_props = {
    display: (
      /*display*/
      ctx[3]
    ),
    sortedItems: (
      /*items*/
      ctx[0]
    ),
    scale: (
      /*$scale*/
      ctx[15]
    ),
    focalValue: (
      /*$focalValue*/
      ctx[14]
    ),
    editable: (
      /*mode*/
      ctx[13] != null ? (
        /*$mode*/
        ctx[16] === "edit"
      ) : false
    ),
    onPreviewNewItemValue: (
      /*onPreviewNewItemValue*/
      ctx[5]
    ),
    oncontextmenu: (
      /*oncontextmenu*/
      ctx[6]
    )
  };
  if (
    /*$stageWidth*/
    ctx[7] !== void 0
  ) {
    canvasstage_props.width = /*$stageWidth*/
    ctx[7];
  }
  if (
    /*stageClientWidth*/
    ctx[8] !== void 0
  ) {
    canvasstage_props.clientWidth = /*stageClientWidth*/
    ctx[8];
  }
  canvasstage = new CanvasStage({ props: canvasstage_props });
  ctx[38](canvasstage);
  binding_callbacks.push(() => bind(canvasstage, "width", canvasstage_width_binding));
  binding_callbacks.push(() => bind(canvasstage, "clientWidth", canvasstage_clientWidth_binding));
  canvasstage.$on(
    "scrollToValue",
    /*scrollToValue_handler*/
    ctx[41]
  );
  canvasstage.$on(
    "scrollX",
    /*scrollX_handler*/
    ctx[42]
  );
  canvasstage.$on(
    "zoomIn",
    /*zoomIn_handler*/
    ctx[43]
  );
  canvasstage.$on(
    "zoomOut",
    /*zoomOut_handler*/
    ctx[44]
  );
  canvasstage.$on(
    "select",
    /*select_handler*/
    ctx[45]
  );
  canvasstage.$on(
    "focus",
    /*focus_handler*/
    ctx[46]
  );
  canvasstage.$on(
    "create",
    /*create_handler*/
    ctx[47]
  );
  canvasstage.$on(
    "moveItems",
    /*moveItems*/
    ctx[22]
  );
  timelinenavigationcontrols = new TimelineNavigationControls({
    props: { navigation: (
      /*navigation*/
      ctx[21]
    ) }
  });
  timelinesettings = new TimelineSettings({
    props: {
      collapsable: (
        /*settingsCollapable*/
        ctx[11]
      ),
      $$slots: { default: [create_default_slot_1] },
      $$scope: { ctx }
    }
  });
  actionbutton = new ActionButton({
    props: {
      class: "clickable-icon control-item",
      $$slots: { default: [create_default_slot$3] },
      $$scope: { ctx }
    }
  });
  actionbutton.$on(
    "action",
    /*openHelpDialog*/
    ctx[25]
  );
  return {
    c() {
      div1 = element("div");
      create_component(timelineruler.$$.fragment);
      t0 = space();
      create_component(canvasstage.$$.fragment);
      t1 = space();
      menu = element("menu");
      create_component(timelinenavigationcontrols.$$.fragment);
      t2 = space();
      create_component(timelinesettings.$$.fragment);
      t3 = space();
      div0 = element("div");
      create_component(actionbutton.$$.fragment);
      attr(div0, "class", "control-group svelte-17ws03l");
      attr(menu, "class", "timeline-controls svelte-17ws03l");
      attr(div1, "class", "timeline svelte-17ws03l");
      set_style(div1, "--ruler-height", style___ruler_height);
      set_style(div1, "--stage-client-width", style___stage_client_width);
    },
    m(target, anchor) {
      insert(target, div1, anchor);
      mount_component(timelineruler, div1, null);
      append(div1, t0);
      mount_component(canvasstage, div1, null);
      append(div1, t1);
      append(div1, menu);
      mount_component(timelinenavigationcontrols, menu, null);
      append(menu, t2);
      mount_component(timelinesettings, menu, null);
      append(menu, t3);
      append(menu, div0);
      mount_component(actionbutton, div0, null);
      current = true;
    },
    p(ctx2, dirty) {
      const timelineruler_changes = {};
      if (dirty[0] & /*display*/
      8) timelineruler_changes.display = /*display*/
      ctx2[3];
      if (dirty[0] & /*$scale*/
      32768) timelineruler_changes.scale = /*$scale*/
      ctx2[15];
      if (dirty[0] & /*$focalValue*/
      16384) timelineruler_changes.focalValue = /*$focalValue*/
      ctx2[14];
      if (!updating_clientHeight && dirty[0] & /*rulerHeight*/
      1024) {
        updating_clientHeight = true;
        timelineruler_changes.clientHeight = /*rulerHeight*/
        ctx2[10];
        add_flush_callback(() => updating_clientHeight = false);
      }
      timelineruler.$set(timelineruler_changes);
      const canvasstage_changes = {};
      if (dirty[0] & /*display*/
      8) canvasstage_changes.display = /*display*/
      ctx2[3];
      if (dirty[0] & /*items*/
      1) canvasstage_changes.sortedItems = /*items*/
      ctx2[0];
      if (dirty[0] & /*$scale*/
      32768) canvasstage_changes.scale = /*$scale*/
      ctx2[15];
      if (dirty[0] & /*$focalValue*/
      16384) canvasstage_changes.focalValue = /*$focalValue*/
      ctx2[14];
      if (dirty[0] & /*mode, $mode*/
      73728) canvasstage_changes.editable = /*mode*/
      ctx2[13] != null ? (
        /*$mode*/
        ctx2[16] === "edit"
      ) : false;
      if (dirty[0] & /*onPreviewNewItemValue*/
      32) canvasstage_changes.onPreviewNewItemValue = /*onPreviewNewItemValue*/
      ctx2[5];
      if (dirty[0] & /*oncontextmenu*/
      64) canvasstage_changes.oncontextmenu = /*oncontextmenu*/
      ctx2[6];
      if (!updating_width && dirty[0] & /*$stageWidth*/
      128) {
        updating_width = true;
        canvasstage_changes.width = /*$stageWidth*/
        ctx2[7];
        add_flush_callback(() => updating_width = false);
      }
      if (!updating_clientWidth && dirty[0] & /*stageClientWidth*/
      256) {
        updating_clientWidth = true;
        canvasstage_changes.clientWidth = /*stageClientWidth*/
        ctx2[8];
        add_flush_callback(() => updating_clientWidth = false);
      }
      canvasstage.$set(canvasstage_changes);
      const timelinesettings_changes = {};
      if (dirty[0] & /*settingsCollapable*/
      2048) timelinesettings_changes.collapsable = /*settingsCollapable*/
      ctx2[11];
      if (dirty[0] & /*groupsSectionCollapable, groups, pendingGroupUpdates, groupEvents*/
      4118 | dirty[1] & /*$$scope*/
      131072) {
        timelinesettings_changes.$$scope = { dirty, ctx: ctx2 };
      }
      timelinesettings.$set(timelinesettings_changes);
      const actionbutton_changes = {};
      if (dirty[1] & /*$$scope*/
      131072) {
        actionbutton_changes.$$scope = { dirty, ctx: ctx2 };
      }
      actionbutton.$set(actionbutton_changes);
      if (dirty[0] & /*rulerHeight*/
      1024 && style___ruler_height !== (style___ruler_height = `${/*rulerHeight*/
      ctx2[10]}px`)) {
        set_style(div1, "--ruler-height", style___ruler_height);
      }
      if (dirty[0] & /*stageClientWidth*/
      256 && style___stage_client_width !== (style___stage_client_width = `${/*stageClientWidth*/
      ctx2[8]}px`)) {
        set_style(div1, "--stage-client-width", style___stage_client_width);
      }
    },
    i(local) {
      if (current) return;
      transition_in(timelineruler.$$.fragment, local);
      transition_in(canvasstage.$$.fragment, local);
      transition_in(timelinenavigationcontrols.$$.fragment, local);
      transition_in(timelinesettings.$$.fragment, local);
      transition_in(actionbutton.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelineruler.$$.fragment, local);
      transition_out(canvasstage.$$.fragment, local);
      transition_out(timelinenavigationcontrols.$$.fragment, local);
      transition_out(timelinesettings.$$.fragment, local);
      transition_out(actionbutton.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div1);
      }
      destroy_component(timelineruler);
      ctx[38](null);
      destroy_component(canvasstage);
      destroy_component(timelinenavigationcontrols);
      destroy_component(timelinesettings);
      destroy_component(actionbutton);
    }
  };
}
function instance$c($$self, $$props, $$invalidate) {
  let mode;
  let $groupsSectionCollapsed;
  let $settingsOpen;
  let $stageWidth;
  let $focalValue;
  let $persistedValuePerPixel;
  let $scale;
  let $mode, $$unsubscribe_mode = noop, $$subscribe_mode = () => ($$unsubscribe_mode(), $$unsubscribe_mode = subscribe(mode, ($$value) => $$invalidate(16, $mode = $$value)), mode);
  $$self.$$.on_destroy.push(() => $$unsubscribe_mode());
  let { $$slots: slots = {}, $$scope } = $$props;
  let { namespacedWritable } = $$props;
  let { groups } = $$props;
  let { groupEvents } = $$props;
  let { display } = $$props;
  let { controlBindings } = $$props;
  const focalValue = namespacedWritable.make("focalValue", 0);
  component_subscribe($$self, focalValue, (value) => $$invalidate(14, $focalValue = value));
  const persistedValuePerPixel = namespacedWritable.make("scale", 1);
  component_subscribe($$self, persistedValuePerPixel, (value) => $$invalidate(35, $persistedValuePerPixel = value));
  let { items } = $$props;
  let { pendingGroupUpdates } = $$props;
  let { openDialog } = $$props;
  let { onPreviewNewItemValue } = $$props;
  let { onMoveItem } = $$props;
  let { oncontextmenu = () => {
  } } = $$props;
  const stageWidth = writable(0);
  component_subscribe($$self, stageWidth, (value) => $$invalidate(7, $stageWidth = value));
  let stageClientWidth = 0;
  function scaleStore(initialScale = new ValuePerPixelScale(1)) {
    function atLeastMinimum(value) {
      const valuePerPixel = value.toValue(1);
      const minimum = 1 / 100;
      if (Number.isNaN(valuePerPixel)) {
        return new ValuePerPixelScale(minimum);
      }
      return new ValuePerPixelScale(Math.max(minimum, valuePerPixel));
    }
    const { subscribe: subscribe2, set } = writable(atLeastMinimum(initialScale));
    return {
      subscribe: subscribe2,
      set: (newValue) => {
        const validated = atLeastMinimum(newValue);
        set(validated);
        set_store_value(persistedValuePerPixel, $persistedValuePerPixel = validated.valuePerPixel, $persistedValuePerPixel);
        return validated;
      }
    };
  }
  const scale = scaleStore(new ValuePerPixelScale($persistedValuePerPixel));
  component_subscribe($$self, scale, (value) => $$invalidate(15, $scale = value));
  const navigation = timelineNavigation(
    scale,
    {
      get() {
        return items;
      }
    },
    (updater) => {
      const newFocalValue = updater($focalValue);
      if (newFocalValue != $focalValue) {
        set_store_value(focalValue, $focalValue = newFocalValue, $focalValue);
      }
    },
    () => $stageWidth
  );
  function zoomToFit(items2) {
    if (initialized) {
      navigation.zoomToFit(items2, $stageWidth);
    } else {
      const unsubscribe = stageWidth.subscribe((newStageWidth) => {
        if (newStageWidth > 0) {
          navigation.zoomToFit(items2, newStageWidth);
          unsubscribe();
        }
      });
    }
  }
  function refresh() {
    $$invalidate(0, items);
  }
  function focusOnItem(item) {
    canvasStage.focusOnItem(item);
  }
  let canvasStage;
  function invalidateColors() {
    canvasStage.invalidateColors();
  }
  let initialized = false;
  function moveItems(event) {
    event.detail.forEach(({ item, value }) => {
      if (!onMoveItem(item, value)) {
        return;
      }
      item.value = () => value;
    });
    $$invalidate(0, items = new SortedArray((item) => item.value(), ...items));
  }
  let rulerHeight = 0;
  const settingsOpen = namespacedWritable.namespace("settings").make("isOpen", false);
  component_subscribe($$self, settingsOpen, (value) => $$invalidate(50, $settingsOpen = value));
  const settingsCollapable = new ObservableCollapsable(!$settingsOpen);
  settingsCollapable.onChange = () => {
    set_store_value(settingsOpen, $settingsOpen = !settingsCollapable.isCollapsed(), $settingsOpen);
  };
  const groupsSectionCollapsed = namespacedWritable.namespace("settings").namespace("groups").make("collapsed", true);
  component_subscribe($$self, groupsSectionCollapsed, (value) => $$invalidate(49, $groupsSectionCollapsed = value));
  const groupsSectionCollapable = new ObservableCollapsable($groupsSectionCollapsed);
  groupsSectionCollapable.onChange = () => {
    set_store_value(groupsSectionCollapsed, $groupsSectionCollapsed = groupsSectionCollapable.isCollapsed(), $groupsSectionCollapsed);
  };
  function openHelpDialog() {
    openDialog((modal) => {
      modal.modalEl.addClass("timeline-help");
      modal.titleEl.setText("Timeline Help");
      const component = new TimelineInteractionsHelp({ target: modal.contentEl, props: {} });
      return () => component.$destroy();
    });
  }
  function timelineruler_clientHeight_binding(value) {
    rulerHeight = value;
    $$invalidate(10, rulerHeight);
  }
  function canvasstage_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      canvasStage = $$value;
      $$invalidate(9, canvasStage);
    });
  }
  function canvasstage_width_binding(value) {
    $stageWidth = value;
    stageWidth.set($stageWidth);
  }
  function canvasstage_clientWidth_binding(value) {
    stageClientWidth = value;
    $$invalidate(8, stageClientWidth);
  }
  const scrollToValue_handler = (event) => navigation.scrollToValue(event.detail);
  const scrollX_handler = ({ detail }) => navigation.scrollToValue($focalValue + detail);
  const zoomIn_handler = ({ detail }) => navigation.zoomIn(detail);
  const zoomOut_handler = ({ detail }) => navigation.zoomOut(detail);
  function select_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focus_handler(event) {
    bubble.call(this, $$self, event);
  }
  function create_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("namespacedWritable" in $$props2) $$invalidate(26, namespacedWritable = $$props2.namespacedWritable);
    if ("groups" in $$props2) $$invalidate(1, groups = $$props2.groups);
    if ("groupEvents" in $$props2) $$invalidate(2, groupEvents = $$props2.groupEvents);
    if ("display" in $$props2) $$invalidate(3, display = $$props2.display);
    if ("controlBindings" in $$props2) $$invalidate(27, controlBindings = $$props2.controlBindings);
    if ("items" in $$props2) $$invalidate(0, items = $$props2.items);
    if ("pendingGroupUpdates" in $$props2) $$invalidate(4, pendingGroupUpdates = $$props2.pendingGroupUpdates);
    if ("openDialog" in $$props2) $$invalidate(28, openDialog = $$props2.openDialog);
    if ("onPreviewNewItemValue" in $$props2) $$invalidate(5, onPreviewNewItemValue = $$props2.onPreviewNewItemValue);
    if ("onMoveItem" in $$props2) $$invalidate(29, onMoveItem = $$props2.onMoveItem);
    if ("oncontextmenu" in $$props2) $$invalidate(6, oncontextmenu = $$props2.oncontextmenu);
    if ("$$scope" in $$props2) $$invalidate(48, $$scope = $$props2.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[1] & /*$persistedValuePerPixel*/
    16) {
      set_store_value(scale, $scale = new ValuePerPixelScale($persistedValuePerPixel), $scale);
    }
    if ($$self.$$.dirty[0] & /*$stageWidth*/
    128 | $$self.$$.dirty[1] & /*initialized*/
    8) {
      if (!initialized) {
        if ($stageWidth > 0) {
          $$invalidate(34, initialized = true);
        }
      }
    }
    if ($$self.$$.dirty[0] & /*namespacedWritable*/
    67108864) {
      $$subscribe_mode($$invalidate(13, mode = namespacedWritable == null ? void 0 : namespacedWritable.make("mode", "edit")));
    }
  };
  return [
    items,
    groups,
    groupEvents,
    display,
    pendingGroupUpdates,
    onPreviewNewItemValue,
    oncontextmenu,
    $stageWidth,
    stageClientWidth,
    canvasStage,
    rulerHeight,
    settingsCollapable,
    groupsSectionCollapable,
    mode,
    $focalValue,
    $scale,
    $mode,
    focalValue,
    persistedValuePerPixel,
    stageWidth,
    scale,
    navigation,
    moveItems,
    settingsOpen,
    groupsSectionCollapsed,
    openHelpDialog,
    namespacedWritable,
    controlBindings,
    openDialog,
    onMoveItem,
    zoomToFit,
    refresh,
    focusOnItem,
    invalidateColors,
    initialized,
    $persistedValuePerPixel,
    slots,
    timelineruler_clientHeight_binding,
    canvasstage_binding,
    canvasstage_width_binding,
    canvasstage_clientWidth_binding,
    scrollToValue_handler,
    scrollX_handler,
    zoomIn_handler,
    zoomOut_handler,
    select_handler,
    focus_handler,
    create_handler,
    $$scope
  ];
}
class Timeline extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$c,
      create_fragment$f,
      safe_not_equal,
      {
        namespacedWritable: 26,
        groups: 1,
        groupEvents: 2,
        display: 3,
        controlBindings: 27,
        items: 0,
        pendingGroupUpdates: 4,
        openDialog: 28,
        onPreviewNewItemValue: 5,
        onMoveItem: 29,
        oncontextmenu: 6,
        zoomToFit: 30,
        refresh: 31,
        focusOnItem: 32,
        invalidateColors: 33
      },
      null,
      [-1, -1]
    );
  }
  get zoomToFit() {
    return this.$$.ctx[30];
  }
  get refresh() {
    return this.$$.ctx[31];
  }
  get focusOnItem() {
    return this.$$.ctx[32];
  }
  get invalidateColors() {
    return this.$$.ctx[33];
  }
}
class TimelineNoteItem {
  constructor(note, getValueSelector, colorSupplier) {
    __privateAdd(this, _TimelineNoteItem_instances);
    __privateAdd(this, _value);
    __publicField(this, "value");
    this.note = note;
    this.getValueSelector = getValueSelector;
    this.colorSupplier = colorSupplier;
    this.value = __privateMethod(this, _TimelineNoteItem_instances, calculateValue_fn);
  }
  toString() {
    return `TimelineNoteItem{ value: ${this.value()}, id: ${this.id()}, name: ${this.name()} }`;
  }
  id() {
    return this.note.id();
  }
  _invalidateValueCache() {
    __privateSet(this, _value, void 0);
    this.value = __privateMethod(this, _TimelineNoteItem_instances, calculateValue_fn);
  }
  name() {
    return this.note.name();
  }
  color() {
    return this.colorSupplier.itemColorForNote(this.note);
  }
}
_value = new WeakMap();
_TimelineNoteItem_instances = new WeakSet();
getCachedValue_fn = function() {
  return __privateGet(this, _value);
};
calculateValue_fn = function() {
  const getValueSelector = this.getValueSelector;
  const value = getValueSelector().selectValueFromNote(this.note);
  __privateSet(this, _value, value);
  this.value = __privateMethod(this, _TimelineNoteItem_instances, getCachedValue_fn);
  return value;
};
function* range(count) {
  for (let i = 0; i < count; i++) {
    yield i;
  }
}
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
const get_item_slot_changes_1 = (dirty) => ({ index: dirty[0] & /*itemCount*/
2 });
const get_item_slot_context_1 = (ctx) => ({ index: (
  /*itemIndex*/
  ctx[28]
) });
function get_each_context_1(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[28] = list[i];
  return child_ctx;
}
const get_item_slot_changes = (dirty) => ({ index: dirty[0] & /*itemCount*/
2 });
const get_item_slot_context = (ctx) => ({ index: (
  /*itemIndex*/
  ctx[28]
) });
function create_each_block_1(ctx) {
  let option;
  let t;
  let option_value_value;
  let option_selected_value;
  let current;
  const item_slot_template = (
    /*#slots*/
    ctx[17].item
  );
  const item_slot = create_slot(
    item_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_item_slot_context
  );
  return {
    c() {
      option = element("option");
      if (item_slot) item_slot.c();
      t = space();
      option.__value = option_value_value = /*itemIndex*/
      ctx[28];
      set_input_value(option, option.__value);
      option.selected = option_selected_value = /*selectedIndex*/
      ctx[0] === /*itemIndex*/
      ctx[28];
    },
    m(target, anchor) {
      insert(target, option, anchor);
      if (item_slot) {
        item_slot.m(option, null);
      }
      append(option, t);
      current = true;
    },
    p(ctx2, dirty) {
      if (item_slot) {
        if (item_slot.p && (!current || dirty[0] & /*$$scope, itemCount*/
        65538)) {
          update_slot_base(
            item_slot,
            item_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              item_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_item_slot_changes
            ),
            get_item_slot_context
          );
        }
      }
      if (!current || dirty[0] & /*itemCount*/
      2 && option_value_value !== (option_value_value = /*itemIndex*/
      ctx2[28])) {
        option.__value = option_value_value;
        set_input_value(option, option.__value);
      }
      if (!current || dirty[0] & /*selectedIndex, itemCount*/
      3 && option_selected_value !== (option_selected_value = /*selectedIndex*/
      ctx2[0] === /*itemIndex*/
      ctx2[28])) {
        option.selected = option_selected_value;
      }
    },
    i(local) {
      if (current) return;
      transition_in(item_slot, local);
      current = true;
    },
    o(local) {
      transition_out(item_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(option);
      }
      if (item_slot) item_slot.d(detaching);
    }
  };
}
function create_if_block$2(ctx) {
  let dialog_1;
  let ul;
  let dialog_1_data_popupfor_value;
  let current;
  let each_value = ensure_array_like(range(
    /*itemCount*/
    ctx[1]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  return {
    c() {
      dialog_1 = element("dialog");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      attr(ul, "role", "listbox");
      attr(ul, "class", "svelte-1tt3zkr");
      attr(
        dialog_1,
        "id",
        /*dialogId*/
        ctx[9]
      );
      dialog_1.open = /*open*/
      ctx[3];
      attr(dialog_1, "class", "select-dropdown svelte-1tt3zkr");
      attr(dialog_1, "data-popupfor", dialog_1_data_popupfor_value = /*$$restProps*/
      ctx[11].id);
    },
    m(target, anchor) {
      insert(target, dialog_1, anchor);
      append(dialog_1, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(ul, null);
        }
      }
      ctx[22](dialog_1);
      current = true;
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*$$scope, itemCount*/
      65538) {
        each_value = ensure_array_like(range(
          /*itemCount*/
          ctx2[1]
        ));
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(ul, null);
          }
        }
        group_outros();
        for (i = each_value.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      if (!current || dirty[0] & /*open*/
      8) {
        dialog_1.open = /*open*/
        ctx2[3];
      }
      if (!current || dirty[0] & /*$$restProps*/
      2048 && dialog_1_data_popupfor_value !== (dialog_1_data_popupfor_value = /*$$restProps*/
      ctx2[11].id)) {
        attr(dialog_1, "data-popupfor", dialog_1_data_popupfor_value);
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(dialog_1);
      }
      destroy_each(each_blocks, detaching);
      ctx[22](null);
    }
  };
}
function create_each_block(ctx) {
  let current;
  const item_slot_template = (
    /*#slots*/
    ctx[17].item
  );
  const item_slot = create_slot(
    item_slot_template,
    ctx,
    /*$$scope*/
    ctx[16],
    get_item_slot_context_1
  );
  return {
    c() {
      if (item_slot) item_slot.c();
    },
    m(target, anchor) {
      if (item_slot) {
        item_slot.m(target, anchor);
      }
      current = true;
    },
    p(ctx2, dirty) {
      if (item_slot) {
        if (item_slot.p && (!current || dirty[0] & /*$$scope, itemCount*/
        65538)) {
          update_slot_base(
            item_slot,
            item_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[16],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[16]
            ) : get_slot_changes(
              item_slot_template,
              /*$$scope*/
              ctx2[16],
              dirty,
              get_item_slot_changes_1
            ),
            get_item_slot_context_1
          );
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(item_slot, local);
      current = true;
    },
    o(local) {
      transition_out(item_slot, local);
      current = false;
    },
    d(detaching) {
      if (item_slot) item_slot.d(detaching);
    }
  };
}
function create_fragment$e(ctx) {
  let select;
  let t;
  let if_block_anchor;
  let current;
  let mounted;
  let dispose;
  let each_value_1 = ensure_array_like(range(
    /*itemCount*/
    ctx[1]
  ));
  let each_blocks = [];
  for (let i = 0; i < each_value_1.length; i += 1) {
    each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
  }
  const out = (i) => transition_out(each_blocks[i], 1, 1, () => {
    each_blocks[i] = null;
  });
  let select_levels = [
    /*$$restProps*/
    ctx[11],
    { role: "combobox" },
    { "aria-expanded": (
      /*open*/
      ctx[3]
    ) },
    { "aria-owns": (
      /*dialogId*/
      ctx[9]
    ) },
    { "aria-controls": (
      /*dialogId*/
      ctx[9]
    ) }
  ];
  let select_data = {};
  for (let i = 0; i < select_levels.length; i += 1) {
    select_data = assign(select_data, select_levels[i]);
  }
  let if_block = (
    /*open*/
    (ctx[3] || false) && create_if_block$2(ctx)
  );
  return {
    c() {
      select = element("select");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      t = space();
      if (if_block) if_block.c();
      if_block_anchor = empty();
      set_attributes(select, select_data);
      toggle_class(select, "dropdown", true);
    },
    m(target, anchor) {
      insert(target, select, anchor);
      for (let i = 0; i < each_blocks.length; i += 1) {
        if (each_blocks[i]) {
          each_blocks[i].m(select, null);
        }
      }
      "value" in select_data && (select_data.multiple ? select_options : select_option)(select, select_data.value);
      if (select.autofocus) select.focus();
      ctx[21](select);
      insert(target, t, anchor);
      if (if_block) if_block.m(target, anchor);
      insert(target, if_block_anchor, anchor);
      current = true;
      if (!mounted) {
        dispose = [
          listen(select, "mousedown", stop_propagation(prevent_default(
            /*mousedown_handler*/
            ctx[18]
          ))),
          listen(
            select,
            "keydown",
            /*keydown_handler*/
            ctx[19]
          ),
          listen(
            select,
            "focusout",
            /*onFocusOut*/
            ctx[8]
          ),
          listen(
            select,
            "change",
            /*change_handler*/
            ctx[20]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, dirty) {
      if (dirty[0] & /*itemCount, selectedIndex, $$scope*/
      65539) {
        each_value_1 = ensure_array_like(range(
          /*itemCount*/
          ctx2[1]
        ));
        let i;
        for (i = 0; i < each_value_1.length; i += 1) {
          const child_ctx = get_each_context_1(ctx2, each_value_1, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
            transition_in(each_blocks[i], 1);
          } else {
            each_blocks[i] = create_each_block_1(child_ctx);
            each_blocks[i].c();
            transition_in(each_blocks[i], 1);
            each_blocks[i].m(select, null);
          }
        }
        group_outros();
        for (i = each_value_1.length; i < each_blocks.length; i += 1) {
          out(i);
        }
        check_outros();
      }
      set_attributes(select, select_data = get_spread_update(select_levels, [
        dirty[0] & /*$$restProps*/
        2048 && /*$$restProps*/
        ctx2[11],
        { role: "combobox" },
        (!current || dirty[0] & /*open*/
        8) && { "aria-expanded": (
          /*open*/
          ctx2[3]
        ) },
        { "aria-owns": (
          /*dialogId*/
          ctx2[9]
        ) },
        { "aria-controls": (
          /*dialogId*/
          ctx2[9]
        ) }
      ]));
      if (dirty[0] & /*$$restProps, open, dialogId*/
      2568 && "value" in select_data) (select_data.multiple ? select_options : select_option)(select, select_data.value);
      toggle_class(select, "dropdown", true);
      if (
        /*open*/
        ctx2[3] || false
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*open*/
          8) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block$2(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      for (let i = 0; i < each_value_1.length; i += 1) {
        transition_in(each_blocks[i]);
      }
      transition_in(if_block);
      current = true;
    },
    o(local) {
      each_blocks = each_blocks.filter(Boolean);
      for (let i = 0; i < each_blocks.length; i += 1) {
        transition_out(each_blocks[i]);
      }
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(select);
        detach(t);
        detach(if_block_anchor);
      }
      destroy_each(each_blocks, detaching);
      ctx[21](null);
      if (if_block) if_block.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function descendsFrom(potentialDescendant, potentialAnscestor) {
  let node = potentialDescendant;
  while (node != null) {
    if (node == potentialAnscestor) {
      return true;
    }
    node = node.parentElement;
  }
  return false;
}
function instance$b($$self, $$props, $$invalidate) {
  const omit_props_names = ["selectedIndex", "itemCount", "show", "hide", "toggleShown", "change", "getDialog"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { $$slots: slots = {}, $$scope } = $$props;
  const dispatch2 = createEventDispatcher();
  let { selectedIndex = -1 } = $$props;
  let { itemCount = 0 } = $$props;
  let { "aria-disabled": disabled } = $$restProps;
  let open = false;
  let element2;
  let buttonBounds;
  function show(causedBy) {
    if (!disabled && !open && itemCount > 0 && dispatch2("showing", causedBy, { cancelable: true })) {
      if (element2 != null) {
        buttonBounds = element2.getBoundingClientRect();
      }
      $$invalidate(3, open = true);
      dispatch2("shown", causedBy);
    }
  }
  function hide(causedBy) {
    if (!disabled && open && dispatch2("hiding", causedBy, { cancelable: true })) {
      $$invalidate(3, open = false);
      dispatch2("hidden", causedBy);
    }
  }
  function toggleShown(causedBy) {
    if (open) {
      hide(causedBy);
    } else {
      show(causedBy);
    }
  }
  function changedWithEffect(index, effect) {
    $$invalidate(0, selectedIndex = index);
    if (dispatch2("changed", index, { cancelable: true })) {
      effect();
    }
  }
  function change(index) {
    if (dispatch2("changing", index, { cancelable: true })) {
      changed(index);
    }
  }
  function changed(index) {
    changedWithEffect(index, () => hide());
  }
  setContext("change", change);
  let dialog;
  function getDialog() {
    return open ? dialog : void 0;
  }
  onDestroy(() => {
    var _a;
    if (dialog != null) {
      (_a = dialog.parentElement) == null ? void 0 : _a.removeChild(dialog);
    }
  });
  function positionDialog(dialog2) {
    if (dialog2.parentElement != document.body) {
      document.body.appendChild(dialog2);
    }
    const { width, height } = window.visualViewport;
    const dialogBounds = dialog2.getBoundingClientRect();
    if (buttonBounds != null) {
      dialog2.setCssStyles({
        left: `${Math.min(buttonBounds.x, width - dialogBounds.width)}px`,
        top: `${Math.min(buttonBounds.y + buttonBounds.height, height - dialogBounds.height)}px`,
        width: buttonBounds.width > dialogBounds.width ? `${buttonBounds.width}px` : void 0
      });
    } else {
      dialog2.setCssStyles({
        left: `${Math.max(0, (width - dialogBounds.width) / 2)}px`,
        top: `${Math.max(0, (height - dialogBounds.height) / 2)}px`
      });
    }
  }
  function onFocusOut(event) {
    if (dialog == null) {
      return;
    }
    const focusMovedTo = event.relatedTarget;
    if (focusMovedTo == null || !(focusMovedTo instanceof Node) || !descendsFrom(focusMovedTo, dialog)) {
      hide();
    } else {
      if (element2 != null) {
        element2.focus();
      }
    }
  }
  const dialogId = "select-dropdown-" + Math.random().toString(36).slice(2);
  function trigger(event) {
    event.preventDefault();
    toggleShown();
  }
  const mousedown_handler = (e) => {
    e.currentTarget.focus();
    trigger(e);
  };
  const keydown_handler = (event) => {
    if (event.key === "Enter") {
      trigger(event);
    } else if (event.key === "Escape") {
      hide();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === "ArrowUp") {
      if (open) {
        changedWithEffect(Math.max(0, selectedIndex - 1), () => {
        });
        event.preventDefault();
      }
    } else if (event.key === "ArrowDown") {
      if (open) {
        changedWithEffect(Math.min(itemCount - 1, selectedIndex + 1), () => {
        });
        event.preventDefault();
      }
    }
  };
  const change_handler = (e) => changed(e.currentTarget.selectedIndex);
  function select_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      element2 = $$value;
      $$invalidate(5, element2);
      $$invalidate(1, itemCount);
    });
  }
  function dialog_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      dialog = $$value;
      $$invalidate(4, dialog);
    });
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(11, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("selectedIndex" in $$new_props) $$invalidate(0, selectedIndex = $$new_props.selectedIndex);
    if ("itemCount" in $$new_props) $$invalidate(1, itemCount = $$new_props.itemCount);
    if ("$$scope" in $$new_props) $$invalidate(16, $$scope = $$new_props.$$scope);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty[0] & /*open*/
    8) ;
    if ($$self.$$.dirty[0] & /*open, dialog*/
    24) {
      if (open && dialog != null) positionDialog(dialog);
    }
  };
  return [
    selectedIndex,
    itemCount,
    hide,
    open,
    dialog,
    element2,
    changedWithEffect,
    changed,
    onFocusOut,
    dialogId,
    trigger,
    $$restProps,
    show,
    toggleShown,
    change,
    getDialog,
    $$scope,
    slots,
    mousedown_handler,
    keydown_handler,
    change_handler,
    select_binding,
    dialog_1_binding
  ];
}
class Select extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance$b,
      create_fragment$e,
      safe_not_equal,
      {
        selectedIndex: 0,
        itemCount: 1,
        show: 12,
        hide: 2,
        toggleShown: 13,
        change: 14,
        getDialog: 15
      },
      null,
      [-1, -1]
    );
  }
  get show() {
    return this.$$.ctx[12];
  }
  get hide() {
    return this.$$.ctx[2];
  }
  get toggleShown() {
    return this.$$.ctx[13];
  }
  get change() {
    return this.$$.ctx[14];
  }
  get getDialog() {
    return this.$$.ctx[15];
  }
}
function create_fragment$d(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "clock" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
class DateTimeIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$d, safe_not_equal, {});
  }
}
function create_fragment$c(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "calendar" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
class DateIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$c, safe_not_equal, {});
  }
}
function create_fragment$b(ctx) {
  let lucideicon;
  let current;
  lucideicon = new LucideIcon({ props: { id: "binary" } });
  return {
    c() {
      create_component(lucideicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(lucideicon, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current) return;
      transition_in(lucideicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(lucideicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(lucideicon, detaching);
    }
  };
}
class NumberIcon extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$b, safe_not_equal, {});
  }
}
function isTypeOf(types, type) {
  return types.includes(type);
}
function isNotePropertyOfType(types, property) {
  return isTypeOf(types, property.type());
}
const NotePropertyTypes = ["number", "date", "datetime"];
function isNumericNoteProperty(property) {
  return isNotePropertyOfType(NotePropertyTypes, property);
}
var TimelineNoteSorterPropertyType = /* @__PURE__ */ ((TimelineNoteSorterPropertyType2) => {
  TimelineNoteSorterPropertyType2[TimelineNoteSorterPropertyType2["Number"] = 0] = "Number";
  TimelineNoteSorterPropertyType2[TimelineNoteSorterPropertyType2["Date"] = 1] = "Date";
  TimelineNoteSorterPropertyType2[TimelineNoteSorterPropertyType2["DateTime"] = 2] = "DateTime";
  return TimelineNoteSorterPropertyType2;
})(TimelineNoteSorterPropertyType || {});
function timelineNoteSorterPropertyType(type) {
  switch (type) {
    case "number":
      return 0;
    case "date":
      return 1;
    case "datetime":
      return 2;
  }
}
class NotePropertyValueSelector {
  constructor(property) {
    this.property = property;
  }
  selectValueFromNote(note) {
    const value = note.properties()[this.property.name()];
    if (typeof value === "number") return value;
    if (typeof value === "string") {
      const parsed = parseFloat(value);
      if (!isNaN(parsed)) return parsed;
      return 0;
    }
    return 0;
  }
}
const _TimelineNoteSorterProperty = class _TimelineNoteSorterProperty {
  constructor(name, type, valueSelector) {
    __privateAdd(this, _name2);
    __privateAdd(this, _type2);
    __privateAdd(this, _valueSelector);
    __privateSet(this, _name2, name);
    __privateSet(this, _type2, type);
    __privateSet(this, _valueSelector, valueSelector);
  }
  static fromNoteProperty(noteProperty) {
    return new _TimelineNoteSorterProperty(
      noteProperty.name(),
      timelineNoteSorterPropertyType(noteProperty.type()),
      new NotePropertyValueSelector(noteProperty)
    );
  }
  name() {
    return __privateGet(this, _name2);
  }
  type() {
    return __privateGet(this, _type2);
  }
  sortNotes(notes) {
    notes.sort((a, b) => {
      return __privateGet(this, _valueSelector).selectValueFromNote(a) - __privateGet(this, _valueSelector).selectValueFromNote(b);
    });
  }
  selectValueFromNote(note) {
    return __privateGet(this, _valueSelector).selectValueFromNote(note);
  }
};
_name2 = new WeakMap();
_type2 = new WeakMap();
_valueSelector = new WeakMap();
__publicField(_TimelineNoteSorterProperty, "Created", new _TimelineNoteSorterProperty(
  "created",
  2,
  {
    selectValueFromNote(note) {
      return note.created();
    }
  }
));
__publicField(_TimelineNoteSorterProperty, "Modified", new _TimelineNoteSorterProperty(
  "modified",
  2,
  {
    selectValueFromNote(note) {
      return note.modified();
    }
  }
));
let TimelineNoteSorterProperty = _TimelineNoteSorterProperty;
const get_icon_slot_changes = (dirty) => ({});
const get_icon_slot_context = (ctx) => ({});
function create_fragment$a(ctx) {
  let div3;
  let div0;
  let span;
  let t;
  let div2;
  let div1;
  let current;
  let mounted;
  let dispose;
  const icon_slot_template = (
    /*#slots*/
    ctx[3].icon
  );
  const icon_slot = create_slot(
    icon_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    get_icon_slot_context
  );
  const default_slot_template = (
    /*#slots*/
    ctx[3].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[2],
    null
  );
  return {
    c() {
      div3 = element("div");
      div0 = element("div");
      span = element("span");
      if (icon_slot) icon_slot.c();
      t = space();
      div2 = element("div");
      div1 = element("div");
      if (default_slot) default_slot.c();
      attr(span, "class", "suggestion-flair");
      attr(div0, "class", "suggestion-icon");
      attr(div1, "class", "suggestion-title");
      attr(div2, "class", "suggestion-content");
      attr(div3, "class", "suggestion-item mod-complex");
      attr(
        div3,
        "aria-selected",
        /*selected*/
        ctx[0]
      );
      attr(div3, "role", "option");
      attr(
        div3,
        "tabindex",
        /*tabindex*/
        ctx[1]
      );
      toggle_class(
        div3,
        "is-selected",
        /*selected*/
        ctx[0]
      );
    },
    m(target, anchor) {
      insert(target, div3, anchor);
      append(div3, div0);
      append(div0, span);
      if (icon_slot) {
        icon_slot.m(span, null);
      }
      append(div3, t);
      append(div3, div2);
      append(div2, div1);
      if (default_slot) {
        default_slot.m(div1, null);
      }
      current = true;
      if (!mounted) {
        dispose = [
          listen(
            div3,
            "mouseenter",
            /*mouseenter_handler*/
            ctx[4]
          ),
          listen(
            div3,
            "focusin",
            /*focusin_handler*/
            ctx[5]
          ),
          listen(
            div3,
            "click",
            /*click_handler*/
            ctx[6]
          ),
          listen(
            div3,
            "keydown",
            /*keydown_handler*/
            ctx[7]
          )
        ];
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (icon_slot) {
        if (icon_slot.p && (!current || dirty & /*$$scope*/
        4)) {
          update_slot_base(
            icon_slot,
            icon_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              icon_slot_template,
              /*$$scope*/
              ctx2[2],
              dirty,
              get_icon_slot_changes
            ),
            get_icon_slot_context
          );
        }
      }
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        4)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[2],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[2]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[2],
              dirty,
              null
            ),
            null
          );
        }
      }
      if (!current || dirty & /*selected*/
      1) {
        attr(
          div3,
          "aria-selected",
          /*selected*/
          ctx2[0]
        );
      }
      if (!current || dirty & /*tabindex*/
      2) {
        attr(
          div3,
          "tabindex",
          /*tabindex*/
          ctx2[1]
        );
      }
      if (!current || dirty & /*selected*/
      1) {
        toggle_class(
          div3,
          "is-selected",
          /*selected*/
          ctx2[0]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(icon_slot, local);
      transition_in(default_slot, local);
      current = true;
    },
    o(local) {
      transition_out(icon_slot, local);
      transition_out(default_slot, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(div3);
      }
      if (icon_slot) icon_slot.d(detaching);
      if (default_slot) default_slot.d(detaching);
      mounted = false;
      run_all(dispose);
    }
  };
}
function instance$a($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  let { selected } = $$props;
  let { tabindex } = $$props;
  function mouseenter_handler(event) {
    bubble.call(this, $$self, event);
  }
  function focusin_handler(event) {
    bubble.call(this, $$self, event);
  }
  function click_handler(event) {
    bubble.call(this, $$self, event);
  }
  function keydown_handler(event) {
    bubble.call(this, $$self, event);
  }
  $$self.$$set = ($$props2) => {
    if ("selected" in $$props2) $$invalidate(0, selected = $$props2.selected);
    if ("tabindex" in $$props2) $$invalidate(1, tabindex = $$props2.tabindex);
    if ("$$scope" in $$props2) $$invalidate(2, $$scope = $$props2.$$scope);
  };
  return [
    selected,
    tabindex,
    $$scope,
    slots,
    mouseenter_handler,
    focusin_handler,
    click_handler,
    keydown_handler
  ];
}
class ObsidianSuggestionItem extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$a, create_fragment$a, safe_not_equal, { selected: 0, tabindex: 1 });
  }
}
function create_default_slot$2(ctx) {
  let t;
  return {
    c() {
      t = text(
        /*name*/
        ctx[2]
      );
    },
    m(target, anchor) {
      insert(target, t, anchor);
    },
    p(ctx2, dirty) {
      if (dirty & /*name*/
      4) set_data(
        t,
        /*name*/
        ctx2[2]
      );
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
    }
  };
}
function create_if_block_2(ctx) {
  let numbericon;
  let current;
  numbericon = new NumberIcon({});
  return {
    c() {
      create_component(numbericon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(numbericon, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(numbericon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(numbericon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(numbericon, detaching);
    }
  };
}
function create_if_block_1(ctx) {
  let dateicon;
  let current;
  dateicon = new DateIcon({});
  return {
    c() {
      create_component(dateicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(dateicon, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(dateicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(dateicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(dateicon, detaching);
    }
  };
}
function create_if_block$1(ctx) {
  let datetimeicon;
  let current;
  datetimeicon = new DateTimeIcon({});
  return {
    c() {
      create_component(datetimeicon.$$.fragment);
    },
    m(target, anchor) {
      mount_component(datetimeicon, target, anchor);
      current = true;
    },
    i(local) {
      if (current) return;
      transition_in(datetimeicon.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(datetimeicon.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(datetimeicon, detaching);
    }
  };
}
function create_icon_slot(ctx) {
  let current_block_type_index;
  let if_block;
  let if_block_anchor;
  let current;
  const if_block_creators = [create_if_block$1, create_if_block_1, create_if_block_2];
  const if_blocks = [];
  function select_block_type(ctx2, dirty) {
    if (
      /*type*/
      ctx2[3] === TimelineNoteSorterPropertyType.DateTime
    ) return 0;
    if (
      /*type*/
      ctx2[3] === TimelineNoteSorterPropertyType.Date
    ) return 1;
    if (
      /*type*/
      ctx2[3] === TimelineNoteSorterPropertyType.Number
    ) return 2;
    return -1;
  }
  if (~(current_block_type_index = select_block_type(ctx))) {
    if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx);
  }
  return {
    c() {
      if (if_block) if_block.c();
      if_block_anchor = empty();
    },
    m(target, anchor) {
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].m(target, anchor);
      }
      insert(target, if_block_anchor, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      let previous_block_index = current_block_type_index;
      current_block_type_index = select_block_type(ctx2);
      if (current_block_type_index !== previous_block_index) {
        if (if_block) {
          group_outros();
          transition_out(if_blocks[previous_block_index], 1, 1, () => {
            if_blocks[previous_block_index] = null;
          });
          check_outros();
        }
        if (~current_block_type_index) {
          if_block = if_blocks[current_block_type_index];
          if (!if_block) {
            if_block = if_blocks[current_block_type_index] = if_block_creators[current_block_type_index](ctx2);
            if_block.c();
          }
          transition_in(if_block, 1);
          if_block.m(if_block_anchor.parentNode, if_block_anchor);
        } else {
          if_block = null;
        }
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(if_block_anchor);
      }
      if (~current_block_type_index) {
        if_blocks[current_block_type_index].d(detaching);
      }
    }
  };
}
function create_fragment$9(ctx) {
  let obsidiansuggestionitem;
  let current;
  obsidiansuggestionitem = new ObsidianSuggestionItem({
    props: {
      selected: (
        /*selected*/
        ctx[0]
      ),
      tabindex: (
        /*index*/
        ctx[1]
      ),
      $$slots: {
        icon: [create_icon_slot],
        default: [create_default_slot$2]
      },
      $$scope: { ctx }
    }
  });
  obsidiansuggestionitem.$on(
    "mouseenter",
    /*mouseenter_handler*/
    ctx[6]
  );
  obsidiansuggestionitem.$on(
    "focusin",
    /*focusin_handler*/
    ctx[7]
  );
  obsidiansuggestionitem.$on(
    "click",
    /*makeSelection*/
    ctx[5]
  );
  obsidiansuggestionitem.$on(
    "keydown",
    /*keydown_handler*/
    ctx[8]
  );
  return {
    c() {
      create_component(obsidiansuggestionitem.$$.fragment);
    },
    m(target, anchor) {
      mount_component(obsidiansuggestionitem, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const obsidiansuggestionitem_changes = {};
      if (dirty & /*selected*/
      1) obsidiansuggestionitem_changes.selected = /*selected*/
      ctx2[0];
      if (dirty & /*index*/
      2) obsidiansuggestionitem_changes.tabindex = /*index*/
      ctx2[1];
      if (dirty & /*$$scope, type, name*/
      1036) {
        obsidiansuggestionitem_changes.$$scope = { dirty, ctx: ctx2 };
      }
      obsidiansuggestionitem.$set(obsidiansuggestionitem_changes);
    },
    i(local) {
      if (current) return;
      transition_in(obsidiansuggestionitem.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(obsidiansuggestionitem.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(obsidiansuggestionitem, detaching);
    }
  };
}
function instance$9($$self, $$props, $$invalidate) {
  const dispatch2 = createEventDispatcher();
  let { selected } = $$props;
  let { index } = $$props;
  let { name } = $$props;
  let { type } = $$props;
  const change = getContext("change");
  function makeSelection() {
    if (dispatch2("select", index, { cancelable: true })) {
      if (change != null) {
        change(index);
      }
    }
  }
  const mouseenter_handler = () => dispatch2("consider", index);
  const focusin_handler = () => dispatch2("consider", index);
  const keydown_handler = (e) => e.key === "Enter" ? makeSelection() : null;
  $$self.$$set = ($$props2) => {
    if ("selected" in $$props2) $$invalidate(0, selected = $$props2.selected);
    if ("index" in $$props2) $$invalidate(1, index = $$props2.index);
    if ("name" in $$props2) $$invalidate(2, name = $$props2.name);
    if ("type" in $$props2) $$invalidate(3, type = $$props2.type);
  };
  return [
    selected,
    index,
    name,
    type,
    dispatch2,
    makeSelection,
    mouseenter_handler,
    focusin_handler,
    keydown_handler
  ];
}
class TimelineNoteSorterPropertySelectOption extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$9, create_fragment$9, safe_not_equal, { selected: 0, index: 1, name: 2, type: 3 });
  }
}
function create_item_slot(ctx) {
  let propertyselectionoption;
  let current;
  propertyselectionoption = new TimelineNoteSorterPropertySelectOption({
    props: {
      slot: "item",
      index: (
        /*index*/
        ctx[15]
      ),
      selected: (
        /*selectedIndex*/
        ctx[2] === /*index*/
        ctx[15] || /*consideredIndex*/
        ctx[1] === /*index*/
        ctx[15]
      ),
      name: (
        /*propertyNames*/
        ctx[3][
          /*index*/
          ctx[15]
        ]
      ),
      type: (
        /*typeOf*/
        ctx[7](
          /*index*/
          ctx[15]
        )
      )
    }
  });
  propertyselectionoption.$on(
    "consider",
    /*consider*/
    ctx[6]
  );
  return {
    c() {
      create_component(propertyselectionoption.$$.fragment);
    },
    m(target, anchor) {
      mount_component(propertyselectionoption, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const propertyselectionoption_changes = {};
      if (dirty & /*index*/
      32768) propertyselectionoption_changes.index = /*index*/
      ctx2[15];
      if (dirty & /*selectedIndex, index, consideredIndex*/
      32774) propertyselectionoption_changes.selected = /*selectedIndex*/
      ctx2[2] === /*index*/
      ctx2[15] || /*consideredIndex*/
      ctx2[1] === /*index*/
      ctx2[15];
      if (dirty & /*propertyNames, index*/
      32776) propertyselectionoption_changes.name = /*propertyNames*/
      ctx2[3][
        /*index*/
        ctx2[15]
      ];
      if (dirty & /*index*/
      32768) propertyselectionoption_changes.type = /*typeOf*/
      ctx2[7](
        /*index*/
        ctx2[15]
      );
      propertyselectionoption.$set(propertyselectionoption_changes);
    },
    i(local) {
      if (current) return;
      transition_in(propertyselectionoption.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(propertyselectionoption.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(propertyselectionoption, detaching);
    }
  };
}
function create_fragment$8(ctx) {
  let select_1;
  let current;
  select_1 = new Select({
    props: {
      class: "timeline-property-select",
      tabindex: (
        /*tabindex*/
        ctx[0]
      ),
      selectedIndex: (
        /*selectedIndex*/
        ctx[2]
      ),
      itemCount: (
        /*propertyCount*/
        ctx[4]
      ),
      $$slots: {
        item: [
          create_item_slot,
          ({ index }) => ({ 15: index }),
          ({ index }) => index ? 32768 : 0
        ]
      },
      $$scope: { ctx }
    }
  });
  select_1.$on(
    "changed",
    /*onChanged*/
    ctx[5]
  );
  select_1.$on(
    "showing",
    /*getPropertyList*/
    ctx[8]
  );
  select_1.$on("shown", styleSelectDialog);
  return {
    c() {
      create_component(select_1.$$.fragment);
    },
    m(target, anchor) {
      mount_component(select_1, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const select_1_changes = {};
      if (dirty & /*tabindex*/
      1) select_1_changes.tabindex = /*tabindex*/
      ctx2[0];
      if (dirty & /*selectedIndex*/
      4) select_1_changes.selectedIndex = /*selectedIndex*/
      ctx2[2];
      if (dirty & /*propertyCount*/
      16) select_1_changes.itemCount = /*propertyCount*/
      ctx2[4];
      if (dirty & /*$$scope, index, selectedIndex, consideredIndex, propertyNames*/
      98318) {
        select_1_changes.$$scope = { dirty, ctx: ctx2 };
      }
      select_1.$set(select_1_changes);
    },
    i(local) {
      if (current) return;
      transition_in(select_1.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(select_1.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(select_1, detaching);
    }
  };
}
function styleSelectDialog() {
  var _a;
  (_a = this.getDialog()) == null ? void 0 : _a.classList.add("timeline-property-select-popup");
}
function instance$8($$self, $$props, $$invalidate) {
  let selectedPropertyName;
  let propertyNames;
  let propertyCount;
  const alwaysAvailableProperties = [TimelineNoteSorterProperty.Created, TimelineNoteSorterProperty.Modified];
  let { order } = $$props;
  let { tabindex } = $$props;
  const dispatch2 = createEventDispatcher();
  let availableProperties = alwaysAvailableProperties;
  let consideredIndex = -1;
  let selectedIndex = -1;
  function select(index) {
    selectedPropertyName = propertyNames[index];
    $$invalidate(2, selectedIndex = index);
    $$invalidate(1, consideredIndex = -1);
    const selectedProperty = availableProperties[index];
    order.selectProperty(selectedProperty);
    dispatch2("selected", selectedProperty);
  }
  function onChanged(event) {
    select(event.detail);
  }
  function consider(event) {
    $$invalidate(1, consideredIndex = event.detail);
  }
  function typeOf(index) {
    return availableProperties[index].type();
  }
  async function getPropertyList() {
    const propertyList = await order.availableProperties();
    $$invalidate(10, availableProperties = propertyList);
    $$invalidate(2, selectedIndex = propertyList.findIndex((property) => property.name() === selectedPropertyName));
    if (selectedIndex === -1) {
      select(0);
    }
  }
  onMount(() => {
    getPropertyList();
  });
  $$self.$$set = ($$props2) => {
    if ("order" in $$props2) $$invalidate(9, order = $$props2.order);
    if ("tabindex" in $$props2) $$invalidate(0, tabindex = $$props2.tabindex);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*order*/
    512) {
      selectedPropertyName = order.selectedProperty().name();
    }
    if ($$self.$$.dirty & /*availableProperties*/
    1024) {
      $$invalidate(3, propertyNames = availableProperties.map((it) => it.name()));
    }
    if ($$self.$$.dirty & /*availableProperties*/
    1024) {
      $$invalidate(4, propertyCount = availableProperties.length);
    }
  };
  return [
    tabindex,
    consideredIndex,
    selectedIndex,
    propertyNames,
    propertyCount,
    onChanged,
    consider,
    typeOf,
    getPropertyList,
    order,
    availableProperties
  ];
}
class TimelineNoteSorterPropertySelect extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$8, create_fragment$8, safe_not_equal, { order: 9, tabindex: 0 });
  }
}
function create_fragment$7(ctx) {
  let div;
  let input;
  let div_class_value;
  let mounted;
  let dispose;
  return {
    c() {
      div = element("div");
      input = element("input");
      attr(input, "type", "checkbox");
      attr(input, "tabindex", "0");
      input.disabled = /*disabled*/
      ctx[3];
      attr(div, "class", div_class_value = "checkbox-container " + /*checked*/
      (ctx[0] ? "is-enabled" : "") + " " + /*className*/
      ctx[1] + " svelte-5h2myb");
      attr(
        div,
        "tabindex",
        /*tabindex*/
        ctx[2]
      );
      toggle_class(
        div,
        "disabled",
        /*disabled*/
        ctx[3]
      );
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      input.checked = /*wasChecked*/
      ctx[4];
      if (!mounted) {
        dispose = listen(
          input,
          "change",
          /*input_change_handler*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*disabled*/
      8) {
        input.disabled = /*disabled*/
        ctx2[3];
      }
      if (dirty & /*wasChecked*/
      16) {
        input.checked = /*wasChecked*/
        ctx2[4];
      }
      if (dirty & /*checked, className*/
      3 && div_class_value !== (div_class_value = "checkbox-container " + /*checked*/
      (ctx2[0] ? "is-enabled" : "") + " " + /*className*/
      ctx2[1] + " svelte-5h2myb")) {
        attr(div, "class", div_class_value);
      }
      if (dirty & /*tabindex*/
      4) {
        attr(
          div,
          "tabindex",
          /*tabindex*/
          ctx2[2]
        );
      }
      if (dirty & /*checked, className, disabled*/
      11) {
        toggle_class(
          div,
          "disabled",
          /*disabled*/
          ctx2[3]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$7($$self, $$props, $$invalidate) {
  let { class: className = "" } = $$props;
  let { checked = false } = $$props;
  let { tabindex = 0 } = $$props;
  let { disabled = false } = $$props;
  let wasChecked = checked;
  function input_change_handler() {
    wasChecked = this.checked;
    $$invalidate(4, wasChecked);
  }
  $$self.$$set = ($$props2) => {
    if ("class" in $$props2) $$invalidate(1, className = $$props2.class);
    if ("checked" in $$props2) $$invalidate(0, checked = $$props2.checked);
    if ("tabindex" in $$props2) $$invalidate(2, tabindex = $$props2.tabindex);
    if ("disabled" in $$props2) $$invalidate(3, disabled = $$props2.disabled);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*wasChecked, checked, disabled*/
    25) {
      if (wasChecked !== checked) {
        if (!disabled) {
          $$invalidate(0, checked = wasChecked);
        }
      }
    }
  };
  return [checked, className, tabindex, disabled, wasChecked, input_change_handler];
}
class ObsidianCheckbox extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$7, create_fragment$7, safe_not_equal, {
      class: 1,
      checked: 0,
      tabindex: 2,
      disabled: 3
    });
  }
}
function create_fragment$6(ctx) {
  let label;
  let t0;
  let t1;
  let obsidiancheckbox;
  let updating_checked;
  let current;
  function obsidiancheckbox_checked_binding(value) {
    ctx[7](value);
  }
  let obsidiancheckbox_props = {
    class: (
      /*mod*/
      ctx[6]
    ),
    tabindex: (
      /*tabindex*/
      ctx[2]
    ),
    disabled: (
      /*disabled*/
      ctx[4]
    )
  };
  if (
    /*checked*/
    ctx[0] !== void 0
  ) {
    obsidiancheckbox_props.checked = /*checked*/
    ctx[0];
  }
  obsidiancheckbox = new ObsidianCheckbox({ props: obsidiancheckbox_props });
  binding_callbacks.push(() => bind(obsidiancheckbox, "checked", obsidiancheckbox_checked_binding));
  return {
    c() {
      label = element("label");
      t0 = text(
        /*name*/
        ctx[1]
      );
      t1 = space();
      create_component(obsidiancheckbox.$$.fragment);
      attr(
        label,
        "aria-label",
        /*hint*/
        ctx[5]
      );
      attr(
        label,
        "class",
        /*className*/
        ctx[3]
      );
      attr(
        label,
        "aria-disabled",
        /*disabled*/
        ctx[4]
      );
    },
    m(target, anchor) {
      insert(target, label, anchor);
      append(label, t0);
      append(label, t1);
      mount_component(obsidiancheckbox, label, null);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (!current || dirty & /*name*/
      2) set_data(
        t0,
        /*name*/
        ctx2[1]
      );
      const obsidiancheckbox_changes = {};
      if (dirty & /*mod*/
      64) obsidiancheckbox_changes.class = /*mod*/
      ctx2[6];
      if (dirty & /*tabindex*/
      4) obsidiancheckbox_changes.tabindex = /*tabindex*/
      ctx2[2];
      if (dirty & /*disabled*/
      16) obsidiancheckbox_changes.disabled = /*disabled*/
      ctx2[4];
      if (!updating_checked && dirty & /*checked*/
      1) {
        updating_checked = true;
        obsidiancheckbox_changes.checked = /*checked*/
        ctx2[0];
        add_flush_callback(() => updating_checked = false);
      }
      obsidiancheckbox.$set(obsidiancheckbox_changes);
      if (!current || dirty & /*hint*/
      32) {
        attr(
          label,
          "aria-label",
          /*hint*/
          ctx2[5]
        );
      }
      if (!current || dirty & /*className*/
      8) {
        attr(
          label,
          "class",
          /*className*/
          ctx2[3]
        );
      }
      if (!current || dirty & /*disabled*/
      16) {
        attr(
          label,
          "aria-disabled",
          /*disabled*/
          ctx2[4]
        );
      }
    },
    i(local) {
      if (current) return;
      transition_in(obsidiancheckbox.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(obsidiancheckbox.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(label);
      }
      destroy_component(obsidiancheckbox);
    }
  };
}
function instance$6($$self, $$props, $$invalidate) {
  let { name } = $$props;
  let { tabindex } = $$props;
  let { checked = false } = $$props;
  let { class: className = "" } = $$props;
  let { disabled = false } = $$props;
  let { hint = "" } = $$props;
  let { mod = void 0 } = $$props;
  function obsidiancheckbox_checked_binding(value) {
    checked = value;
    $$invalidate(0, checked);
  }
  $$self.$$set = ($$props2) => {
    if ("name" in $$props2) $$invalidate(1, name = $$props2.name);
    if ("tabindex" in $$props2) $$invalidate(2, tabindex = $$props2.tabindex);
    if ("checked" in $$props2) $$invalidate(0, checked = $$props2.checked);
    if ("class" in $$props2) $$invalidate(3, className = $$props2.class);
    if ("disabled" in $$props2) $$invalidate(4, disabled = $$props2.disabled);
    if ("hint" in $$props2) $$invalidate(5, hint = $$props2.hint);
    if ("mod" in $$props2) $$invalidate(6, mod = $$props2.mod);
  };
  return [
    checked,
    name,
    tabindex,
    className,
    disabled,
    hint,
    mod,
    obsidiancheckbox_checked_binding
  ];
}
class ToggleInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$6, create_fragment$6, safe_not_equal, {
      name: 1,
      tabindex: 2,
      checked: 0,
      class: 3,
      disabled: 4,
      hint: 5,
      mod: 6
    });
  }
}
function create_fragment$5(ctx) {
  let toggleinput;
  let updating_checked;
  let current;
  function toggleinput_checked_binding(value) {
    ctx[3](value);
  }
  let toggleinput_props = {
    class: "numeric-property-int-toggle",
    name: "Use whole numbers",
    hint: "When creating a new note, round to the nearest whole number for this property value",
    tabindex: (
      /*tabindex*/
      ctx[1]
    ),
    mod: "mod-small",
    disabled: !/*property*/
    ctx[0].canBeChanged()
  };
  if (
    /*useIntegers*/
    ctx[2] !== void 0
  ) {
    toggleinput_props.checked = /*useIntegers*/
    ctx[2];
  }
  toggleinput = new ToggleInput({ props: toggleinput_props });
  binding_callbacks.push(() => bind(toggleinput, "checked", toggleinput_checked_binding));
  return {
    c() {
      create_component(toggleinput.$$.fragment);
    },
    m(target, anchor) {
      mount_component(toggleinput, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const toggleinput_changes = {};
      if (dirty & /*tabindex*/
      2) toggleinput_changes.tabindex = /*tabindex*/
      ctx2[1];
      if (dirty & /*property*/
      1) toggleinput_changes.disabled = !/*property*/
      ctx2[0].canBeChanged();
      if (!updating_checked && dirty & /*useIntegers*/
      4) {
        updating_checked = true;
        toggleinput_changes.checked = /*useIntegers*/
        ctx2[2];
        add_flush_callback(() => updating_checked = false);
      }
      toggleinput.$set(toggleinput_changes);
    },
    i(local) {
      if (current) return;
      transition_in(toggleinput.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(toggleinput.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(toggleinput, detaching);
    }
  };
}
function instance$5($$self, $$props, $$invalidate) {
  let { property } = $$props;
  let { tabindex } = $$props;
  let useIntegers = property.prefersIntegers();
  function toggleinput_checked_binding(value) {
    useIntegers = value;
    $$invalidate(2, useIntegers), $$invalidate(0, property);
  }
  $$self.$$set = ($$props2) => {
    if ("property" in $$props2) $$invalidate(0, property = $$props2.property);
    if ("tabindex" in $$props2) $$invalidate(1, tabindex = $$props2.tabindex);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*useIntegers, property*/
    5) {
      if (useIntegers !== property.prefersIntegers()) {
        if (property.canBeChanged()) {
          if (useIntegers) property.useIntegers();
          else property.useFloats();
        }
        $$invalidate(2, useIntegers = property.prefersIntegers());
      }
    }
  };
  return [property, tabindex, useIntegers, toggleinput_checked_binding];
}
class NumericPropertyIntToggle extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$5, create_fragment$5, safe_not_equal, { property: 0, tabindex: 1 });
  }
}
function create_default_slot$1(ctx) {
  let timelinenotesorterpropertyselect;
  let t;
  let numericpropertyinttoggle;
  let current;
  timelinenotesorterpropertyselect = new TimelineNoteSorterPropertySelect({
    props: {
      tabindex: 0,
      order: (
        /*selector*/
        ctx[1].timelineNoteSorterSelector
      )
    }
  });
  timelinenotesorterpropertyselect.$on(
    "selected",
    /*selected_handler*/
    ctx[4]
  );
  numericpropertyinttoggle = new NumericPropertyIntToggle({
    props: {
      property: (
        /*selector*/
        ctx[1].selectedProperty()
      ),
      tabindex: 1
    }
  });
  return {
    c() {
      create_component(timelinenotesorterpropertyselect.$$.fragment);
      t = space();
      create_component(numericpropertyinttoggle.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelinenotesorterpropertyselect, target, anchor);
      insert(target, t, anchor);
      mount_component(numericpropertyinttoggle, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelinenotesorterpropertyselect_changes = {};
      if (dirty & /*selector*/
      2) timelinenotesorterpropertyselect_changes.order = /*selector*/
      ctx2[1].timelineNoteSorterSelector;
      timelinenotesorterpropertyselect.$set(timelinenotesorterpropertyselect_changes);
      const numericpropertyinttoggle_changes = {};
      if (dirty & /*selector*/
      2) numericpropertyinttoggle_changes.property = /*selector*/
      ctx2[1].selectedProperty();
      numericpropertyinttoggle.$set(numericpropertyinttoggle_changes);
    },
    i(local) {
      if (current) return;
      transition_in(timelinenotesorterpropertyselect.$$.fragment, local);
      transition_in(numericpropertyinttoggle.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelinenotesorterpropertyselect.$$.fragment, local);
      transition_out(numericpropertyinttoggle.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      destroy_component(timelinenotesorterpropertyselect, detaching);
      destroy_component(numericpropertyinttoggle, detaching);
    }
  };
}
function create_fragment$4(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[5](value);
  }
  let collapsablesection_props = {
    name: "Property",
    class: "timeline-property-setting",
    $$slots: { default: [create_default_slot$1] },
    $$scope: { ctx }
  };
  if (
    /*$collapsed*/
    ctx[2] !== void 0
  ) {
    collapsablesection_props.collapsed = /*$collapsed*/
    ctx[2];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const collapsablesection_changes = {};
      if (dirty & /*$$scope, selector*/
      66) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty & /*$collapsed*/
      4) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*$collapsed*/
        ctx2[2];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
    },
    i(local) {
      if (current) return;
      transition_in(collapsablesection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(collapsablesection, detaching);
    }
  };
}
function instance$4($$self, $$props, $$invalidate) {
  let $collapsed, $$unsubscribe_collapsed = noop, $$subscribe_collapsed = () => ($$unsubscribe_collapsed(), $$unsubscribe_collapsed = subscribe(collapsed, ($$value) => $$invalidate(2, $collapsed = $$value)), collapsed);
  $$self.$$.on_destroy.push(() => $$unsubscribe_collapsed());
  let { collapsed } = $$props;
  $$subscribe_collapsed();
  let { selector } = $$props;
  const dispatch2 = createEventDispatcher();
  const selected_handler = () => dispatch2("propertySelected", selector.selectedProperty());
  function collapsablesection_collapsed_binding(value) {
    $collapsed = value;
    collapsed.set($collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("collapsed" in $$props2) $$subscribe_collapsed($$invalidate(0, collapsed = $$props2.collapsed));
    if ("selector" in $$props2) $$invalidate(1, selector = $$props2.selector);
  };
  return [
    collapsed,
    selector,
    $collapsed,
    dispatch2,
    selected_handler,
    collapsablesection_collapsed_binding
  ];
}
class TimelinePropertySection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$4, create_fragment$4, safe_not_equal, { collapsed: 0, selector: 1 });
  }
}
function create_fragment$3(ctx) {
  let div;
  let input;
  let mounted;
  let dispose;
  let input_levels = [
    { type: "search" },
    { enterkeyhint: "search" },
    { spellcheck: "false" },
    /*$$restProps*/
    ctx[1]
  ];
  let input_data = {};
  for (let i = 0; i < input_levels.length; i += 1) {
    input_data = assign(input_data, input_levels[i]);
  }
  return {
    c() {
      div = element("div");
      input = element("input");
      set_attributes(input, input_data);
      attr(div, "class", "search-input-container");
    },
    m(target, anchor) {
      insert(target, div, anchor);
      append(div, input);
      if (input.autofocus) input.focus();
      set_input_value(
        input,
        /*value*/
        ctx[0]
      );
      if (!mounted) {
        dispose = listen(
          input,
          "input",
          /*input_input_handler*/
          ctx[2]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      set_attributes(input, input_data = get_spread_update(input_levels, [
        { type: "search" },
        { enterkeyhint: "search" },
        { spellcheck: "false" },
        dirty & /*$$restProps*/
        2 && /*$$restProps*/
        ctx2[1]
      ]));
      if (dirty & /*value*/
      1 && input.value !== /*value*/
      ctx2[0]) {
        set_input_value(
          input,
          /*value*/
          ctx2[0]
        );
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching) {
        detach(div);
      }
      mounted = false;
      dispose();
    }
  };
}
function instance$3($$self, $$props, $$invalidate) {
  const omit_props_names = ["value"];
  let $$restProps = compute_rest_props($$props, omit_props_names);
  let { value } = $$props;
  function input_input_handler() {
    value = this.value;
    $$invalidate(0, value);
  }
  $$self.$$set = ($$new_props) => {
    $$props = assign(assign({}, $$props), exclude_internal_props($$new_props));
    $$invalidate(1, $$restProps = compute_rest_props($$props, omit_props_names));
    if ("value" in $$new_props) $$invalidate(0, value = $$new_props.value);
  };
  return [value, $$restProps, input_input_handler];
}
class ObsidianSearchInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$3, create_fragment$3, safe_not_equal, { value: 0 });
  }
}
function create_fragment$2(ctx) {
  let obsidiansearchinput;
  let updating_value;
  let current;
  function obsidiansearchinput_value_binding(value) {
    ctx[2](value);
  }
  let obsidiansearchinput_props = { placeholder: "Search files..." };
  if (
    /*query*/
    ctx[0] !== void 0
  ) {
    obsidiansearchinput_props.value = /*query*/
    ctx[0];
  }
  obsidiansearchinput = new ObsidianSearchInput({ props: obsidiansearchinput_props });
  binding_callbacks.push(() => bind(obsidiansearchinput, "value", obsidiansearchinput_value_binding));
  return {
    c() {
      create_component(obsidiansearchinput.$$.fragment);
    },
    m(target, anchor) {
      mount_component(obsidiansearchinput, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const obsidiansearchinput_changes = {};
      if (!updating_value && dirty & /*query*/
      1) {
        updating_value = true;
        obsidiansearchinput_changes.value = /*query*/
        ctx2[0];
        add_flush_callback(() => updating_value = false);
      }
      obsidiansearchinput.$set(obsidiansearchinput_changes);
    },
    i(local) {
      if (current) return;
      transition_in(obsidiansearchinput.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(obsidiansearchinput.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(obsidiansearchinput, detaching);
    }
  };
}
function instance$2($$self, $$props, $$invalidate) {
  let { filter } = $$props;
  let query = filter.query();
  function obsidiansearchinput_value_binding(value) {
    query = value;
    $$invalidate(0, query), $$invalidate(1, filter);
  }
  $$self.$$set = ($$props2) => {
    if ("filter" in $$props2) $$invalidate(1, filter = $$props2.filter);
  };
  $$self.$$.update = () => {
    if ($$self.$$.dirty & /*query, filter*/
    3) {
      if (query != filter.query()) {
        filter.filterByQuery(query);
        $$invalidate(0, query = filter.query());
      }
    }
  };
  return [query, filter, obsidiansearchinput_value_binding];
}
class TimelineQueryFilterInput extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$2, create_fragment$2, safe_not_equal, { filter: 1 });
  }
}
function create_default_slot(ctx) {
  let timelinequeryfilterinput;
  let current;
  timelinequeryfilterinput = new TimelineQueryFilterInput({ props: { filter: (
    /*filter*/
    ctx[0]
  ) } });
  return {
    c() {
      create_component(timelinequeryfilterinput.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelinequeryfilterinput, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelinequeryfilterinput_changes = {};
      if (dirty & /*filter*/
      1) timelinequeryfilterinput_changes.filter = /*filter*/
      ctx2[0];
      timelinequeryfilterinput.$set(timelinequeryfilterinput_changes);
    },
    i(local) {
      if (current) return;
      transition_in(timelinequeryfilterinput.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelinequeryfilterinput.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(timelinequeryfilterinput, detaching);
    }
  };
}
function create_fragment$1(ctx) {
  let collapsablesection;
  let updating_collapsed;
  let current;
  function collapsablesection_collapsed_binding(value) {
    ctx[3](value);
  }
  let collapsablesection_props = {
    name: "Filter",
    $$slots: { default: [create_default_slot] },
    $$scope: { ctx }
  };
  if (
    /*$collapsed*/
    ctx[2] !== void 0
  ) {
    collapsablesection_props.collapsed = /*$collapsed*/
    ctx[2];
  }
  collapsablesection = new CollapsableSection({ props: collapsablesection_props });
  binding_callbacks.push(() => bind(collapsablesection, "collapsed", collapsablesection_collapsed_binding));
  return {
    c() {
      create_component(collapsablesection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(collapsablesection, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      const collapsablesection_changes = {};
      if (dirty & /*$$scope, filter*/
      17) {
        collapsablesection_changes.$$scope = { dirty, ctx: ctx2 };
      }
      if (!updating_collapsed && dirty & /*$collapsed*/
      4) {
        updating_collapsed = true;
        collapsablesection_changes.collapsed = /*$collapsed*/
        ctx2[2];
        add_flush_callback(() => updating_collapsed = false);
      }
      collapsablesection.$set(collapsablesection_changes);
    },
    i(local) {
      if (current) return;
      transition_in(collapsablesection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(collapsablesection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(collapsablesection, detaching);
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let $collapsed, $$unsubscribe_collapsed = noop, $$subscribe_collapsed = () => ($$unsubscribe_collapsed(), $$unsubscribe_collapsed = subscribe(collapsed, ($$value) => $$invalidate(2, $collapsed = $$value)), collapsed);
  $$self.$$.on_destroy.push(() => $$unsubscribe_collapsed());
  let { filter } = $$props;
  let { collapsed } = $$props;
  $$subscribe_collapsed();
  function collapsablesection_collapsed_binding(value) {
    $collapsed = value;
    collapsed.set($collapsed);
  }
  $$self.$$set = ($$props2) => {
    if ("filter" in $$props2) $$invalidate(0, filter = $$props2.filter);
    if ("collapsed" in $$props2) $$subscribe_collapsed($$invalidate(1, collapsed = $$props2.collapsed));
  };
  return [filter, collapsed, $collapsed, collapsablesection_collapsed_binding];
}
class TimelineFilterSection extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, { filter: 0, collapsed: 1 });
  }
}
const _TimelineNoteSorterSelector = class _TimelineNoteSorterSelector {
  constructor(selectedProperty, noteProperties, saveSelectedPropertyName) {
    __privateAdd(this, _selectedProperty);
    __privateAdd(this, _saveSelectedPropertyName);
    __privateAdd(this, _noteProperties);
    __privateSet(this, _selectedProperty, selectedProperty);
    __privateSet(this, _noteProperties, noteProperties);
    __privateSet(this, _saveSelectedPropertyName, saveSelectedPropertyName);
  }
  /**
   * Ensures that the selected property still exists, and is still of a
   * supported type
   */
  static async sanitize(selectedPropertyName, noteProperties, saveSelectedPropertyName) {
    const createWithProperty = (property) => {
      return new _TimelineNoteSorterSelector(
        property,
        noteProperties,
        saveSelectedPropertyName
      );
    };
    if (selectedPropertyName === TimelineNoteSorterProperty.Created.name()) {
      return createWithProperty(TimelineNoteSorterProperty.Created);
    }
    if (selectedPropertyName === TimelineNoteSorterProperty.Modified.name()) {
      return createWithProperty(TimelineNoteSorterProperty.Modified);
    }
    const selectedProperty = await noteProperties.getPropertyByName(
      selectedPropertyName
    );
    if (selectedProperty == null) {
      return createWithProperty(TimelineNoteSorterProperty.Created);
    }
    if (!isNumericNoteProperty(selectedProperty)) {
      return createWithProperty(TimelineNoteSorterProperty.Created);
    }
    return createWithProperty(
      TimelineNoteSorterProperty.fromNoteProperty(selectedProperty)
    );
  }
  selectedProperty() {
    return __privateGet(this, _selectedProperty);
  }
  selectProperty(property) {
    __privateSet(this, _selectedProperty, property);
    __privateGet(this, _saveSelectedPropertyName).call(this, property.name());
  }
  async availableProperties() {
    const noteProperties = await __privateGet(this, _noteProperties).listPropertiesOfTypes(
      NotePropertyTypes
    );
    const properties = [
      TimelineNoteSorterProperty.Created,
      TimelineNoteSorterProperty.Modified
    ];
    for (const property of noteProperties) {
      properties.push(
        TimelineNoteSorterProperty.fromNoteProperty(property)
      );
    }
    return properties;
  }
};
_selectedProperty = new WeakMap();
_saveSelectedPropertyName = new WeakMap();
_noteProperties = new WeakMap();
let TimelineNoteSorterSelector = _TimelineNoteSorterSelector;
class TimelineItemValueProperty {
  constructor(name) {
    __privateAdd(this, _name3);
    __privateSet(this, _name3, name);
  }
  name() {
    return __privateGet(this, _name3);
  }
  sanitizeValue(value) {
    if (this.prefersIntegers()) {
      return Math.round(value);
    }
    return value;
  }
  static get Number() {
    return TimelineItemNumberProperty;
  }
  static get Date() {
    return TimelineItemDateProperty;
  }
}
_name3 = new WeakMap();
class TimelineItemNumberProperty extends TimelineItemValueProperty {
  constructor(name, savePreference, preferInts) {
    super(name);
    __privateAdd(this, _savePreference);
    __privateAdd(this, _preferInts);
    __privateSet(this, _savePreference, savePreference);
    __privateSet(this, _preferInts, preferInts != null ? preferInts : true);
  }
  prefersIntegers() {
    return __privateGet(this, _preferInts);
  }
  useIntegers() {
    __privateSet(this, _preferInts, true);
    __privateGet(this, _savePreference).call(this, this.name(), __privateGet(this, _preferInts));
  }
  prefersFloats() {
    return !__privateGet(this, _preferInts);
  }
  useFloats() {
    __privateSet(this, _preferInts, false);
    __privateGet(this, _savePreference).call(this, this.name(), __privateGet(this, _preferInts));
  }
  canBeChanged() {
    return true;
  }
  sanitizeValue(value) {
    if (this.prefersIntegers()) {
      return Math.round(value);
    }
    return value;
  }
}
_savePreference = new WeakMap();
_preferInts = new WeakMap();
class TimelineItemDateProperty extends TimelineItemValueProperty {
  constructor(name) {
    super(name);
  }
  prefersIntegers() {
    return true;
  }
  prefersFloats() {
    return false;
  }
  useFloats() {
  }
  useIntegers() {
  }
  canBeChanged() {
    return false;
  }
  sanitizeValue(value) {
    return Math.round(value);
  }
}
class TimelineProperty {
  constructor(sorter, savePreference, preferInts) {
    __publicField(this, "preference");
    this.sorter = sorter;
    if (sorter.type() !== TimelineNoteSorterPropertyType.Number) {
      this.preference = new TimelineItemValueProperty.Date(sorter.name());
    } else
      this.preference = new TimelineItemValueProperty.Number(
        sorter.name(),
        savePreference,
        preferInts
      );
  }
  name() {
    return this.sorter.name();
  }
  displayedAs() {
    if (this.sorter.type() === TimelineNoteSorterPropertyType.Number) {
      return timelineNumericValueDisplay();
    }
    return timelineDateValueDisplay();
  }
  sortItems(items) {
    const sortProperty = this.sorter;
    items.sort((a, b) => {
      return sortProperty.selectValueFromNote(a.note) - sortProperty.selectValueFromNote(b.note);
    });
  }
  sanitizeValue(value) {
    return this.preference.sanitizeValue(value);
  }
  selectValueFromNote(note) {
    return this.sorter.selectValueFromNote(note);
  }
  prefersFloats() {
    return this.preference.prefersFloats();
  }
  prefersIntegers() {
    return this.preference.prefersIntegers();
  }
  useIntegers() {
    this.preference.useIntegers();
  }
  useFloats() {
    this.preference.useFloats();
  }
  canBeChanged() {
    return this.preference.canBeChanged();
  }
  isCreatedProperty() {
    return this.sorter === TimelineNoteSorterProperty.Created;
  }
  isModifiedProperty() {
    return this.sorter === TimelineNoteSorterProperty.Modified;
  }
}
const _TimelinePropertySelector = class _TimelinePropertySelector {
  constructor(timelineNoteSorterSelector, propertiesPreferences, onPreferencesChanged) {
    __privateAdd(this, _TimelinePropertySelector_instances);
    this.timelineNoteSorterSelector = timelineNoteSorterSelector;
    this.propertiesPreferences = propertiesPreferences;
    this.onPreferencesChanged = onPreferencesChanged;
  }
  /**
   * Initializes a new TimelinePropertySelector by ensuring the selected
   * property still exists, and that each preference has a corresponding
   * property.
   */
  static async sanitize(noteProperties, savedState, onStateChanged) {
    const selector = await TimelineNoteSorterSelector.sanitize(
      savedState.selectedPropertyName,
      noteProperties,
      (selectedPropertyName) => {
        savedState.selectedPropertyName = selectedPropertyName;
        onStateChanged(savedState);
      }
    );
    const properties = await selector.availableProperties();
    const newPreferences = {};
    for (const property of properties) {
      if (savedState.propertyPreferences.hasOwnProperty(property.name())) {
        newPreferences[property.name()] = savedState.propertyPreferences[property.name()];
      }
    }
    return new _TimelinePropertySelector(
      selector,
      newPreferences,
      (preferences) => {
        savedState.propertyPreferences = preferences;
        onStateChanged(savedState);
      }
    );
  }
  selectedProperty() {
    const sortProperty = this.timelineNoteSorterSelector.selectedProperty();
    return new TimelineProperty(
      sortProperty,
      __privateMethod(this, _TimelinePropertySelector_instances, savePropertyPreference_fn).bind(this),
      this.propertiesPreferences[sortProperty.name()]
    );
  }
};
_TimelinePropertySelector_instances = new WeakSet();
savePropertyPreference_fn = function(name, preferInts) {
  this.propertiesPreferences[name] = preferInts;
  this.onPreferencesChanged(this.propertiesPreferences);
};
let TimelinePropertySelector = _TimelinePropertySelector;
class TimelineItemQueryFilter {
  constructor(notes, query, onQueryChange) {
    __privateAdd(this, _filter2);
    __privateAdd(this, _notes);
    __privateAdd(this, _onQueryChange);
    __privateSet(this, _notes, notes);
    __privateSet(this, _onQueryChange, onQueryChange);
    __privateSet(this, _filter2, notes.getInclusiveNoteFilterForQuery(query));
  }
  noteFilter() {
    return __privateGet(this, _filter2);
  }
  query() {
    return __privateGet(this, _filter2).query();
  }
  filterByQuery(query) {
    __privateSet(this, _filter2, __privateGet(this, _notes).getInclusiveNoteFilterForQuery(query));
    __privateGet(this, _onQueryChange).call(this, query);
  }
  async filteredItems(items) {
    const itemsOrNull = await Promise.all(
      [...items].map(async (item) => {
        if (await __privateGet(this, _filter2).matches(item.note)) {
          return item;
        }
        return null;
      })
    );
    return itemsOrNull.filter(exists);
  }
  async accepts(item) {
    return await __privateGet(this, _filter2).matches(item.note);
  }
}
_filter2 = new WeakMap();
_notes = new WeakMap();
_onQueryChange = new WeakMap();
function expectString(defaultValue) {
  return {
    parseOrDefault(data) {
      if (!this.check(data)) {
        return defaultValue;
      }
      return data;
    },
    check(data) {
      return typeof data === "string";
    }
  };
}
function expectNumber(defaultValue) {
  return {
    parseOrDefault(data) {
      if (!this.check(data)) {
        return defaultValue;
      }
      return data;
    },
    check(data) {
      return typeof data === "number";
    }
  };
}
function expectBoolean(defaultValue) {
  return {
    parseOrDefault(data) {
      if (!this.check(data)) {
        return defaultValue;
      }
      return data;
    },
    check(data) {
      return typeof data === "boolean";
    }
  };
}
function optional(schema2) {
  return {
    parseOrDefault(data) {
      if (!this.check(data)) {
        return void 0;
      }
      return schema2.parseOrDefault(data);
    },
    check(data) {
      return typeof data === "undefined" || schema2.check(data);
    }
  };
}
function expectEnum(type, defaultValue) {
  const valueLookup = Object.fromEntries(
    Object.entries(type).map(([k, v]) => [v, k])
  );
  return {
    parseOrDefault(data) {
      if (!this.check(data)) {
        return defaultValue;
      }
      return data;
    },
    check(data) {
      return (typeof data === "string" || typeof data === "number") && data in valueLookup;
    }
  };
}
function expectArray(schema2, options) {
  return {
    parseOrDefault(data) {
      if (!Array.isArray(data)) {
        return Array.from(
          { length: 0 },
          () => schema2.parseOrDefault(null)
        );
      }
      return data.map((it) => schema2.parseOrDefault(it));
    },
    check(data) {
      return Array.isArray(data) && data.every(schema2.check) && true;
    }
  };
}
function expectObject(schema2) {
  return {
    parseOrDefault(data) {
      const obj = {};
      if (typeof data !== "object" || data == null) {
        for (const [k, v] of Object.entries(schema2)) {
          const key = k;
          const value = v;
          obj[key] = value.parseOrDefault(null);
        }
        return obj;
      }
      for (const [k, v] of Object.entries(schema2)) {
        const key = k;
        const value = v;
        obj[key] = value.parseOrDefault(data[key]);
      }
      return obj;
    },
    check(data) {
      if (typeof data !== "object" || data == null) {
        return false;
      }
      for (const [k, v] of Object.entries(schema2)) {
        const key = k;
        const value = v;
        if (!value.check(data[key])) {
          return false;
        }
      }
      return true;
    }
  };
}
function expectRecord(schema2) {
  return {
    parseOrDefault(data) {
      if (typeof data !== "object" || data == null) {
        return {};
      }
      const validEntries = Object.entries(data).map(([key, value]) => {
        if (!schema2.key.check(key)) {
          return null;
        }
        return [key, schema2.value.parseOrDefault(value)];
      }).filter(exists);
      return Object.fromEntries(validEntries);
    },
    check(data) {
      if (typeof data !== "object" || data == null) {
        return false;
      }
      return Object.entries(data).every(
        ([key, value]) => schema2.key.check(key) && schema2.value.check(value)
      );
    }
  };
}
class TimelineGroup {
  constructor(notes, query, color) {
    __publicField(this, "_color");
    __publicField(this, "_notes");
    __publicField(this, "_filter");
    this._color = color;
    this._notes = notes;
    this._filter = notes.getExclusiveNoteFilterForQuery(query);
  }
  noteFilter() {
    return this._filter;
  }
  query() {
    return this._filter.query();
  }
  filterByQuery(query) {
    this._filter = this._notes.getExclusiveNoteFilterForQuery(query);
    this.onChanged();
  }
  color() {
    return this._color;
  }
  recolor(color) {
    this._color = color;
    this.onChanged();
  }
  onChanged() {
  }
}
const schema = expectObject({
  query: expectString(""),
  color: expectString("")
});
const defaultGroupColors = [
  "#e05252",
  "#e0b152",
  "#b1e052",
  "#52e052",
  "#52e0b1",
  "#52b1e0",
  "#5252e0",
  "#b152e0",
  "#e052b1"
];
class TimelineGroups {
  constructor(groups, createGroup) {
    __publicField(this, "_groups");
    this.createGroup = createGroup;
    this._groups = groups.slice();
  }
  groups() {
    return this._groups;
  }
  appendNewGroup() {
    const group2 = this.createGroup(
      defaultGroupColors[this._groups.length % defaultGroupColors.length]
    );
    this._groups.push(group2);
    this.onChanged();
    return group2;
  }
  removeGroup(index) {
    const removed = this._groups.splice(index, 1);
    console.log(
      "removed",
      index,
      "with",
      removed[0].color(),
      removed[0].query()
    );
    this.onChanged();
    return removed[0];
  }
  moveGroup(from, to) {
    if (from === to) return null;
    const removed = this._groups.splice(from, 1);
    this._groups.splice(to, 0, removed[0]);
    this.onChanged();
    return removed[0];
  }
  onChanged() {
  }
}
function create_if_block(ctx) {
  let timelinepropertysection;
  let current;
  timelinepropertysection = new TimelinePropertySection({
    props: {
      collapsed: (
        /*settings*/
        ctx[10].namespace("property").make("collapsed", true)
      ),
      selector: (
        /*propertySelector*/
        ctx[5]
      )
    }
  });
  timelinepropertysection.$on(
    "propertySelected",
    /*propertySelected_handler*/
    ctx[30]
  );
  return {
    c() {
      create_component(timelinepropertysection.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelinepropertysection, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelinepropertysection_changes = {};
      if (dirty[0] & /*propertySelector*/
      32) timelinepropertysection_changes.selector = /*propertySelector*/
      ctx2[5];
      timelinepropertysection.$set(timelinepropertysection_changes);
    },
    i(local) {
      if (current) return;
      transition_in(timelinepropertysection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelinepropertysection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(timelinepropertysection, detaching);
    }
  };
}
function create_additional_settings_slot(ctx) {
  let t;
  let timelinefiltersection;
  let current;
  let if_block = (
    /*propertySelector*/
    ctx[5] && create_if_block(ctx)
  );
  timelinefiltersection = new TimelineFilterSection({
    props: {
      collapsed: (
        /*settings*/
        ctx[10].namespace("filter").make("collapsed", true)
      ),
      filter: (
        /*filter*/
        ctx[13]
      )
    }
  });
  return {
    c() {
      if (if_block) if_block.c();
      t = space();
      create_component(timelinefiltersection.$$.fragment);
    },
    m(target, anchor) {
      if (if_block) if_block.m(target, anchor);
      insert(target, t, anchor);
      mount_component(timelinefiltersection, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      if (
        /*propertySelector*/
        ctx2[5]
      ) {
        if (if_block) {
          if_block.p(ctx2, dirty);
          if (dirty[0] & /*propertySelector*/
          32) {
            transition_in(if_block, 1);
          }
        } else {
          if_block = create_if_block(ctx2);
          if_block.c();
          transition_in(if_block, 1);
          if_block.m(t.parentNode, t);
        }
      } else if (if_block) {
        group_outros();
        transition_out(if_block, 1, 1, () => {
          if_block = null;
        });
        check_outros();
      }
    },
    i(local) {
      if (current) return;
      transition_in(if_block);
      transition_in(timelinefiltersection.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(if_block);
      transition_out(timelinefiltersection.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      if (detaching) {
        detach(t);
      }
      if (if_block) if_block.d(detaching);
      destroy_component(timelinefiltersection, detaching);
    }
  };
}
function create_fragment(ctx) {
  let timelineview;
  let current;
  let timelineview_props = {
    items: (
      /*items*/
      ctx[3]
    ),
    namespacedWritable: (
      /*viewModel*/
      ctx[1]
    ),
    display: (
      /*display*/
      ctx[7]
    ),
    groups: (
      /*timelineGroups*/
      ctx[4]
    ),
    pendingGroupUpdates: (
      /*itemRecolorQueueLength*/
      ctx[8]
    ),
    controlBindings: {},
    groupEvents: {
      onGroupAppended: func,
      onGroupColored: (
        /*func_1*/
        ctx[31]
      ),
      onGroupQueried: (
        /*func_2*/
        ctx[32]
      ),
      onGroupsReordered: (
        /*func_3*/
        ctx[33]
      ),
      onGroupRemoved: (
        /*func_4*/
        ctx[34]
      )
    },
    onMoveItem: (
      /*moveItem*/
      ctx[16]
    ),
    onPreviewNewItemValue: (
      /*onPreviewNewItemValue*/
      ctx[20]
    ),
    oncontextmenu: (
      /*func_5*/
      ctx[35]
    ),
    openDialog: (
      /*openModal*/
      ctx[0]
    ),
    $$slots: {
      "additional-settings": [create_additional_settings_slot]
    },
    $$scope: { ctx }
  };
  timelineview = new Timeline({ props: timelineview_props });
  ctx[36](timelineview);
  timelineview.$on(
    "select",
    /*select_handler*/
    ctx[37]
  );
  timelineview.$on(
    "focus",
    /*focus_handler*/
    ctx[38]
  );
  timelineview.$on(
    "create",
    /*create_handler*/
    ctx[39]
  );
  return {
    c() {
      create_component(timelineview.$$.fragment);
    },
    m(target, anchor) {
      mount_component(timelineview, target, anchor);
      current = true;
    },
    p(ctx2, dirty) {
      const timelineview_changes = {};
      if (dirty[0] & /*items*/
      8) timelineview_changes.items = /*items*/
      ctx2[3];
      if (dirty[0] & /*viewModel*/
      2) timelineview_changes.namespacedWritable = /*viewModel*/
      ctx2[1];
      if (dirty[0] & /*display*/
      128) timelineview_changes.display = /*display*/
      ctx2[7];
      if (dirty[0] & /*timelineGroups*/
      16) timelineview_changes.groups = /*timelineGroups*/
      ctx2[4];
      if (dirty[0] & /*itemRecolorQueueLength*/
      256) timelineview_changes.pendingGroupUpdates = /*itemRecolorQueueLength*/
      ctx2[8];
      if (dirty[0] & /*timelineView*/
      64) timelineview_changes.groupEvents = {
        onGroupAppended: func,
        onGroupColored: (
          /*func_1*/
          ctx2[31]
        ),
        onGroupQueried: (
          /*func_2*/
          ctx2[32]
        ),
        onGroupsReordered: (
          /*func_3*/
          ctx2[33]
        ),
        onGroupRemoved: (
          /*func_4*/
          ctx2[34]
        )
      };
      if (dirty[0] & /*oncontextmenu*/
      4) timelineview_changes.oncontextmenu = /*func_5*/
      ctx2[35];
      if (dirty[0] & /*openModal*/
      1) timelineview_changes.openDialog = /*openModal*/
      ctx2[0];
      if (dirty[0] & /*propertySelector*/
      32 | dirty[1] & /*$$scope*/
      131072) {
        timelineview_changes.$$scope = { dirty, ctx: ctx2 };
      }
      timelineview.$set(timelineview_changes);
    },
    i(local) {
      if (current) return;
      transition_in(timelineview.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(timelineview.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      ctx[36](null);
      destroy_component(timelineview, detaching);
    }
  };
}
const func = function(group2, groups) {
};
function instance($$self, $$props, $$invalidate) {
  let $filterQuery;
  let { noteRepository } = $$props;
  let { notePropertyRepository } = $$props;
  let { openModal: openModal2 } = $$props;
  let { viewModel } = $$props;
  let { isNew = false } = $$props;
  let { oncontextmenu = () => {
  } } = $$props;
  const dispatch2 = createEventDispatcher();
  const settings = viewModel.namespace("settings");
  let itemsById = /* @__PURE__ */ new Map();
  let items = new MutableSortedArray((item) => item.value());
  let currentFilteringId = 0;
  const filterQuery = settings.namespace("filter").make("query", "");
  component_subscribe($$self, filterQuery, (value) => $$invalidate(41, $filterQuery = value));
  let filter = new TimelineItemQueryFilter(
    noteRepository,
    $filterQuery,
    async (query) => {
      filterQuery.set(query);
      const filteringId = currentFilteringId + 1;
      currentFilteringId = filteringId;
      const newItems = [];
      for (const item of Array.from(itemsById.values())) {
        if (currentFilteringId !== filteringId) break;
        if (await filter.accepts(item)) {
          newItems.push(item);
        }
      }
      $$invalidate(3, items = new MutableSortedArray((item) => item.value(), ...newItems));
    }
  );
  const groupsNamespace = settings.namespace("groups");
  function saveGroups() {
    groupsNamespace.make("groups", []).set(timelineGroups.groups().map((group2) => ({
      query: group2.query(),
      color: group2.color()
    })));
  }
  function createGroup(query, color) {
    const group2 = new TimelineGroup(noteRepository, query, color);
    group2.onChanged = saveGroups;
    return group2;
  }
  const timelineGroups = new TimelineGroups(get_store_value(groupsNamespace.make("groups", [])).map((group2) => schema.parseOrDefault(group2)).map(({ query, color }) => createGroup(query, color)), (color) => createGroup("", color));
  timelineGroups.onChanged = saveGroups;
  function openFile(event, item) {
    var _a;
    const note = (_a = itemsById.get(item.id())) == null ? void 0 : _a.note;
    if (note == null) {
      return;
    }
    dispatch2("noteSelected", { note, event });
  }
  let propertySelector;
  async function createItem(item) {
    const property = propertySelector.selectedProperty();
    let creation;
    if (property.isCreatedProperty()) {
      creation = { created: item.value };
    } else if (property.isModifiedProperty()) {
      creation = { modified: item.value };
    } else {
      creation = {
        properties: {
          [property.name()]: property.sanitizeValue(item.value)
        }
      };
    }
    dispatch2("createNote", creation);
  }
  function moveItem(item, value) {
    const noteItem = itemsById.get(item.id());
    if (noteItem == null) {
      return false;
    }
    const property = propertySelector.selectedProperty();
    value = property.sanitizeValue(value);
    if (property.isCreatedProperty()) {
      return dispatch2(
        "modifyNote",
        {
          note: noteItem.note,
          modification: { created: value }
        },
        { cancelable: true }
      );
    } else if (property.isModifiedProperty()) {
      return dispatch2(
        "modifyNote",
        {
          note: noteItem.note,
          modification: { modified: value }
        },
        { cancelable: true }
      );
    } else {
      return dispatch2(
        "modifyNote",
        {
          note: noteItem.note,
          modification: {
            property: { name: property.name(), value }
          }
        },
        { cancelable: true }
      );
    }
  }
  let timelineView;
  let display;
  onMount(async () => {
    const orderSettings = viewModel.namespace("settings").namespace("property");
    const selectedPropertyName = orderSettings.make("property", "created");
    const propertyPreferences = orderSettings.make("propertiesUseWholeNumbers", {});
    $$invalidate(5, propertySelector = await TimelinePropertySelector.sanitize(
      notePropertyRepository,
      {
        selectedPropertyName: get_store_value(selectedPropertyName),
        propertyPreferences: get_store_value(propertyPreferences)
      },
      (state) => {
        selectedPropertyName.set(state.selectedPropertyName);
        propertyPreferences.set(state.propertyPreferences);
      }
    ));
    $$invalidate(7, display = propertySelector.selectedProperty().displayedAs());
    for (const note of await noteRepository.listAll()) {
      const item = new TimelineNoteItem(note, getValueSelector, itemColorSupplier);
      itemsById.set(item.id(), item);
      enqueueItemColorUpdate(item);
    }
    $$invalidate(3, items = new MutableSortedArray((item) => item.value(), ...await filter.filteredItems(itemsById.values())));
    if (isNew) {
      timelineView.zoomToFit(items);
    }
  });
  const enqueueItemUpdate = /* @__PURE__ */ (() => {
    const queue = [];
    let timer = null;
    return (update2) => {
      queue.push(update2);
      if (timer != null) {
        return;
      }
      timer = setTimeout(
        () => {
          timer = null;
          while (queue.length > 0) {
            queue.shift()();
          }
          $$invalidate(3, items);
        },
        250
      );
    };
  })();
  const itemColorSupplier = {
    cache: /* @__PURE__ */ new Map(),
    itemColorForNote(note) {
      var _a, _b;
      return (_b = (_a = this.cache.get(note.id())) == null ? void 0 : _a.color) != null ? _b : void 0;
    }
  };
  let itemRecolorQueueLength = 0;
  const enqueueItemColorUpdate = /* @__PURE__ */ (() => {
    const queue = [];
    const uniqueQueue = /* @__PURE__ */ new Set();
    let timer = null;
    let tasks2 = [];
    async function processBatch() {
      timer = null;
      const start = performance.now();
      if (tasks2.length > 0) {
        await Promise.all(tasks2);
      }
      tasks2 = [];
      while (queue.length > 0 && performance.now() - start < 16) {
        const item = queue.shift();
        uniqueQueue.delete(item);
        const groups = timelineGroups.groups();
        tasks2.push((async () => {
          itemColorSupplier.cache.delete(item.id());
          for (let i = 0; i < groups.length; i++) {
            const group2 = groups[i];
            if (await group2.noteFilter().matches(item.note)) {
              itemColorSupplier.cache.set(item.id(), { color: group2.color(), index: i });
              break;
            }
          }
          timelineView.invalidateColors();
        })());
      }
      $$invalidate(8, itemRecolorQueueLength = queue.length);
      if (queue.length > 0) {
        timer = setTimeout(processBatch, 0);
      }
    }
    return (item) => {
      if (uniqueQueue.has(item)) return;
      uniqueQueue.add(item);
      queue.push(item);
      $$invalidate(8, itemRecolorQueueLength = queue.length);
      if (timer != null) return;
      timer = setTimeout(processBatch, 0);
    };
  })();
  function enqueueItemRecolorMatching(predicate) {
    for (const item of itemsById.values()) {
      if (predicate(item)) {
        enqueueItemColorUpdate(item);
      }
    }
  }
  function getValueSelector() {
    return propertySelector.selectedProperty();
  }
  async function addFile(file) {
    if (timelineView == null) return;
    if (itemsById.has(file.id())) return;
    const item = new TimelineNoteItem(file, getValueSelector, itemColorSupplier);
    itemsById.set(file.id(), item);
    if (await filter.accepts(item)) {
      enqueueItemUpdate(() => {
        items.add(item);
      });
    }
  }
  function deleteFile(file) {
    if (timelineView == null) return;
    const item = itemsById.get(file.id());
    if (item == null) return;
    if (itemsById.delete(file.id())) {
      enqueueItemUpdate(() => items.remove(item));
    }
  }
  async function modifyFile(file) {
    if (timelineView == null) return;
    const item = itemsById.get(file.id());
    if (item == null) return;
    const keep = await filter.accepts(item);
    enqueueItemColorUpdate(item);
    enqueueItemUpdate(() => {
      items.remove(item);
      item._invalidateValueCache();
      if (keep) {
        items.add(item);
      }
    });
  }
  async function renameFile(file, oldPath) {
    if (timelineView == null) return;
    const item = itemsById.get(oldPath);
    if (item == null) return;
    itemsById.delete(oldPath);
    itemsById.set(file.id(), item);
    const keep = await filter.accepts(item);
    enqueueItemColorUpdate(item);
    enqueueItemUpdate(() => {
      items.remove(item);
      if (keep) items.add(item);
    });
  }
  function focusOnNote(note) {
    const item = itemsById.get(note.id());
    if (item == null) return;
    timelineView == null ? void 0 : timelineView.focusOnItem(item);
  }
  function zoomToFit() {
    timelineView == null ? void 0 : timelineView.zoomToFit(items);
  }
  function onPropertySelected(property) {
    $$invalidate(5, propertySelector);
    for (const item of itemsById.values()) {
      item._invalidateValueCache();
    }
    $$invalidate(3, items = new MutableSortedArray((item) => item.value(), ...items));
    $$invalidate(7, display = property.displayedAs());
    timelineView.zoomToFit(items);
  }
  function onPreviewNewItemValue(item, value) {
    return propertySelector.selectedProperty().sanitizeValue(value);
  }
  const propertySelected_handler = (event) => onPropertySelected(event.detail);
  const func_1 = function(index, group2) {
    let effectCount = 0;
    for (const item of itemColorSupplier.cache.values()) {
      if (item.index === index) {
        item.color = group2.color();
        effectCount++;
      }
    }
    if (effectCount > 0) {
      timelineView.invalidateColors();
    }
  };
  const func_2 = function(index, _group) {
    enqueueItemRecolorMatching((item) => {
      const def = itemColorSupplier.cache.get(item.id());
      return def == null || def.index >= index;
    });
  };
  const func_3 = function(from, to, _group, _groups) {
    const minAffectedIndex = Math.min(from, to);
    enqueueItemRecolorMatching((item) => {
      const def = itemColorSupplier.cache.get(item.id());
      return def != null && def.index >= minAffectedIndex;
    });
    for (const def of itemColorSupplier.cache.values()) {
      if (def.index >= from) {
        def.index -= 1;
      }
    }
    for (const def of itemColorSupplier.cache.values()) {
      if (def.index >= to) {
        def.index += 1;
      }
    }
  };
  const func_4 = function(index, _group, _groups) {
    enqueueItemRecolorMatching((item) => {
      const def = itemColorSupplier.cache.get(item.id());
      return def != null && def.index >= index;
    });
    for (const def of itemColorSupplier.cache.values()) {
      if (def.index >= index) {
        def.index -= 1;
      }
    }
  };
  const func_5 = (e, triggerItems) => {
    const items2 = triggerItems.map((item) => itemsById.get(item.id())).filter(exists);
    if (items2.length === 0) return;
    oncontextmenu(e, items2.map((it) => it.note));
  };
  function timelineview_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      timelineView = $$value;
      $$invalidate(6, timelineView);
    });
  }
  const select_handler = (e) => openFile(e.detail.causedBy, e.detail.item);
  const focus_handler = (e) => {
    var _a;
    return dispatch2("noteFocused", (_a = itemsById.get(e.detail.id())) == null ? void 0 : _a.note);
  };
  const create_handler = (e) => createItem(e.detail);
  $$self.$$set = ($$props2) => {
    if ("noteRepository" in $$props2) $$invalidate(21, noteRepository = $$props2.noteRepository);
    if ("notePropertyRepository" in $$props2) $$invalidate(22, notePropertyRepository = $$props2.notePropertyRepository);
    if ("openModal" in $$props2) $$invalidate(0, openModal2 = $$props2.openModal);
    if ("viewModel" in $$props2) $$invalidate(1, viewModel = $$props2.viewModel);
    if ("isNew" in $$props2) $$invalidate(23, isNew = $$props2.isNew);
    if ("oncontextmenu" in $$props2) $$invalidate(2, oncontextmenu = $$props2.oncontextmenu);
  };
  return [
    openModal2,
    viewModel,
    oncontextmenu,
    items,
    timelineGroups,
    propertySelector,
    timelineView,
    display,
    itemRecolorQueueLength,
    dispatch2,
    settings,
    itemsById,
    filterQuery,
    filter,
    openFile,
    createItem,
    moveItem,
    itemColorSupplier,
    enqueueItemRecolorMatching,
    onPropertySelected,
    onPreviewNewItemValue,
    noteRepository,
    notePropertyRepository,
    isNew,
    addFile,
    deleteFile,
    modifyFile,
    renameFile,
    focusOnNote,
    zoomToFit,
    propertySelected_handler,
    func_1,
    func_2,
    func_3,
    func_4,
    func_5,
    timelineview_binding,
    select_handler,
    focus_handler,
    create_handler
  ];
}
class NoteTimeline extends SvelteComponent {
  constructor(options) {
    super();
    init(
      this,
      options,
      instance,
      create_fragment,
      safe_not_equal,
      {
        noteRepository: 21,
        notePropertyRepository: 22,
        openModal: 0,
        viewModel: 1,
        isNew: 23,
        oncontextmenu: 2,
        addFile: 24,
        deleteFile: 25,
        modifyFile: 26,
        renameFile: 27,
        focusOnNote: 28,
        zoomToFit: 29
      },
      null,
      [-1, -1]
    );
  }
  get addFile() {
    return this.$$.ctx[24];
  }
  get deleteFile() {
    return this.$$.ctx[25];
  }
  get modifyFile() {
    return this.$$.ctx[26];
  }
  get renameFile() {
    return this.$$.ctx[27];
  }
  get focusOnNote() {
    return this.$$.ctx[28];
  }
  get zoomToFit() {
    return this.$$.ctx[29];
  }
}
function warningItem(item) {
  if ("setWarning" in item && typeof item.setWarning === "function") {
    item.setWarning(true);
  }
  return item;
}
function openFileContextMenu(e, file, workspace, fileManager) {
  const menu = new obsidian__namespace.Menu();
  menu.addItem((item) => {
    item.setSection("open").setTitle("Open in new tab").setIcon("lucide-file-plus").onClick(() => {
      workspace.openLinkText(file.path, "", "tab");
    });
  }).addItem((item) => {
    item.setSection("open").setTitle("Open to the right").setIcon("lucide-separator-vertical").onClick(() => {
      workspace.openLinkText(file.path, "", "split");
    });
  }).addItem((item) => {
    item.setSection("open").setTitle("Open below").setIcon("lucide-separator-horizontal").onClick(() => {
      workspace.getLeaf("split", "horizontal").openFile(file);
    });
  });
  workspace.trigger("file-menu", menu, file, "timeline-view-context-menu");
  menu.addItem((item) => {
    warningItem(item).setSection("danger").setTitle("Delete").setIcon("lucide-trash-2").onClick(() => {
      if ("promptForDeletion" in fileManager && typeof fileManager.promptForDeletion === "function") {
        fileManager.promptForDeletion(file);
      } else {
        file.vault.delete(file);
      }
    });
  });
  menu.showAtMouseEvent(e);
}
function openMultipleFileContextMenu(e, files, workspace, fileManager) {
  const menu = new obsidian__namespace.Menu();
  workspace.trigger("files-menu", menu, files, "timeline-view-context-menu");
  menu.addItem((item) => {
    warningItem(item).setSection("danger").setTitle("Delete").setIcon("lucide-trash-2").onClick(() => {
      let deleteFunction;
      if ("promptForDeletion" in fileManager && typeof fileManager.promptForDeletion === "function") {
        deleteFunction = fileManager.promptForDeletion.bind(fileManager);
      } else {
        deleteFunction = files[0].vault.delete.bind(files[0].vault);
      }
      for (const file of files) {
        deleteFunction(file);
      }
    });
  });
  menu.showAtMouseEvent(e);
}
function openNewLeafFromEvent(workspace, event) {
  if (event instanceof MouseEvent || event instanceof KeyboardEvent) {
    return workspace.getLeaf(obsidian__namespace.Keymap.isModEvent(event));
  }
  return workspace.getLeaf(true);
}
function openModal(app, callback) {
  new Modal(app, callback).open();
}
class Modal extends obsidian__namespace.Modal {
  constructor(app, callback) {
    super(app);
    this.callback = callback;
  }
  _clean() {
  }
  onOpen() {
    this._clean = this.callback(this);
  }
  onClose() {
    this._clean();
    this.containerEl.empty();
  }
}
const _TimelineItemView = class _TimelineItemView extends obsidian__namespace.ItemView {
  constructor(leaf, vault, metadata, workspace, fileManager, notes, noteProperties) {
    super(leaf);
    __publicField(this, "group");
    __publicField(this, "$mode", "edit");
    __publicField(this, "mode", writable(this.$mode));
    __privateAdd(this, _displayText, this.computeDisplayText());
    __publicField(this, "component", null);
    __publicField(this, "initialization");
    __publicField(this, "state");
    this.workspace = workspace;
    this.fileManager = fileManager;
    this.notes = notes;
    this.noteProperties = noteProperties;
    this.navigation = false;
    this.scope = new obsidian__namespace.Scope(this.app.scope);
    this.scope.register(["Shift"], " ", () => {
      var _a;
      (_a = this.component) == null ? void 0 : _a.zoomToFit();
    });
    this.initialization = new Promise((resolve) => {
      this.completeInitialization = resolve;
    });
    [
      vault.on("create", (file) => {
        var _a;
        if (file instanceof obsidian__namespace.TFile) {
          (_a = this.component) == null ? void 0 : _a.addFile(this.notes.getNoteForFile(file));
        }
      }),
      vault.on("rename", (file, oldPath) => {
        var _a;
        if (file instanceof obsidian__namespace.TFile) {
          (_a = this.component) == null ? void 0 : _a.renameFile(
            this.notes.getNoteForFile(file),
            oldPath
          );
        }
      }),
      metadata.on("changed", (file) => {
        var _a;
        if (file instanceof obsidian__namespace.TFile) {
          (_a = this.component) == null ? void 0 : _a.modifyFile(this.notes.getNoteForFile(file));
        }
      }),
      vault.on("delete", (file) => {
        var _a;
        if (file instanceof obsidian__namespace.TFile) {
          (_a = this.component) == null ? void 0 : _a.deleteFile(this.notes.getNoteForFile(file));
        }
      }),
      this.leaf.on("group-change", (group2) => {
        this.group = group2;
      }),
      this.workspace.on("active-leaf-change", (activeLeaf) => {
        var _a;
        if (activeLeaf === this.leaf || !activeLeaf) {
          return;
        }
        if (!this.group) {
          return;
        }
        const state = activeLeaf.getViewState().state;
        if (!state) {
          return;
        }
        if (!("file" in state) || typeof state.file !== "string") {
          return;
        }
        const leavesInGroup = this.workspace.getGroupLeaves(this.group);
        if (!leavesInGroup.includes(activeLeaf)) {
          return;
        }
        const file = vault.getAbstractFileByPath(state.file);
        if (file instanceof obsidian__namespace.TFile) {
          const note = this.notes.getNoteForFile(file);
          if (!note) {
            return;
          }
          (_a = this.component) == null ? void 0 : _a.focusOnNote(note);
        }
      })
    ].forEach((eventRef) => this.registerEvent(eventRef));
    preventOpenFileWhen(
      this,
      () => this.group != null && this.group.length > 0 && this.workspace.getGroupLeaves(this.group).length > 1
    );
  }
  getIcon() {
    return LUCID_ICON;
  }
  getViewType() {
    return OBSIDIAN_LEAF_VIEW_TYPE;
  }
  onPaneMenu(menu, source) {
    if (this.$mode === "edit") {
      menu.addItem((item) => {
        item.setIcon("book-open").setSection("pane").setTitle("View-only timeline").onClick(() => {
          this.mode.set(
            "view"
            /* View */
          );
        });
      });
    } else if (this.$mode === "view") {
      menu.addItem((item) => {
        item.setIcon("edit-3").setSection("pane").setTitle("Edit timeline").onClick(() => {
          this.mode.set(
            "edit"
            /* Edit */
          );
        });
      });
    }
    menu.addItem((item) => {
      item.setIcon("link").setSection("view.linked").setTitle("Open linked markdown tab").onClick(() => {
        this.workspace.getLeaf("split", "horizontal").setViewState({
          type: "empty",
          group: this.leaf
        });
      });
    });
    return super.onPaneMenu(menu, source);
  }
  openNoteInLinkedLeaf(note) {
    if (!this.group) {
      return false;
    }
    const leavesInGroup = this.workspace.getGroupLeaves(this.group);
    if (leavesInGroup.length === 1) {
      return false;
    }
    const file = this.notes.getFileFromNote(note);
    if (!file) {
      return false;
    }
    leavesInGroup.forEach((leaf) => {
      if (leaf === this.leaf) return;
      leaf.openFile(file);
    });
    return true;
  }
  computeDisplayText() {
    var _a, _b, _c, _d;
    const query = (_d = (_c = (_b = (_a = this.state) == null ? void 0 : _a.settings) == null ? void 0 : _b.filter) == null ? void 0 : _c.query) != null ? _d : "";
    if (query !== "") {
      return `Timeline view - ${query}`;
    }
    return "Timeline view";
  }
  get displayText() {
    return __privateGet(this, _displayText);
  }
  set displayText(value) {
    var _a, _b, _c;
    if (__privateGet(this, _displayText) !== value) {
      __privateSet(this, _displayText, value);
      (_b = (_a = titleEl(this)) == null ? void 0 : _a.setText) == null ? void 0 : _b.call(_a, value);
      (_c = workspaceLeafExt(this.leaf)) == null ? void 0 : _c.updateHeader();
    }
  }
  getDisplayText() {
    return this.displayText;
  }
  completeInitialization(_state) {
  }
  setState(state, result) {
    this.state = timelineItemViewStateSchema.parseOrDefault(state);
    this.displayText = this.computeDisplayText();
    this.completeInitialization(this.state);
    return super.setState(state, result);
  }
  getState() {
    if (this.state != null && "isNew" in this.state) {
      delete this.state.isNew;
    }
    return this.state;
  }
  async onOpen() {
    var _a;
    const content = this.containerEl.children[1];
    content.createEl("progress");
    (_a = this.initialization) == null ? void 0 : _a.then((state) => {
      var _a2, _b, _c;
      delete this.initialization;
      content.empty();
      content.setAttribute(
        "style",
        "padding:0;position: relative;overflow-x:hidden;overflow-y:hidden"
      );
      const isNew = state.isNew;
      const viewModel = writableProperties(state, (key, newValue) => {
        state[key] = newValue;
        this.displayText = this.computeDisplayText();
        this.workspace.requestSaveLayout();
      });
      const persistedMode = viewModel.make("mode", this.$mode);
      if (get_store_value(persistedMode) === "edit") {
        this.mode.set(
          "edit"
          /* Edit */
        );
      } else if (get_store_value(persistedMode) === "view") {
        this.mode.set(
          "view"
          /* View */
        );
      }
      this.mode.subscribe((mode) => persistedMode.set(mode));
      const switchToViewMode = this.addAction(
        "book-open",
        "Current view: editing\nClick to view-only",
        () => this.mode.set(
          "view"
          /* View */
        )
      );
      const switchToEditMode = this.addAction(
        "edit-3",
        "Current view: view-only\nClick to edit",
        () => this.mode.set(
          "edit"
          /* Edit */
        )
      );
      this.mode.subscribe((newMode) => {
        this.$mode = newMode;
        switchToViewMode.toggle(
          newMode === "edit"
          /* Edit */
        );
        switchToEditMode.toggle(
          newMode === "view"
          /* View */
        );
      });
      this.component = new NoteTimeline({
        target: content,
        props: {
          noteRepository: this.notes,
          notePropertyRepository: this.noteProperties,
          isNew,
          viewModel,
          oncontextmenu: (e, notes) => {
            if (notes.length === 1) {
              const file = this.notes.getFileFromNote(notes[0]);
              if (!file) return;
              openFileContextMenu(
                e,
                file,
                this.workspace,
                this.fileManager
              );
            } else if (notes.length > 1) {
              const files = notes.map((it) => this.notes.getFileFromNote(it)).filter(exists);
              if (files.length === 0) return;
              if (files.length === 1)
                openFileContextMenu(
                  e,
                  files[0],
                  this.workspace,
                  this.fileManager
                );
              else
                openMultipleFileContextMenu(
                  e,
                  files,
                  this.workspace,
                  this.fileManager
                );
            }
          },
          openModal: (open) => {
            openModal(this.app, open);
          }
        }
      });
      this.component.$on("noteSelected", (event) => {
        const file = this.notes.getFileFromNote(event.detail.note);
        if (!file) return;
        const cause = event.detail.event;
        openNewLeafFromEvent(this.workspace, cause).openFile(file);
      });
      (_a2 = this.component) == null ? void 0 : _a2.$on("noteFocused", (event) => {
        if (event.detail) {
          this.openNoteInLinkedLeaf(event.detail);
        }
      });
      (_b = this.component) == null ? void 0 : _b.$on("createNote", async (event) => {
        const note = await this.notes.createNote(event.detail);
        if (!this.openNoteInLinkedLeaf(note)) {
          const file = this.notes.getFileFromNote(note);
          if (!file) return;
          this.workspace.getLeaf(true).openFile(file);
        }
      });
      (_c = this.component) == null ? void 0 : _c.$on("modifyNote", async (event) => {
        const note = event.detail.note;
        if ("created" in event.detail.modification) {
          await this.notes.modifyNote(note, {
            created: event.detail.modification.created
          });
        } else if ("modified" in event.detail.modification) {
          await this.notes.modifyNote(note, {
            modified: event.detail.modification.modified
          });
        } else {
          await this.notes.modifyNote(note, {
            property: {
              [event.detail.modification.property.name]: event.detail.modification.property.value
            }
          });
        }
      });
    });
  }
  static hasClosedState() {
    return !!this.closedState;
  }
  static getPreviouslyClosedState() {
    return this.closedState;
  }
  onClose() {
    var _a;
    _TimelineItemView.closedState = this.getState();
    (_a = this.component) == null ? void 0 : _a.$destroy();
    return super.onClose();
  }
};
_displayText = new WeakMap();
__publicField(_TimelineItemView, "closedState");
let TimelineItemView = _TimelineItemView;
var EditMode = /* @__PURE__ */ ((EditMode2) => {
  EditMode2["View"] = "view";
  EditMode2["Edit"] = "edit";
  return EditMode2;
})(EditMode || {});
const timelineItemViewStateSchema = expectObject({
  isNew: optional(expectBoolean(false)),
  focalValue: expectNumber(0),
  vScroll: expectNumber(0),
  mode: expectEnum(
    EditMode,
    "edit"
    /* Edit */
  ),
  scale: expectNumber(1),
  settings: expectObject({
    isOpen: expectBoolean(false),
    property: expectObject({
      collapsed: expectBoolean(true),
      property: expectString("created"),
      propertiesUseWholeNumbers: expectRecord({
        key: expectString(""),
        value: expectBoolean(true)
      })
    }),
    filter: expectObject({
      collapsed: expectBoolean(true),
      query: expectString("")
    }),
    groups: expectObject({
      collapsed: expectBoolean(true),
      groups: expectArray(
        expectObject({
          query: expectString(""),
          color: expectString("")
        })
      )
    }),
    display: expectObject({
      collapsed: expectBoolean(true),
      names: expectBoolean(false)
    })
  })
});
class ObsidianSettingsTimelineTab extends obsidian__namespace.PluginSettingTab {
  constructor(app, plugin, noteProperties, notes) {
    super(app, plugin);
    __privateAdd(this, _ObsidianSettingsTimelineTab_instances);
    __privateAdd(this, _plugin);
    __privateAdd(this, _noteProperties2);
    __privateAdd(this, _notes2);
    __privateAdd(this, _loadedSettings);
    __privateSet(this, _plugin, plugin);
    __privateSet(this, _noteProperties2, noteProperties);
    __privateSet(this, _notes2, notes);
  }
  async noteOrder() {
    const loadedSettings = await __privateMethod(this, _ObsidianSettingsTimelineTab_instances, getSettings_fn).call(this);
    return await TimelineNoteSorterSelector.sanitize(
      loadedSettings.openWith.property,
      __privateGet(this, _noteProperties2),
      async (name) => {
        __privateMethod(this, _ObsidianSettingsTimelineTab_instances, updateSettings_fn).call(this, (settings) => settings.openWith.property = name);
      }
    );
  }
  async noteFilter() {
    const loadedSettings = await __privateMethod(this, _ObsidianSettingsTimelineTab_instances, getSettings_fn).call(this);
    return new TimelineItemQueryFilter(
      __privateGet(this, _notes2),
      loadedSettings.openWith.filter.query,
      async (query) => {
        __privateMethod(this, _ObsidianSettingsTimelineTab_instances, updateSettings_fn).call(this, (settings) => settings.openWith.filter.query = query);
      }
    );
  }
  async groups() {
    const loadedSettings = await __privateMethod(this, _ObsidianSettingsTimelineTab_instances, getSettings_fn).call(this);
    const updateGroups = () => {
      __privateMethod(this, _ObsidianSettingsTimelineTab_instances, updateSettings_fn).call(this, (settings) => {
        settings.openWith.groups = groups.groups().map((g) => {
          return {
            query: g.query(),
            color: g.color()
          };
        });
      });
    };
    const makeGroup = (query, color) => {
      const group2 = new TimelineGroup(__privateGet(this, _notes2), query, color);
      group2.onChanged = updateGroups;
      return group2;
    };
    const groups = new TimelineGroups(
      loadedSettings.openWith.groups.map(
        ({ query, color }) => makeGroup(query, color)
      ),
      (color) => makeGroup("", color)
    );
    groups.onChanged = updateGroups;
    return groups;
  }
  usePreviousState() {
    var _a, _b, _c;
    return (_c = (_b = (_a = __privateGet(this, _loadedSettings)) == null ? void 0 : _a.openWith) == null ? void 0 : _b.previousState) != null ? _c : false;
  }
  async display() {
    const containerEl = this.containerEl;
    const order = await this.noteOrder();
    const filter = await this.noteFilter();
    const groups = await this.groups();
    new obsidian__namespace.Setting(containerEl).setName("Ribbon Re-opens Timeline").setDesc(
      "When clicking the ribbon icon, should it attempt to re-open the previously closed timeline?  This is not persisted across obsidian restarts."
    ).addToggle((toggle) => {
      toggle.setValue(this.usePreviousState()).onChange((value) => {
        __privateMethod(this, _ObsidianSettingsTimelineTab_instances, updateSettings_fn).call(this, (settings) => settings.openWith.previousState = value);
      });
    });
    new obsidian__namespace.Setting(containerEl).setName("Defaults").setClass("setting-item-heading");
    const propertySetting = new obsidian__namespace.Setting(containerEl).setName("Default Ordering Property").setDesc(
      "The default property to use for ordering notes in the timeline when it's first opened."
    );
    const selectionComponent = new TimelineNoteSorterPropertySelect({
      target: propertySetting.controlEl,
      props: {
        order,
        tabindex: 0
      }
    });
    selectionComponent.$on("selected", (event) => {
      order.selectProperty(event.detail);
    });
    const filterSetting = new obsidian__namespace.Setting(containerEl).setName("Default Filter").setDesc(
      "The default filter to use for notes in the timeline when it's first opened."
    );
    new TimelineQueryFilterInput({
      target: filterSetting.controlEl,
      props: {
        filter
      }
    });
    new obsidian__namespace.Setting(containerEl).setName("Default Groups").setDesc(
      "The default set of groups to use in the timeline when it's first opened."
    );
    new TimelineGroupsList({
      target: new obsidian__namespace.Setting(containerEl).controlEl,
      props: {
        groups
      }
    });
  }
  hide() {
    this.containerEl.empty();
    super.hide();
  }
}
_plugin = new WeakMap();
_noteProperties2 = new WeakMap();
_notes2 = new WeakMap();
_loadedSettings = new WeakMap();
_ObsidianSettingsTimelineTab_instances = new WeakSet();
getSettings_fn = async function() {
  if (!__privateGet(this, _loadedSettings)) {
    __privateSet(this, _loadedSettings, sanitizeTimelineSettings(
      await __privateGet(this, _plugin).loadData()
    ));
  }
  return __privateGet(this, _loadedSettings);
};
updateSettings_fn = async function(updater) {
  const settings = await __privateMethod(this, _ObsidianSettingsTimelineTab_instances, getSettings_fn).call(this);
  updater(settings);
  __privateGet(this, _plugin).saveData(settings);
};
function sanitizeTimelineSettings(data) {
  return timelineSettingsSchema().parseOrDefault(data);
}
function timelineSettingsSchema() {
  return expectObject({
    openWith: expectObject({
      property: expectString("created"),
      filter: expectObject({
        query: expectString("")
      }),
      groups: expectArray(
        expectObject({
          query: expectString(""),
          color: expectString("")
        })
      ),
      previousState: expectBoolean(false)
    })
  });
}
function tagDomRecordInTagView(view) {
  if (view.getViewType() !== "tag") return void 0;
  const tagDoms = view.tagDoms;
  if (tagDoms == null) return void 0;
  if (typeof tagDoms !== "object") return void 0;
  for (const value of Object.values(tagDoms)) {
    if (typeof value !== "object") return void 0;
    if (!("selfEl" in value) || typeof value.selfEl !== "object")
      return void 0;
    if (!(value.selfEl instanceof HTMLElement)) return void 0;
  }
  return tagDoms;
}
const tagChars = new Set(
  "#-_/1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
);
function findSurroundingTagInLine(line, pos) {
  let tagStart = pos;
  for (tagStart; tagStart >= 0; tagStart--) {
    if (!tagChars.has(line[tagStart])) {
      tagStart++;
      break;
    }
    if (tagStart === 0) break;
  }
  let tagEnd = pos;
  for (tagEnd; tagEnd < line.length; tagEnd++) {
    if (!tagChars.has(line[tagEnd])) {
      break;
    }
  }
  const tag = line.slice(tagStart, tagEnd);
  if (!tag.startsWith("#")) return null;
  return tag;
}
const OBSIDIAN_LEAF_VIEW_TYPE = "VIEW_TYPE_TIMELINE_VIEW";
const LUCID_ICON = "waypoints";
class ObsidianTimelinePlugin extends obsidian__namespace.Plugin {
  async onload() {
    const notes = new ObsidianNoteRepository(
      this.app.vault,
      this.app.metadataCache,
      this.app.fileManager
    );
    const properties = new ObsidianNotePropertyRepository(
      () => this.app.vault.adapter.read(
        obsidian__namespace.normalizePath(".obsidian/types.json")
      ),
      () => getMetadataTypeManager(this.app)
    );
    const timelineSettings = new ObsidianSettingsTimelineTab(
      this.app,
      this,
      properties,
      notes
    );
    this.addSettingTab(timelineSettings);
    const assignTimelineViewToLeaf = (leaf, timeline, group2) => {
      leaf.setViewState({
        type: OBSIDIAN_LEAF_VIEW_TYPE,
        active: true,
        state: timeline,
        group: group2
      });
    };
    const openTimelineView = async (leaf, group2, overrides) => {
      const sorter = (await timelineSettings.noteOrder()).selectedProperty();
      const filter = await timelineSettings.noteFilter();
      const groups = await timelineSettings.groups();
      const timeline = await createNewTimeline(
        notes,
        sorter,
        (overrides == null ? void 0 : overrides.filterQuery) ? notes.getInclusiveNoteFilterForQuery(
          overrides.filterQuery
        ) : filter.noteFilter()
      );
      assignTimelineViewToLeaf(
        leaf,
        {
          settings: {
            property: {
              property: timeline.order.name()
            },
            filter: {
              query: timeline.filter.query()
            },
            groups: {
              groups: groups.groups().map((group22) => {
                return {
                  query: group22.query(),
                  color: group22.color()
                };
              })
            }
          },
          focalValue: timeline.focalValue,
          isNew: true
        },
        group2
      );
    };
    const openTimelineViewInNewLeaf = (overrides) => {
      openTimelineView(
        this.app.workspace.getLeaf(true),
        void 0,
        overrides
      );
    };
    this.registerView(OBSIDIAN_LEAF_VIEW_TYPE, (leaf) => {
      const view = new TimelineItemView(
        leaf,
        this.app.vault,
        this.app.metadataCache,
        this.app.workspace,
        this.app.fileManager,
        notes,
        properties
      );
      return view;
    });
    this.addRibbonIcon(LUCID_ICON, "Open timeline view", (event) => {
      const previousState = TimelineItemView.getPreviouslyClosedState();
      if (event.button === 2) {
        const menu = new obsidian__namespace.Menu().addItem((item) => {
          item.setTitle("Open new timeline view").onClick(() => {
            openTimelineViewInNewLeaf();
          });
        });
        if (previousState != null) {
          menu.addItem((item) => {
            item.setTitle("Re-open closed timeline view").onClick(
              () => {
                assignTimelineViewToLeaf(
                  this.app.workspace.getLeaf(true),
                  { ...previousState, isNew: false }
                );
              }
            );
          });
        }
        menu.showAtMouseEvent(event);
      } else {
        if (timelineSettings.usePreviousState() && previousState != null) {
          assignTimelineViewToLeaf(this.app.workspace.getLeaf(true), {
            ...previousState,
            isNew: false
          });
        } else {
          openTimelineViewInNewLeaf();
        }
      }
    });
    this.addCommand({
      id: "open-timeline-view",
      name: "Open timeline view",
      callback: () => openTimelineViewInNewLeaf(),
      icon: LUCID_ICON
    });
    this.addCommand({
      id: "reopen-timeline-view",
      name: "Re-open timeline view",
      checkCallback: (checking) => {
        if (checking)
          return TimelineItemView.hasClosedState();
        const previousState = TimelineItemView.getPreviouslyClosedState();
        if (previousState != null) {
          assignTimelineViewToLeaf(this.app.workspace.getLeaf(true), {
            ...previousState,
            isNew: false
          });
          return true;
        }
        return false;
      },
      icon: LUCID_ICON
    });
    this.registerEvent(
      this.app.workspace.on("file-menu", (menu, file, info) => {
        if (info === "more-options") {
          menu.addItem((item) => {
            item.setSection("view.linked");
            item.setTitle("Open timeline view");
            item.setIcon(LUCID_ICON);
            item.onClick(() => {
              var _a;
              openTimelineView(
                this.app.workspace.getLeaf(
                  "split",
                  "horizontal"
                ),
                (_a = this.app.workspace.getMostRecentLeaf()) != null ? _a : void 0
              );
            });
          });
        }
        if (file instanceof obsidian__namespace.TFolder && info === "file-explorer-context-menu") {
          menu.addItem((item) => {
            item.setTitle("View as timeline").setIcon(LUCID_ICON).onClick(() => {
              openTimelineViewInNewLeaf({
                filterQuery: `path:"${file.path}"`
              });
            });
          });
        }
      })
    );
    this.registerDomEvent(window, "auxclick", (event) => {
      var _a;
      if (event.button !== 2) return;
      if (!(event.target instanceof HTMLElement)) return;
      const tagDom = event.target.matchParent(
        "div.tree-item-self.tag-pane-tag.is-clickable"
      );
      if (!(tagDom instanceof HTMLElement)) return;
      const tagLeaf = (_a = this.app.workspace.getLeavesOfType("tag").at(0)) == null ? void 0 : _a.view;
      if (tagLeaf == null) return;
      const tagDomObj = tagDomRecordInTagView(tagLeaf);
      if (tagDomObj == null) return;
      const tag = Object.entries(tagDomObj).find(
        ([_, value]) => value.selfEl === tagDom
      );
      if (tag == null) return;
      event.preventDefault();
      event.stopPropagation();
      event.stopImmediatePropagation();
      new obsidian__namespace.Menu().addItem((item) => {
        item.setTitle("View notes with tag in timeline").setIcon(LUCID_ICON).onClick(() => {
          openTimelineViewInNewLeaf({
            filterQuery: `tag:${tag[0]}`
          });
        });
      }).showAtMouseEvent(event);
    });
    this.app.workspace.on("editor-menu", (menu, editor, info) => {
      const pos = editor.getCursor();
      const line = editor.getLine(pos.line);
      const tag = findSurroundingTagInLine(line, pos.ch);
      if (tag == null) return;
      menu.addItem((item) => {
        item.setSection("selection").setTitle("View notes with tag in timeline").setIcon(LUCID_ICON).onClick(async () => {
          openTimelineViewInNewLeaf({
            filterQuery: `tag:${tag}`
          });
        });
      });
    });
    this.registerEvent(
      this.app.workspace.on(
        // @ts-ignore
        "search:results-menu",
        (menu, view) => {
          menu.addItem((item) => {
            item.setSection("timeline").setTitle("Order results in new timeline view").setIcon(LUCID_ICON).onClick(() => {
              openTimelineViewInNewLeaf({
                filterQuery: view.searchQuery.query
              });
            });
          }).addItem((item) => {
            item.setSection("timeline").setTitle(
              "Save as default filter for timeline views"
            ).setIcon(LUCID_ICON).onClick(async () => {
              const filter = await timelineSettings.noteFilter();
              filter.filterByQuery(view.searchQuery.query);
            });
          });
        }
      )
    );
  }
  onunload() {
    this.app.workspace.detachLeavesOfType(OBSIDIAN_LEAF_VIEW_TYPE);
  }
}
exports.LUCID_ICON = LUCID_ICON;
exports.OBSIDIAN_LEAF_VIEW_TYPE = OBSIDIAN_LEAF_VIEW_TYPE;
exports.default = ObsidianTimelinePlugin;

/* nosourcemap */