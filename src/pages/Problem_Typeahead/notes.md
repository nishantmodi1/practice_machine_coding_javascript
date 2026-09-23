## The Rules for these problems:

## Time box: 45 minutes per problem.

## Stack: Use Vite + React + TypeScript (no UI libraries like MUI/Tailwind—use plain CSS modules so the interviewer sees your logic, not your styling).

## No external state libraries (no Redux/Zustand). Use raw useReducer + Context so they see you understand React's core.

## Problem 1: The "Race Condition" Typeahead (Difficulty: Medium)
# (This tests API cancellation, debouncing, and cache handling - you mentioned AI chat, so this is your zone)

# Problem Statement:
 - Build a search bar that queries a mock API (https://jsonplaceholder.typicode.com/posts?q={query}) and displays a dropdown of titles.

# Requirements:

 - Debounce the API call by 300ms.

 - If the user types "Apple", then "Apple Pie", the "Apple" request must be cancelled (AbortController) if it is still pending when "Apple Pie" is sent.

 - Cache the results. If the user searches "Apple" again, do NOT make a new API call; show the cached result instantly.

 - Highlight the matching text in the dropdown results (e.g., if they type "re", the word "re" in the title should be bold).

 - Keyboard navigation: Allow ArrowUp/ArrowDown to navigate the list and Enter to select an item. When selected, fill the input and close the dropdown.