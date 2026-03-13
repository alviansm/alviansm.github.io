---
layout: post
title: "Day #1 - Weird Algorithm"
date: 2025-08-25 10:00:00 +0000
categories: [Notes]
tags: [CSES]
author: "Alvians Maulana"
image: assets/images/andrea-leopardi-QVD3Xht9txA-unsplash.jpg
---

# Day #1 - Weird Algorithm

## Problem
```
Consider an algorithm that takes as input a positive integer n. If n is even, the algorithm divides it by two, and if n is odd, the algorithm multiplies it by three and adds one. The algorithm repeats this, until n is one. For example, the sequence for n=3 is as follows:
 3 \rightarrow 10 \rightarrow 5 \rightarrow 16 \rightarrow 8 \rightarrow 4 \rightarrow 2 \rightarrow 1
 
Your task is to simulate the execution of the algorithm for a given value of n.
Input
The only input line contains an integer n.
Output
Print a line that contains all values of n during the algorithm.
Constraints

1 \le n \le 10^6

Example
Input:
3

Output:
3 10 5 16 8 4 2 1
```

## Solution #1
This is my first time trying CS problems from Marine Engineering background. Intuitively, I implemented them straight-forwardly using `while` loop and if-else conditional statement. I expected them to be that straightforward since it's **Introductory Problems**, but turn out it's not as simple as I tought earlier.

```cpp
#include <iostream>

int main()
{
	int n;
	std::cin >> n;
	
	while (n != 1)
	{
		std::cout << n << " ";
		if (n % 2 == 0)
			n /= 2;
		else
			n = 3 * n + 1;	
	}

	std::cout << n << " ";

	return 0;
}
```

However, to my surprise, it resulted in

![Result snapshot](/assets/images/daily_cses/Screenshot_192.png)

failure in some test case. Which result in my suspicioun about
1. The data type that I used
2. Printing during computation that makes the program slow

Here's how I deduced the failure. Initially, I was confident that it would work, but since it result in failed, I had to check the test case and compile the implementation. Here's the result

![Result snapshot](/assets/images/daily_cses/Screenshot_190.png)

And as you can see, after `932774453` it flips into negative value instead, and make me realized that perhaps `int` data type wasnt enough because it seem to overflowed the 32-but `int` data type. Hence, I tried to change this in my next attempt.

Now, about the time limit, I've used `std::cout` in each computation which as I've read further, it seemed that calling it in each loop result in costly time limit since they execute multiple buffer flushes. That's why, in the next attempt, I tried to batch the operation.

## Solution #2
```
#include <iostream>
#include <vector>
 
int main()
{
	long long n;
	std::cin >> n;
	
	std::vector<long long> sequence;
	
	while (n != 1)
	{
		sequence.push_back(n);
		if (n % 2 == 0)
			n /= 2;
		else
			n = 3 * n + 1;	
	}
	sequence.push_back(1);
	
	// Print all at once
	for (long long num : sequence)
	{
		std::cout << num << " ";
	}
 
	return 0;
}
```

Now, the approach work better and as I've tried to compile prior submitting it and input the previously failed test case, it resulted in following:

![Result snapshot](/assets/images/daily_cses/Screenshot_189.png)

And after submitting:

![Result snapshot](/assets/images/daily_cses/Screenshot_191.png)

## Key Note (Attempting CSES for the first time)
- In C++, it uses standard library, `iostream` to read the input via `cin` and output the expected output mentioned in the problem via `cout`.
- Keep an eye on the time limit and memory expectation for the problem's constraints.
- The return value of the `main` function doesnt matter.

## Further Readings
As it turns out, the problem is an unsolved problems in mathematics, that asks whether repeating 2 simple arithmetic will eventually transform any positive integer into 1.
- [Veritasium](https://www.youtube.com/watch?v=094y1Z2wpJg)
- [Wikipedia](https://en.wikipedia.org/wiki/Collatz_conjecture)

Photo by <a href="https://unsplash.com/@whatyouhide?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Andrea Leopardi</a> on <a href="https://unsplash.com/photos/person-running-on-road-at-daytime-QVD3Xht9txA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</a>
      
