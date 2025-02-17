import { ClassGroup, IClassGroupProps } from './class-group'

interface ICourseContentProps {
  classGroups: IClassGroupProps[]
}

export function CourseContent({ classGroups }: ICourseContentProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-extrabold">Conteúdo do curso</h2>
      <ol className="flex flex-col rounded-lg overflow-clip">
        {classGroups.map((classGroup) => (
          <li
            key={classGroup.title + classGroup.classes[0].id}
            className="flex flex-col"
          >
            <ClassGroup {...classGroup} />
          </li>
        ))}
      </ol>
    </div>
  )
}
