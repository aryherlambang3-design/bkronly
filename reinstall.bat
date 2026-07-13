@echo off
echo Removing old node_modules and package-lock.json...
rmdir /s /q node_modules
del package-lock.json

echo Installing dependencies...
npm install

echo Done! You can now run: npm run dev
pause
