rm -rf build
npm run build
cp -r build/* ../ar_runtime_web_console-lib/src/main/resources/ar_runtime_web_console/web/
cp -r build/*  /Users/allwefantasy/web/form/

rm -rf /Users/allwefantasy/projects/byzer-data-as-form/form
cp -r build  /Users/allwefantasy/projects/byzer-data-as-form/form