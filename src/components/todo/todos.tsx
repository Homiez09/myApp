import { NextPage } from "next";
import { api } from "~/utils/api";

const Todos: NextPage = () => {
    const { data: todos, isLoading, isError} = api.todo.all.useQuery();

    if (isLoading) return (
    <>
        <div>
            Loading...
        </div>
    </>
    );

    if (isError) return (
        <>
            <div className="text-red-500">
                Error fetching.
            </div>
        </>
        );


    return(
        <>
            {/* { todos.length ? (
                return <Todo key={todos.id} todo={todo} />
            ) : (
                'No todos found.'
            ) } */}
        </>
    );
}

export default Todos;