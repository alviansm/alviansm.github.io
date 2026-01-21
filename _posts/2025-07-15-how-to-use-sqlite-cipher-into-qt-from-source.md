---
layout: post
title: "How to Use SQLite Cipher into Qt (From SOurce)"
subtitle: "Practical Guide"
date: 2025-07-15 10:00:00 +0000
categories: [Devlog]
tags: [Qt, devlogs]
author: "Alvians Maulana"
image: assets/images/sqlcipher/jan-antonin-kolar-lRoX0shwjUQ-unsplash.jpg
---
Sometimes when we want to ship our apps while we use an SQLite for the database and we don’t want end users to hack our app that rely on the DB, we need a method to safely store data even in the local machine. Unfortunately, SQLite doesn't have that feature, as for now. Well, I won’t go further for the chit chats since you should already know the why if you want to read this.

---
## 🧭 <span id="outline">Outline</span>
- [Prerequisite](#prerequisite)
- [The Steps](#the-steps)
  - [Prepare the Toolchain](#prepare-the-toolchain)
  - [Generate SQLCipher Amalgamation](#generate-sqlcipher-amalgamation)
  - [Prepare Qt Build Environment](#prepare-qt-build-environment)
  - [Configure the Plugin](#configure-the-plugin)
  - [Build the Plugin](#build-the-plugin)
  - [Install the Plugin](#install-the-plugin)
- [References](#references)

---

## <span id="prerequisite">Prerequisite</span>
- You will need
- Qt 6.8.3 Source installed from Qt Maintenance Tools [https://www.qt.io/]
- SQLite Cipher 4.54 source [https://github.com/sqlcipher/sqlcipher/releases/tag/v4.5.4]
- OpenSSL
- CMake
- MSVC2022 x64
- Maybe SQLite DB Browser for a GUI to open your DB

Or any equivalent tools in your choice of toolchain. In my case, I am building on Windows, so that’s my choice of tools. I assume you already know how to setup in your local machine.

As per writing of this article, I use Qt 6.8.3 since it seems 6.8.0 but prior my tool choice, there is a bug if we want to build Qt from source, but we need partial feature such as database driver. Qt will ask for project bom and they decided that its required as per 6.8, but when we build a partial feature such as the driver, we wont have that meta information. Unless if you want to tweak around, I suggest just use the 6.8.3. I’ve trial and error this experience. I used the 6.8.0 initially.

Another thing that I need to denote is that, I use SQLite Cipher since, in that version, there is no dependency that cause me a pain that I shouldn’t suffer, xoshiro. I have to lookup trough trial and error too for this one.

Now, for the build process, we have to ensure that the toolchain is equivalent when we generate the SQL Cipher amalgamation, the Qt’s Sql Driver, and the Qt that we use to develop our app.

## <span id="the-steps">The Steps</span>
### <span id="prepare-the-toolchain">Prepare the toolchain.</span>
At this point, you should already know the toolchain that I mentioned. If not, there are tons of materials already in the internet, go find it, lookup to their docs. Or just use Gemini.

### <span id="generate-sqlcipher-amalgamation">Generate SQL Cipher Amalgamation</span>
In the SQL Cipher source, make the amalgamation and the dynamic library by following their step. Make sure we use the same compiler, in my case it’s MSVC2022 that could be accessed via `x64 command prompt for developer` in Windows. They already give us the steps too in their github repo, and the important command for this, is `nmake /f makefile.msc`.

### <span id="prepare-qt-build-environment">Prepare Qt build environment.</span>
Clone or extract the Qt source that matches your existing Qt installation — in my case, Qt\6.8.3\Src. This source is needed because we’re going to rebuild the qsqlite driver plugin with SQLCipher support.
Ensure you have CMake and Perl installed and accessible from your terminal, as they are required for the build system to configure properly. You should also be using the same compiler toolchain as your Qt build. Again, MSVC2022 x64 in my case.

### <span id="configure-the-plugin">Configure the plugin</span>
Navigate to:
```
Qt\6.8.3\Src\qtbase\src\plugins\sqldrivers\sqlite
```
- Back up the original CMakeLists.txt, then replace it with a custom version that includes:
- Your SQLCipher amalgamated sqlite3.c file.
- libcrypto.lib from your vcpkg or OpenSSL installation.
- Required #defines for enabling SQLCipher and optional SQLite extensions like JSON1, FTS5, etc.
- Include paths to OpenSSL headers.
This ensures the plugin will be built against SQLCipher instead of regular SQLite.
In my case, its

```
cmake_minimum_required(VERSION 3.21)
project(QSQLiteDriverPlugin LANGUAGES C CXX)

set(CMAKE_AUTOMOC ON)
set(CMAKE_AUTOUIC ON)
set(CMAKE_AUTORCC ON)

# Adjust this if your Qt installation is elsewhere
set(QT_PREFIX "E:/Qt/6.8.3/msvc2022_64")
set(VCPKG_CRYPTO_LIB_PATH "...vcpkg/x64-windows/lib/libcrypto.lib")
set(VCPKG_INCLUDE_PATH "...vcpkg/installed/x64-windows/include")

# Find Qt
find_package(Qt6 REQUIRED COMPONENTS Core Sql)

include_directories(
    ${CMAKE_CURRENT_SOURCE_DIR}
    ${QT_PREFIX}/include
    ${QT_PREFIX}/include/QtCore
    ${QT_PREFIX}/include/QtCore/6.8.3
    ${QT_PREFIX}/include/QtCore/6.8.3/QtCore
    ${QT_PREFIX}/include/QtSql
    ${QT_PREFIX}/include/QtSql/6.8.3
    ${QT_PREFIX}/include/QtSql/6.8.3/QtSql
    ${VCPKG_INCLUDE_PATH}
)


add_definitions(
    -DQT_STATICPLUGIN
    -DQT_PLUGIN
    -DSQLITE_HAS_CODEC
    -DUSE_CRYPT
    -DSQLITE_TEMP_STORE=2
    -DSQLITE_EXTRA_INIT=sqlcipher_extra_init
    -DSQLITE_EXTRA_SHUTDOWN=sqlcipher_extra_shutdown
    -DSQLITE_ENABLE_COLUMN_METADATA
    -DSQLITE_ENABLE_FTS3
    -DSQLITE_ENABLE_FTS3_PARENTHESIS
    -DSQLITE_ENABLE_FTS4
    -DSQLITE_ENABLE_FTS5
    -DSQLITE_ENABLE_GEOPOLY
    -DSQLITE_ENABLE_JSON1
    -DSQLITE_ENABLE_MATH_FUNCTIONS
    -DSQLITE_ENABLE_RTREE
    -DSQLITE_OMIT_COMPLETE
    -DNDEBUG
)

add_library(qsqlite SHARED
    qsql_sqlite.cpp
    qsql_sqlite_p.h
    qsql_sqlite_vfs.cpp
    qsql_sqlite_vfs_p.h
    smain.cpp
    sqlite3.c
)

target_link_libraries(qsqlite
    Qt6::Core
    Qt6::Sql
    optimized ${VCPKG_CRYPTO_LIB_PATH}
)

set_target_properties(qsqlite PROPERTIES
    LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/output"
    RUNTIME_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}/output"
)
```

### <span id="build-the-plugin">Build the Plugin</span>
Create a build/ folder inside the same directory:
```
mkdir build
cd build
```
Then configure the project using CMake:
```
cmake .. -G "NMake Makefiles" ^
  -DCMAKE_PREFIX_PATH=E:\Qt\6.8.3\msvc2022_64 ^
  -DCMAKE_INSTALL_PREFIX=E:\Qt\6.8.3\msvc2022_64

# build the plugin
nmake
```
If successful, this will produce a qsqlite.dll (and debug versions if applicable). If not, well good luck will solving your problems.

### <span id="install-the-plugin">Install the plugin for Qt to use globally.</span>
Copy the resulting .dll (and .pdb if you want debug symbols) to Qt’s plugin directory:
```
Qt\6.8.3\msvc2022_64\plugins\sqldrivers
```
This overrides the default SQLite driver for any Qt app using this Qt installation.
Verify and use in your Qt app.
In your app, you can verify it’s loaded by running:
```
qDebug() << QSqlDatabase::drivers();  // should include "QSQLITE"
```
Then, open an encrypted database like this:
```
QSqlDatabase db = QSqlDatabase::addDatabase("QSQLITE");
db.setDatabaseName("my_encrypted.db");
db.open();

QSqlQuery query;
query.exec("PRAGMA key = 'my-secret-key';");
```
You can verify SQLCipher is active by checking the version:
```
query.exec("PRAGMA cipher_version;");
```

---

[back to top](#outline)

## <span id="references">References:</span>
- https://www.qt.io/
- https://github.com/sqlcipher/sqlcipher/releases/tag/v4.5.4

Hey, in case our toolchain is the same, or the future me need it, just [download the .dll](assets/resource/qsqlite.dll).

Cover: Photo by <a href="https://unsplash.com/@jankolar?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Jan Antonin Kolar</a> on <a href="https://unsplash.com/photos/brown-wooden-drawer-lRoX0shwjUQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      