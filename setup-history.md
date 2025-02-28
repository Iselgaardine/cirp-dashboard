PS C:\Users\User> # Neuen Ordner erstellen
PS C:\Users\User> cd Desktop
PS C:\Users\User\Desktop> mkdir cirp-dashboard


    Verzeichnis: C:\Users\User\Desktop


Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        12.02.2025     16:05                cirp-dashboard


PS C:\Users\User\Desktop> cd cirp-dashboard
PS C:\Users\User\Desktop\cirp-dashboard> # React-Projekt erstellen
PS C:\Users\User\Desktop\cirp-dashboard> npx create-react-app . --template typescript

Creating a new React app in C:\Users\User\Desktop\cirp-dashboard.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...


added 1326 packages in 49s

268 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...
npm error code ERESOLVE
npm error ERESOLVE unable to resolve dependency tree
npm error
npm error While resolving: cirp-dashboard@0.1.0
npm error Found: react@19.0.0
npm error node_modules/react
npm error   react@"^19.0.0" from the root project
npm error
npm error Could not resolve dependency:
npm error peer react@"^18.0.0" from @testing-library/react@13.4.0
npm error node_modules/@testing-library/react
npm error   @testing-library/react@"^13.0.0" from the root project
npm error
npm error Fix the upstream dependency conflict, or retry
npm error this command with --force or --legacy-peer-deps
npm error to accept an incorrect (and potentially broken) dependency resolution.
npm error
npm error
npm error For a full report see:
npm error C:\Users\User\AppData\Local\npm-cache\_logs\2025-02-12T15_08_37_858Z-eresolve-report.txt
npm error A complete log of this run can be found in: C:\Users\User\AppData\Local\npm-cache\_logs\2025-02-12T15_08_37_858Z-debug-0.log
`npm install --no-audit --save @testing-library/jest-dom@^5.14.1 @testing-library/react@^13.0.0 @testing-library/user-event@^13.2.1 @types/jest@^27.0.1 @types/node@^16.7.13 @types/react@^18.0.0 @types/react-dom@^18.0.0 typescript@^4.4.2 web-vitals@^2.1.0` failed
PS C:\Users\User\Desktop\cirp-dashboard> 
PS C:\Users\User\Desktop\cirp-dashboard> cd ..
PS C:\Users\User\Desktop> rm -r cirp-dashboard
rm : Das Element C:\Users\User\Desktop\cirp-dashboard\.git kann nicht entfernt werden: Sie besitzen keine ausreichenden Zugriffsberechtigungen zum Ausführen dieses Vorgangs.
In Zeile:1 Zeichen:1
+ rm -r cirp-dashboard
+ ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : PermissionDenied: (.git:DirectoryInfo) [Remove-Item], IOException
    + FullyQualifiedErrorId : RemoveFileSystemItemUnAuthorizedAccess,Microsoft.PowerShell.Commands.RemoveItemCommand
rm : Das Verzeichnis "C:\Users\User\Desktop\cirp-dashboard" kann nicht entfernt werden, da es nicht leer ist.
In Zeile:1 Zeichen:1
+ rm -r cirp-dashboard
+ ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : WriteError: (C:\Users\User\Desktop\cirp-dashboard:DirectoryInfo) [Remove-Item], IOException
    + FullyQualifiedErrorId : DirectoryNotEmpty,Microsoft.PowerShell.Commands.RemoveItemCommand

PS C:\Users\User\Desktop> mkdir cirp-dashboard
mkdir : Ein Element mit dem angegebenen Namen "C:\Users\User\Desktop\cirp-dashboard" ist bereits vorhanden.
In Zeile:1 Zeichen:1
+ mkdir cirp-dashboard
+ ~~~~~~~~~~~~~~~~~~~~
    + CategoryInfo          : ResourceExists: (C:\Users\User\Desktop\cirp-dashboard:String) [New-Item], IOException
    + FullyQualifiedErrorId : DirectoryExist,Microsoft.PowerShell.Commands.NewItemCommand

PS C:\Users\User\Desktop> cd cirp-dashboard
PS C:\Users\User\Desktop\cirp-dashboard> npx create-react-app . --template typescript@latest
Need to install the following packages:
create-react-app@5.1.0
Ok to proceed? (y) y

create-react-app is deprecated.

You can find a list of up-to-date React frameworks on react.dev
For more info see:https://react.dev/link/cra

This error message will only be shown once per install.

Creating a new React app in C:\Users\User\Desktop\cirp-dashboard.

Installing packages. This might take a couple of minutes.
Installing react, react-dom, and react-scripts with cra-template-typescript...


added 1325 packages in 47s

268 packages are looking for funding
  run `npm fund` for details

Initialized a git repository.

Installing template dependencies using npm...

added 22 packages, removed 1 package, and changed 2 packages in 5s

268 packages are looking for funding
  run `npm fund` for details

We detected TypeScript in your project (src\App.test.tsx) and created a tsconfig.json file for you.

