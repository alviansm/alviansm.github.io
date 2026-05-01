---
layout: post
title: "Function Templates"
date: 2026-04-29 10:00:00 +0000
categories: [Study]
tags: [C++]
author: "Alvians Maulana"
---

- `template` could also be used in a function as a parameter of algorithms.
- Following `sum()` function can be invoked for any data structure that supports begin() and end() so that the range-for will work.
    - Such structures include the standard-library `vector`, `list`, and `map`.
- We could say that the sum() algorithm is generic in two dimensions: the type of the data structure used to store elements (‘‘the container’’) and the type of elements.

```cpp
// Function templates
#include <iostream>
#include <vector>
#include <cstdlib> // rand(), srand()
#include <ctime>   // time()

template <typename Container, typename Value>
Value sum(const Container& c, Value v) {
    for (auto &x : c) {
        v += x;
        std::cout << x << " ";
    }
    std::cout << std::endl;
    return v;
}

int main() {
    std::srand(static_cast<unsigned int>(std::time(nullptr)));
    int sz = 10;
    std::vector<int> vd(sz); 

    for (int i = 0; i < sz; ++i)
        vd[i] = std::rand() % 100; // Added %100 just to keep numbers small

    int val = sum(vd, 0);
    std::cout << "Value: " << val << std::endl;

    return 0;
}
```