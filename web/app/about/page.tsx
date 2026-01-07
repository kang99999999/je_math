export default function AboutPage() {
  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-semibold mb-6">About</h1>
      <br />

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Background</h2>
        <p className="text-gray-300">
          이 사이트는 수학 공부 과정에서 정리한 내용들을 기록하고, 
          <br />
          다시 꺼내 보기 쉽게 관리하기 위해 만들었습니다.
          <br />
          강의 노트, 문제 풀이, 개념 정리처럼
          <br /><br />
          시간이 지나도 다시 참고할 수 있는 형태를 목표로하며
          <br />
          추후 연구 및 논문 작성 시 참고하고자 합니다.
        </p>
      </section>
      <br />

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Interests</h2>
        <ul className="list-disc list-inside text-gray-300 space-y-1">
          <li>해석학</li>
          <li>위상수학</li>
          <li>기하학</li>
        </ul>
      </section>
      <br />

      <section className="mb-8">
        <h2 className="text-lg font-medium mb-2">Study Style</h2>
        <p className="text-gray-300">
          특히 개념의 직관적인 이해와 구조적인 정리에 초점을 두고 공부합니다.
          <br />
          단순한 결과보다 “왜 그런지”를 기록하는 것을 중요하게 생각합니다.
          <br />
          완벽한 글보다는, 생각의 흔적이 남아 있는 기록을 지향합니다.
        </p>
      </section>

      <br />
      <section>
        <h2 className="text-lg font-medium mb-2">Contact</h2>
        <p className="text-gray-300">
          Email : je2641@gmail.com
        </p>
      </section>
    </main>
  )
}
