export function getMonthMatrix(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)

  const startDay = first.getDay()
  const totalDays = last.getDate()

  const weeks: (number | null)[][] = []
  let week: (number | null)[] = Array(startDay).fill(null)

  for (let day = 1; day <= totalDays; day++) {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  }

  if (week.length) {
    weeks.push([...week, ...Array(7 - week.length).fill(null)])
  }

  return weeks
}
