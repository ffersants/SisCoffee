<template>
	<modal-base class="text-center">
		<div id="modal">
			<h5>
				FAVOR CONFIRMAR AÇÃO COM <br />
				A CONTA ADMINISTRADORA
			</h5>

			<hr />

			<slot id="icon"></slot>

			<b-container class="pt-3">
				<b-row id="first-row" class="text-center">
					<b-col cols="5">
						<p class="data-title">Nome</p>
						<p>{{ reqBody.name }}</p>
					</b-col>

					<b-col cols="2">
						<p class="data-title">Seção</p>
						<p>{{ reqBody.section }}</p>
					</b-col>

					<b-col cols="5">
						<div v-if="action == 'payment' || action == 'signUp'">
							<p class="data-title">Data do pagamento</p>
							<p>{{ currentDate }}</p>
						</div>

						<div v-else>
							<p class="data-title">Data do cadastro</p>
							<p>{{ reqBody.signUpDate }}</p>
						</div>
					</b-col>
				</b-row>

				<b-row class="text-center mt-2">
					<b-col>
						<p class="data-title">E-mail</p>
						{{ reqBody.email }}
					</b-col>
				</b-row>
			</b-container>

			<hr />

			<form v-on:submit.prevent="checkForm()" novalidate="true">
				<b-container>
					<b-row id="second-row">
						<b-col cols="6">
							<div class="form-input-area">
								<input
									ref="autoFocus"
									:disabled="fetching"
									v-model="admUser"
									autocomplete="off"
									placeholder="Usuário"
									class="form-input"
									id="admUser"
									type="text"
								/>
								<label class="form-label" for="admUser">Usuário</label>
							</div>
						</b-col>

						<b-col cols="6">
							<div class="form-input-area">
								<input
									:disabled="fetching"
									v-model="admPswd"
									autocomplete="off"
									placeholder="Senha"
									class="form-input"
									id="admPswd"
									type="password"
								/>
								<label class="form-label" for="admPswd">Senha</label>
							</div>
						</b-col>
					</b-row>

					<p id="msg-erro-modal" class="invalid-message invalid-inactive"></p>

					<div v-if="action !== 'removeUser'" id="add-surplus">
						<div v-if="userIsAhead && action == 'payment'">
							<p style="color:rgb(255, 251, 0)">
								Um saldo já está sendo adicionado, pois o usuário está pagando
								adiantado
							</p>
							<p>Deseja adicionar mais saldo?</p>
						</div>
						<p v-else>Deseja adicionar saldo?</p>
						<small>Clique no ícone abaixo</small>

						<span @click="addSurplus()" id="coffee-icon">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								xmlns:xlink="http://www.w3.org/1999/xlink"
								width="68.917"
								height="42"
								viewBox="0 0 68.917 42"
							>
								<defs>
									<pattern
										id="pattern"
										preserveAspectRatio="none"
										width="100%"
										height="100%"
										viewBox="0 0 513 404"
									>
										<image
											width="513"
											height="404"
											xlink:href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAgEAAAGUCAMAAACbewE+AAAAmVBMVEUAAABeNhxBGwFVLBNeNhxeNhxeNhxeNhtXLxRZMhdeNhteNhtbNBldNRtcNBtbMxhbMhpWLBReNhtaMhddNRteNhxdNRteNhxdNRpdNRteNhtdNRtdNBpdNRteNhteNRteNhtdNRtdNRtdNBpKJQFdNRtdMxldNRtdNRtdNRteNRxcNBteNhteNRteNRtdNRtdNRtcMhleNhzlyRwqAAAAMnRSTlMA+QQJ8fbm7BEc0b8wYjsiJw3FF4/coctcVeFoQE/Xq6acd0oHcjWVgW21Rbl8irCFKw+nZYAAAB3TSURBVHja7N3XeuIwEAXgIxtM6JCl995SgPP+D7cNQgjZxEWylOz8l3vFt5Hl0cxoDOsqs80vT7N+Zzg43kH8D/xVZ9PByY6vqWZxOhsePYhvyh/MxiNFcnj+hyzfkW1P+yVZBt9Nff7cVvwr6+OvIf8ps5utZBV8G7XZo+LFGCdTfigzLv+A+PJWhxGvncMAL+Cnits8xBdW3Yz4lqqfTwIMpViuQ3xJfqfId+xwcmBImVYF4supHnJ8VxknBYZX6PsQX8lqrPg+dc785BlJ7iARwdfxUOQ/FXFSZkRqWoX4Cub3/MASJxNGplqyBtw3uOeHavjLyzEGNZV3gduOO35shJMS48ke5HDorru14ieecTJjXEFf8sVu8vo5fqqCkyLjK0h+wEWrNj+X8/CXr5jEVLoJXOM3FENo4WTAZIIOhEsGTYbSxcmGSe2lcOgOv8Fw1N0lDEgsJ9uAK0ojhlTEySJLDSYSDbjAWyqGNcNJhVr0VhC23T0yvNIlG6CHWkLYVekxvABnO+qylzeBVVvFCKY48TLUpleCsMWfMpIhTmrUKNuFsONHm5GoOk7K1GoDYUOpx2jucbamXnupF1owz8R/VNvUrC0JwtSVFaOq4FIW0q1Zg0jVEyPLeJd8kH45SQ6lyVszuj3OtjQgO4dIizdhDFucTWmCklNhWhZ7xnE0EwheKCkWpmOxYxwBzjxFM1QZ4oYrC4BjnB1pTB/CNG+f+I/ToTmyC5jmjRlTDWfPvCLh4JfSYkwBXjzSICWHQqMajGuMFz2alB1AGPOkI0bzaVZGsoPGlBnfEWclGhbIDWND5oqxZTycdWnaSDrHjChlGd/u5lViUlFmzhiQD5jAE15MaN4EQje/zSQGeNFmCp4gNJswCeXjRcA0DCG0mjGRNl74TEXmCKHRnMms8aLGdDTlQKBRNcdkOnjxwJTsZNiMNn6BCdXwos+PSDTopCkTynh4cWBalFQINOkwqSIuWkxNILcItKhlmNQzLh6ZnkcJBTRYFJhYFxcFpmgGkdgzk6viImCKlFwtT2zA5DK48BTTNJIaUUL1Hqk1EPzBdK0hEplSgwYujkzZA0QCc+0t3AOmLJDscAJ3AXUo4WLItE0h7L4DqBa46DB1khqM7YFajPDKlqlrynkgJr9JLcbJGs6Te4aI5WBi1Ncz06fkBkEsR0U9OnhlTQvupT4QR5GalOIGl3KlOA6HasKXLtFXWrQhJ0mByOoBNWnitTEjkeRwRG6VBP96xGt7hiZFQpuqytDj90g7ihCRjKnNMlF8KVdI7KhQn6EbK2AkJ8Io2tSn5sRbgNxChNalRr4jKyAnI+hD85rUJ4AjK4AHiJD61KjtzArIyvWBkPyAGo1xZUd7GhChbDX/t7uQE/wjm4dIfQvgErBfF5DccBRLatUF7NcGT5RsAulvAaxomEoqXaMfczkKIKuJGo+++yZQr67mne3TobFutSbj8WTSWjcOs373oZRfwI5Fj3rVNQym/XYtg171obxpFUdZfiBo7xvbec1DWPYnx74ne5NrsCpzB7v8UuewHymGpwqT2UOKP3tEvZqaEs7fYLSMX1m2CorxNFvbkocUDKnZ/c0dBLtyPmzId9ZtxYRy+2UN/+Bee+jZDtdWjO2rfoooX271qEtv/bCAQSvqNsG1Ki0bIU314bpJzTKT4c0icGR2bJg0XJ22zZGW46yoaERmWoEReUXdDngjQ8t2SINXaTRpUvPpB/TbULsZ3mjSthpM8wbrgMap8QCaLQJqVwbgRqNgavWhSiNgSgqdBX5xsznspHMbatiWqcOc6qbJNPW2PuDuUZDkEHCpNGT2QFgv3zN1wdKHJjUaML+tPFnXhhGraYZW9PoetGjQgAHemNO+ErTzy23aM5pDAz9HA1Z440j71tAs/5yjXY81N+PAdx43n/ZlfOg0GCtapw4+EtrRhCPeCmhfGdp43Tbd0HtwLh/42xHuJQQ03iT2+/YzXBetO0NfE0uegLM+SeitPHSoz1zY0HRtAwUaUYODx0FyhuTunnJ0TmOBmEo0owY41iPyRwFJ1TfWa1zvaletT435bAXk6YIjEvFnDj7/fxUXiKVHM0qAc/XhxE3Di61j7/+LwtCBoSFXSnDyMMAe4uu6FP9fGXU9pzLCp5ygg7Whyw+LbuDK+f9Gs+MhLi+gIRXcKNMFB8RS29NRvbLnyOSoTz/yUqILmoih3nAg//uu3NJ3ZH5kiCFuXpYuKCGysqsBYHZTx7W75w6iaNKUDm7d0wUbRLRy43ffUusf7x1W+wjvSGP6cDUULCCSu7WrL4BxDde8fhB1ft4TTbikXx27O3hSRQQdV18AxRXe6I6ij1C8pzEHwNGsYJRdsvpIN42GeKPSjlEF/0Fzpu8nIF2wQ0je0o3Y9UZu6+FafsIr3UQfk9A3TM69jvHfsj5COToaAWYPdVzzN1leUwMrtwVvezHcGiMR6QahN3N0AxhXw8QqmRI+5+V4y2jEXaMT1vhc7Sd196GYNgxFAfRaZthsMDuEEQgh0Kz3/x9X2qRtaks0gOV3ez6gU46kt0QaA67NkNLoic00KaRl3K2KI8paQZHBf3sCqN6YL0crR6HWXfBDyHsQkBinxRRpzIygH51zWV0qNIulbt2sySFp4qQJRSVDRq+BlE5dTrnHaWEgPrXAGxFY4oTuUBhVxkjZ7AI5KWjhpIN4NYHNXBhU4LalLAMJ+l2ktObyL5UEp7yKV3cAbWpAOnC5p8wCZDeAbv/64FdPvFrhB8b+0ROB84iyDqSU7RE+TOVLHvWOAfINNiHFLauWwGrLEbZOWcSXH1XKHTjNxK8BfmF4e/Qv37qwumHcAaZrpM3OWKgjoxQNEAkMSO+Dyw1sQso7QD9EStjPqUtqL551wHkf7MOqXRM+8xbStnM5S7kNh6p4dguAsFTsCVYHwl6gYLdBinkKLjmQ6SRpnly9yqpu/p9LYK2RT7h6DKX9eAnQ5QeDMWw2K6ET7AzS1hW5QKULmwfxrQa7mqgJbmGT9ITOfIs085xrk8xIfAs2sNqJlvIaNm+EceB+iLT2SC5UbkOne6OBn2iGipVnsDnwZQKns3yPqkPodHA1ubaBUut/CQMtu0gzT3KNhk5g5gG/MDw79nsBML2CZ1NqIiPay1X2Ojm6Hj4wPDdiXwCGLw5omwbTGMiVtirTHIINoHAKPWMBdOkaQmx3QNyW5FovOhNdtviJYKqY/RCY0NUDVw6+YmgNlej8I+ySQIrjXgAxR8HSJ/UEGZuh5GGoUqixVMhK2QQHWLxxlK5/sjP+olVB7POl+dPleOpNxMEEFlu2VFD1gKzOQMTLELWVFKJ9zUB7v3GJFlscaBQjq1WVvFRDjRRtEw4PUpxHWBwoqtU+GYbIui17+8+oSiGGcGhIYXawWJMtgODGf7hyhE8iKcYU0I4MP8DiliwSXGkVkUJrZIfI+deBckhgYf6DBVCLC2mt6GuUaz7CIQqkCPXNf7AAXrrIMivJW3WjkKLfw2UpBahF/8ECeDXIMkvJ361CE3dpA4eD+FeJkbXmWgBBExabF/FgqVGve4CDmYpvpQb/NbB0gIV5ER9KocIoj75ax4oEa2S1uBZApeFzAbi3gY0UZgBopYcekdXgigTaLwFmIZ4MNUo0OnBZiFcPyOpw5QJ6UbELQKom0zTq351S6+reICPmag3eh7BZiT8zvBtLcUZwmos/8y4yIq56gKUpfsbGq0bjVgyXe/Gm2kFGyNUX8mAUDsgjjVEuj3CJypLisyTE7IXJs060PMmcwfyrw2kontwji6s18FWpdGai8exbXPhQ0yVNk8KplLVKtKKvMdLtEU4j8aEWUo4uSTXW61xWa9n6EP96cGqKB6U2MmZUyYAdrJKB+NfFkZFixUCR9YJr9kjQM6w2PSnAAUeJFOup0NfuXtkDAQ/Oc3ERnjTat+dwakve6gZphmpS+Kqw6Ii7fawlBWuhgIlm7pKAByHyYgAoli1MVSa7PsBpLfk6kF8D6iGsOiUpSOQ1LeAuUHMxA8nTKzJaTNeAWgSrsCZFmam07k5QTHKgZ5AWM3UHTmOFU2DKjUp47AVOUdlrJGDDlA4qvcHuRorTVxmcEiRwWkluJtynwOAAu20gxfmm88rDfREvng3JT4FN2HUHUqCpTpZsDv/JgWkXaW9MdaHPONJ/gC0wOk++zeA09vZbdJligd8MQDFvv63zyMMSvpMDz2B93fCnQQSFSIDjS9lL8cqR5+RAbaP+cV10DTAjKVgTqIuCezh15HrBNvvLMh0CJgDLlOU7pTce5nCr+0i5h0xvhvTBcBF811daAdKC0ySHPYA6EtAzUI8G/7YARqJhCKdN9eo9gPVhw5+qsfsIVLy61goIEn9nwWekJUzpgDXRHiBSU5vufuftLDgIKZ81/OchwNREwVRtBUyNr7PgjPoiWNsATI9uldRWgKw9xQWHSIuJmsTLHbyjua7qrYA9nMKSXKyaII1paPwjPtD8KUOMREnbS464aUm386iDY7jyJ4neCniGU0su1aPeA0ptOHQroiRGT5RUQzgN5DJBg+anq00TLn3R0kZdtIzhtMvtqjUWHnW4vAWipaP4jfRy7x2pRkhJiDrEym26Y+DRG/aippF3SKBJXRRwjw9UQes3LETNKuc+4pFBykF4jAwczFz0dDS/knIEl245j4RjyPSG8BYu96Kog5XoeYTTi5xtQVBwcUmzXFQVRW30Rc8cTpMcDlptorqgagSmpPAfse53MoNLWL4+wsQ0L6wJl7gsmiLciaIFnJZnf2RMJ2zXMZBvrFlXN2weJHCZXHvX2jAdA1tw6QSiymAimu7y2gamG458+9kNEgtRVdK+Mg/yug2MkZIQZYTKMQhe2rOaAltRdcinTmRuyLZXxyGVroCtBnRE1QK5PEA2Icq1fP0mqP79idSBSFQFSR65gRH1TfCe90eALAATiKq7PIKla6TMhMc0pD0FvOdmKqJqkEOKeIS0kfBoEv8IkB2AmuiaXf/syC1N1Z3FwBD/CJAbAHXRtbq6dGpElW5NGwMc80KcH89QdJXCa18ivWVuEZkbuLQJ7itb9dTUUfPKsGANKRumV8Qm+MA52iwB8CjK6lfOGR4zdwjMDVwSguR1mePU1L7qPjg1zD8CxnB6FX1zHLVE2+6qs/Ij8ylgYOASMpQx73EUi7YBHEz1gsYTw5QVvgFAMDzWqQ/oBwWPZlekTl+Ze0QqISgLhFMrVP+bWV3+nQQxPiOIcH32BMoegT8OAEFI6ERI4O38cQG3wqMUwYbkX/2HmCWTPoFD9ey+I6YB8n0wB4SPSjTlVAs47M/pPeS42aR2KP1XJE7o0aRRgujC4ToTvmzbl0bmJfrH7x9WPD+QmpfNkqiYTEaZyBvAMz72VCylK/r2sAsDOWXHGGr/5RucDMmAwxbeEURRndtA7ayNtktUICxr8E0N+lsQ6s8v+Oc2sPr6Tw6GLJcjIEx6YZnrD7H59zbQPKswgCLO9uGe/SooMmSKUAfd8/+xpoZ4YESpC9ZWwd9uqO7QY1htAnF6JevA+urjuhFBYcDncJp6y8C7xflHwQ7nJftdB5wzQz4pG4DnMuDMDQy/Hg98Eh7f8Adr+rpO1mCzPveDaeIPkiSn9W9DO95qx1Wv5No4Z+4QAnOfkGFuE/lwIAtQTGGViMOCM9ny7g5OMctpJQjZoukNWFW/mBTqspywj4KEPiWQOkcxFC3K01nxs1JIXCA65E8JiOzoClZ6Z4VPhpxFN+9a9CmBoxZb6boE0TmXgTXr9npUAxiHSP+tZPiK675TdybqaQMxEB6f2MYc5giQhELCFUhKQO//cE2btjT2ru00xp79n8Afn9hdjUbSHGn03+auSWWWXI944yNb/uE19eBmYPcJt+gN8cQA1wHhKgl1mFKpgprOEUdUzInNQSNwNwq9E9J1smsbCH3J4jnE0wP7+APx6sOIsYVJOqXTwVfiS6CNvxBPtzlRehaWULEsiBWO5scLc/AOj9OvO7ApDHZ+6enrQ1572K3Nbw0R8Unn7/WhYC8ZBrRZtsh3A6whIjtS10IHCubFLvGARw6yhvzWkDfuSc2LNyUvzy2t1CpLA6whilYbwKZIVMdQEEqalk17v0qXvWH8Fzu+Ofe/GSKLXWANaH4u6j9MTCgJiNyzDjWReSmHwB3lFVY0QvYsNLznK5Sy6rHUdNkerSDYcrjHB374mSl9lu0y4zbGvMfrCVoCCsnlnZg3RF0bWRYFGcOaJs22QiNSwYj5pdovoaR1aE3CCyNSQV1Lo0PxT5qWkIV7tJ0iRrjDxBoy+9hHAAp6gXzaZ8AE9A3jP3mlrl23kWWff9TaFIdX6gBjXnszxwU+q5hbvHduw1py/SfLJq28/f5M7oMqLCwNdVkrwxsj1CB5Is9XVkWtlpbDt6vlF27CPj7wY8bKKgs+Fo2Um1BKWW8cDegVfOMV5C62JTLEyjHUVPMv3rBCEzziqaIQ47ruqKjL4o60Hf/GDEE4AsB9DXh2gUFgSxi2P4kNaBd+/wOxXwNhfppqOZTGBnnBBeI5l+/FS+5s4BnIu+m/kc4QvMdfmOcbnfAT7pHXe6RJ8hRBh+CT3xhAS0JhwPtQEuA2Mo3yOwefOP1BKzOOgAekIVzTdECatfzDjO+L34jMSASkjyKc5j/3W75VNCbc2ygyMyMRuKhBzH1NXn4EUKYCkW3GEbBFFsI9PcO8CPApl8vNzJADX6CCL7na5r0D2ozmgMg2oiLwN2NllwRmebnAA2Pb+MyIoqC0oYauCXOTpwc88t1aEtn0uyTyjwC2cvsxLwKmhMngnFpfSR0BJrwFb/JU4S5fXWhgRK9onpGZ7XX9klcZ6vH1uTyT7xfXKW28866ivKL1ms7i3sY7tN24uuo178y7Vo7N0udzt26hIyAqCckCeZAJrbb+QR0BZKMwl0Y0C4vVQwZeX+NQ/zZ9QQpPGqL4l40bz6uL5pzSyhh9vRNwmRGLGmaEvzCPu3eHUEC7E7Or7xgZkUmCrYC50J7jwec2iqz0v+V3rliVvRnPwLEDJax9jlN9W9gdl3z1zSYus5coXLD2Ou/1Nqspl+i24lVWy6mWpHLmd/0EiTnVXIYDdKyZ1EArxgUjpOGTPq++Z9IvrR6tpPKBHcrCsnlopK9Wbpl015MZUoA+X6FtH3rQZyZnotkBtw402JEQ0QFMOwSW6WDknCU5N6JDQAY2fmFSOvCq1/5Dngg4mHEHWGf8wRxNIP3buvKXIU0EuCE0rKnugCMuGCMMvqS1f8YI2EDHUYhIqYGGVAfaeu0/YImAiQ0NXaY7IGNgMqNE2NZHYkLibdeLLEHjjoVUWvUVQk8aYaDXJwOSbPCEX9Bu6viNHyCLAWahiV73G3IoQtHaCGugzPFFEl+aYKLPrkOKIry1hYazJ0QsoYHdNjzR2+16FLrVCRocpoLQxzvAKFlooDeE9xlGyUVrtrezmhVKQ7Yod6CPwpjg+6yY68isJA/gcjy39YbwLsEExEdoiKkeAeMElRD4Ugv6CLAtubBqfqRs24aagGXAseq1qodxttSL/m8+BdLhUS/6eoDN1CecNVoZVR446CtUd41vG50ZUQ6Qto3K6HlSMwv9IfTYtJvtgeiszKEVohycc2Vu9HaLY8PbWyIHarZUr0CZo0rsgdTLTm+8v2nWlu+doSbk2X39kx2qpV9zfI/075CXZg1ZHahxGIayX5isUTF7qZUn/RKZqNHr9wFqbKqCoLR6qBq7LXXyqM/3Wk325kwcrhqqjjmqJ2xJjexzVL91c5JQq2dERVhO+H9ItuZOc2o/faSoLzZXUDOnsoXJiw0dxjjGVjl/sOeGqpd6ka3LlQfeBrgOSY2V727OZOa7ptLBBdT0meYEiHgxvgpB4aufMy7u2EieopeCQipjqMgMX4VhON4wZ9b5oplkwA+hJKAyBSlegWY+Bda4sLYKxk0mUgNWF0oSLiVIXm1cEyeSWnD1+0ZFrHUTCxGmUOIwjQt7I0pwXXotqYNxrhX03MDR9AQl64NQ4Ye4Ns+W1MAgV/ef1f8UvDFCCxZvCx2GFYoXuf/wU71mVr3EYje+iKH6NIBkFdkud5TJASlsVxRc/XK1uZzhIhvoMaxG9EF8cyWFj3pNIrehGQEwQuU0lgB38t3gPdTZQd7qmxEArzbqoufLlVnld4XN6pxz4G7NeAMMHNRH7Mp1ifMtQEfU5xe27o3IAiQKUIhBOWGQv/hsUJ9Yac2gYt38apuPjEPUy+yqIeAWCH6WU5t5oQMVCVdriIjfx+cgbyqPcMGxyozGSa4UkXdQETS/2ugjrRjlMEUZOhQ98k41tTXtoWJINSsu9VjVY1II7IoOm0E9hesNVPSo2kPf8O5RD/Ul4Zui1e1WUseu5EeoiLk6Q0SsFUpiTgjMCpc1zdSyYA0B8OwKF58PAAPaSLaFkv/N9ds291Ax43IFi1hzNEnHkmuQpOwhWVo2UjiuVModRwttCb2iWeaeVI9fItHvXrdmaXWgwB4JGdYcTXPvSuW0SwxlOF11sZM1hQKHTQgUa4XmiW+lanYltnaOr7kXyVtBwZDMEyriMQQAEEZSMZsyHWHb60kCrS4UnMnaAkTce3CQHKRaVipzQLEdInGlEvzYiCxQWluwYB+lUvplcjzfvtIgp3EPCjZsWaD4ZxAx9aQ6PDulCKq5v87K/MkQWdZUC2T/BCoV8VgqIyrXFry8SkvTwUGWIVstUCQagozgICKVe/PXnmjxAqTpW/JFdjayxHRvQGkH4GNjVZ8KbD8p2y6vUQycck0H+MnCASPbsVTCc8kEL0KGs3wFb2aEDigyssFJ8iBVMCx7sXerPQT8LrIMyTpD37D24GXlV5Dmlm4KXiBDz5L/ZRIiS5fNDCDiNl8KyCO4qbIqEEguVogMI/lPlg6y7OlUAPFjkLO6ra73af75dapBq7ohUQlbU8j7SUVPcrTkK0zLi3xuggz7yk7WmM0PyJsEpDm3K9KEB5KL9+RUs/j/Wx9ZOnxJoDzBFObjKrpF1p7ksQyhoiufZZEgQ8LWF/qjvTvbUhQGwgBcQRYF2dVWFlFcwL273v/hZrrPnDM9Jy5oI1aYfNfeqZBU/anQXwP+a7ky8DFWxe8ycGoacMBWwOsTGxD2aUqqFXSbX6r4iGOlUN7boq6bsfQEeBuCb4CTD6LplurPkuInvMBM4ZoUqwt6wOmSS4MhsgOIqHvQ8V7uzXyQtahv7OG7ApyEXiMIjR0IqhNP8S7GjSI/y9ZwUzfCSvQdcJSSXhUILQGqAJftMobVna62hfSyB1UkDCvYh8Dx6EUBEEuqnaCqwnyKVeWXuzxsmypQUVnlzaoAJyaXBkTUhX0DfOcUOlbiXJoME2zCWgeeDR3ghASXgLgllwZ6kJIUEd7EOufOizErd+E+oY5XzX3gpPQagaitoE36B4vhVQE/OECfjbtwP4fhZUYKHJ9eGhTRFKwKVIG/eLe0So3BESLq2ebjCXNutqEYe0A8LqGVlLVdBMatW9KKMu3BTwzwPC0GTqdAeoZUzgQ9SZjY5cgydcYlxGqinPAcywOOQ7ARjAMxOsE/p/g9r993HGf94YZQp06AHG2j8J8jGAZt/QOgGfwEZMsFTkKwD8j+mwfAk/WG+J165gHgU1wBmHQOhYrOjfCvvQucBcEtgJaLXgWmxNPxD8MGTkgwC4pbYmdCRedF+GXUBc6Y1mWhXyKRomBi+FoLTBPguMTuCfuklXIFWL/QZCVfW1NygkmwTL4AnsL3gLOmNh36N1OWAJ5FiC2gbssdQGMm9NrA6kEuABrjUbsgBJEN2hIDEUCHXhKUjYQOggompdcFnHkgNcWlFwSctS8FRNiS2kgYNpL//2YpOaVFgFbIAlDzPsicCDFKuf5/CYXGoZBpLPf/LxO+fjjEfiHrfy/lBPhC6kAu/15vMsQXCWzxJkG0khJH2DxjIHf/dCzjITaKndKWHgESljI2sTFBTHEgvJScGDbgLZe1H7J6pY7PFazk10+bssgYPoma2bLyJ4KuvWVYO3Owk0s/cXTtTMX6DOdj+ecXznJ3NLEGZjGWoR9hhZPCZPiwKMsTWfMTnp+sRnf/DNRgvkrklr9Flv1JOQt0vMl4y45xIh/7bdXxduPVcZ7t36aRoWqMMU01oqlpbWeDw2biuG1o8/8CVvowWw9XDrQAAAAASUVORK5CYII="
										/>
									</pattern>
								</defs>
								<rect
									id="coffee-bean"
									width="53"
									height="42"
									fill="url(#pattern)"
								/>
								<path
									id="saldo-background"
									d="M12.458,0c6.881,0,12.458,6.359,12.458,14.2s-5.578,14.2-12.458,14.2S0,22.046,0,14.2,5.578,0,12.458,0Z"
									transform="translate(44 7)"
									fill="#f0a82e"
								/>
								<text
									:transform="translateValue"
									fill="#00000"
									font-size="16"
									font-family="ArialMT, Arial"
								>
									<tspan x="-4.449" y="0" id="saldo">{{ surplus }}</tspan>
								</text>
							</svg>
						</span>
					</div>

					<b-row id="row-with-btns" class="mb-1">
						<b-col v-if="!loading" cols="6">
							<button type="reset" @click="cancel()" id="cancel">
								Cancelar
							</button>
						</b-col>

						<b-col v-if="!loading" cols="6">
							<button type="submit" id="confirm">Confirmar</button>
						</b-col>

						<div v-if="loading" class="ml-auto mr-auto">
							<b-spinner variant="light" label="Carregando"></b-spinner>
							<p class="text-light">Carregando...</p>
						</div>
					</b-row>
				</b-container>
			</form>
		</div>
	</modal-base>
