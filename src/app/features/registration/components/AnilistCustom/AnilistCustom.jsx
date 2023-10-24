import UserAL from '../../../anilist/components/UserAL/UserAL';

const AnilistCustom = ({ color, clickFunction }) => (
  <div>
    <p>
      Next up! Choose which lists you&apos;d like us to analyze:
      just your anime, only your manga, or both. Once selected,
      please confirm if the displayed records are correct. Make
      your pick and let&apos;s continue with the next step.
    </p>
    <form onSubmit={clickFunction}>
      {/* {TODO: Incluir multiselección para manga o anime */}

      <UserAL />
      <button
        type="submit"
        className={`register__button register__button--${color}`}
      >
        Next
      </button>
    </form>

  </div>
);

export default AnilistCustom;
