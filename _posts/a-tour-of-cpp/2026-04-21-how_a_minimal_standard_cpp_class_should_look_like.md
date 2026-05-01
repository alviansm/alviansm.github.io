---
layout: post
title: "How a Minimal standard C++ Class should look like"
date: 2026-04-21 10:00:00 +0000
categories: [Study]
tags: [C++]
author: "Alvians Maulana"
---

A minimal standard C++ class should have:

- Constructor
- Destructor
- Copy operator (parentheses and `=` sign operators)
- Move operator
- `begin()` and `end()` to enable for-loop
    - `begin()` return pointer to first element (or `nullptr`)
    - `end()` return to one-past-last element
- Access operator for `Vector`-like class
    - `T& operator[](int i)` for example

```cpp
#include <iostream>
#include <stdexcept>

template<typename T>
class Vector {
    T* elem;
    size_t sz;

public:
    explicit Vector(size_t n) : sz(n) {
        if (n == 0) throw std::invalid_argument("Size must be > 0");
        elem = new T[n]; 
    }

    ~Vector() { delete[] elem; }

    // Disable copying for now (to avoid double-free crashes)
    Vector(const Vector&) = delete;
    Vector& operator=(const Vector&) = delete;

    T& operator[](size_t i) {
        if (i >= sz) throw std::out_of_range("Vector::operator[]");
        return elem[i];
    }

    const T& operator[](size_t i) const {
        if (i >= sz) throw std::out_of_range("Vector::operator[]");
        return elem[i];
    }

    size_t size() const { return sz; }

    T* begin() { return elem; }
    const T* begin() const { return elem; }
    
    T* end() { return elem + sz; }
    const T* end() const { return elem + sz; }
};

template <typename T>
void printAll(const Vector<T>& x) {
    for (const auto &val : x)
        std::cout << val << " ";
    std::cout << std::endl;
}

int main() {
    Vector<int> v(5);
    for(int i = 0; i < v.size(); ++i) v[i] = i * 10;

    printAll(v);
    return 0;
}
```