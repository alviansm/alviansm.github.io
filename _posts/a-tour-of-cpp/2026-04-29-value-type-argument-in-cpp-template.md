---
layout: post
title: "Value Type Argument in C++ Template"
date: 2026-04-29 10:00:00 +0000
categories: [Study]
tags: [C++]
author: "Alvians Maulana"
---
### What are Value Type Argument in Template

- Alongside `template` C++ could also utilize value type argument in classes or functions
- Some advantages of using value argument
    - Compile-time value with flexible template value
    - Class lives on “stack” (Faster, no memory reservation on heap. Safer, because it automatically cleaned-up when out of scope & the size is known, unlike dynamic memory allocations that use “heap”)

```cpp
#include <iostream>
#include <string>

template<typename T, int N>
struct Buffer {
    using type_name = T;
    constexpr int size() {return N;}
    T data[N];
};

template<typename B>
void process_buffer(B& buffer) {
    typename B::type_name temporary_item; // To access same data type as type T
    
    std::cout << "Type: " << typeid(temporary_item).name() << " processed." << std::endl;
}

int main() {
    Buffer<double, 64> glob;
    std::cout << "Size: " << glob.size() << std::endl;
    process_buffer(glob);

    Buffer<std::string, 32> glob2;
    process_buffer(glob2);

    return 0;
}
```

### Comparison

| **Feature** | **Dynamic (Heap)** | **Value Argument (Stack)** |
| --- | --- | --- |
| **Allocation Time** | Slow (Runtime) | Zero (Compile-time) |
| **Location** | Free Store | Stack / Embedded in Object |
| **Size Flexibility** | Can change while running | Fixed once compiled |
| **Metadata** | Stores pointers/capacity | Stores only the data |