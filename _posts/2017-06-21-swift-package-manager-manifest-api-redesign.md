---
layout: new-layouts/blog
published: true
date: 2017-06-21 09:45:00
title: Swift Package Manager Manifest API Redesign
author: aciid
---

The Package Manager in Swift 4 includes the redesigned `Package.swift` manifest
API.  The new API is easier to use and follows the [design guidelines](/documentation/api-design-guidelines/).  The target
inference rules in Swift 3 Package Manager were a common source of confusion. We
revised these rules and removed most of the inference, favoring the practice of
explicitly specifying package structure in the manifest.

Swift 3 packages will continue to work because the Package Manager in Swift 4 is
backwards compatible.  The manifest version is chosen by the _tools version_ of
the package. The tools version is specified in the first line of the manifest,
using the special comment syntax: `// swift-tools-version:<specifier>`.
Packages that omit this special comment will default to tools version 3.1.0.

The tools version also determines the default Swift language version used to
compile the package's sources. Existing Swift 3 packages will compile in Swift
3 compatibility mode.  You can optionally use the `swiftLanguageVersions`
property in both Swift 3 and Swift 4 manifests to set the language version used
to compile that package, if you don't want the default version.  This means it
is possible to upgrade a package to use the newer manifest format without
upgrading its sources to Swift 4.

## Creating a New Package in Swift 4

Use the `init` subcommand to create a new package in Swift 4:

~~~sh
$ mkdir mytool && cd mytool
$ swift package init
$ swift build
$ swift test
~~~

The `Package.swift` manifest generated by the commands above is shown below.

~~~swift
// swift-tools-version:4.0
// The swift-tools-version declares the minimum version of Swift required to build this package.

import PackageDescription

let package = Package(
    name: "mytool",
    products: [
        // Products define the executables and libraries produced by a package, and make them visible to other packages.
        .library(
            name: "mytool",
            targets: ["mytool"]),
    ],
    dependencies: [
        // Dependencies declare other packages that this package depends on.
        // .package(url: /* package url */, from: "1.0.0"),
    ],
    targets: [
        // Targets are the basic building blocks of a package. A target defines a module or a test suite.
        // Targets can depend on other targets in this package, and on products in packages which this package depends on.
        .target(
            name: "mytool",
            dependencies: []),
        .testTarget(
            name: "mytoolTests",
            dependencies: ["mytool"]),
    ]
)
~~~

There are three key differences between the Swift 4 manifest above and the
previous manifest format:

1. The tools version `4.0` is specified using the line `// swift-tools-version:4.0`.
2. All targets and their dependencies must be explicitly declared.
3. Public targets are vended as products using the new product API. Targets in
   Swift 4 packages can either depend on products of other packages, or targets
   of the same package.

## Custom Target Layouts

The new manifest supports customizing the layout of the package. Packages are no
longer required to follow complex, convention-based layout rules.  There is only
one rule: if the target path is not provided, directories `Sources`, `Source`,
`src`, `srcs` and `Tests` will be searched (in order) to find the target.

Custom layouts make porting C libraries to Swift Package Manager easier. Here
are manifests of two C libraries used in server side Swift community:

#### [LibYAML](https://github.com/yaml/libyaml)

~~~
Copyright (c) 2006-2016 Kirill Simonov, licensed under MIT license (https://github.com/yaml/libyaml/blob/master/LICENSE)
~~~

~~~swift
// swift-tools-version:4.0

import PackageDescription

let packages = Package(
    name: "LibYAML",
    products: [
        .library(
            name: "libyaml",
            targets: ["libyaml"]),
    ],
    targets: [
        .target(
            name: "libyaml",
            path: ".",
            sources: ["src"])
    ]
)
~~~

#### [Node.js http-parser](https://github.com/nodejs/http-parser)

~~~
Copyright by Authors (https://github.com/nodejs/http-parser/blob/master/AUTHORS), licensed under MIT license (https://github.com/nodejs/http-parser/blob/master/LICENSE-MIT)
~~~

~~~swift
// swift-tools-version:4.0

import PackageDescription

let packages = Package(
    name: "http-parser",
    products: [
        .library(
            name: "httpparser",
            targets: ["http-parser"]),
    ],
    targets: [
        .target(
            name: "http-parser",
            publicHeaders: ".",
            sources: ["http_parser.c"])
    ]
)
~~~

## Dependency Resolution

Since Swift 3 Package Manager doesn't understand the Swift 4 manifest format, it
will automatically ignore the Git tags that contain a Swift 4 manifest. So, if
a package upgrades to Swift 4 manifest, Swift 3 Package Manager will pick the
last tag which contains the Swift 3 manifest. However, the Package
Manager in Swift 4 will pick the latest available version, regardless of manifest version.

## Updating an Existing Package to the Swift 4 Manifest Format

Follow these steps to update existing package to use the Swift 4 manifest format.

* Update the tools version of the package.

    Use the `tools-version` subcommand to update the tools version of the package.

~~~sh
$ cd mypackage
$ swift package tools-version --set-current
~~~

* Move the `dependencies` label to precede the `targets` label and update the
  package dependency syntax. For example:

~~~diff
    ...
    dependencies: [
-    .Package(url: "https://github.com/apple/example-package-fisheryates.git", majorVersion: 2),
+    .package(url: "https://github.com/apple/example-package-fisheryates.git", from: "2.0.0"),

-    .Package(url: "https://github.com/apple/example-package-playingcard.git", majorVersion: 3, minor: 3),
+    .package(url: "https://github.com/apple/example-package-playingcard.git", .upToNextMinor(from: "3.3.0")),
    ]
    ...
~~~

* Declare all regular and test targets.

    All targets and their dependencies should be explicitly declared. If there
    are two targets, `Foo` and `FooTests`, declare both of them in `targets`
    label. For example:

~~~swift
    ...
    targets: [
        .target(
            name: "Foo"),
        .testTarget(
            name: "FooTests",
            dependencies: ["Foo"]),
    ]
    ...
~~~

* If the package is using the legacy single target layout, update the layout or
    provide the target path.

    The recommended layout is to have one directory per target under the
    `Sources` i.e. `Sources/<target-name>`. If a package is using this layout,
    the target path will be automatically detected. Otherwise, provide a target
    path. For example:

~~~swift
    ...
    targets: [
        .target(
            name: "Foo",
            path: "."), // The sources are located in package root.
        .target(
            name: "Bar",
            path: "Sources") // The sources are located in directory Sources/.
    ]
    ...
~~~

* Export public targets using the product API.

    Library packages should explicitly export their public targets to allow
    other packages to import them. Avoid exporting targets like sample code
    targets, test support library etc.

~~~swift
    ...
    products: [
        .library(
            name: "Foo",
            targets: ["Foo", "Bar"]),
    ],
    ...
~~~

* Compile in Swift 3 compatibility mode.

    You can update your package manifest to the new format before updating your
    package's source code to Swift 4.  To do so, set the `swiftLanguageVersions`
    property to 3 to build your package in Swift 3 compatibility mode.

~~~swift
    ...
    swiftLanguageVersions: [3]
    ...
~~~