</template>

<script>
import { EventBus } from "../event-bus.js";
import { MD5 } from "../md5.js";

import ModalBase from "./ModalBase.vue";

export default {
	name: "Modal",
	data() {
		return {
			admUser: "",
			admPswd: "",
			surplus: 0,
			translateValue: "translate(56 27)",
			fetching: false,
			loading: false,
			modalFeedback: "",
			userIsAhead: false,
		};
	},
	props: {
		transform: {
			type: String,
		},
		action: {
			type: String,
			required: false,
		},
		reqBody: {},
	},
	computed: {
		currentDate() {
			return new Date().toLocaleDateString("pt-br", {
				dateStyle: "short",
			});
		},
	},
	methods: {
		addSurplus() {
			if (this.fetching) return;
			if (this.surplus > 8) {
				this.translateValue = "translate(50 27)";
			}
			this.surplus += 1;
		},
		checkForm() {
			const msgErroModal = document.getElementById("msg-erro-modal");

			this.modalFeedback = "";
			msgErroModal.textContent = this.modalFeedback;

			if (!this.admUser.trim() || !this.admPswd.trim()) {
				this.modalFeedback =
					"Certifique-se de que todos os campos estão preenchidos";
				msgErroModal.textContent = this.modalFeedback;

				msgErroModal.classList.remove("invalid-inactive");
				msgErroModal.classList.add("invalid-active");
				//clona o elemento
				const msgErroModalClone = msgErroModal.cloneNode(true);
				//substitui a si mesmo por seu clone, aplicando novamente a animação
				msgErroModal.parentNode.replaceChild(msgErroModalClone, msgErroModal);

				return false;
			} else {
				this.controller(msgErroModal);
			}
		},
		async controller(msgErroModal) {
			this.modalFeedback = "";

			msgErroModal.textContent = this.modalFeedback;

			const admPassword = MD5(this.admPswd);

			this.reqBody["admPassword"] = admPassword;
			this.reqBody["admUser"] = this.admUser;
			this.reqBody["surplus"] = this.surplus;

			if (this.action === "payment")
				this.reqBody["currentDate"] = this.currentDate;

			this.$store.dispatch("setUserInAction", this.reqBody);

			this.formatsDOMToFetch();

			let urlToFetch;
			let method;

			if (this.action === "signUp") {
				urlToFetch = process.env.VUE_APP_AMBIENT + "/create/user";
				method = "POST";
			} else if (this.action === "payment") {
				urlToFetch = process.env.VUE_APP_AMBIENT + "/coffeeBought";
				method = "POST";
			} else if (this.action === "removeUser") {
				urlToFetch = process.env.VUE_APP_AMBIENT + "/remove";
				method = "DELETE";
			}

			const response = await this.doesTheFetch(urlToFetch, method);

			this.modalFeedback = response.message;

			if (response.status === 201) {
				setTimeout(() => {
					this.fetching = false;
					this.loading = false;

					if (this.action === "signUp") {
						EventBus.$emit("userCreated");
						this.$destroy();
					} else if (this.action === "payment") {
						EventBus.$emit("paymentFinished");
						this.$destroy();
					} else if (this.action === "removeUser") {
						EventBus.$emit("userRemoved");
						this.$destroy();
					}
				}, 3000);
			} else {
				setTimeout(() => {
					this.fetching = false;
					this.loading = false;
					msgErroModal.classList.remove("invalid-inactive");
					msgErroModal.classList.add("invalid-active");
					msgErroModal.textContent = this.modalFeedback;
				}, 3000);
			}
		},
		formatsDOMToFetch() {
			this.fetching = true;
			document.getElementById("confirm").classList.add("collapse-btn-right");
			document.getElementById("cancel").classList.add("collapse-btn-left");

			//tempo para o término da animação CSS dos buttons
			setTimeout(() => {
				this.loading = true;
			}, 800);
		},
		async doesTheFetch(address, method) {
			const r = await fetch(address, {
				method: method,
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify(this.reqBody),
			})
				.then((r) => r.json())
				.catch((r) => console.log(r));
			return r;
		},
		cancel() {
			EventBus.$emit("closeModal");
			this.$destroy();
		},
	},
	mounted() {
		if (this.action === "payment" && this.reqBody.position != 1) {
			this.surplus = 1;
			this.userIsAhead = true;
		}
		this.$nextTick(() => this.$refs.autoFocus.focus());
	},
	components: {
		ModalBase,
	},
};
</script>

