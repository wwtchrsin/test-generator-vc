export const lang = process.env.NEXT_PUBLIC_LANG;

export const txtRes = {
  "AddTest": {
    en: "Add Test",
    ru: "Добавить тест",
  },
  "AdminToken": {
    en: "Administrator's Token",
    ru: "Токен Администратора",
  },
  "AllChapters": {
    en: "All chapters",
    ru: "Все главы",
  },
  "AllLevels": {
    en: "All Levels",
    ru: "Все уровни",
  },
  "Cancel": {
    en: "Cancel",
    ru: "Отмена",
  },
  "Chapter": {
    en: "Chapter",
    ru: "Глава",
  },
  "Check": {
    en: "Check",
    ru: "Проверить",
  },
  "Completed": {
    en: "Completed",
    ru: "Выполнено",
  },
  "Correct": {
    en: "Correct",
    ru: "Верных",
  },
  "CreateTestFailed": {
    en: "Impossible to create the test",
    ru: "Не удалось создать тест",
  },
  "Delete": {
    en: "Delete",
    ru: "Удалить",
  },
  "DeleteTestFailed": {
    en: "Impossible to delete the test",
    ru: "Не удалось удалить тест",
  },
  "ExistingTests": {
    en: "Existing tests",
    ru: "Существующие тесты",
  },
  "ExportResults": {
    en: "Export results",
    ru: "Экспорт результатов",
  },
  "HomePage": {
    en: "Home page",
    ru: "На главную",
  },
  "ImportResults": {
    en: "Import results",
    ru: "Импорт результатов",
  },
  "InvalidTasksJSON": {
    en: "Invalid tasks JSON",
    ru: "JSON с заданиями некорректен",
  },
  "Level": {
    en: "Level",
    ru: "Уровень",
  },
  "Name": {
    en: "Name",
    ru: "Название",
  },
  "NoAnswerToCheck": {
    en: "Answer at least one task",
    ru: "Дайте ответ хотя бы на одно задание",
  },
  "NoTestsYet": {
    en: "No test yet",
    ru: "Пока нет тестов",
  },
  "optional": {
    en: "optional",
    ru: "необязательно",
  },
  "Reset": {
    en: "Reset",
    ru: "Сбросить",
  },
  "ConfirmReset": {
    en: "Are you sure you want to reset your answers and restart the test?",
    ru: "Вы уверены что хотите сбросить ответы и начать тест заново?",
  },
  "Result": {
    en: "Result",
    ru: "Результат",
  },
  "ResultsImported": {
    en: "Results has been successfully imported",
    ru: "Результаты были успешно импортированы",
  },
  "ResultsNotImported": {
    en: "Impossible to read the results file",
    ru: "Невозможно прочитать файл с результатами",
  },
  "SaveTest": {
    en: "Save test",
    ru: "Сохранить тест",
  },
  "Tasks": {
    en: "Tasks",
    ru: "Задания",
  },
  "TestAdded": {
    en: "Test added",
    ru: "Тест добавлен",
  },
  "TestDeleted": {
    en: "Test deleted",
    ru: "Тест удалён",
  },
  "TestList": {
    en: "Test list",
    ru: "К списку",
  },
  "TestListLoadFailed": {
    en: "Failed to load the list of tests",
    ru: "Не удалось загрузить список тестов",
  },
  "TestLoadFailed": {
    en: "Failed to load the test",
    ru: "Не удалось загрузить тест",
  },
  "TestNotFound": {
    en: "Test not found",
    ru: "Тест не найден",
  },
  "TestsNotFound": {
    en: "Tests not found",
    ru: "Тесты не найден",
  },
  "Topic": {
    en: "Topic",
    ru: "Тема",
  },
  "Yes": {
    en: "Yes",
    ru: "Да",
  },
};

export const txtResComp = {
  "CompletedTasks": (completed, total) => ({
    en: `${completed} of ${total} completed`,
    ru: `Выполнено ${completed} из ${total}`,
  }),
  "AccuracyRate": (percent) => ({
    en: `${percent}% correct answers`,
    ru: `${percent}% верных ответов`,
  }),
}