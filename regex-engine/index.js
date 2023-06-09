function createState(isEnd) {
	return {
		isEnd,
		transition: {},
		epsilonTransitions: [],
	}
}

function addEpsilonTransition(from, to) {
	from.epsilonTransitions.push(to)
}

function addTransition(from, to, symbol) {
	from.transition[symbol] = to
}

function fromEpsilon() {
	const start = createState(false)
	const end = createState(end)
	addEpsilonTransition(start, end)

	return { start, end }
}

function fromSymbol(symbol) {
	const start = createState(false)
	const end = createState(true)
	addTransition(start, end, symbol)

	return { start, end }
}

function concat(first, second) {
	addEpsilonTransition(first.end, second.start)
	first.end.isEnd = false

	return { start: first.start, end: second.end }
}

function union(first, second) {
	const start = createState(false)
	addEpsilonTransition(start, first.start)
	addEpsilonTransition(start, second.start)

	const end = createState(true)
	addEpsilonTransition(first.end, end)
	first.end.isEnd = false
	addEpsilonTransition(second.end, end)
	second.end.isEnd = false

	return { start, end }
}

function closure(nfa) {
	const start = createState(false)
	const end = createState(true)

	addEpsilonTransition(start, end)
	addEpsilonTransition(start, nfa.start)

	addEpsilonTransition(nfa.end, end)
	addEpsilonTransition(nfa.end, nfa.start)
	nfa.end.isEnd = false

	return { start, end }
}

function toNFA(postfixExpression) {
	if (postfixExpression === '') {
		return fromEpsilon()
	}

	const stack = []

	for (const token of postfixExpression) {
		if (token === '*') {
			stack.push(closure(stack.pop()))
		} else if (token === '|') {
			const right = stack.pop()
			const left = stack.pop()
			stack.push(union(left, right))
		} else if (token === '.') {
			const right = stack.pop()
			const left = stack.pop()
			stack.push(concat(left, right))
		} else {
			stack.push(fromSymbol(token))
		}
	}

	return stack.pop()
}

function addNextState(state, nextStates, visited) {
	if (state.epsilonTransitions.length) {
		for (const state of state.epsilonTransitions) {
			if (!visited.find(v => v === state)) {
				visited.push(state)
				addNextState(state, nextStates, visited)
			}
		}
	} else {
		nextStates.push(state)
	}
}

function search(nfa, word) {
	let currentStates = []
	addNextState(nfa.start, currentStates, [])

	for (const symbol of word) {
		const nextStates = []

		for (const state of currentStates) {
			const nextState = state.transition[symbol]
			if (nextState) {
				addNextState(nextState, nextStates, [])
			}
		}
		currentStates = nextStates
	}

	return currentStates.find(s => s.isEnd) ? true : false
}
