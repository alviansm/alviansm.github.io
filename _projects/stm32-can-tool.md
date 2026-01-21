---
layout: project
title: STM32 CAN Diagnostic Tool
description: Small STM32-based CAN bus monitoring and testing device
short: Portable CAN monitor using STM32
status: Active
tags: [STM32, CAN, Tools]
date: 2024-11-02
featured: true
---

## Overview

This project is a small handheld CAN diagnostic tool built around an STM32
microcontroller. It is intended for quick inspection and testing of CAN traffic
during development and debugging.

## Hardware

- MCU: STM32F103
- CAN Transceiver: TJA1050
- Interface: USB CDC
- Display: None (terminal-based)

## Functionality

- Listen-only CAN monitoring
- Frame filtering by ID
- Error counter display
- USB serial output

## Notes

This tool prioritizes simplicity and reliability over advanced features.
Future versions may add a small OLED display.
