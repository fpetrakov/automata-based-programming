# Automata Based Programming
Here I keep my notes, code and materials on automata based programming

## Что такое автоматное программирование

Парадигма программирования, в которой у системы выделяют состояния (режимы или фазы). Система может переходить из одного состояния в другое и по разному реагировать на события или входящие данные в зависимости от этого состояния. Переходы удобно описывать с помощью таблицы или графа.

Обычно у системы конечное кол-во состояний, в таком случае она является конечным автоматом. Конечный автомат - абстрактная модель устройства, которое имеет вход, выход и конечное множество состояний.  

## Finite Automata

Finite state machine is an abstract machine that has states and transition between these states. It's always in one of its states and while it reads an input and switches from state to state. It has a start state and can have one or more accepting (end) states.

## Regular Expressions

L(A) - Language of A. If a language can be recognized by a finite automata then it can be described using regex and vice versa. Regex == user-friendly alternative to finite automata for describing patterns in text. 

## Materials

- [Автоматное программирование c примерами на JavaScript](https://youtu.be/mxz7_zcip0c)
- [Implementing a regular expression engine](https://deniskyashif.com/2019/02/17/implementing-a-regular-expression-engine/)