<style scoped>
p {
	margin: 0;
	padding: 0;
	text-align: center;
}

#modal {
	padding: 1em;
}

.form-label:hover {
	cursor: text;
}

.form-input-area {
	transition: all 0.3s;
}

.form-input-area:focus-within {
	transform: scale(1.09);
}

.form-input {
	width: 100%;
	height: 2.5em;
	border-radius: 1em;
	padding: 1em;
	background-color: #414141;
	border: 1px solid #707070;
	color: white;
	margin-top: 1.5em;
	transition: all 0.3s;
}

.form-input::placeholder {
	color: transparent;
}

.form-input:disabled {
	background-color: #6a6a6a;
}

.form-label {
	font-size: 1.3em;
	text-align: left;
	display: block;
	transform: translateY(-1.8em);
	margin-left: 0.7em;
	transform-origin: top left;
	transition: all 0.3s;
}

.form-input:focus + .form-label,
.form-input:not(:placeholder-shown) + .form-label {
	transform: translateY(-3.3em) scale(0.8);
	margin-left: 0.5em;
}

#msg-erro-modal {
	position: relative;
	top: -1em;
}

#msg-erro-modal {
	margin-top: -1em;
}

#add-surplus {
	margin-top: -1em;
	margin-bottom: 5%;
	user-select: none;
}