Your tsconfig.json has been populated with default values.

Removing template package using npm...


removed 1 package, and audited 1346 packages in 3s

268 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (6 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.

Created git commit.

Success! Created cirp-dashboard at C:\Users\User\Desktop\cirp-dashboard
Inside that directory, you can run several commands:

  npm start
    Starts the development server.

  npm run build
    Bundles the app into static files for production.

  npm test
    Starts the test runner.

  npm run eject
    Removes this tool and copies build dependencies, configuration files
    and scripts into the app directory. If you do this, you can’t go back!

We suggest that you begin by typing:

  cd C:\Users\User\Desktop\cirp-dashboard
  npm start

Happy hacking!
PS C:\Users\User\Desktop\cirp-dashboard> npm install @heroicons/react tailwindcss postcss autoprefixer shadcn-ui

added 61 packages, removed 1 package, changed 1 package, and audited 1406 packages in 11s

296 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (6 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\User\Desktop\cirp-dashboard> npx tailwindcss init -p
Der Befehl "tailwind" ist entweder falsch geschrieben oder
konnte nicht gefunden werden.
PS C:\Users\User\Desktop\cirp-dashboard> npm install -D tailwindcss postcss autoprefixer
npm warn idealTree Removing dependencies.tailwindcss in favor of devDependencies.tailwindcss
npm warn idealTree Removing dependencies.postcss in favor of devDependencies.postcss
npm warn idealTree Removing dependencies.autoprefixer in favor of devDependencies.autoprefixer

changed 1 package, and audited 1406 packages in 2s

296 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (6 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\User\Desktop\cirp-dashboard> npx tailwindcss init -p
Der Befehl "tailwind" ist entweder falsch geschrieben oder
konnte nicht gefunden werden.
PS C:\Users\User\Desktop\cirp-dashboard> npx tailwindcss@latest init -p
npm error could not determine executable to run
npm error A complete log of this run can be found in: C:\Users\User\AppData\Local\npm-cache\_logs\2025-02-18T09_02_54_028Z-debug-0.log
PS C:\Users\User\Desktop\cirp-dashboard> node -v
v22.14.0
PS C:\Users\User\Desktop\cirp-dashboard> npm -v
10.9.2
PS C:\Users\User\Desktop\cirp-dashboard> rm -rf node_modules
Remove-Item : Es wurde kein Parameter gefunden, der dem Parameternamen "rf" entspricht.
In Zeile:1 Zeichen:4
+ rm -rf node_modules
+    ~~~
    + CategoryInfo          : InvalidArgument: (:) [Remove-Item], ParameterBindingException
    + FullyQualifiedErrorId : NamedParameterNotFound,Microsoft.PowerShell.Commands.RemoveItemCommand

PS C:\Users\User\Desktop\cirp-dashboard> rm package-lock.json
PS C:\Users\User\Desktop\cirp-dashboard> node --version
v22.14.0
PS C:\Users\User\Desktop\cirp-dashboard> npm --version
10.9.2
PS C:\Users\User\Desktop\cirp-dashboard> Remove-Item -Recurse -Force node_modules
PS C:\Users\User\Desktop\cirp-dashboard> npm install
npm warn deprecated inflight@1.0.6: This module is not supported, and leaks memory. Do not use it. Check out lru-cache if you want a good and tested way to coalesce async requests by a key value, which is much more comprehensive and powerful.   
npm warn deprecated @babel/plugin-proposal-numeric-separator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-numeric-separator instead.
npm warn deprecated @babel/plugin-proposal-class-properties@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-class-properties instead.
npm warn deprecated @babel/plugin-proposal-private-methods@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-methods instead.
npm warn deprecated @babel/plugin-proposal-nullish-coalescing-operator@7.18.6: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-nullish-coalescing-operator instead.
npm warn deprecated @humanwhocodes/config-array@0.13.0: Use @eslint/config-array instead
npm warn deprecated stable@0.1.8: Modern JS already guarantees Array#sort() is a stable sort, so this library is deprecated. See the compatibility table on MDN: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort#browser_compatibility
npm warn deprecated @babel/plugin-proposal-private-property-in-object@7.21.11: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-private-property-in-object instead.
npm warn deprecated @babel/plugin-proposal-optional-chaining@7.21.0: This proposal has been merged to the ECMAScript standard and thus this plugin is no longer maintained. Please use @babel/plugin-transform-optional-chaining instead.
npm warn deprecated rimraf@3.0.2: Rimraf versions prior to v4 are no longer supported
npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported
npm warn deprecated rollup-plugin-terser@7.0.2: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-terser
npm warn deprecated abab@2.0.6: Use your platform's native atob() and btoa() methods instead
npm warn deprecated q@1.5.1: You or someone you depend on is using Q, the JavaScript Promise library that gave JavaScript developers strong feelings about promises. They can almost certainly migrate to the native JavaScript promise now. Thank you literally everyone for joining me in this bet against the odds. Be excellent to each other.
npm warn deprecated
npm warn deprecated (For a CapTP with native promises, see @endo/eventual-send and @endo/captp)
npm warn deprecated @humanwhocodes/object-schema@2.0.3: Use @eslint/object-schema instead
npm warn deprecated domexception@2.0.1: Use your platform's native DOMException instead
npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
npm warn deprecated w3c-hr-time@1.0.2: Use your platform's native performance.now() and performance.timeOrigin.
npm warn deprecated workbox-cacheable-response@6.6.0: workbox-background-sync@6.6.0
npm warn deprecated workbox-google-analytics@6.6.0: It is not compatible with newer versions of GA starting with v4, as long as you are using GAv3 it should be ok, but the package is not longer being maintained
npm warn deprecated svgo@1.3.2: This SVGO version is no longer supported. Upgrade to v2.x.x.
npm warn deprecated eslint@8.57.1: This version is no longer supported. Please see https://eslint.org/version-support for other options.

added 1405 packages, and audited 1406 packages in 56s

296 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (6 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\User\Desktop\cirp-dashboard> npm install -D tailwindcss@latest postcss@latest autoprefixer@latest

changed 1 package, and audited 1406 packages in 3s

296 packages are looking for funding
  run `npm fund` for details

12 vulnerabilities (6 moderate, 6 high)

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
PS C:\Users\User\Desktop\cirp-dashboard> npx tailwindcss init -p
Der Befehl "tailwind" ist entweder falsch geschrieben oder
konnte nicht gefunden werden.
PS C:\Users\User\Desktop\cirp-dashboard> /** @type {import('tailwindcss').Config} */
/** : Die Benennung "/**" wurde nicht als Name eines Cmdlet, einer Funktion, einer Skriptdatei oder eines ausführbaren Programms erkannt. Überprüfen Sie die Schreibweise des Namens, oder ob der Pfad korrekt ist (sofern enthalten), und
wiederholen Sie den Vorgang.
In Zeile:1 Zeichen:1
+ /** @type {import('tailwindcss').Config} */
+ ~~~
    + CategoryInfo          : ObjectNotFound: (/**:String) [], CommandNotFoundException
    + FullyQualifiedErrorId : CommandNotFoundException

PS C:\Users\User\Desktop\cirp-dashboard> module.exports = {
>>   content: [
>>     "./src/**/*.{js,jsx,ts,tsx}",
>>   ],
>>   theme: {
>>     extend: {},
>>   },
>>   plugins: [],
>> }
In Zeile:3 Zeichen:34
+     "./src/**/*.{js,jsx,ts,tsx}",
+                                  ~
Ausdruck nach "," fehlt.
In Zeile:4 Zeichen:3
+   ],
+   ~
Unerwartetes Token "]" in Ausdruck oder Anweisung.
In Zeile:4 Zeichen:4

PS C:\Users\User\Desktop\cirp-dashboard> module.exports = {
>>   content: [
>>     "./src/**/*.{js,jsx,ts,tsx}",
>>   ],
>>   theme: {
>>     extend: {},
>>   },
>>   plugins: [],
>> }
In Zeile:3 Zeichen:34
+     "./src/**/*.{js,jsx,ts,tsx}",
+                                  ~
Ausdruck nach "," fehlt.
In Zeile:4 Zeichen:3
+   ],
+   ~
Unerwartetes Token "]" in Ausdruck oder Anweisung.
In Zeile:4 Zeichen:4
+   ],
+   ],
+   ],
+    ~
+   ],
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
Ausdruck nach "," fehlt im Pipelineelement.
In Zeile:8 Zeichen:15
+   plugins: [],
+               ~
Ausdruck nach "," fehlt im Pipelineelement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
Ausdruck nach "," fehlt im Pipelineelement.
In Zeile:8 Zeichen:15
+   plugins: [],
+               ~
Ausdruck nach "," fehlt im Pipelineelement.
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
Ausdruck nach "," fehlt im Pipelineelement.
In Zeile:8 Zeichen:15
+   plugins: [],
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
Ausdruck nach "," fehlt im Pipelineelement.
In Zeile:8 Zeichen:15
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+   ],
+    ~
Argument in der Parameterliste fehlt.
+   ],
+    ~
+   ],
+    ~
+   ],
+    ~
+   ],
+   ],
+    ~
Argument in der Parameterliste fehlt.
In Zeile:6 Zeichen:16
+     extend: {},
+                ~
Ausdruck nach "," fehlt im Pipelineelement.
In Zeile:8 Zeichen:15
+   plugins: [],
+               ~
Ausdruck nach "," fehlt im Pipelineelement.
    + CategoryInfo          : ParserError: (:) [], ParentContainsErrorRecordException
    + FullyQualifiedErrorId : MissingExpressionAfterToken

PS C:\Users\User\Desktop\cirp-dashboard>pwd

