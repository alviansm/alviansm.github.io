---
layout: post
title: "Function Argument with Reference in C++"
date: 2026-04-05 10:00:00 +0000
categories: [Study]
tags: [C++]
author: "Alvians Maulana"
---

- In C++, if a function expect a `&` argument, it will treat the argument with the same memory address that the variable stored.
- It does NOT expect the memory itself as the argument.

That means `&` (ampersand) symbol in C++ have 2 meaning and differ in

- function argument
- in an expression → will print an address if operated via `std::cout`

Example

```cpp
// Passing reference argument in built in data type
#include <bits/stdc++.h>
using namespace std;

#define fast_io ios_base::sync_with_stdio(false); cin.tie(NULL); cout.tie(NULL)
#define ll long long

void add_score(int score) {
    score += 10;
}

void add_score2(int &score) {
    score += 10;
}

int main() {
    fast_io;

    int initial_score = 0;
    cout << "Initial score: " << initial_score << "\n";

    add_score(initial_score); // This won't change the value since the function only makes copy
    cout << "Added score (plain): " << initial_score << "\n";

    // cout << "initial_score address: " << &initial_score << "\n"; // This will print the address if initial_score
    // But calling add_score2(&initial_score) will cause compilation error since C++ expects the variable and NOT the address
    add_score2(initial_score);
    cout << "Added score (new): " << initial_score << "\n";

    return 0;
}
```

Analogy

- To make the function argument with `&` more intuitive, think of
    - The function provide a bucket to do something in it.
    - If we call the function and give it another bucket (the address via `&`), it will cause technical overflow.
    - Hence, it should be given a water.