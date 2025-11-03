# CSS 선택자(selector): 원하는 요소(element) 겨냥하기

## 개요
CSS 선택자(selector)는 어떤 HTML 요소(element)에 스타일 규칙(rule)을 적용할지 결정하는 패턴입니다. 태그(tag) 이름, 클래스(class), 아이디(id), 가상 클래스(pseudo-class)를 조합하면 마크업(markup)을 수정하지 않고도 원하는 요소(element)를 정밀하게 골라낼 수 있습니다.

## 예제 살펴보기
인터랙티브(interactive) 예제에서는 세 가지 선택자(selector)를 전환하며 동작을 확인할 수 있습니다.

- **`.highlight`** 클래스(class) 이름이 `highlight`인 모든 요소(element)를 선택합니다.
- **`#special-task`** 아이디(id)가 `special-task`인 단 하나의 요소(element)를 선택합니다.
- **`li:first-child`** 각 리스트(list)에서 첫 번째 `<li>` 요소(element)와 일치합니다.

선택자(selector) 버튼을 클릭하면 대응하는 코드 조각(snippet)이 빛나고, 콘솔(console) 로그가 어떤 요소(element)가 선택되었는지 설명합니다. 이는 브라우저(browser)가 스타일을 적용하기 전에 선택자를 평가하는 과정과 동일합니다.

## 직접 실습해 보기
1. 각 선택자(selector) 버튼을 눌러 어떤 예제 요소(element)가 강조되는지 확인하세요.
2. `Example.tsx` 파일에서 옵션을 하나 복제하고 `matches` 로직(logic)을 수정해 새로운 선택자(selector)를 추가해 보세요.
3. 강조된 요소(element)에만 적용되는 Tailwind 유틸리티(utility) 클래스를 추가하며 선택자(selector)가 스타일 적용 범위를 어떻게 제어하는지 연습하세요.
