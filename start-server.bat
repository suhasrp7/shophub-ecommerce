@echo off
echo ====================================
echo   ShopHub E-Commerce Server
echo ====================================
echo.
cd /d "%~dp0dist"
echo Starting server at http://localhost:8080
echo.
echo To stop server, close this window or press Ctrl+C
echo.
npx http-server -p 8080 -c-1
