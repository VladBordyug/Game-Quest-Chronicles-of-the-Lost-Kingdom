// Отримуємо посилання на кнопку налаштувань та панель налаштувань
document.addEventListener('DOMContentLoaded', function () {
    const settingsButton = document.querySelector('.settings-button');
    const playButton = document.querySelector('.play-button');
    const settingsPanel = document.querySelector('.settings-panel');
    const musicToggle = document.getElementById('music-toggle');
    const volumeSlider = document.getElementById('volume-slider');
     const colorPicker = document.getElementById('color-picker');
    const buttons = document.querySelectorAll('article');
    const backgroundMusic = document.getElementById('background-music');
    const gameContainer = document.getElementById('game-container'); 
    const musicKey = 'backgroundMusicEnabled';
    const volumeKey = 'backgroundMusicVolume';
    let canClick = true;
    let historyStack = [];
    const delay = 2000; 

settingsButton.addEventListener('click', function() {
        settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });
    
    colorPicker.addEventListener('input', function () {
        console.log('Колір змінено:', colorPicker.value); 
        buttons.forEach(button => {
            console.log('Зміна кольору кнопки:', button); 
            button.style.backgroundColor = colorPicker.value;
        });
    });
    function updateGameContainer(newHTML) {
        if (gameContainer.innerHTML) {
            historyStack.push(gameContainer.innerHTML);
        }
        gameContainer.innerHTML = newHTML;
        disableButtons();
        setTimeout(enableButtons, delay);
    }


document.addEventListener('DOMContentLoaded', function() {
    const settingsButton = document.querySelector('.settings-button');
    const settingsPanel = document.querySelector('.settings-panel');
    const colorPicker = document.getElementById('color-picker');
    const buttons = document.querySelectorAll('article'); 

    
    settingsButton.addEventListener('click', function() {
        settingsPanel.style.display = settingsPanel.style.display === 'block' ? 'none' : 'block';
    });

    
    colorPicker.addEventListener('input', function() {
        buttons.forEach(button => {
            button.style.backgroundColor = colorPicker.value;
        });
    });
});
 
    function disableButtons() {
        const buttonContainers = gameContainer.querySelectorAll('.button-container');
        buttonContainers.forEach(container => {
            container.classList.add('disabled');
            container.querySelectorAll('button').forEach(button => {
                button.disabled = true;
            });
        });
        const timerDivs = gameContainer.querySelectorAll('.timer');
        timerDivs.forEach(timer => {
            timer.textContent = `Зачекайте ${delay / 1000} секунд...`;
            timer.style.display = 'block';
        });
        canClick = false;
    }

    function enableButtons() {
        const buttonContainers = gameContainer.querySelectorAll('.button-container');
        buttonContainers.forEach(container => {
            container.classList.remove('disabled');
            container.querySelectorAll('button').forEach(button => {
                button.disabled = false;
            });
        });
        const timerDivs = gameContainer.querySelectorAll('.timer');
        timerDivs.forEach(timer => {
            timer.style.display = 'none';
        });
        canClick = true;
    }

    window.goBack = function () {
        if (historyStack.length > 0) {
            gameContainer.innerHTML = historyStack.pop();
            disableButtons();
            setTimeout(enableButtons, delay);
        }
    };

    settingsButton.addEventListener('click', function () {
        settingsPanel.classList.toggle('active');
    });

    function toggleMusic() {
        if (musicToggle.checked) {
            backgroundMusic.play().catch((err) => {
                console.warn('Не вдалося відтворити музику без взаємодії:', err);
            });
            localStorage.setItem(musicKey, 'true');
        } else {
            backgroundMusic.pause();
            localStorage.setItem(musicKey, 'false');
        }
    }

    const isMusicEnabled = localStorage.getItem(musicKey);
    musicToggle.checked = isMusicEnabled === 'true';

    const savedVolume = parseFloat(localStorage.getItem(volumeKey));
    backgroundMusic.volume = !isNaN(savedVolume) ? savedVolume : 1;
    volumeSlider.value = backgroundMusic.volume;

    document.body.addEventListener('click', () => {
        if (musicToggle.checked && backgroundMusic.paused) {
            backgroundMusic.play().catch(() => {});
        }
    }, { once: true });

    musicToggle.addEventListener('change', toggleMusic);
    volumeSlider.addEventListener('input', function () {
        backgroundMusic.volume = parseFloat(this.value);
        localStorage.setItem(volumeKey, backgroundMusic.volume.toString());
    });

    playButton.addEventListener('click', function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Передісторія</h2>
                <p>
                    Ви граєте за молодого мешканця спокійного прикордонного селища.
                    Одного дня до вас прибуває поранений посланець із жахливою звісткою: багато століть тому
                    могутнє Королівство Елдорія раптово зникло, поглинуте таємничою темрявою. Тепер ця темрява
                    знову починає поширюватися, загрожуючи всьому світу. Останній живий нащадок королівського роду,
                    принцеса Ліра, відчайдушно шукає спосіб зупинити зло, але її місцезнаходження невідоме.
                    Помираючи, посланець передає вам стародавній амулет і пророцтво,
                    в якому згадується ваше ім'я як того, хто може відшукати принцесу та розгадати таємницю зникнення Елдорії.
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="showFirstChoice()">Далі</button>
                    <a href="gorilla.html">
                    <button class="back-button" onclick="goBack()">Назад</button>
                    </a>
                </div>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    });

    window.showFirstChoice = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Куди вирушите?</h2>
                <p>Виберіть, що ви хочете зробити далі:</p>
                <div class="button-container disabled">
                    <button class="next-button" 
                            onclick="proceedToRuins()">
                        Вирушити в руїни Елдорії (Простий рівень гри)
                    </button>
                    <button class="next-button" onclick="chooseAlliesPath()">Знайти союзників у сусідніх королівствах(Складний рівень гри)</button>
                    <button class="next-button" onclick="useAmuletForGuidance()">Використати амулет для пошуків напрямку(Найпростий рівень гри)</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                <div id="tooltip"></div>
            </div>
        `);
    };

    window.useAmuletForGuidance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для пошуку шляху</h2>
                <p>Амулет починає світитися, вказуючи в певному напрямку. Куди він вас веде?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletToTheHiddenGrove()">Піти за амулетом до прихованого гаю</button>
                    <button class="next-button" onclick="followTheAmuletToTheMysticTower()">Піти за амулетом до містичної вежі на горизонті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheAmuletToTheHiddenGrove = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Прихований гай</h2>
                <p>Амулет приводить вас до тихого гаю, де росте стародавнє дерево, в корі якого ви бачите вирізьблені символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="examineTheCarvedSymbols()">Оглянути вирізьблені символи</button>
                    <button class="next-button" onclick="listenToTheWhisperingLeaves()">Прислухатися до шепоту листя</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.examineTheCarvedSymbols = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Прокляті символи</h2>
            <p>Ви уважно розглядаєте символи, але вони виявляються стародавнім прокляттям. Щойно ви торкаєтесь кори, темна енергія починає проникати у ваше тіло.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theCurseTakesHold()">Прокляття бере верх</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.listenToTheWhisperingLeaves = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зрадницький шепіт</h2>
            <p>Ви прислухаєтесь до шепоту листя, сподіваючись на мудрість. Але замість цього чуєте лише брехню та обіцянки сили, що зводять з правильного шляху. Вас охоплює спокуса.</p>
        <div class="button-container disabled">
                <button class="next-button" onclick="succumbToTemptation()">Піддатися спокусі</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theCurseTakesHold = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Трагічний кінець</h2>
            <p>Прокляття швидко поширюється, позбавляючи вас сил та життя. Ваша подорож закінчується в темряві гаю.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.succumbToTemptation = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зійти з шляху</h2>
            <p>Ви піддаєтесь спокусі, обираючи легкий шлях. Але це призводить до втрати вашої мети та перетворення на інструмент темряви.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>Ваша подорож закінчилася трагічно.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.followTheAmuletToTheMysticTower = function () {
        updateGameContainer(`
        <div class="game-intro">
            <h2>Містична вежа</h2>
            <p>Ви досягаєте старовинної вежі, оповитої магічною аурою. Двері зачинені, але ви відчуваєте присутність магії всередині.</p>
            <div class="button-container disabled">
                <button class="next-button" 
                        onclick="showComingSoonMessage()"
                        onmouseover="showTooltip('Продовження у 2 частині гри', this)"
                        onmouseout="hideTooltip()">
                    Уважно оглянути вхід до вежі
                </button>
                <button class="next-button" 
                        onclick="showComingSoonMessage()"
                        onmouseover="showTooltip('Продовження у 2 частині гри', this)"
                        onmouseout="hideTooltip()">
                    Обережно увійти до вежі
                </button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            <div id="tooltip" style="position: absolute; display: none; background-color: white; border: 1px solid black; padding: 5px; z-index: 10;"></div>
        </div>
    `);
    };

function showTooltip(text, element) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = text;
    tooltip.style.display = 'block';
    const rect = element.getBoundingClientRect();
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
    tooltip.style.left = `${rect.left + window.scrollX}px`;
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

window.showComingSoonMessage = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Продовження</h2>
            <p>Ця частина історії буде розкрита у другій частині гри. Дякуємо за вашу зацікавленість!</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.playAgain = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Грати знову?</h2>
            <p>Хочете спробувати ще раз?</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="showFirstChoice()">Почати з початку</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.proceedToRuins = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шукаємо принцесу в руїнах Елдорії</h2>
                <p>Ви входите в похмурі руїни стародавньої Елдорії. Камені тут зберігають відгомони минулої величі, але тепер усе навколо вкрите тінню та небезпекою. Що ви оберете?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="useAmuletRuins()">Використати магію амулету, щоб освітити шлях</button>
                    <button class="next-button" onclick="riskTrap()">Ризикнути і швидко пройти через руїни, незважаючи на пастки</button>
                    <button class="next-button" onclick="carefullyExamineTheSurroundings()">Уважно оглянути місцевість у пошуках підказок</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletRuins = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використовуєте магію амулету</h2>
                <p>Амулет починає світитися, розганяючи темряву та освітлюючи ваш шлях. Ви бачите стародавні символи на стінах і відчуваєте присутність магії навколо...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheSymbols()">Піти за символами на стінах</button>
                    <button class="next-button" onclick="searchForHiddenPassages()">Шукати приховані проходи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.riskTrap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ризикуючи, ви проходите через пастки</h2>
                <p>Ви швидко пробираєтесь через руїни, уникаючи обвалів та пролітаючи повз стріли. Проте ви отримуєте легке поранення, але знаходите карту...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findMap()">Знайти карту, що веде до принцеси</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.carefullyExamineTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Уважний огляд руїн</h2>
                <p>Ви ретельно оглядаєте кожен куток, звертаючи увагу на деталі. Це займає багато часу, але ви знаходите потаємний механізм...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="activateTheMechanism()">Активувати знайдений механізм</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слідуючи за символами</h2>
                <p>Символи приводять вас до потаємної кімнати в глибині руїн. Там ви знаходите стародавню табличку з пророцтвом...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="readTheProphecy()">Прочитати знайдене пророцтво</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.readTheProphecy = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Стародавнє пророцтво</h2>
                <p>
                    Ви нахиляєтесь над табличкою і розшифровуєте висічені на ній слова:
                    <br><br>
                    "Коли темрява знову підніметься з глибин,
                    Лише обраний, позначений амулетом, зможе розбити її пута.
                    Принцеса, спадкоємиця світла, поведе його в бій,
                    І лише разом вони зможуть повернути Елдорії колишню міць."
                </p>
                <p>
                    Пророцтво згадує амулет, який зараз у вас, і принцесу Ліру!
                    Що ви зробите з цією новою інформацією?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekThePrincessImmediately()">Негайно вирушити на пошуки принцеси</button>
                    <button class="next-button" onclick="ponderTheProphecysMeaning()">Ретельно обміркувати значення пророцтва</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekThePrincessImmediately = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки принцеси</h2>
                <p>
                    Ви сповнені рішучості знайти принцесу Ліру. Пророцтво дало вам надію та напрямок.
                    Куди ви підете в першу чергу?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="searchInTheNearestSettlement()">Розпитати в найближчому поселенні про її місцезнаходження</button>
                    <button class="next-button" onclick="followAnyRumorsOrLeads()">Піти за будь-якими чутками чи зачіпками, які почуєте</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchInTheNearestSettlement = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки в поселенні</h2>
                <p>
                    Ви приходите до найближчого поселення і починаєте розпитувати про принцесу.
                    Місцеві жителі згадують, що бачили схожу на неї мандрівницю, яка прямувала на схід...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="headEastFollowingThePrincessTrail()">Вирушити на схід слідом за принцесою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.headEastFollowingThePrincessTrail = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>На схід!</h2>
                <p>
                    Ви вирушаєте на схід, слідуючи за розповідями місцевих. Шлях веде через густий ліс...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterTheForestCautiously()">Обережно увійти в ліс</button>
                    <button class="next-button" onclick="trustYourInstinctsAndPressOn()">Довіритися інстинктам і йти вперед</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followAnyRumorsOrLeads = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слідом за чутками</h2>
                <p>
                    Ви чуєте різні чутки про місцезнаходження принцеси: хтось каже, що вона в горах, хтось - у старовинному храмі.
                    Якому шляху ви повірите?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="investigateTheMountainRumors()">Перевірити чутки про гори</button>
                    <button class="next-button" onclick="exploreTheAncientTemple()">Дослідити стародавній храм</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.investigateTheMountainRumors = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У горах</h2>
                <p>
                    Ви вирушаєте в гори. Шлях складний і небезпечний. Ви знаходите покинуту хатину, але потрапляєте в пастку розбійників, які грабують і залишають вас помирати.
                    Ваша подорож закінчується трагічно.
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="gameOver()">Кінець гри</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.exploreTheAncientTemple = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Стародавній храм</h2>
                <p>
                    Ви знаходите стародавній храм, оповитий таємницями. Усередині панує тиша, але ви відчуваєте чиюсь присутність...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="callOutToAnyoneInside()">Крикнути, щоб дізнатися, чи є хтось усередині</button>
                    <button class="next-button" onclick="proceedDeeperIntoTheTempleSilently()">Мовчки пройти вглиб храму</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ponderTheProphecysMeaning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Роздуми над пророцтвом</h2>
                <p>
                    Ви намагаєтесь зрозуміти кожне слово пророцтва. Що означає "розбити пута темряви"?
                    Яку саме "міць" має повернути Елдорія?
                </p>
                <p>
                    Можливо, відповіді криються в глибшій історії королівства...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="researchEldorianHistory()">Дослідити історію Елдорії в найближчій бібліотеці</button>
                    <button class="next-button" onclick="seekGuidanceFromAWiseSage()">Пошукати поради у мудрого старця чи провидця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.researchEldorianHistory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Дослідження історії</h2>
                <p>
                    У бібліотеці ви знаходите стародавні сувої, в яких описується зникнення Елдорії та природа темряви.
                    Ви дізнаєтесь про легендарні артефакти, здатні протистояти злу...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="searchForTheseArtifacts()">Розпочати пошуки цих артефактів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchForTheseArtifacts = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки артефактів</h2>
                <p>
                    Сувої згадують три артефакти: Меч Світла, Щит Істини та Корону Елдорії.
                    Перша підказка веде до таємничого лісу...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterTheMysteriousForest()">Увійти в таємничий ліс</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekGuidanceFromAWiseSage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порада мудреця</h2>
                <p>
                    Мудрий старець, до якого ви звертаєтесь, розповідає вам про таємні знання та приховані шляхи,
                    які можуть допомогти у вашому квесті. Він дає вам загадкову підказку, пов'язану з місячним сяйвом...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="decipherTheSagesClue()">Розшифрувати підказку мудреця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.decipherTheSagesClue = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розшифровка підказки</h2>
                <p>
                    Ви намагаєтесь зрозуміти, що означає підказка про місячне сяйво.
                    Можливо, це пов'язано з певним місцем або часом...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="observeTheMoonAtTheAncientRuins()">Спостерігати за місяцем біля стародавніх руїн</button>
                    <button class="next-button" onclick="findAMoonlitPathInTheForest()">Знайти освітлену місяцем стежку в лісі</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    

    window.seekThePrincessImmediately = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки принцеси</h2>
                <p>
                    Ви сповнені рішучості знайти принцесу Ліру. Пророцтво дало вам надію та напрямок.
                    Куди ви підете в першу чергу?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="searchInTheNearestSettlement()">Розпитати в найближчому поселенні про її місцезнаходження</button>
                    <button class="next-button" onclick="followAnyRumorsOrLeads()">Піти за будь-якими чутками чи зачіпками, які почуєте</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchInTheNearestSettlement = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки в поселенні</h2>
                <p>
                    Ви приходите до найближчого поселення і починаєте розпитувати про принцесу.
                    Місцеві жителі згадують, що бачили схожу на неї мандрівницю, яка прямувала на схід...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="headEastFollowingThePrincessTrail()">Вирушити на схід слідом за принцесою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followAnyRumorsOrLeads = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слідом за чутками</h2>
                <p>
                    Ви чуєте різні чутки про місцезнаходження принцеси: хтось каже, що вона в горах, хтось - у старовинному храмі.
                    Якому шляху ви повірите?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="investigateTheMountainRumors()">Перевірити чутки про гори</button>
                    <button class="next-button" onclick="exploreTheAncientTemple()">Дослідити стародавній храм</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ponderTheProphecysMeaning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Роздуми над пророцтвом</h2>
                <p>
                    Ви намагаєтесь зрозуміти кожне слово пророцтва. Що означає "розбити пута темряви"?
                    Яку саме "міць" має повернути Елдорія?
                </p>
                <p>
                    Можливо, відповіді криються в глибшій історії королівства...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="researchEldorianHistory()">Дослідити історію Елдорії в найближчій бібліотеці</button>
                    <button class="next-button" onclick="seekGuidanceFromAWiseSage()">Пошукати поради у мудрого старця чи провидця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.researchEldorianHistory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Дослідження історії</h2>
                <p>
                    У бібліотеці ви знаходите стародавні сувої, в яких описується зникнення Елдорії та природа темряви.
                    Ви дізнаєтесь про легендарні артефакти, здатні протистояти злу...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="searchForTheseArtifacts()">Розпочати пошуки цих артефактів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekGuidanceFromAWiseSage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порада мудреця</h2>
                <p>
                    Мудрий старець, до якого ви звертаєтесь, розповідає вам про таємні знання та приховані шляхи,
                    які можуть допомогти у вашому квесті. Він дає вам загадкову підказку...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="decipherTheSagesClue()">Розшифрувати підказку мудреця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    

    window.seekThePrincessImmediately = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки принцеси</h2>
                <p>
                    Ви сповнені рішучості знайти принцесу Ліру. Пророцтво дало вам надію та напрямок.
                    Куди ви підете в першу чергу?
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="searchInTheNearestSettlement()">Розпитати в найближчому поселенні про її місцезнаходження</button>
                    <button class="next-button" onclick="followAnyRumorsOrLeads()">Піти за будь-якими чутками чи зачіпками, які почуєте</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ponderTheProphecysMeaning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Роздуми над пророцтвом</h2>
                <p>
                    Ви намагаєтесь зрозуміти кожне слово пророцтва. Що означає "розбити пута темряви"?
                    Яку саме "міць" має повернути Елдорія?
                </p>
                <p>
                    Можливо, відповіді криються в глибшій історії королівства...
                </p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="researchEldorianHistory()">Дослідити історію Елдорії в найближчій бібліотеці</button>
                    <button class="next-button" onclick="seekGuidanceFromAWiseSage()">Пошукати поради у мудрого старця чи провидця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchForHiddenPassages = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук прихованих проходів</h2>
                <p>Ви знаходите замаскований прохід за однією зі стін. Він веде до підземного тунелю...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterTheTunnel()">Увійти в підземний тунель</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };
    window.takeAnArtifact = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Жадібність</h2>
            <p>Ви берете артефакт, незважаючи на попередження. Він виявляється проклятим, і темрява поглинає вас. Королівство приречене.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="sufferDefeat()">Прийняти темну долю</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.activateTheMechanism = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Активація механізму</h2>
                <p>Ви активуєте механізм, і в стіні відкривається потаємний прохід. Він веде до скарбниці, повної стародавніх артефактів...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="takeAnArtifact()">Взяти один з артефактів</button>
                    <button class="next-button" onclick="leaveTheTreasures()">Залишити скарби недоторканими</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.takeAnArtifact = function () {
    let victory = Math.random() < 0.6;

    if (victory) {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Вибір артефакту</h2>
                <p>Ви берете стародавній артефакт, відчуваючи його силу. Але разом з тим, ви відчуваєте тягар відповідальності за його використання. Королівство врятовано, але майбутнє невизначене.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    } else {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Небезпечний вибір</h2>
                <p>Артефакт виявляється проклятим. Він приносить нещастя та руйнування. Ваша жадібність призвела до катастрофи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="sufferDefeat()">Зазнати поразки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    }
};

window.leaveTheTreasures = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Мудре рішення</h2>
            <p>Ви вирішуєте залишити скарби недоторканими, розуміючи, що деякі речі краще не чіпати. Ваша мудрість врятувала вас від небезпеки, але королівство все ще потребує допомоги.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};
    window.findMap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ви знайшли стародавню карту</h2>
                <p>Карта показує місцезнаходження принцеси Ліри. Тепер ви маєте вибір, куди вирушити далі:</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterCave()">Увійти в темну печеру, позначену на карті</button>
                    <button class="next-button" onclick="searchOutside()">Шукати принцесу зовні, орієнтуючись по карті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    

    window.useAmuletRuins = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використовуєте магію амулету</h2>
                <p>Амулет світиться, і темрява поступово відступає. Ви проходите через руїни, обережно досліджуючи кожен куток...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findMap()">Знайшли стародавню карту</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.riskTrap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ви ризикуєте і проходите через пастки</h2>
                <p>Ви отримали поранення, але продовжили шлях і знайшли карту, що веде до руїн королівства...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findMap()">Знайшли карту</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.findMap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ви знайшли стародавню карту</h2>
                <p>Мапа показує місце, де, ймовірно, знаходиться принцеса. Тепер ви маєте вибір:</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterCave()">Войти в печеру</button>
                    <button class="next-button" onclick="searchOutside()">Шукати зовні</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.enterCave = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ви входите в темну печеру</h2>
                <p>Печера здається тихою, але ви чуєте дивні звуки всередині. Ви наближаєтесь до темного коридору...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="finalConfrontation()">До кінця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchOutside = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шукаєте зовні</h2>
                <p>Ви знаходите групу союзників, які пропонують вам допомогу у пошуках принцеси...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="finalConfrontation()">Продовжити</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.finalConfrontation = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Остаточна битва з темрявою</h2>
                <p>Ви знаходите принцесу Ліру і разом з нею боретеся з темрявою. Ваші вибори визначать, чи зможете ви врятувати королівство.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="fightTheDarkness()">Битися з темрявою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.fightTheDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Битва з темрявою</h2>
                <p>Ви та принцеса Ліра використовуєте всі свої знання та силу, щоб протистояти темряві. Бій важкий, але ваша рішучість непохитна.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="useTheAmuletFinalBattle()">Використати амулет для посилення своїх здібностей</button>
                    <button class="next-button" onclick="relyOnStrategicThinking()">Покластися на стратегічне мислення та тактику</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useTheAmuletFinalBattle = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета</h2>
                <p>Амулет випромінює потужне світло, даючи вам перевагу в битві. Темрява відступає, але її сили ще великі.</p>
            <div class="button-container disabled">
                    <button class="next-button" onclick="channelTheAmuletsPower()">Направити силу амулета в вирішальний удар</button>
                    <button class="next-button" onclick="useTheAmuletToProtectPrincess()">Використати амулет для захисту принцеси, поки вона готує контратаку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.relyOnStrategicThinking = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Стратегічний підхід</h2>
                <p>Ви розробляєте план, використовуючи слабкості темряви проти неї самої. Це ризиковано, але може принести перемогу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="executeTheTrap()">Виконати ретельно підготовлену пастку</button>
                    <button class="next-button" onclick="leadTheDarknessIntoAncientSeal()">Повести темряву до стародавньої печатки, щоб ув'язнити її</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.channelTheAmuletsPower = function () {
        let victory = Math.random() < 0.8;

        if (victory) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Перемога!</h2>
                    <p>Ви спрямовуєте всю силу амулета в один нищівний удар. Темрява розсіюється, і королівство врятовано.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Поразка...</h2>
                    <p>Амулет виявляється недостатньо сильним. Темрява поглинає все навколо.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="sufferDefeat()">Зазнати поразки</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        }
    };

    window.useTheAmuletToProtectPrincess = function () {
        let victory = Math.random() < 0.5;

        if (victory) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Перемога!</h2>
                    <p>Ви захищаєте принцесу, поки вона завершує заклинання. Разом ви перемагаєте темряву.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Поразка...</h2>
                    <p>Заклинання принцеси не спрацьовує вчасно. Темрява перемагає.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="sufferDefeat()">Зазнати поразки</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        }
    };

    window.executeTheTrap = function () {
        let victory = Math.random() < 0.6;

        if (victory) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Перемога!</h2>
                    <p>Пастка спрацьовує ідеально. Темрява потрапляє в неї і зникає.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Поразка...</h2>
                    <p>Пастка виявляється неефективною. Темрява стає ще сильнішою.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="sufferDefeat()">Зазнати поразки</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        }
    };

    window.leadTheDarknessIntoAncientSeal = function () {
        let victory = Math.random() < 0.7;

        if (victory) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Перемога!</h2>
                    <p>Ви приводите темряву до печатки, і вона закривається, ув'язнюючи зло назавжди.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="achieveVictory()">Здобути перемогу</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Поразка...</h2>
                    <p>Печатка зламана. Темряву неможливо зупинити.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="sufferDefeat()">Зазнати поразки</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        }
    };
window.achieveVictory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перемога!</h2>
                <p>Завдяки вашій мужності та мудрості принцеси Ліри темряву вдалося відкинути. Королівство Елдорія врятовано, і світ знову в безпеці.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="celebrateVictory()">Відсвяткувати перемогу</button>
                    <button class="next-button" onclick="planForRebuilding()">Планувати відбудову королівства</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.sufferDefeat = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Поразка...</h2>
                <p>Незважаючи на всі ваші зусилля, темрява виявилася надто сильною. Світ занурюється у вічну ніч...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="acceptTheDarkFate()">Прийняти темну долю</button>
                    <button class="next-button" onclick="tryOneLastDesperateMeasure()">Зважитися на останню відчайдушну спробу</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.celebrateVictory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Святкування перемоги</h2>
                <p>У королівстві Елдорія влаштовується велике свято на честь перемоги над темрявою. Вас та принцесу Ліру вітають як героїв.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="acceptTheKingdomsPraise()">Прийняти похвалу королівства</button>
                    <button class="next-button" onclick="reflectOnYourJourney()">Поміркувати про свою подорож</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.planForRebuilding = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Плани відбудови</h2>
                <p>Разом з принцесою Лірою ви починаєте розробляти плани відбудови зруйнованого королівства. Багато чого потрібно зробити, але у вас є надія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="focusOnEconomicRecovery()">Зосередитися на відновленні економіки</button>
                    <button class="next-button" onclick="prioritizeDefenseAndSecurity()">Зосередитися на обороні та безпеці</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.acceptTheDarkFate = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Прийняття долі</h2>
                <p>Ви змиряєтеся з поразкою, спостерігаючи, як темрява поглинає світ. Надії більше немає.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryOneLastDesperateMeasure = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Остання спроба</h2>
                <p>У відчайдушній спробі ви вирішуєте вирушити в саме серце темряви, щоб знайти її джерело та знищити його.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="ventureIntoTheHeartOfDarkness()">Вирушити в серце темряви</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.acceptTheKingdomsPraise = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Прийняття похвали</h2>
                <p>Ви приймаєте почесті від вдячних жителів Елдорії. Ваше ім'я назавжди увічнено в історії королівства.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.reflectOnYourJourney = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Роздуми про подорож</h2>
                <p>Ви розмірковуєте про всі випробування та перемоги, які ви пережили. Ви змінилися назавжди.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusOnEconomicRecovery = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Відновлення економіки</h2>
                <p>Ви зосереджуєте свої зусилля на відбудові міст, відновленні торгівлі та підтримці фермерів. Королівство поступово повертається до життя.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.prioritizeDefenseAndSecurity = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Оборона та безпека</h2>
                <p>Ви зміцнюєте армію, будуєте нові фортеці та навчаєте лицарів, щоб захистити королівство від майбутніх загроз.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHeartOfDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У серці темряви</h2>
                <p>Ви вирушаєте в небезпечну подорож у саме серце темряви, сподіваючись знайти спосіб знищити її назавжди. Це може бути ваш останній шанс.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="confrontTheSourceOfDarkness()">Зіткнутися з джерелом темряви</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.confrontTheSourceOfDarkness = function () {
        let victory = Math.random() < 0.5;

        if (victory) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Перемога!</h2>
                    <p>Ви знаходите джерело темряви та знищуєте його, жертвуючи собою. Світ врятовано, але ціною вашого життя.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="aHeroicSacrifice()">Героїчна жертва</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Поразка...</h2>
                    <p>Ви не можете подолати джерело темряви. Світ приречений.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="theEnd()">Кінець</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        }
    };

    window.aHeroicSacrifice = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Героїчна жертва</h2>
                <p>Ваше ім'я назавжди залишиться в легендах як символ самопожертви та надії.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theEnd()">Кінець</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theEnd = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Кінець</h2>
                <p>Дякуємо за гру!</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="reloadGame()">Перезапустити гру</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };
    window.achieveVictory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перемога!</h2>
                <p>Завдяки вашій мужності та мудрості принцеси Ліри темряву вдалося відкинути. Королівство Елдорія врятовано, і світ знову в безпеці.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="endGame()">Завершити гру</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.sufferDefeat = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Поразка...</h2>
                <p>Незважаючи на всі ваші зусилля, темрява виявилася надто сильною. Світ занурюється у вічну ніч...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="endGame()">Завершити гру</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.endGame = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гра завершена</h2>
                <p>Дякуємо за гру! Ви зробили свій вибір.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="reloadGame()">Перезапустити гру</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.reloadGame = function () {
        location.reload();
    };

    window.chooseAlliesPath = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Знайти союзників у сусідніх королівствах</h2>
                <p>Ви вирушаєте до сусіднього королівства Солов'їних Долин, відомого своєю мудрістю та миролюбністю. Які ваші перші кроки у цьому королівстві?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekCouncil()">Звернутися за порадою до королівської ради</button>
                    <button class="next-button" onclick="visitAncientLibrary()">Відвідати стародавню бібліотеку в пошуках знань</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekCouncil = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Звернення до королівської ради</h2>
                <p>Члени королівської ради уважно вислуховують вашу розповідь про темряву та зниклу Елдорію. Вони здаються зацікавленими, але обережними. Яке ваше головне прохання до них?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="askForMilitaryAid()">Попросити військової допомоги</button>
                    <button class="next-button" onclick="requestInformation()">Запросити інформацію про темряву та Елдорію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };
    window.askForMilitaryAid = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Прохання військової допомоги</h2>
                <p>Рада обговорює ваше прохання. Їхнє рішення залежить від того, наскільки переконливими будуть ваші аргументи...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="waitForCouncilDecision()">Чекати на рішення ради</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.requestInformation = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запит інформації</h2>
                <p>Радники діляться з вами стародавніми знаннями про темряву та можливі шляхи її подолання. Ви отримуєте цінні підказки.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheClues()">Слідувати підказкам</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.visitAncientLibrary = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Відвідування стародавньої бібліотеки</h2>
                <p>У бібліотеці ви знаходите безліч стародавніх сувоїв та книг. На чому ви зосередите свої пошуки?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="researchElvenHistory()">Дослідити історію ельфів та їх зв'язок з Елдорією</button>
                    <button class="next-button" onclick="searchForProphecies()">Шукати стародавні пророцтва про темряву</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.researchElvenHistory = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Дослідження історії ельфів</h2>
                <p>Ви дізнаєтеся про стародавній союз між людьми та ельфами та про їхню спільну боротьбу з темрявою.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekElvenAllies()">Шукати ельфійських союзників</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchForProphecies = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук пророцтв</h2>
                <p>Ви знаходите пророцтво, в якому згадується герой, що об'єднає королівства для боротьби з темрявою.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="believeInProphecy()">Повірити в пророцтво та діяти відповідно до нього</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.believeInProphecy = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Сліпа віра</h2>
            <p>Ви сліпо вірите в пророцтво, нехтуючи обережністю. Це призводить до необдуманих рішень та фатальної помилки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="aTragicEnd()">Трагічний кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.aTragicEnd = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ваша сліпа віра призводить до загибелі. Темрява перемагає.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>Ваша подорож закінчилася трагічно.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.waitForCouncilDecision = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування рішення ради</h2>
                <p>Минає час у напруженому очікуванні. Нарешті, приходить посланець з відповіддю...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="getCouncilDecision()">Дізнатися рішення ради</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.getCouncilDecision = function () {
        
        
        const helpGranted = Math.random() < 0.7; 

        if (helpGranted) {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Рішення ради</h2>
                    <p>Рада Солов'їних Долин погоджується надати вам невеликий загін воїнів та мудрого радника.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="continueQuestWithAllies()">Продовжити свою подорож із союзниками</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        } else {
            updateGameContainer(`
                <div class="game-intro">
                    <h2>Рішення ради</h2>
                    <p>На жаль, рада Солов'їних Долин вважає, що не може надати вам військової допомоги, але пропонує мудрі поради.</p>
                    <div class="button-container disabled">
                        <button class="next-button" onclick="continueQuestAloneWithAdvice()">Продовжити свою подорож самостійно, але з порадами</button>
                    </div>
                    <button class="back-button" onclick="goBack()">Назад</button>
                    <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
                </div>
            `);
        };
    };

    window.continueQuestWithAllies = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Подорож із союзниками</h2>
                <p>Разом із загоном досвідчених воїнів Солов'їних Долин та мудрим радником Елдаром ви вирушаєте в дорогу. Елдар розповідає вам про давні легенди, пов'язані з темрявою та зникненням Елдорії. Куди ви прямуєте насамперед?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="travelToForgottenTemple()">Вирушити до Забутого Храму, згаданого в легендах</button>
                    <button class="next-button" onclick="seekAudienceWithAnotherKingdom()">Спробувати знайти підтримку в іншому сусідньому королівстві - Кристальних Вершинах</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.travelToForgottenTemple = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Забутий Храм</h2>
                <p>Після кількох днів шляху ви нарешті дістаєтесь до Забутого Храму. Це місце виглядає так, ніби його покинули багато століть тому. Каміння потріскалось, а стіни поросли мохом та плющем. Тиша тут така густа, що її можна відчути.  Елдар попереджає про можливі пастки та стародавні захисні механізми.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="exploreTheTempleCarefully()">Обережно дослідити храм</button>
                    <button class="next-button" onclick="searchForAncientTextsInLibrary()">Шукати стародавні тексти в бібліотеці храму</button>
                    <button class="next-button" onclick="checkTheTempleMainAltar()">Перевірити головний вівтар храму</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekAudienceWithAnotherKingdom = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Кристальні Вершини</h2>
                <p>Подорож до Кристальних Вершин займає значно більше часу, але нарешті ви дістаєтесь до величного гірського королівства. Місто виглядає неприступним, висіченим прямо в скелі. Воїни в кришталевих обладунках пильно охороняють кожен вхід.  Щоб потрапити всередину, вам потрібно домогтися аудієнції у короля Аріона.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="requestAudienceWithTheKing()">Попросити аудієнції у короля Аріона</button>
                    <button class="next-button" onclick="seekInformationFromLocalMages()">Звернутися за інформацією до місцевих магів</button>
                    <button class="next-button" onclick="tryToFindASecretEntrance()">Спробувати знайти таємний вхід до міста</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.exploreTheTempleCarefully = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережне дослідження храму</h2>
                <p>Ви обережно просуваєтесь храмом, оглядаючи кожну тріщину в стінах та перевіряючи кожну плиту під ногами. Раптом один з воїнів натрапляє на приховану кнопку, і вхід до потаємної кімнати відчиняється.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterTheSecretChamber()">Увійти в потаємну кімнату</button>
                    <button class="next-button" onclick="examineTheMechanism()">Оглянути механізм, що відчинив прохід</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.enterTheSecretChamber = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Потаємна кімната</h2>
            <p>Ви входите в кімнату, і вона виявляється стародавньою святинею. У центрі стоїть п'єдестал, на якому лежить сяючий кристал. Кімната сповнена відчуттям спокою та магічної енергії.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="takeTheCrystal()">Взяти кристал</button>
                <button class="next-button" onclick="examineTheShrine()">Оглянути святиню</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.examineTheMechanism = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Огляд механізму</h2>
            <p>Ви уважно розглядаєте механізм. Це складна система шестерень та важелів, зроблених з невідомого металу. На ньому вигравірувані символи, схожі на ті, що ви бачили на амулеті.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToDecipherTheSymbols()">Спробувати розшифрувати символи</button>
                <button class="next-button" onclick="searchForHiddenSymbolsNearby()">Пошукати приховані символи поруч</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.takeTheCrystal = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кристал Світла</h2>
            <p>Ви обережно берете кристал. Він теплий на дотик, і його світло наповнює вас відчуттям надії. Ви розумієте, що це один з артефактів, згаданих у пророцтві - Кристал Світла.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theQuestContinuesWithTheCrystal()">Подорож триває з Кристалом</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.examineTheShrine = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Стародавня святиня</h2>
            <p>Ви оглядаєте святиню. На стінах висічені сцени з минулого Елдорії, де світло бореться з темрявою. Здається, це місце було побудоване спеціально для зберігання Кристала.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="memorizeTheShrinesInscriptions()">Запам'ятати написи на стінах святині</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tryToDecipherTheSymbols = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розшифровка символів</h2>
            <p>Символи виявляються стародавньою формою писемності Елдорії. Здається, вони описують принцип дії механізму та його зв'язок з Кристалом Світла.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="understandTheMechanismsPurpose()">Зрозуміти призначення механізму</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.searchForHiddenSymbolsNearby = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Приховані символи</h2>
            <p>Ви знаходите інші символи, приховані в стінах кімнати. Вони, здається, утворюють певну послідовність або код.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="memorizeTheSequenceForLaterUse()">Запам'ятати послідовність для подальшого використання</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theQuestContinuesWithTheCrystal = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Нова надія</h2>
            <p>З Кристалом Світла у вашому володінні, ваша подорож набуває нового сенсу. Ви відчуваєте, що стали на крок ближче до перемоги над темрявою.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.memorizeTheShrinesInscriptions = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Запам'ятовування написів</h2>
            <p>Ви намагаєтесь запам'ятати якомога більше деталей з написів на стінах святині. Вони можуть містити важливі підказки для вашої подорожі.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="continueYourExploration()">Продовжити дослідження храму</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.understandTheMechanismsPurpose = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Призначення механізму</h2>
            <p>Ви розумієте, що механізм використовувався для посилення сили Кристала Світла або для захисту його від темряви. Це знання може бути корисним у майбутньому.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="experimentWithTheMechanismAndCrystal()">Спробувати використати механізм з Кристалом</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.memorizeTheSequenceForLaterUse = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Запам'ятовування послідовності</h2>
            <p>Ви надійно зберігаєте послідовність символів у своїй пам'яті. Можливо, вона знадобиться для відкриття іншого проходу або розгадки головоломки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="continueYourExploration()">Продовжити дослідження храму</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.experimentWithTheMechanismAndCrystal = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Експеримент</h2>
            <p>Ви обережно кладете Кристал Світла на механізм. Він починає сяяти яскравіше, і кімната наповнюється потужною енергією.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="harnessTheCrystalsPower()">Використати силу Кристала</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.harnessTheCrystalsPower = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Сила Світла</h2>
            <p>Ви відчуваєте, як сила Кристала Світла тече через вас, зміцнюючи ваш дух та даючи надію. Ви готові до подальшої боротьби з темрявою.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEnd = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ваша подорож ще не закінчена, але ви знайшли важливий артефакт і отримали знання, які допоможуть вам у боротьбі з темрявою. </p>
            <p>Дякуємо за гру!</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.searchForAncientTextsInLibrary = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук текстів у бібліотеці</h2>
                <p>Ви знаходите напівзруйновану бібліотеку, завалену пилом та уламками.  Багато сувоїв знищено часом, але деякі ще можна прочитати. Елдар допомагає вам у пошуках.  Через деякий час ви натрапляєте на згадку про стародавній ритуал, здатний протистояти темряві.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="decipherTheAncientRitual()">Розшифрувати стародавній ритуал</button>
                    <button class="next-button" onclick="lookForAMapOfTheTemple()">Пошукати карту храму, щоб знайти інші важливі місця</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

     window.checkTheTempleMainAltar = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Головний вівтар храму</h2>
            <p>Ви підходите до головного вівтаря. Він виглядає занедбаним, але в центрі бачите дивний символ, викарбуваний у камені.  Він здається знайомим...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToActivateTheAltar()">Спробувати активувати вівтар</button>
                <button class="next-button" onclick="drawTheSymbolAndCompareWithTexts()">Замалювати символ і порівняти його з текстами в бібліотеці</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tryToActivateTheAltar = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Спроба активації вівтаря</h2>
            <p>Ви обережно торкаєтесь вівтаря, намагаючись знайти спосіб його активувати.  Можливо, є прихований механізм, або потрібен певний ритуал...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="searchForHiddenMechanism()">Пошукати прихований механізм на вівтарі</button>
                <button class="next-button" onclick="reciteAncientWords()">Промовити стародавні слова, знайдені в текстах</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.searchForHiddenMechanism = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошук механізму</h2>
            <p>Ви ретельно обстежуєте кожен куточок вівтаря, шукаючи приховані кнопки, важелі або інші механізми.  Раптом ваш палець натрапляє на невелику виїмку...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="pressTheHiddenButton()">Натиснути приховану кнопку</button>
                <button class="next-button" onclick="tryToRotatePartOfTheAltar()">Спробувати повернути частину вівтаря</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.reciteAncientWords = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Промовляння слів</h2>
            <p>Ви починаєте тихо промовляти стародавні слова, знайдені в бібліотеці.  Вони звучать дивно і потужно, і вівтар починає злегка вібрувати...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="continueTheChant()">Продовжити промовляння</button>
                <button class="next-button" onclick="stopAndObserve()">Зупинитися і спостерігати за реакцією</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.pressTheHiddenButton = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Прихована кнопка</h2>
            <p>Ви натискаєте приховану кнопку, і вівтар з гуркотом починає розсуватися, відкриваючи прохід вниз...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="descendIntoThePassage()">Спуститися у прохід</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.descendIntoThePassage = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Таємний прохід</h2>
            <p>Ви обережно спускаєтесь у темний прохід. Стіни вкриті пилом, а повітря сперте. Здається, що сюди не ступала нога людини вже багато століть.  В кінці проходу видніється слабке світло...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="proceedTowardsTheLight()">Прямувати до світла</button>
                <button class="next-button" onclick="examineTheWallsForClues()">Оглянути стіни в пошуках підказок</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.proceedTowardsTheLight = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Сяюча кімната</h2>
            <p>Ви дістаєтесь до кімнати, звідки виходило світло.  Вона виявляється невеликою, але в центрі стоїть п'єдестал, на якому лежить кристалічний артефакт.  Він випромінює м'яке, тепле світло, яке розсіює темряву навколо.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="approachTheArtifact()">Наблизитися до артефакту</button>
                <button class="next-button" onclick="searchTheRoomForInscriptions()">Обшукати кімнату на наявність написів</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.examineTheWallsForClues = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошук підказок</h2>
            <p>Ви уважно оглядаєте стіни проходу.  На одній з них знаходите ледь помітні гравюри.  Вони розповідають про стародавній ритуал, призначений для захисту від темряви.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="memorizeTheRitual()">Запам'ятати ритуал</button>
                <button class="next-button" onclick="proceedTowardsTheLight()">Продовжити рух до світла</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.approachTheArtifact = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кристалічне серце</h2>
            <p>Ви наближаєтесь до артефакту.  Відчуваєте тепло та спокій, що виходять від нього.  Раптом у вашій голові лунає голос, який говорить пророцтво: "Лише обраний, чисте серце якого сповнене рішучості, зможе пробудити силу Світла і перемогти Темряву..."</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="touchTheArtifact()">Торкнутися артефакту</button>
                <button class="next-button" onclick="speakTheWordsOfTheProphecy()">Промовити слова пророцтва вголос</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.searchTheRoomForInscriptions = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Стародавні написи</h2>
            <p>Ви обшукуєте кімнату. На одній зі стін знаходите напис стародавньою мовою. Елдар, який супроводжує вас, перекладає: "Серце Світла пробудиться, коли буде виконано древній ритуал..."</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="recallTheRitualFromEngravings()">Згадати ритуал з гравюр у проході</button>
                <button class="next-button" onclick="approachTheArtifact()">Наблизитися до артефакту</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.memorizeTheRitual = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Запам'ятовування ритуалу</h2>
            <p>Ви ретельно запам'ятовуєте кожне слово та жест ритуалу.  Відчуваєте, що він може бути ключем до порятунку.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="proceedTowardsTheLight()">Продовжити рух до світла</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.touchTheArtifact = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Дотик до Світла</h2>
            <p>Ви простягаєте руку і торкаєтесь артефакту.  Потужна хвиля енергії проходить крізь ваше тіло.  Відчуваєте, як сила Світла наповнює вас, даруючи відчуття надії та рішучості.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="performTheAncientRitual()">Виконати стародавній ритуал</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.speakTheWordsOfTheProphecy = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Голос пророцтва</h2>
            <p>Ви голосно промовляєте слова пророцтва.  Артефакт починає пульсувати, а світло навколо нього стає яскравішим.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="performTheAncientRitual()">Виконати стародавній ритуал</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.recallTheRitualFromEngravings = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згадування ритуалу</h2>
            <p>Ви намагаєтесь згадати кожну деталь ритуалу, який бачили на стінах проходу.  Це нелегко, але ви пам'ятаєте основні моменти.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="performTheAncientRitual()">Виконати стародавній ритуал</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.performTheAncientRitual = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Ритуал Світла</h2>
            <p>Ви починаєте виконувати ритуал.  Ваші рухи точні, а слова сповнені рішучості.  З кожним кроком артефакт сяє все яскравіше, розганяючи темряву, що намагається проникнути в кімнату.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theLightOverwhelmsTheDarkness()">Світло перемагає темряву</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theLightOverwhelmsTheDarkness = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Перемога Світла</h2>
            <p>Світло від артефакту стає всепоглинаючим.  Темрява, що оточує храм, відступає.  Ви відчуваєте, що зло переможене, а надія повернулася у світ.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theArtifactRestoresEldoria()">Артефакт відновлює Елдорію</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theArtifactRestoresEldoria = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Відновлення Елдорії</h2>
            <p>Світло від артефакту виривається з храму і розливається по всій Елдорії.  Зруйновані землі починають відроджуватися, квіти розпускаються, а джерела знову наповнюються водою.  Народ Елдорії святкує повернення Світла і героя, який приніс їм надію.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="epilogue()">Епілог</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.epilogue = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Епілог</h2>
            <p>Ваше ім'я назавжди увійшло в легенди Елдорії.  Ви стали символом надії та рішучості.  Історія про ваші подвиги передаватиметься з покоління в покоління, нагадуючи всім, що навіть у найтемніші часи Світло завжди може перемогти.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEnd = function () {
    updateGameContainer({
        title: "Кінець",
        text: "Ви перемогли темряву і врятували Елдорію!",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.tryToRotatePartOfTheAltar = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Поворот частини вівтаря</h2>
            <p>Ви намагаєтесь повернути частину вівтаря, і вона з легким клацанням повертається.  На поверхні з'являються нові символи...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="examineTheNewSymbols()">Вивчити нові символи</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.continueTheChant = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Продовження співу</h2>
            <p>Ви продовжуєте промовляти слова, і енергія навколо вівтаря посилюється.  Світло починає випромінюватися з символу...</p>
        <div class="button-container disabled">
                <button class="next-button" onclick="focusOnTheSymbol()">Зосередитися на символі</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.stopAndObserve = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Спостереження</h2>
            <p>Ви зупиняєтесь і уважно спостерігаєте за реакцією вівтаря.  Здається, нічого не відбувається...</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryADifferentApproach()">Спробувати інший підхід</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.drawTheSymbolAndCompareWithTexts = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Порівняння символу</h2>
            <p>Ви ретельно замальовуєте символ з вівтаря і повертаєтесь до бібліотеки, щоб порівняти його з малюнками в стародавніх текстах.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="searchForLegendsAboutTheSymbol()">Пошукати легенди або історії, пов'язані з символом</button>
                <button class="next-button" onclick="lookForInstructionsOnItsUse()">Пошукати інструкції щодо його використання</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};



    window.requestAudienceWithTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аудієнція у короля</h2>
                <p>Після довгих переговорів вартові погоджуються передати ваше прохання королю Аріону.  Через деякий час вас запрошують до тронної зали. Король виглядає мудрим, але втомленим. Він вислуховує вашу історію з сумнівом, але погоджується допомогти, якщо ви доведете свої наміри.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="offerEvidenceOfYourQuest()">Надати докази вашого квесту (амулет, пророцтво)</button>
                    <button class="next-button" onclick="describeTheThreatInDetail()">Детально описати загрозу темряви</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekInformationFromLocalMages = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інформації у магів</h2>
                <p>Ви знаходите групу місцевих магів, які живуть у вежі на околиці міста. Вони знають багато про історію Кристальних Вершин та магічні кристали, що живлять місто.  Вони погоджуються допомогти, але просять натомість про послугу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="acceptTheMagesRequest()">Прийняти прохання магів</button>
                    <button class="next-button" onclick="tryToNegotiateTheTerms()">Спробувати домовитися про умови допомоги</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

     window.tryToFindASecretEntrance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук таємного входу</h2>
                <p>Ви вирішуєте спробувати знайти інший спосіб потрапити в місто.  Після ретельного огляду ви помічаєте потаємну стежку, що веде вгору по схилу гори.  Це ризиковано, але може бути єдиним виходом.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheSecretPath()">Піти таємною стежкою</button>
                    <button class="next-button" onclick="sendAScoutToInvestigate()">Відправити розвідника, щоб перевірити безпеку шляху</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    

    window.continueQuestAloneWithAdvice = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Самостійна подорож з порадами</h2>
                <p>Подякувавши раді за мудрі поради, ви вирушаєте самостійно. Радники Солов'їних Долин згадали про стародавній артефакт, який може допомогти у боротьбі з темрявою, захований у Забутому Храмі. Що ви оберете?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="travelToForgottenTempleAlone()">Вирушити до Забутого Храму самостійно</button>
                    <button class="next-button" onclick="tryToFindAnotherAlly()">Спробувати знайти іншого союзника без військової підтримки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };
    window.proceedToRuins = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шукаємо принцесу в руїнах Елдорії</h2>
                <p>Ви входите в похмурі руїни стародавньої Елдорії. Камені тут зберігають відгомони минулої величі, але тепер усе навколо вкрите тінню та небезпекою. Що ви оберете?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="useAmuletRuins()">Використати магію амулету, щоб освітити шлях</button>
                    <button class="next-button" onclick="riskTrap()">Ризикнути і швидко пройти через руїни, незважаючи на пастки</button>
                    <button class="next-button" onclick="carefullyExamineTheSurroundings()">Уважно оглянути місцевість у пошуках підказок</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletRuins = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використовуєте магію амулету</h2>
                <p>Амулет починає світитися, розганяючи темряву та освітлюючи ваш шлях. Ви бачите стародавні символи на стінах і відчуваєте присутність магії навколо...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheSymbols()">Піти за символами на стінах</button>
                    <button class="next-button" onclick="searchForHiddenPassages()">Шукати приховані проходи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.riskTrap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ризикуючи, ви проходите через пастки</h2>
                <p>Ви швидко пробираєтесь через руїни, уникаючи обвалів та пролітаючи повз стріли. Проте ви отримуєте легке поранення, але знаходите карту...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findMap()">Знайти карту, що веде до принцеси</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.carefullyExamineTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Уважний огляд руїн</h2>
                <p>Ви ретельно оглядаєте кожен куток, звертаючи увагу на деталі. Це займає багато часу, але ви знаходите потаємний механізм...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="activateTheMechanism()">Активувати знайдений механізм</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слідуючи за символами</h2>
                <p>Символи приводять вас до потаємної кімнати в глибині руїн. Там ви знаходите стародавню табличку з пророцтвом...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="readTheProphecy()">Прочитати знайдене пророцтво</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchForHiddenPassages = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук прихованих проходів</h2>
                <p>Ви знаходите замаскований прохід за однією зі стін. Він веде до підземного тунелю...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterTheTunnel()">Увійти в підземний тунель</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.activateTheMechanism = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Активація механізму</h2>
                <p>Ви активуєте механізм, і в стіні відкривається потаємний прохід. Він веде до скарбниці, повної стародавніх артефактів...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="takeAnArtifact()">Взяти один з артефактів</button>
                    <button class="next-button" onclick="leaveTheTreasures()">Залишити скарби недоторканими</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.findMap = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ви знайшли стародавню карту</h2>
                <p>Карта показує місцезнаходження принцеси Ліри. Тепер ви маєте вибір, куди вирушити далі:</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="enterCave()">Увійти в темну печеру, позначену на карті</button>
                    <button class="next-button" onclick="searchOutside()">Шукати принцесу зовні, орієнтуючись по карті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    
   

    window.followTheClues = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слідування підказкам</h2>
                <p>Ви використовуєте отримані знання, щоб знайти нові зачіпки у вашій подорожі.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="headToTheWhisperingWoods()">Вирушити до Шепітливого Лісу, де, за легендами, зберігаються стародавні таємниці</button>
                    <button class="next-button" onclick="investigateTheAncientMurals()">Розслідувати стародавні фрески в покинутих храмах, що можуть містити інформацію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.headToTheWhisperingWoods = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шепітливий Ліс</h2>
                <p>У Шепітливому Лісі панує моторошна тиша, лише зрідка чуються незрозумілі шепоти. Кажуть, тут мешкають духи минулого. Як ви будете діяти?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToCommunicateWithTheSpirits()">Спробувати налагодити контакт з духами лісу</button>
                    <button class="next-button" onclick="searchForAncientRunes()">Шукати стародавні руни на деревах або каменях</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.investigateTheAncientMurals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Стародавні Фрески</h2>
                <p>У напівзруйнованому храмі ви знаходите стіни, вкриті стародавніми малюнками. Деякі з них здаються пошкодженими часом, але інші збереглися досить добре. На чому ви зосередите свою увагу?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="focusOnDepictionsOfEldoria()">Зосередитися на зображеннях, що можуть стосуватися Елдорії</button>
                    <button class="next-button" onclick="lookForSymbolsRelatedToDarkness()">Шукати символи, пов'язані з темрявою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekElvenAllies = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук ельфійських союзників</h2>
                <p>Ви вирушаєте до ельфійських лісів, сподіваючись знайти підтримку у давніх союзників людей. Ліс зустрічає вас тишею та мудрістю вікових дерев. Як ви вирішите звернутися до ельфів?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachElvenOutpost()">Наблизитися до ельфійського поселення та спробувати порозумітися</button>
                    <button class="next-button" onclick="leaveAnOfferingAtAShrine()">Залишити дари біля стародавнього ельфійського святилища</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.approachElvenOutpost = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Біля ельфійського поселення</h2>
                <p>Вас зустрічають ельфійські вартові, їхні луки націлені на вас. Як ви будете пояснювати свою появу?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="speakOfYourQuestAndTheAmulet()">Розповісти про свій квест та показати амулет</button>
                    <button class="next-button" onclick="pleadForAidAgainstTheDarkness()">Благати про допомогу в боротьбі з темрявою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.leaveAnOfferingAtAShrine = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Біля святилища</h2>
                <p>Ви залишаєте приношення біля стародавнього святилища, сподіваючись на прихильність ельфів. Чи помітять вони ваш жест?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="waitPatientlyForASign()">Терпляче чекати на знак</button>
                    <button class="next-button" onclick="exploreTheShrineForClues()">Оглянути святилище в пошуках підказок</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToCommunicateWithTheSpirits = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спілкування з духами</h2>
                <p>Ви намагаєтеся відчути присутність духів, звертаючись до них подумки. Чи відгукнуться вони?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="focusYourMindAndListen()">Зосередитися та прислухатися до шепотів</button>
                    <button class="next-button" onclick="performASimpleRitual()">Виконати простий ритуал шанування</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.focusYourMindAndListen = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Небезпечні шепоти</h2>
            <p>Ви зосереджуєтесь, але замість мудрості чуєте лише хаотичні шепоти, що зводять з розуму. Ваш розум починає затьмарюватися.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="loseYourSanity()">Втратити розум</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.performASimpleRitual = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Неправильний ритуал</h2>
            <p>Ви виконуєте ритуал, але робите помилку. Це розгніває духів, і вони насилають на вас прокляття.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="beCurseByTheSpirits()">Бути проклятим духами</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.loseYourSanity = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ви втрачаєте розум, і ваша подорож закінчується божевіллям.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.beCurseByTheSpirits = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ви гинете від прокляття духів. Ваша подорож закінчується трагічно.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>Ваша подорож закінчилася.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.searchForAncientRunes = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук рун</h2>
                <p>Ви уважно оглядаєте дерева та камені в пошуках стародавніх рун. Деякі символи здаються знайомими.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToDecipherTheRunes()">Спробувати розшифрувати знайдені руни</button>
                    <button class="next-button" onclick="makeARubbingOfTheMostPromisingRunes()">Зробити копії найбільш цікавих рун</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.tryToDecipherTheRunes = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розшифровка рун</h2>
            <p>Ви витрачаєте час на розшифровку рун і знаходите ключ до стародавнього заклинання, яке може допомогти у вашому квесті.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="learnTheAncientSpell()">Вивчити стародавнє заклинання</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.makeARubbingOfTheMostPromisingRunes = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Копіювання рун</h2>
            <p>Ви ретельно копіюєте руни, щоб вивчити їх пізніше. Це може допомогти вам розгадати загадку або знайти прихований прохід.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="decipherTheRubbingsLater()">Розшифрувати копії пізніше</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.learnTheAncientSpell = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Сила рун</h2>
            <p>Ви вивчаєте заклинання і відчуваєте, як стародавня сила протікає через вас. Це дає вам нову здатність або захист.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.decipherTheRubbingsLater = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Знання рун</h2>
            <p>Ви успішно скопіювали руни. Пізніше їх розшифровка дає вам корисну інформацію або відкриває прихований шлях.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEnd = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ваші знання рун виявилися безцінними, допомагаючи вам у вашій подорожі.</p>
            <p>Дякуємо за гру!</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.focusOnDepictionsOfEldoria = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зображення Елдорії</h2>
                <p>Фрески зображують сцени з життя стародавнього королівства. Можливо, тут є підказки про його зникнення.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lookForCluesInTheArchitecture()">Звернути увагу на архітектурні елементи на фресках</button>
                    <button class="next-button" onclick="examineTheClothingAndSymbolsOfThePeople()">Розглянути одяг та символи людей на малюнках</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.lookForCluesInTheArchitecture = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пастка архітектури</h2>
            <p>Ви занадто зосереджуєтесь на деталях будівель, не помічаючи прихованої пастки на самій фресці. Стіна починає рухатися, замикаючи вас.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="beTrapped()">Потрапити в пастку</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.examineTheClothingAndSymbolsOfThePeople = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згубні символи</h2>
            <p>Ви заворожено розглядаєте символи на одязі людей, не знаючи, що вони несуть прокляття. Поступово вас охоплює недуга.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="becomeCursed()">Отримати прокляття</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.beTrapped = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Ви опиняєтесь у пастці, і ваша подорож закінчується в темряві.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.becomeCursed = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Прокляття вражає вас, і ви гинете. Ваша подорож закінчується трагічно.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>Ваша подорож закінчилася.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};
    window.lookForSymbolsRelatedToDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Символи темряви</h2>
                <p>На деяких фресках зображені дивні темні фігури та незрозумілі символи. Чи зможете ви їх розпізнати?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToMatchTheSymbolsWithKnownLore()">Спробувати зіставити символи з відомими легендами про темряву</button>
                    <button class="next-button" onclick="focusOnTheArrangementOfTheSymbols()">Звернути увагу на розташування та комбінації символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.speakOfYourQuestAndTheAmulet = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розповідь про квест</h2>
            <p>Ви розповідаєте ельфійським вартовим про свою місію та показуєте амулет. Їхні погляди стають менш настороженими.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="awaitTheirReaction()">Дочекатися їхньої реакції</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.awaitTheirReaction = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Реакція вартових</h2>
            <p>Вартові переглядаються. Один з них каже: "Амулет... Ми чули про нього. Але легенди попереджають про небезпеку, пов'язану з ним."</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="dismissTheirWarnings()">Відкинути їхні попередження</button>
                <button class="next-button" onclick="askAboutTheDanger()">Розпитати про небезпеку</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.dismissTheirWarnings = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Небезпечний шлях</h2>
            <p>Ви самовпевнено заявляєте, що знаєте, що робите, і амулет - єдина надія. Вартові неохоче пропускають вас. Але ви відчуваєте, що вони дивляться вам вслід з тривогою.</p>
        <div class="button-container disabled">
                <button class="next-button" onclick="enterTheElvenCity()">Увійти в ельфійське місто</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.askAboutTheDanger = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Попередження легенд</h2>
            <p>Вартовий каже: "Легенди розповідають, що амулет має темну сторону. Він може дати силу, але також може розбестити серце. Ті, хто жадає влади, можуть використати його для зла."</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="insistOnContinuing()">Наполягати на продовженні квесту</button>
                <button class="next-button" onclick="reconsiderYourPath()">Переосмислити свій шлях</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.enterTheElvenCity = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Місто обману</h2>
            <p>Ви входите в місто, зачаровані його красою. Але чим далі ви просуваєтесь, тим більше відчуваєте дивну напругу. Ельфи здаються замкнутими і наляканими.  Ви починаєте підозрювати, що щось не так.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="seekInformationFromLocals()">Пошукати інформацію у місцевих</button>
                <button class="next-button" onclick="tryToFindThePrincess()">Спробувати знайти принцесу</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.insistOnContinuing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Небезпечний вибір</h2>
            <p>Ви вирішуєте не звертати уваги на попередження і продовжувати. Вартові проводжають вас похмурими поглядами.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="enterTheElvenCity()">Увійти в ельфійське місто</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.reconsiderYourPath = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зміна рішення</h2>
            <p>Ви вирішуєте прислухатися до попереджень і пошукати інший шлях. Можливо, є інший спосіб врятувати принцесу.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="leaveTheElvenCity()">Покинути ельфійське місто</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.seekInformationFromLocals = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розмови з ельфами</h2>
            <p>Ви намагаєтесь розговорити місцевих жителів, але вони уникають вас або говорять загадками. Здається, вони щось приховують. Ви дізнаєтесь, що король міста поводиться дивно останнім часом.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="seekAnAudienceWithTheKing()">Попросити аудієнції у короля</button>
                <button class="next-button" onclick="investigateTheKingsBehavior()">Розслідувати поведінку короля таємно</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tryToFindThePrincess = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошуки принцеси</h2>
            <p>Ви починаєте таємно шукати принцесу. Але місто виявляється лабіринтом, а ельфи - дуже пильними. Здається, вони не хочуть, щоб ви її знайшли.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="followASuspiciousElf()">Прослідкувати за підозрілим ельфом</button>
                <button class="next-button" onclick="searchTheRoyalPalace()">Обшукати королівський палац</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.leaveTheElvenCity = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Відступ</h2>
            <p>Ви вирішуєте покинути місто, відчуваючи, що тут щось не так. Можливо, вам потрібно знайти інший шлях.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="returnToTheCrossroads()">Повернутися на перехрестя</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};



window.seekAnAudienceWithTheKing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Аудієнція з королем</h2>
            <p>Ви нарешті отримуєте аудієнцію у короля. Він виглядає блідим і змученим, а його очі горять дивним вогнем. Він відмовляється говорити про принцесу і вимагає, щоб ви негайно покинули місто.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="refuseToLeave()">Відмовитися йти</button>
                <button class="next-button" onclick="leaveAndInvestigate()">Піти і розслідувати таємно</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.refuseToLeave = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Відмова йти</h2>
            <p>Ви відмовляєтесь йти, вимагаючи інформації про принцесу. Король розлючується і наказує вартам схопити вас. Вас кидають у темницю.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="imprisonedAndForgotten()">Ув'язнений і забутий</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.leaveAndInvestigate = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Таємне розслідування</h2>
            <p>Ви вирішуєте покинути тронний зал, але замість того, щоб покинути місто, починаєте таємне розслідування. Ви розпитуєте місцевих, шукаєте підказки, намагаєтесь зрозуміти, що відбувається з королем і принцесою.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="discoverTheKingsSecret()">Дізнатися таємницю короля</button>
                <button class="next-button" onclick="searchForCluesInThePalace()">Шукати підказки в палаці</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.discoverTheKingsSecret = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Темна одержимість</h2>
            <p>Ви дізнаєтесь, що король одержимий темною силою амулета. Він використовує його для проведення заборонених ритуалів, щоб здобути владу, і принцеса стала жертвою цих ритуалів. Але ви також дізнаєтесь, що є спосіб зламати контроль амулета.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="attemptToStopTheKing()">Спробувати зупинити короля</button>
                <button class="next-button" onclick="tryToRescueThePrincessAndBreakTheCurse()">Спробувати врятувати принцесу і зламати прокляття</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.attemptToStopTheKing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Битва з королем</h2>
            <p>Ви намагаєтесь зупинити короля. Битва важка, але ви використовуєте знання, отримані з легенд, щоб протистояти темній магії амулета. Ви перемагаєте короля, звільняючи його від контролю.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="freeTheKingFromTheAmulet()">Звільнити короля від амулета</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tryToRescueThePrincessAndBreakTheCurse = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Порятунок і Зцілення</h2>
            <p>Ви пробираєтесь до принцеси, яку утримують у таємній кімнаті. Ви використовуєте стародавній ритуал, щоб очистити її від темної енергії, спричиненої амулетом. Ритуал працює, і принцеса починає одужувати.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="healThePrincess()">Зцілити принцесу</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.freeTheKingFromTheAmulet = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Звільнення короля</h2>
            <p>Ви використовуєте знання, щоб безпечно відокремити короля від амулета. Темна сила покидає його, і він повертається до тями, жахаючись своїм вчинкам.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theKingRepents()">Каяття короля</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.healThePrincess = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зцілення принцеси</h2>
            <p>Принцеса поступово відновлює сили. Вона дякує вам за порятунок і обіцяє допомогти відновити місто.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="thePrincessThanksYou()">Подяка принцеси</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theKingRepents = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Каяття короля</h2>
            <p>Король щиро кається у своїх злочинах. Він обіцяє зробити все можливе, щоб виправити заподіяну шкоду і відновити довіру свого народу.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theKingdomIsRestored()">Відновлення королівства</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.thePrincessThanksYou = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Подяка принцеси</h2>
            <p>Принцеса висловлює глибоку вдячність за вашу хоробрість і мудрість. Вона визнає вашу роль у порятунку її та всього королівства.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theKingdomIsRestored()">Відновлення королівства</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theKingdomIsRestored = function () {
    updateGameContainer({
        title: "Відновлення королівства",
        text: "Завдяки вашим зусиллям темрява відступила. Король, сповнений каяття, і принцеса, сповнена надії, об'єднують зусилля для відновлення королівства. Ваше ім'я назавжди увійде в історію як ім'я героя.",
        buttons: [
            { text: "Епілог", onClick: epilogue },
        ],
        showBack: false,
        timer: false,
    });
};

window.epilogue = function () {
    updateGameContainer({
        title: "Епілог",
        text: "Минуло багато років. Елдорія знову процвітає. Ваші подвиги стали легендою, надихаючи покоління на боротьбу за світло і справедливість.",
        buttons: [
            { text: "Кінець", onClick: theEnd },
        ],
        showBack: false,
        timer: false,
    });
};

window.theEnd = function () {
    updateGameContainer({
        title: "Кінець",
        text: "Ви перемогли темряву і принесли мир в Елдорію!",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.searchForCluesInThePalace = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошук у палаці</h2>
            <p>Ви проникаєте в палац, шукаючи докази злочинів короля. Але вас ловлять вартові. Вони відводять вас до короля.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="faceTheWrathOfTheKing()">Постати перед гнівом короля</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.attemptToStopTheKing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Битва з королем</h2>
            <p>Ви намагаєтесь зупинити короля, але він занадто сильний, підсилений темною магією амулета. Ви програєте битву.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="defeatedByDarkness()">Поразка від темряви</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tryToRescueThePrincess = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Порятунок принцеси</h2>
            <p>Ви намагаєтесь врятувати принцесу, але вона вже занадто слабка. Темрява забрала її життя.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="witnessHerDemise()">Стати свідком її смерті</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.faceTheWrathOfTheKing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Гнів короля</h2>
            <p>Король розлючений вашою зухвалістю. Він наказує стратити вас.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="executedByTheKing()">Страчений королем</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.defeatedByDarkness = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви програли битву з королем. Темрява поглинула Елдорію.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.witnessHerDemise = function () {
    updateGameContainer({
        title: "Смерть принцеси",
        text: "Ви стали свідком смерті принцеси. Надія згасла.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.executedByTheKing = function () {
    updateGameContainer({
        title: "Страта",
        text: "Король стратив вас. Ваша місія провалилася.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.imprisonedAndForgotten = function () {
    updateGameContainer({
        title: "Ув'язнення",
        text: "Ви гниєте в темниці, забутий усіма. Ваша місія провалилася.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.investigateTheKingsBehavior = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розслідування короля</h2>
            <p>Ви таємно розслідуєте поведінку короля. Ви дізнаєтесь, що він став одержимий амулетом, який ви показали вартовим. Він використовує його для темних ритуалів, і принцеса в небезпеці.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="confrontTheKing()">Зіткнутися з королем</button>
                <button class="next-button" onclick="tryToRescueThePrincess()">Спробувати врятувати принцесу</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.followASuspiciousElf = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Підозрілий ельф</h2>
            <p>Ви прослідковуєте за підозрілим ельфом. Він веде вас до таємного підземелля під палацом. Там ви бачите принцесу, ув'язнену і слабку.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="attemptARescue()">Спробувати врятувати принцесу</button>
                <button class="next-button" onclick="returnForHelp()">Повернутися за допомогою</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.attemptARescue = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Невдала спроба порятунку</h2>
            <p>Ви намагаєтесь звільнити принцесу, але вас помічають вартові. Починається бійка, в якій ви зазнаєте поразки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="capturedAndDefeated()">Захоплений і переможений</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.returnForHelp = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Повернення без допомоги</h2>
            <p>Ви повертаєтесь за допомогою, але ніхто не вірить вашим словам або не хоче ризикувати. Коли ви повертаєтесь до підземелля, принцеси вже немає.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="thePrincessIsLost()">Принцеса втрачена</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.capturedAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви зазнали поразки у підземеллі. Ваша місія провалилася, і принцеса залишилася в полоні.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.thePrincessIsLost = function () {
    updateGameContainer({
        title: "Втрата",
        text: "Ви не змогли врятувати принцесу. Її доля залишається невідомою, а надія згасає.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.searchTheRoyalPalace = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Обшук палацу</h2>
            <p>Ви проникаєте в королівський палац. Але вас ловлять вартові. Вони відводять вас до короля, який виглядає ще більш божевільним, ніж раніше.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="pleadYourCase()">Благати про пощаду</button>
                <button class="next-button" onclick="fightYourWayOut()">Пробитися з боєм</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.pleadYourCase = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Благання про пощаду</h2>
            <p>Ви благаєте короля про пощаду, намагаючись пояснити свої мотиви. Але він не слухає. Його розум затьмарений темрявою. Він засуджує вас до ув'язнення.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="dungeonOfDespair()">Темниця відчаю</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.fightYourWayOut = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Бій у палаці</h2>
            <p>Ви намагаєтесь пробитися з боєм, але вартів занадто багато. Вони пересилюють вас, і ви зазнаєте поразки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="overpoweredAndDefeated()">Пересилений і переможений</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.dungeonOfDespair = function () {
    updateGameContainer({
        title: "Темниця",
        text: "Вас кидають у темну сиру темницю. Ваша місія закінчується тут, у забутті.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.overpoweredAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви програєте бій. Ваші пошуки принцеси закінчуються невдачею.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.returnToTheCrossroads = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Повернення на перехрестя</h2>
            <p>Ви повертаєтесь на перехрестя, відчуваючи розгубленість. Здається, ви зайшли в глухий кут.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEndInConfusion()">Кінець у розгубленості</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEndInConfusion = function () {
    updateGameContainer({
        title: "Кінець у розгубленості",
        text: "Ви так і не змогли знайти правильний шлях. Ваша подорож закінчується в невизначеності.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};



window.refuseToLeave = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Відмова йти</h2>
            <p>Ви відмовляєтесь йти, вимагаючи інформації про принцесу. Король розлючується і наказує вартам схопити вас. Вас кидають у темницю.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="imprisonedAndForgotten()">Ув'язнений і забутий</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.leaveAndInvestigate = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Таємне розслідування</h2>
            <p>Ви вирішуєте покинути тронний зал, але замість того, щоб покинути місто, починаєте таємне розслідування. Ви розпитуєте місцевих, шукаєте підказки, намагаєтесь зрозуміти, що відбувається.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="unravelingTheMystery()">Розгадування таємниці</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.unravelingTheMystery = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Заплутана правда</h2>
            <p>Ви дізнаєтесь, що король використовує амулет для темних цілей, але занадто пізно. Його плани вже втілюються в життя, і місто приречене.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="doomedCity()">Приречене місто</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.doomedCity = function () {
    updateGameContainer({
        title: "Приречене місто",
        text: "Ви розкриваєте правду, але вже занадто пізно. Місто гине, і ви не можете нічого вдіяти.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.confrontTheKing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зіткнення з королем</h2>
            <p>Ви намагаєтесь протистояти королю, але він занадто сильний. Амулет дає йому величезну владу, і ви не можете його перемогти.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="crushedByPower()">Знищений силою</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.crushedByPower = function () {
    updateGameContainer({
        title: "Знищений",
        text: "Ви намагаєтесь боротися, але король занадто могутній. Ви гинете.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.tryToRescueThePrincess = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Порятунок принцеси</h2>
            <p>Ви намагаєтесь врятувати принцесу, але вона вже мертва. Король використав її в своїх темних ритуалах.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tooLateToSave()">Занадто пізно</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tooLateToSave = function () {
    updateGameContainer({
        title: "Занадто пізно",
        text: "Ви прибуваєте занадто пізно. Принцесу неможливо врятувати.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};
window.tryToRescueThePrincess = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Порятунок принцеси</h2>
            <p>Ви намагаєтесь врятувати принцесу, але вона вже мертва. Король використав її в своїх темних ритуалах.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tooLateToSave()">Занадто пізно</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.tooLateToSave = function () {
    updateGameContainer({
        title: "Занадто пізно",
        text: "Ви прибуваєте занадто пізно. Принцесу неможливо врятувати.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.attemptARescue = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Невдала спроба порятунку</h2>
            <p>Ви намагаєтесь звільнити принцесу, але вас помічають вартові. Починається бійка, в якій ви зазнаєте поразки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="capturedAndDefeated()">Захоплений і переможений</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.capturedAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви зазнали поразки у підземеллі. Ваша місія провалилася, і принцеса залишилася в полоні.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.returnForHelp = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Повернення без допомоги</h2>
            <p>Ви повертаєтесь за допомогою, але ніхто не вірить вашим словам або не хоче ризикувати. Коли ви повертаєтесь до підземелля, принцеси вже немає.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="thePrincessIsLost()">Принцеса втрачена</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.thePrincessIsLost = function () {
    updateGameContainer({
        title: "Втрата",
        text: "Ви не змогли врятувати принцесу. Її доля залишається невідомою, а надія згасає.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.pleadYourCase = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Благання про пощаду</h2>
            <p>Ви благаєте короля про пощаду, намагаючись пояснити свої мотиви. Але він не слухає. Його розум затьмарений темрявою. Він засуджує вас до ув'язнення.</p>
        <div class="button-container disabled">
            <button class="next-button" onclick="dungeonOfDespair()">Темниця відчаю</button>
        </div>
        <button class="back-button" onclick="goBack()">Назад</button>
        <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.dungeonOfDespair = function () {
    updateGameContainer({
        title: "Темниця",
        text: "Вас кидають у темну сиру темницю. Ваша місія закінчується тут, у забутті.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.fightYourWayOut = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Бій у палаці</h2>
            <p>Ви намагаєтесь пробитися з боєм, але вартів занадто багато. Вони пересилюють вас, і ви зазнаєте поразки.</p>
        <div class="button-container disabled">
            <button class="next-button" onclick="overpoweredAndDefeated()">Пересилений і переможений</button>
        </div>
        <button class="back-button" onclick="goBack()">Назад</button>
        <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.overpoweredAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви програєте бій. Ваші пошуки принцеси закінчуються невдачею.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.attemptARescue = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Невдала спроба порятунку</h2>
            <p>Ви намагаєтесь звільнити принцесу, але вас помічають вартові. Починається бійка, в якій ви зазнаєте поразки.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="capturedAndDefeated()">Захоплений і переможений</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.capturedAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви зазнали поразки у підземеллі. Ваша місія провалилася, і принцеса залишилася в полоні.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};
window.returnForHelp = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Повернення без допомоги</h2>
            <p>Ви повертаєтесь за допомогою, але ніхто не вірить вашим словам або не хоче ризикувати. Коли ви повертаєтесь до підземелля, принцеси вже немає.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="thePrincessIsLost()">Принцеса втрачена</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.thePrincessIsLost = function () {
    updateGameContainer({
        title: "Втрата",
        text: "Ви не змогли врятувати принцесу. Її доля залишається невідомою, а надія згасає.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.pleadYourCase = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Благання про пощаду</h2>
            <p>Ви благаєте короля про пощаду, намагаючись пояснити свої мотиви. Але він не слухає. Його розум затьмарений темрявою. Він засуджує вас до ув'язнення.</p>
        <div class="button-container disabled">
            <button class="next-button" onclick="dungeonOfDespair()">Темниця відчаю</button>
        </div>
        <button class="back-button" onclick="goBack()">Назад</button>
        <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.dungeonOfDespair = function () {
    updateGameContainer({
        title: "Темниця",
        text: "Вас кидають у темну сиру темницю. Ваша місія закінчується тут, у забутті.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.fightYourWayOut = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Бій у палаці</h2>
            <p>Ви намагаєтесь пробитися з боєм, але вартів занадто багато. Вони пересилюють вас, і ви зазнаєте поразки.</p>
        <div class="button-container disabled">
            <button class="next-button" onclick="overpoweredAndDefeated()">Пересилений і переможений</button>
        </div>
        <button class="back-button" onclick="goBack()">Назад</button>
        <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.overpoweredAndDefeated = function () {
    updateGameContainer({
        title: "Поразка",
        text: "Ви програєте бій. Ваші пошуки принцеси закінчуються невдачею.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.pleadYourCase = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Благання про пощаду</h2>
            <p>Ви благаєте короля про пощаду, намагаючись пояснити свої мотиви. Але він не слухає. Його розум затьмарений темрявою. Він засуджує вас до ув'язнення.</p>
        <div class="button-container disabled">
            <button class="next-button" onclick="dungeonOfDespair()">Темниця відчаю</button>
        </div>
        <button class="back-button" onclick="goBack()">Назад</button>
        <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.dungeonOfDespair = function () {
    updateGameContainer({
        title: "Темниця",
        text: "Вас кидають у темну сиру темницю. Ваша місія закінчується тут, у забутті.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.fightYourWayOut = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пробиваючись назовні</h2>
            <p>
                Ви вирішуєте, що єдиний вихід - пробитися. Бій неминучий.
                Що ви зробите?
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="useAmuletForPower()">Використати амулет для посилення своїх здібностей</button>
                <button class="next-button" onclick="relyOnYourSkillsAndCourage()">Покластися на свої навички та мужність</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.useAmuletForPower = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Сила амулета</h2>
            <p>
                Ви відчуваєте, як амулет пульсує, наповнюючи вас неймовірною силою.
                Але в той же час, темрява намагається проникнути у ваш розум...
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="embraceTheAmuletsPower()">Прийняти силу амулета повністю</button>
                <button class="next-button" onclick="resistTheDarkInfluence()">Чинити опір темній силі</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.relyOnYourSkillsAndCourage = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Ваш власний шлях</h2>
            <p>
                Ви вирішуєте не ризикувати з амулетом і покладаєтесь на власні сили.
                Це буде важко, але ви готові битися.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="aDifficultBattle()">Важка битва</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.embraceTheAmuletsPower = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Темна ціна</h2>
            <p>
                Ви приймаєте силу амулета, і стаєте неймовірно сильним.
                Але темрява починає поглинати вас. Ви втрачаєте контроль...
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEndOfTheHero()">Кінець героя</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.resistTheDarkInfluence = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Боротьба за контроль</h2>
            <p>
                Ви боретесь з темрявою, намагаючись зберегти контроль над собою.
                Це важко, але вам вдається. Ви використовуєте силу амулета, не піддаючись злу.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="aTriumphantVictory()">Тріумфальна перемога</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.aDifficultBattle = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Виснажливий бій</h2>
            <p>
                Бій важкий і виснажливий. Вас ранять, але ви не здаєтесь.
                З останніх сил ви перемагаєте ворогів.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="aNarrowEscape()">Втеча</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEndOfTheHero = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Трагічний кінець</h2>
            <p>
                Темрява повністю поглинає вас. Ви стаєте тим, проти кого боролися.
                Це трагічний кінець героя.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.aTriumphantVictory = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Перемога світла</h2>
            <p>
                Ви перемагаєте ворогів, використовуючи силу амулета, але зберігаючи контроль над собою.
                Світло перемагає темряву.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theQuestContinues()">Подорож триває</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.aNarrowEscape = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Втеча</h2>
            <p>
                Ви ледве виживаєте, але перемагаєте ворогів.
                Поранені, ви тікаєте, щоб продовжити свій квест.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="seekHealing()">Пошук зцілення</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>
                Ваша подорож закінчилася трагічно. Темрява перемогла.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theQuestContinues = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Подорож триває</h2>
            <p>
                Ви перемогли в битві, але ваша подорож ще не закінчена.
                Попереду ще багато випробувань.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="nextChapter()">Наступний розділ</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.seekHealing = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошук зцілення</h2>
            <p>
                Вам потрібно знайти спосіб зцілити свої рани, щоб продовжити подорож.
                Можливо, допоможе мудрий цілитель або магічний артефакт.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="findAHealer()">Знайти цілителя</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.playAgain = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Грати знову?</h2>
            <p>
                Хочете спробувати ще раз? Можливо, цього разу ви приймете інші рішення.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="showFirstChoice()">Почати з початку</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.nextChapter = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Наступний розділ</h2>
            <p>
                Ваша подорож триває. Попереду нові пригоди та випробування.
                (Тут буде продовження історії...)
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="toBeContinued()">Далі буде...</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.findAHealer = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Пошук цілителя</h2>
            <p>
                Ви вирушаєте на пошуки того, хто зможе зцілити ваші рани.
                Можливо, це буде мудрий старець, або ж чарівне джерело.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theHealersHut()">Хатина цілителя</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.toBeContinued = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Далі буде...</h2>
            <p>
                Дякуємо за гру! Продовження історії ще в розробці.
                Сподіваємось, вам сподобалось!
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theHealersHut = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Хатина цілителя</h2>
            <p>
                Ви знаходите затишну хатину в лісі, де живе старий цілитель.
                Він погоджується допомогти вам.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theHealerCuresYou()">Цілитель зцілює вас</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theHealerCuresYou = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Зцілення</h2>
            <p>
                Цілитель використовує стародавні знання та магічні трави, щоб зцілити ваші рани.
                Ви знову готові до подорожі.
            </p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEnd()">Кінець</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEnd = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>
                Ваша подорож завершена. Ви пройшли через багато випробувань,
                і тепер готові до фінальної битви з темрявою.
            </p>
            <p>
                Дякуємо за гру!
            </p>
            <div class="button-container disabled">
                 <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};
window.imprisonedAndForgotten = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Ув'язнений і забутий</h2>
            <p>Ви гниєте в темниці, забутий усіма. Ваша місія провалилася, і надія згасла.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="theEndInDarkness()">Кінець у темряві</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.theEndInDespair = function () {
    updateGameContainer({
        title: "Кінець у відчаї",
        text: "Ви так і не змогли врятувати принцесу. Темрява перемогла, і надія згасла.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

window.theEndInDarkness = function () {
    updateGameContainer({
        title: "Кінець у темряві",
        text: "Ви загинули в темниці, а темрява поглинула Елдорію.",
        buttons: [],
        showBack: false,
        timer: false,
    });
};

    window.pleadForAidAgainstTheDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Благання про допомогу</h2>
                <p>Ви щиро благаєте ельфів про допомогу у боротьбі з темрявою, наголошуючи на спільній загрозі.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hopeForTheirCompassion()">Сподіватися на їхнє співчуття</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.hopeForTheirCompassion = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Розчарування</h2>
            <p>Ваші благання залишаються непочутими. Ельфи, засліплені своїм страхом чи байдужістю, відмовляються допомогти. Ви залишаєтесь наодинці з темрявою.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="abandonedToDarkness()">Покинуті темряві</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.abandonedToDarkness = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець</h2>
            <p>Без допомоги ельфів ви не можете протистояти темряві. Вона поглинає світ, і ваша подорож закінчується поразкою.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="gameOver()">Кінець гри</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

window.gameOver = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Кінець гри</h2>
            <p>Ваші пошуки закінчилися невдачею.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="playAgain()">Грати знову</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};

    window.waitPatientlyForASign = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування знаку</h2>
                <p>Минає час у тиші біля святилища. Раптом ви помічаєте ледь помітний рух...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="investigateTheMovement()">Розслідувати рух</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.exploreTheShrineForClues = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошуки в святилищі</h2>
                <p>Ви обережно оглядаєте святилище, намагаючись знайти будь-які підказки або знаки.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findAHiddenInscription()">Знайти прихований напис</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToUnderstandTheMessage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розуміння послання</h2>
                <p>Слова духів звучать тихо, але в них відчувається важливе попередження...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="learnAboutAWeaknessOfTheDarkness()">Дізнатися про слабкість темряви</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.senseAChangeInTheAir = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зміна в повітрі</h2>
                <p>Ви відчуваєте, як повітря навколо вас стає густішим, ніби ліс відповідає на ваш ритуал.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="waitToSeeWhatHappens()">Чекати, щоб побачити, що станеться далі</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.discoverAWarningAboutTheDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Попередження про темряву</h2>
                <p>Руни попереджають про особливу небезпеку, пов'язану з певним часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToFigureOutTheMeaningOfTheWarning()">Спробувати зрозуміти значення попередження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.decideWhereToGoNextWithTheRubbings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Куди далі з копіями рун?</h2>
                <p>Маючи копії рун, ви можете спробувати знайти когось, хто зможе їх розшифрувати.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekOutASageInANearbyVillage()">Розшукати мудреця в сусідньому селі</button>
                    <button class="next-button" onclick="returnToTheLibraryInSolovinyDoliny()">Повернутися до бібліотеки в Солов'їних Долинах</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusOnUnusualSymbolsCarvedInStone = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Незвичайні символи</h2>
                <p>Символи здаються не пов'язаними зі звичайною елдорською писемністю. Можливо, це щось давніше.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToSketchTheSymbols()">Спробувати замалювати символи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToIdentifyRecurringSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розпізнавання символів</h2>
                <p>Деякі символи з'являються на одязі різних людей та на різних предметах. Що вони можуть означати?</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hypothesizeAboutTheMeaningOfTheSymbols()">Висунути гіпотези щодо значення символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.realizeTheSymbolsRepresentAncientMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Стародавня магія</h2>
                <p>Ви розумієте, що ці символи є ключем до стародавньої магії, яка могла вплинути на зникнення Елдорії.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToUnderstandHowTheMagicWorks()">Спробувати зрозуміти, як працює ця магія</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindAPatternInTheArrangement = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук закономірності</h2>
                <p>Ви уважно розглядаєте розташування символів, намагаючись знайти логічний зв'язок між ними.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="deduceAPasswordOrKey()">Зробити висновок, що це може бути пароль або ключ</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.listenToTheGuardsWords = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слова вартового</h2>
                <p>Вартовий говорить: "Ми бачимо, що ваш намір щирий. Король прийме вас. Пройдіть за мною."</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheGuardToTheKing()">Йти за вартовим до короля</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitForTheirResponse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування відповіді</h2>
                <p>Після довгої мовчанки один з ельфів нарешті заговорює: "Ми чули про темряву. Розкажіть нам більше."</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tellTheElvesEverythingYouKnow()">Розповісти ельфам все, що вам відомо</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.findAHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Прихований прохід</h2>
                <p>За однією з кам'яних плит ви знаходите ледь помітний прохід, що веде вглиб храму.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="ventureIntoTheHiddenPassage()">Ризикнути та увійти в прихований прохід</button>
                    <button class="next-button" onclick="searchForTrapsAroundTheEntrance()">Оглянути вхід на наявність пасток</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.searchForTrapsAroundTheEntrance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук пасток</h2>
                <p>Ви обережно оглядаєте вхід до прихованого проходу, намагаючись виявити будь-які ознаки пасток.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="proceedCautiouslyIntoThePassage()">Обережно увійти в прохід</button>
                    <button class="next-button" onclick="useAmuletToDetectMagic()">Використати амулет, щоб виявити магічні пастки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.encounterASmallAnimal = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зустріч з твариною</h2>
                <p>Це виявляється звичайна лісова білка, яка швидко зникає в листі.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourSearch()">Продовжити свої пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToTranslateTheInscription = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Переклад напису</h2>
                <p>Напис розповідає про стародавній ритуал, здатний відштовхнути темряву, але вимагає особливих інгредієнтів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToFindTheIngredients()">Спробувати знайти згадані інгредієнти</button>
                    <button class="next-button" onclick="researchTheRitualInAncientTexts()">Дослідити ритуал у стародавніх текстах</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.researchTheRitualInAncientTexts = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Дослідження ритуалу</h2>
                <p>Ви намагаєтеся знайти більше інформації про згаданий ритуал у бібліотеках або серед знавців.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="travelToTheNearestCityWithALargeLibrary()">Вирушити до найближчого міста з великою бібліотекою</button>
                    <button class="next-button" onclick="askTheElvesIfTheyKnowAboutTheRitual()">Запитати ельфів, чи знають вони про цей ритуал</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.learnAboutAWeaknessOfTheDarkness = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Слабкість темряви</h2>
                <p>Духи шепочуть про те, що темрява боїться чистого світла, особливо створеного певними кристалами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekTheseCrystals()">Розпочати пошуки цих кристалів</button>
                    <button class="next-button" onclick="askTheSpiritsForMoreDetailsAboutTheCrystals()">Запитати духів про більше деталей щодо цих кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.askTheSpiritsForMoreDetailsAboutTheCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Деталі про кристали</h2>
                <p>Ви знову намагаєтеся налагодити контакт з духами, щоб дізнатися більше про кристали, що відлякують темряву.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="focusIntenselyOnYourQuestion()">Інтенсивно зосередитися на своєму питанні</button>
                    <button class="next-button" onclick="offerAnotherRitualOfRespect()">Запропонувати ще один ритуал поваги в обмін на інформацію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замок відчинено</h2>
                <p>Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seeWhatLiesBeyond()">Подивитися, що знаходиться за ними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.nothingHappensTheSequenceIsIncorrect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Неправильна послідовність</h2>
                <p>На жаль, нічого не відбувається. Здається, ви помилилися.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryAgainWithTheSequence()">Спробувати ще раз</button>
                    <button class="next-button" onclick="lookForOtherPatternsOrClues()">Пошукати інші закономірності чи підказки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.followTheGuardToTheKing = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Шлях до короля</h2>
                <p>Ви йдете за вартовим у величну залу, де на троні сидить ельфійський король.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="bowRespectfullyBeforeTheKing()">Шанобливо вклонитися королю</button>
                    <button class="next-button" onclick="speakOfYourUrgentQuest()">Розповісти королю про свій терміновий квест</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tellTheElvesEverythingYouKnow = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Розповідь ельфам</h2>
                <p>Ви ділитеся з ельфами всіма своїми знаннями про темряву, пророцтво та зниклу Елдорію.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="awaitTheElvesResponse()">Чекати на відповідь ельфів</button>
                    <button class="next-button" onclick="showThemTheAncientAmulet()">Показати їм стародавній амулет</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.ventureIntoTheHiddenPassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>У прихованому проході</h2>
                <p>Ви обережно ступаєте в темний та вузький прохід...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="lightYourWayWithATorchOrMagic()">Освітити шлях смолоскипом або магією</button>
                    <button class="next-button" onclick="proceedStealthilyInTheDarkness()">Пробиратися навпомацки в темряві</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.proceedCautiouslyIntoThePassage = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Обережно в проході</h2>
                <p>Ви повільно просуваєтеся вперед, намагаючись не зачепити нічого.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="hearStrangeSoundsAhead()">Почути дивні звуки попереду</button>
                    <button class="next-button" onclick="feelAChangeInTheAirTemperature()">Відчути зміну температури повітря</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.useAmuletToDetectMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Використання амулета для виявлення магії</h2>
                <p>Амулет починає ледь помітно вібрувати, реагуючи на магічну енергію...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followTheAmuletsVibrations()">Слідувати за вібрацією амулета</button>
                    <button class="next-button" onclick="tryToDispelAnyMagicYouDetect()">Спробувати розсіяти виявлену магію</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindTheIngredients = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук інгредієнтів</h2>
                <p>Ви починаєте пошуки рідкісних інгредієнтів, необхідних для стародавнього ритуалу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="consultHerbalistsAndAlchemists()">Звернутися до травників та алхіміків</button>
                    <button class="next-button" onclick="ventureIntoDangerousWildernessToFindThem()">Вирушити в небезпечну дику місцевість на їхні пошуки</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultHerbalistsAndAlchemists = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Консультації</h2>
                <p>Ви шукаєте знавців рідкісних рослин та магічних речовин.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findSomeoneWhoRecognizesTheIngredients()">Знайти когось, хто впізнає інгредієнти</button>
                    <button class="next-button" onclick="gatherCluesAboutTheirLocation()">Зібрати підказки щодо їхнього місцезнаходження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.seekTheseCrystals = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук кристалів</h2>
                <p>Ви вирушаєте на пошуки кристалів, що володіють силою чистого світла.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="followLegendsAboutCrystalCaves()">Слідувати легендам про кришталеві печери</button>
                    <button class="next-button" onclick="askLocalMinersIfTheyHaveSeenAny()">Запитати місцевих шахтарів, чи не бачили вони таких кристалів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.focusIntenselyOnYourQuestion = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Зосередження</h2>
                <p>Ви глибоко концентруєтеся на своєму запитанні, намагаючись пробитися крізь шепіт духів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="receiveAVisionOfTheCrystalsLocation()">Отримати видіння про місцезнаходження кристалів</button>
                    <button class="next-button" onclick="hearAFaintWhisperProvidingAClue()">Почути ледь чутний шепіт з підказкою</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.offerAnotherRitualOfRespect = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Ритуал поваги</h2>
                <p>Ви виконуєте ще один ритуал, демонструючи свою повагу до духів лісу.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="theSpiritsSeemMoreInclinedToHelp()">Духи здаються більш схильними допомогти</button>
                    <button class="next-button" onclick="theSpiritsRemainSilent()">Духи залишаються мовчазними</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.waitToSeeWhatHappens = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Очікування</h2>
                <p>Раптово з глибини лісу з'являється сяюча постать...</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="approachTheShiningFigure()">Наблизитися до сяючої постаті</button>
                    <button class="next-button" onclick="observeFromADistance()">Спостерігати за нею здалеку</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.observeFromADistance = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Спостереження здалеку</h2>
                <p>Ви обережно спостерігаєте за сяючою постаттю, намагаючись зрозуміти, хто або що це може бути.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="tryToIdentifyTheFigure()">Спробувати розпізнати постать</button>
                    <button class="next-button" onclick="remainHiddenAndContinueObserving()">Залишатися в укритті та продовжувати спостереження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFigureOutTheMeaningOfTheWarning = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Значення попередження</h2>
                <p>Ви намагаєтеся згадати легенди та історії, пов'язані з цим часом або місцем.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="rememberAnAncientRitual()">Згадати про стародавній ритуал, що проводився в цей час</button>
                    <button class="next-button" onclick="consultAnyMapsOrDocumentsYouCarry()">Переглянути наявні карти або документи</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.consultAnyMapsOrDocumentsYouCarry = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Перегляд документів</h2>
                <p>Ви дістаєте свої карти та записи, намагаючись знайти згадку про попередження.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="findARelevantPassage()">Знайти відповідний уривок</button>
                    <button class="next-button" onclick="findNothingOfSignificance()">Нічого важливого не знайти</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToSketchTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Замальовки символів</h2>
                <p>Зробивши замальовки, ви зможете показати їх знавцям.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="seekSomeoneWhoCanInterpretTheSymbols()">Знайти того, хто зможе розшифрувати символи</button>
                    <button class="next-button" onclick="tryToFindSimilarSymbolsInYourAmulet()">Спробувати знайти схожі символи на своєму амулеті</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.tryToFindSimilarSymbolsInYourAmulet = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Порівняння з амулетом</h2>
                <p>Ви уважно розглядаєте свій амулет, шукаючи знайомі візерунки чи символи.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="noticeASubtleResemblance()">Помітити ледь вловиму схожість</button>
                    <button class="next-button" onclick="findNoMatchingSymbols()">Не знайти жодних схожих символів</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.hypothesizeAboutTheMeaningOfTheSymbols = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Гіпотези про символи</h2>
                <p>Ви обмірковуєте можливі значення символів, намагаючись знайти між ними зв'язок.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="formulateATheoryAboutTheirPurpose()">Сформулювати теорію щодо їхнього призначення</button>
                    <button class="next-button" onclick="tryToRelateTheSymbolsToKnownMagicalPractices()">Спробувати пов'язати символи з відомими магічними практиками</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

window.recallASimilarSymbolFromAnOldTome = function () {
    updateGameContainer(`
        <div class="game-intro">
            <h2>Згаданий символ</h2>
            <p>Ви пригадуєте, що бачили схожий символ у стародавній книзі, де він був пов'язаний із заклинаннями захисту.</p>
            <div class="button-container disabled">
                <button class="next-button" onclick="tryToRecreateTheProtectiveSpell()">Спробувати відтворити захисне заклинання</button>
                <button class="next-button" onclick="lookForMoreInformationAboutThisTypeOfMagic()">Пошукати більше інформації про цей тип магії</button>
            </div>
            <button class="back-button" onclick="goBack()">Назад</button>
            <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
        </div>
    `);
};


    window.findNoConnectionToKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Немає зв'язку</h2>
                <p>Символи не схожі ні на що, що ви коли-небудь бачили чи читали.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="considerThePossibilityOfALostMagic()">Розглянути можливість існування втраченої магії</button>
                    <button class="next-button" onclick="focusOnThePhysicalPropertiesOfTheCarvings()">Зосередитися на фізичних властивостях різьблення</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.lookForSimilaritiesWithOtherKnownMagic = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Пошук схожості</h2>
                <p>Ви порівнюєте принципи дії цієї магії з іншими відомими вам магічними системами.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="identifyASharedPrinciple()">Виявити спільний принцип</button>
                    <button class="next-button" onclick="findNoObviousSimilarities()">Не знайти очевидних подібностей</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.analyzeTheArchitecturalStyleOfTheSurroundings = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Аналіз архітектури</h2>
                <p>Стиль будови може вказати на епоху та призначення символів.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="recognizeAnAncientElvenStyle()">Впізнати стародавній ельфійський стиль</button>
                    <button class="next-button" onclick="theStyleIsUnlikeAnythingYouveSeenBefore()">Стиль не схожий ні на що, що ви бачили раніше</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.thinkAboutAnyMagicalResidueInTheArea = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Магічні залишки</h2>
                <p>Ви намагаєтеся відчути, чи залишилася в повітрі якась магічна енергія.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="senseAFaintTraceOfMagic()">Відчути слабкий слід магії</button>
                    <button class="next-button" onclick="theAreaFeelsCompletelyNeutral()">Місцевість здається повністю нейтральною</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.memorizeTheSequenceForLaterUse = function () {
        updateGameContainer(`
            <div class="game-intro">
                <h2>Запам'ятовування послідовності</h2>
                <p>Ви надійно зберігаєте послідовність у своїй пам'яті.</p>
                <div class="button-container disabled">
                    <button class="next-button" onclick="continueYourExploration()">Продовжити свої дослідження</button>
                </div>
                <button class="back-button" onclick="goBack()">Назад</button>
                <div class="timer">Зачекайте ${delay / 1000} секунд...</div>
            </div>
        `);
    };

    window.theLockClicksOpen = function () {
    updateGameContainer({
        title: "Замок відчинено",
        text: "Почувши клацання, ви розумієте, що послідовність була правильною. Двері або скриня відчинилися.",
        buttons: [
            { text: "Подивитися, що знаходиться за ними", onClick: seeWhatLiesBeyond },
        ],
        showBack: true,
        timer: true, 
    });
};

window.nothingHappensTheSequenceIsIncorrect = function () {
    updateGameContainer({
        title: "Неправильна послідовність",
        text: "На жаль, нічого не відбувається. Здається, ви помилилися.",
        buttons: [
            { text: "Спробувати ще раз", onClick: tryAgainWithTheSequence },
            { text: "Пошукати інші закономірності чи підказки", onClick: lookForOtherPatternsOrClues },
        ],
        showBack: true,
        timer: true, 
    });
};
colorPicker.addEventListener('input', function() {
        buttons.forEach(button => {
            button.style.backgroundColor = colorPicker.value;
        });
    });
});

