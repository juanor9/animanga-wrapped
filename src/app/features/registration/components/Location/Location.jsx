const Location = ({ color }) => (
  <div>
    <p>
      Where&apos;s your home base? Let us know your country and we&apos;re almost there!
    </p>
    <form action="">
      {/* {TODO: Incluir un menú desplegable con la lista de países} */}
      <button
        type="submit"
        className={`register__button register__button--${color}`}
      >
        Next
      </button>
    </form>

  </div>
);

export default Location;
