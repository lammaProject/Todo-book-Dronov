import { Link } from "react-router-dom";

export default function Todolist(props) {
  console.log(props);
  return (
    <section>
      <h1>Дела</h1>
      <table className="table is-hoverable is-fullwidth">
        <tbody>
          {props.list.map((item) => (
            <tr key={item.key}>
              <td>
                <Link to={`/${item.key}`}>
                  {item.done ? <del>{item.title}</del> : item.title}
                </Link>
              </td>
              <td>
                <button
                  className="button is-success"
                  title="Пометить как сделанное"
                  onClick={(e) => props.setDone(item.key)}
                >
                  {item.done ? "🔙" : "✅"}
                </button>
              </td>
              <td>
                <button
                  className="button is-danger"
                  title="Удалить"
                  onClick={(e) => props.delete(item.key)}
                >
                  ❌
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