#add-surplus small {
	display: block;
}

#coffee-icon:hover {
	cursor: pointer;
}

button {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 100%;
	border-radius: 2em;
	padding: 0.5em 2em;
}

#cancel {
	border: 1px solid #ff0000;
}

#cancel:active {
	background-color: #ff0000;
}

#confirm {
	border: 1px solid #31ff00;
}

#confirm:active {
	background-color: #31ff00;
}

.collapse-btn-right {
	animation: collapse-btn-right;
	animation-fill-mode: forwards;
	animation-duration: 1s;
}

.collapse-btn-left {
	animation: collapse-btn-left;
	animation-fill-mode: forwards;
	animation-duration: 1s;
}

@keyframes collapse-btn-right {
	from {
		transform: translateX(0);
		opacity: 0.8;
	}

	to {
		transform: translateX(-55%);
		opacity: 0;
		display: none;
	}
}

@keyframes collapse-btn-left {
	from {
		transform: translateX(0);
		opacity: 0.8;
	}

	to {
		/* transform: translateX(calc(50%)); */
		transform: translateX(55%);
		opacity: 0;
		display: none;
	}
}

@media (max-height: 510px) and (orientation: landscape) {
	#modal {
		width: 100vw !important;
		height: 90vh !important;
		overflow-x: hidden;
		overflow-y: scroll;
	}
}
</style>
