import type { UserModel } from "../../lib/types";
import styles from "./user-row.module.css";

const PATH = "/resume-pdf/";

interface UserRowProps {
  line: number;
  user: UserModel;
  isUserDeleting: boolean;
  isUserOtherDeleting: boolean;
  isUserSelected: boolean;
  onDeleteClick: (id: number) => void;
  onEditClick: (user: UserModel) => void;
}

const getInitials = (first: string, last: string) =>
  `${first[0] ?? ""}${last[0] ?? ""}`.toUpperCase();

export const UserRow = ({
  line,
  user,
  isUserDeleting,
  isUserSelected,
  isUserOtherDeleting,
  onDeleteClick,
  onEditClick,
}: UserRowProps) => {
  return (
    <div
      className={`${styles.row} ${isUserSelected ? styles.rowSelected : ""}`}
    >
      <div className="text-light">{line}</div>

      <div className={styles.avatar}>
        {getInitials(user.firstName, user.lastName)}
      </div>

      <div className={styles.info}>
        <span className={styles.name}>
          {user.firstName} {user.lastName} {user.patronymic}
        </span>

        <span className={styles.ageBadge}>{user.age} лет</span>

        <span className={styles.phone}>{user.phoneNumber}</span>

        {user.isCitizen ? (
          <span className={`${styles.citizenBadge} ${styles.citizenBadgeRF}`}>
            <span className={styles.citizenDot} />
            Гражданин РФ
          </span>
        ) : (
          <span
            className={`${styles.citizenBadge} ${styles.citizenBadgeForeign}`}
          >
            <span className={styles.citizenDot} />
            Иностранец
          </span>
        )}
      </div>

      {isUserDeleting && <span className="text-danger">Удаление...</span>}

      {!isUserDeleting && (
        <div className={styles.actions}>
          <button
            className={`${styles.actionBtn} ${styles.resumeBtn}`}
            onClick={() => window.open(PATH + user.resumePath, "_blank")}
            title="Открыть резюме"
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
              <polyline points="14 2 14 8 20 8" />
              <line x1="16" y1="13" x2="8" y2="13" />
              <line x1="16" y1="17" x2="8" y2="17" />
              <line x1="10" y1="9" x2="8" y2="9" />
            </svg>
          </button>

          <button
            className={`${styles.actionBtn} ${styles.editBtn}`}
            onClick={() => onEditClick(user)}
            title="Редактировать"
          >
            <svg
              className={styles.icon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
          </button>

          {!isUserSelected  && (
            <button
              className={`${styles.actionBtn} ${styles.deleteBtn}`}
              onClick={() => onDeleteClick(user.id)}
              title="Удалить"
              disabled={isUserOtherDeleting}
            >
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                <path d="M10 11v6M14 11v6" />
                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
              </svg>
            </button>
          )}
        </div>
      )}
    </div>
  );
};
