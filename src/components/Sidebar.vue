<template>
	<aside :class="`${is_expanded ? 'is-expanded' : ''}`">
		<div class="logo">
			<img :src="logoURL" alt="logo" /> 
		</div>

		<div class="menu-toggle-wrap">
			<button class="menu-toggle" @click="ToggleMenu">
				<span class="material-icons" :class="{rotated: is_expanded}">keyboard_double_arrow_right</span>
			</button>
		</div>

    <template v-if="is_expanded">
		<h3>이전 프롬프트</h3>
		<div class="prompt-list">
            <div
                v-for="prompt in prompts"
                :key="prompt.id"
                :class="['prompt-item', {active: selectedPromptId === prompt.id}]"
                @click="selectedPrompt(prompt.id)"
            >
                <div class="prompt-summary">{{ prompt.summary }}</div>
                <div class="prompt-date">{{ prompt.DateOfUsed }}</div>
            </div>
		</div>
    </template>

		<div class="flex"></div>
		
		<div class="menu">
			<router-link to="/setting" class="button">
				<span class="material-icons">settings</span>
				<span class="text">설정</span>
			</router-link>
		</div>
	</aside>
</template>

<script setup>
import { ref } from 'vue'
import logoURL from '../assets/Letter_GPT_logo.png'

const is_expanded = ref(localStorage.getItem("is_expanded") === "true")

const ToggleMenu = () => {
	is_expanded.value = !is_expanded.value

	// 프롬프트 닫히면 선택했던 프롬프트 초기화
	if (!is_expanded.value) {
    	selectedPromptId.value = null;
  	}

	localStorage.setItem("is_expanded", is_expanded.value)
}

const prompts = ref([
    {id: 1, summary: "친구에게 쓰는 생일 편지", DateOfUsed: "2024-11-18"},
    {id: 2, summary: "상사에게 쓰는 감사 편지", DateOfUsed: "2024-11-15"},
    {id: 3, summary: "남자친구에게 쓰는 기념일 편지", DateOfUsed: "2024-10-20"},
    {id: 4, summary: "여자친구에게 쓰는 기념일 편지", DateOfUsed: "2024-10-11"},
    {id: 5, summary: "할아버지께 쓰는 칠순 기념 편지", DateOfUsed: "2024-10-03"},
    {id: 6, summary: "신년 인삿말", DateOfUsed: "2023-12-20"},
    {id: 7, summary: "한 해 마무리 인삿말", DateOfUsed: "2023-12-18"},
    {id: 8, summary: "수능 응원", DateOfUsed: "2023-11-12"},
    {id: 9, summary: "병문안 인사", DateOfUsed: "2023-11-02"},
    {id: 10, summary: "생일 축하 인사", DateOfUsed: "2023-10-30"},
    {id: 12, summary: "돈 갚으라는 말", DateOfUsed: "2023-09-31"},
    {id: 13, summary: "선물 고맙다는 인사", DateOfUsed: "2023-08-22"},
    {id: 14, summary: "밥 사줘서 고맙다는 인사", DateOfUsed: "2023-02-03"},
    {id: 15, summary: "커피 사달라는 말", DateOfUsed: "2023-01-18"},
])

const selectedPromptId = ref(null);

const selectedPrompt = (id) => {
    selectedPromptId.value = id
}

</script>

<style lang="scss" scoped>

