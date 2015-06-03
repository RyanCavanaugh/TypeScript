set src=built\local
set dst="%AppData%\Sublime Text 2\Packages\TypeScript\tsserver"

copy /y %src%\lib.d.ts %dst%
copy /y %src%\lib.jsx.d.ts %dst%
copy /y %src%\lib.es6.d.ts %dst%
copy /y %src%\tsserver.js %dst%
copy /y %src%\tsserver.js.map %dst%


