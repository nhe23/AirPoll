<!-- Root component -->
<script lang="ts">
	import { client } from "./apollo";
	import { setClient } from "svelte-apollo";
	import { Router, Link, Route } from "svelte-routing";
	import MeasurementsDashboard from "./components/Measurements/MeasurementsDashboard.svelte";
	import Nav from "./components/Nav/Nav.svelte";
	import Rocket from "./components/IllustrationComponents/Rocket.svelte";
	import Home from "./components/Home.svelte";
	import ThemeContext from "./components/Theming/ThemeContext.svelte";

	export let url = "";
	setClient(client);

	let scrollTop = 0;

	const scrollToTop = () => {
		let interval = scrollTop / 20;
		const scrolling = setInterval(() => {
			document.documentElement.scrollTop = scrollTop - interval;
			if (scrollTop === 0) {
				clearInterval(scrolling);
			}
		}, 25);
	};

	const handleScroll = async (e) => {
		scrollTop = document.documentElement.scrollTop;
	};
</script>

<style>
	.toTopButton {
		position: fixed;
		bottom: 15px;
		right: 20px;
		z-index: 1;
		border-radius: 50%;
	}
	@media only screen and (max-width: 500px) {
		.toTopButton {
			right: 5px;
			bottom: 20px;
		}
	}

	.home {
		height: 100vh;
		display: flex;
		flex-direction: column;
	}
</style>

<svelte:window on:scroll={handleScroll} />

<main class="home">
	<ThemeContext>
		<Router {url}>
			<Nav />
			<Route path="/">
				<Home />
			</Route>
			<Route path="/dashboard">
				<MeasurementsDashboard />
			</Route>
			{#if scrollTop > 160}
				<div class="toTopButton" on:click={scrollToTop}>
					<Rocket />
				</div>
			{/if}
		</Router>
	</ThemeContext>
</main>
