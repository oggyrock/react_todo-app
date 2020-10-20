export const addTodo = (id, text, isCompleted) => ({
  type: 'ADD_TODO',
  id,
  text,
  isCompleted,
});

export const todoReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          isCompleted: action.isCompleted,
        },
      ];
    default:
      return state;
  }
};