/* 사이드바 */
aside {
	display: flex; 
	flex-direction: column;

	background-color: var(--dark); 
	color: var(--light);

	width: calc(2rem + 32px); /* 초기 사이드바 너비 */
	overflow: hidden; 
	min-height: 100vh; 
	padding: 1rem; 

	transition: 0.3s ease, padding 0.3s ease; /* 사이드바 열림/닫힘 시 애니메이션 효과 */

	.flex {
		flex: 1 1 0%; /* 남은 공간을 채우기 위한 컨테이너 */
	}

	.logo {
		margin-bottom: 0.5rem; /* 로고 하단 여백 */

		img {
			width: 2rem; 
		}
	}

	.menu-toggle-wrap {
		display: flex; /* 오른쪽 정렬 */
		justify-content: flex-end;
		margin-bottom: 0.5rem; /* 버튼 하단 여백 */

		position: relative; /* 메뉴 버튼의 위치 */
		top: 0; /* 초기 위치 */
		transition: 0.2s ease-in-out; /* 버튼 이동 및 회전 시 애니메이션 */

		.menu-toggle {
			transition: 0.2s ease-in-out;

			.material-icons {
				font-size: 2rem; 
				color: var(--light); 
				transition: 0.2s ease-out; 
			}
			
			&:hover {
				.material-icons {
					color: var(--primary); 
					transform: translateX(0.5rem); 
				}
			}
		}
	}

	h3, .button .text {
		opacity: 0; /* 초기 상태에서 숨김 */
		transition: opacity 0.3s ease-in-out; /* 투명도 애니메이션 */
	}

	h3 {
		color: var(--grey); /* 헤딩 색상 */
		font-size: 0.875rem; /* 텍스트 크기 */
		margin-bottom: 0.5rem; /* 하단 여백 */
		text-transform: uppercase; /* 텍스트를 대문자로 변환 */
	}

	.menu {
		margin: 0 -1rem; 

		.button {
			display: flex; 
			align-items: center; 
			text-decoration: none; 
			padding: 0.5rem 1rem; 
			transition: 0.2s ease-in-out; /* 배경색과 텍스트 색상 변화 애니메이션 */

			.material-icons {
				font-size: 2rem; /* 아이콘 크기 */
				color: var(--light); /* 아이콘 색상 */
				transition: 0.2s ease-in-out; /* 아이콘 색상 애니메이션 */
			}
			.text {
				color: var(--light); /* 버튼 텍스트 색상 */
				transition: 0.2s ease-in-out; /* 텍스트 색상 애니메이션 */
			}

			&:hover {
				background-color: var(--dark-alt); 

				.material-icons, .text {
					color: var(--primary); 
				}
			}

			&.router-link-exact-active {
				background-color: var(--dark-alt); 
				border-right: 5px solid var(--primary);

				.material-icons, .text {
					color: var(--primary); 
				}
			}
		}
	}


	&.is-expanded {
		width: var(--sidebar-width); /* 확장된 사이드바 너비 */

		h3, .prompt-list {
			opacity: 1; /* 확장 시 표시 */
		}

		&:not(.is-expanded) {
			h3, .prompt-list {
				opacity: 0; /* 축소 시 숨김 */
				pointer-events: none; /* 클릭 불가능 */
			}
		}

		.menu-toggle-wrap {
			top: -3rem; /* 메뉴 버튼 상단 위치 변경 */
			
			.menu-toggle {
				transform: rotate(-180deg); /* 확장 시 아이콘 회전 */
			}
		}

		h3, .button .text {
			opacity: 1; /* 확장된 상태에서 표시 */
		}

		.button {
			.material-icons {
				margin-right: 1rem; /* 아이콘과 텍스트 간 간격 */
			}
		}

	}

	h3, .prompt-list {
		opacity: 1; /* 초기 상태에서 표시 */
		transition: opacity 0.3s ease; /* 투명도 애니메이션 */
	}

	.prompt-list {
		display: flex; 
		flex-direction: column;
		margin-top: 0.5rem; 
		max-height: 75vh; /* 최대 높이 */
		overflow-y: auto; /* 수직 스크롤 */
		padding-right: 0.5rem; 

		.prompt-item {
			display: flex; /* 개별 프롬프트 내부 가로 정렬 */
			justify-content: space-between;
			align-items: center;
			padding: 1rem; /* 내부 여백 */
			background-color: var(--dark-alt); 
			color: var(--light); 
			cursor: pointer; 
			transition: background-color 0.2s ease; /* 배경색 애니메이션 */

			&:hover {
				background-color: var(--dark); /* 호버 시 배경색 변경 */
			}

			/* 활성화된 프롬프트 */
			&.active {
				background-color: var(--primary-alt); 
				color: var(--dark); /* 텍스트 색상 */
				font-weight: bold; /* 강조 */
			}

			/* 프롬프트 요약 텍스트 */
			.prompt-summary {
				font-size: 1rem; 
			}

			/* 날짜 텍스트 */
			.prompt-date {
				font-size: 0.875rem; 
				color: var(--grey); 
			}

			&:not(:last-child) {
				border-bottom: 1px solid var(--grey); /* 마지막 프롬프트 제외한 하단 경계선 */
			}
		}

		.divider {
			margin: 0; /* 분리선 여백 제거 */
			border: none; /* 기본 경계선 제거 */
			border-top: 1px solid var(--grey); /* 상단 경계선 추가 */
		}
	}
}
</style>