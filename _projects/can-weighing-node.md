---
layout: project
title: CAN Weighing Node
description: Multi-channel HX711-based weighing node using CAN bus
short: HX711 + CAN bus load cell node
status: Active
tags: [CAN, HX711, Embedded]
date: 2025-01-10
featured: true
---

## Overview

This project implements a distributed weighing node using multiple HX711 ADCs
connected to a microcontroller and communicating over CAN bus.

The node is designed to be used in industrial or mobile weighing systems where
multiple sensors must be aggregated reliably.

## Hardware

- MCU: ATmega2560 (initial prototype)
- ADC: HX711 (24-bit)
- CAN: MCP2515 + TJA1050
- Power: 12–24 V input with onboard regulation

## Features

- Multi-channel load cell support
- CAN-based data transmission
- Fault detection and status reporting
- Simple message protocol

## Current Status

The prototype is functional and used for internal testing.
Firmware cleanup and documentation are ongoing.
