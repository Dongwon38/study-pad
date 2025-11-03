# Flexbox 핵심 리캡

Flexbox(flexible box)는 복잡한 정렬(alignment)과 공간 분배(distribution)를 간결하게 해결하는 1차원 레이아웃(layout) 시스템입니다. 이미 기초를 익혔다면, 아래의 핵심 축을 다시 점검하며 실전에 바로 적용할 수 있는 전략을 정리해 보세요.

## 메인축(main axis) vs 교차축(cross axis)
- `flex-direction`을 바꾸면 메인축(main axis)이 즉시 전환되고, 교차축(cross axis)은 항상 그에 직교합니다.
- 메인축(main axis)을 기준으로 `justify-content`가 동작하고, 교차축(cross axis)을 따라 `align-items`가 작동합니다.
- 레이아웃(layout)을 설계할 때는 “콘텐츠 흐름”과 “정렬 지점”을 분리해서 생각하면 컨트롤이 쉬워집니다.

```css
.container {
  display: flex;
  flex-direction: row;   /* 메인축(main axis) 가로 */
  justify-content: space-between; /* 메인축(main axis) 공간 분배 */
  align-items: center;   /* 교차축(cross axis) 정렬 */
}
```

## 공간 분배 전략
- `justify-content: space-between`은 네비게이션(nav) 바처럼 양 끝을 고정하고 내부를 채우는 데 최적입니다.
- `gap`은 기존 `margin` 해킹보다 예측 가능하고, 그리드(grid)와 동일한 문법으로 공통 인터페이스를 제공합니다.
- `flex-wrap`을 활성화하면 줄바꿈(wrap) 시에도 gap이 유지되어 반응형(responsive) 배치를 안정적으로 구성할 수 있습니다.

## 성장(grow)과 축소(shrink)의 우선순위
- `flex-grow`는 남는 공간을 나누는 가중치(weight)이며, 값이 0이면 늘어나지 않습니다.
- `flex-shrink`는 공간이 부족할 때의 축소 비율입니다. 보호가 필요한 요소는 0으로 설정해 크기 변화를 막습니다.
- `flex-basis`는 아이템(item)의 기본 크기로, `auto`일 때 콘텐츠 크기를 참고합니다. `0`을 지정하면 grow 계산에만 참여하도록 재설정됩니다.

```css
.card:nth-child(2) {
  flex: 1 1 0;   /* flex-grow, flex-shrink, flex-basis 순서 */
}

.card:nth-child(3) {
  flex: 0 0 160px; /* shrink를 끄고 최소 폭을 확보 */
}
```

## 실전 체크리스트
- **축 전환**: `flex-direction` 변경 시 메인축(main axis)/교차축(cross axis) 역할이 즉시 뒤바뀌는지 확인합니다.
- **정렬 조합**: `justify-content`와 `align-items`를 독립적으로 조합해 원하는 균형(balance)을 찾습니다.
- **간격 제어**: `gap`으로 내부 여백을 다루고, 외부 여백은 `margin`으로 분리 관리합니다.
- **아이템 우선순위**: `flex` 축약(shorthand) 구문으로 grow/shrink/basis를 동시에 선언해 의도를 명확히 표현합니다.

위 항목들을 프로젝트별 컴포넌트(component)에서 체크하며 적용하면, Flexbox(flexible box)의 장점을 놓치지 않고 활용할 수 있습니다.
