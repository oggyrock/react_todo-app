import React, { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { TodoList } from './components/TodoList';
import { TodosFilter } from './components/TodosFilter';
import { addTodo } from './store';

function App() {
  const [title, setTitle] = useState('');
  const [uneditedTitles, setUneditedTitles] = useState({});
  const [toggleAll, setToggleAll] = useState(true);
  const [todoList, setTodoList] = useState([]);
  const filters = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  };
  const [filter, setFilter] = useState(filters.all);
  // const { todoList } = this.props;

  const filteredList = useMemo(() => todoList.filter((todo) => {
    if (filter === filters.completed) {
      return todo.completed;
    }

    if (filter === filters.active) {
      return !todo.completed;
    }

    return true;
  }));

  const newTodo = {
    id: +new Date(),
    title: title.trim(),
    completed: false,
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newTodo.title) {
      // setTodoList([
      //   ...todoList,
      //   newTodo,
      // ]);
      addTodo(newTodo);
      setTitle('');
      setToggleAll(todoList.some(todo => !todo.completed));
    }
  };

  const handleToggleAllChange = () => {
    setToggleAll(!toggleAll);
    todoList.map((todo, index) => {
      todoList[index].completed = !toggleAll;

      return { ...todo };
    });
    // setTodoList([...todoList]);
  };

  useEffect(() => (
    localStorage.list && setTodoList(JSON.parse(localStorage.list))
  ), []);

  useEffect(() => {
    localStorage.list = JSON.stringify(todoList);
    setToggleAll(todoList.every(todo => todo.completed));
  }, [todoList]);

  return (
    <section className="todoapp">
      <header className="header">
        <h1>todos App</h1>

        <form
          onSubmit={handleSubmit}
        >
          <input
            type="text"
            className="new-todo"
            placeholder="What needs to be done?"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </form>
      </header>

      <section className="main">
        <input
          type="checkbox"
          id="toggle-all"
          className="toggle-all"
          checked={toggleAll}
          onChange={handleToggleAllChange}
        />
        <label
          htmlFor="toggle-all"
          hidden={!todoList.length}
        >
          Mark all as complete
        </label>
        <TodoList
          filteredList={filteredList}
          setUneditedTitles={setUneditedTitles}
          uneditedTitles={uneditedTitles}
          todoList={todoList}
          setTodoList={setTodoList}
        />
      </section>
      <TodosFilter
        todoList={todoList}
        setTodoList={setTodoList}
        filters={filters}
        filter={filter}
        setFilter={setFilter}
      />
    </section>
  );
}

export default connect(state => ({ todoList: state }), { addTodo })(App);
