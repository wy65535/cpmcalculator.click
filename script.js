// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const calculatorContents = document.querySelectorAll('.calculator-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            calculatorContents.forEach(c => c.classList.remove('active'));

            // Add active class to clicked tab and corresponding content
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });

    // FAQ accordion functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', function() {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // CPM mode switching
    const cpmMode = document.getElementById('cpm-mode');
    cpmMode.addEventListener('change', function() {
        updateCPMFormVisibility(this.value);
    });

    // CPC mode switching
    const cpcMode = document.getElementById('cpc-mode');
    cpcMode.addEventListener('change', function() {
        updateCPCFormVisibility(this.value);
    });

    // CTR mode switching
    const ctrMode = document.getElementById('ctr-mode');
    ctrMode.addEventListener('change', function() {
        updateCTRFormVisibility(this.value);
    });
});

// CPM Calculator Functions
function updateCPMFormVisibility(mode) {
    const costGroup = document.getElementById('cpm-cost-group');
    const impressionsGroup = document.getElementById('cpm-impressions-group');
    const rateGroup = document.getElementById('cpm-rate-group');

    // Hide all first
    costGroup.style.display = 'none';
    impressionsGroup.style.display = 'none';
    rateGroup.style.display = 'none';

    // Show based on mode
    if (mode === 'calculate-cpm') {
        costGroup.style.display = 'block';
        impressionsGroup.style.display = 'block';
    } else if (mode === 'calculate-cost') {
        rateGroup.style.display = 'block';
        impressionsGroup.style.display = 'block';
    } else if (mode === 'calculate-impressions') {
        costGroup.style.display = 'block';
        rateGroup.style.display = 'block';
    }
}

function calculateCPM() {
    const mode = document.getElementById('cpm-mode').value;
    const resultDiv = document.getElementById('cpm-result');
    const resultContent = resultDiv.querySelector('.result-content');

    let cost, impressions, cpm, result;

    try {
        if (mode === 'calculate-cpm') {
            cost = parseFloat(document.getElementById('cpm-cost').value);
            impressions = parseFloat(document.getElementById('cpm-impressions').value);

            if (isNaN(cost) || isNaN(impressions) || cost < 0 || impressions <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            cpm = (cost / impressions) * 1000;

            result = `
                <p><strong>CPM (Cost Per Mille): $${cpm.toFixed(2)}</strong></p>
                <p>Total Cost: $${cost.toFixed(2)}</p>
                <p>Total Impressions: ${impressions.toLocaleString()}</p>
                <p>Cost per 1,000 impressions: $${cpm.toFixed(2)}</p>
                <hr style="margin: 1rem 0; border: 0; border-top: 1px solid rgba(255,255,255,0.3);">
                <p><small>This means you are paying $${cpm.toFixed(2)} for every 1,000 times your ad is displayed.</small></p>
            `;
        } else if (mode === 'calculate-cost') {
            cpm = parseFloat(document.getElementById('cpm-rate').value);
            impressions = parseFloat(document.getElementById('cpm-impressions').value);

            if (isNaN(cpm) || isNaN(impressions) || cpm < 0 || impressions <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            cost = (cpm * impressions) / 1000;

            result = `
                <p><strong>Total Cost: $${cost.toFixed(2)}</strong></p>
                <p>CPM Rate: $${cpm.toFixed(2)}</p>
                <p>Total Impressions: ${impressions.toLocaleString()}</p>
                <p>You will need to spend $${cost.toFixed(2)} to get ${impressions.toLocaleString()} impressions at a CPM of $${cpm.toFixed(2)}.</p>
            `;
        } else if (mode === 'calculate-impressions') {
            cost = parseFloat(document.getElementById('cpm-cost').value);
            cpm = parseFloat(document.getElementById('cpm-rate').value);

            if (isNaN(cost) || isNaN(cpm) || cost < 0 || cpm <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            impressions = (cost / cpm) * 1000;

            result = `
                <p><strong>Total Impressions: ${Math.round(impressions).toLocaleString()}</strong></p>
                <p>Total Cost: $${cost.toFixed(2)}</p>
                <p>CPM Rate: $${cpm.toFixed(2)}</p>
                <p>With a budget of $${cost.toFixed(2)} and a CPM of $${cpm.toFixed(2)}, you will get approximately ${Math.round(impressions).toLocaleString()} impressions.</p>
            `;
        }

        resultContent.innerHTML = result;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        alert(error.message);
    }
}

function resetCPM() {
    document.getElementById('cpm-cost').value = '';
    document.getElementById('cpm-impressions').value = '';
    document.getElementById('cpm-rate').value = '';
    document.getElementById('cpm-result').style.display = 'none';
}

// CPC Calculator Functions
function updateCPCFormVisibility(mode) {
    const costGroup = document.getElementById('cpc-cost-group');
    const clicksGroup = document.getElementById('cpc-clicks-group');
    const rateGroup = document.getElementById('cpc-rate-group');

    costGroup.style.display = 'none';
    clicksGroup.style.display = 'none';
    rateGroup.style.display = 'none';

    if (mode === 'calculate-cpc') {
        costGroup.style.display = 'block';
        clicksGroup.style.display = 'block';
    } else if (mode === 'calculate-cost') {
        rateGroup.style.display = 'block';
        clicksGroup.style.display = 'block';
    } else if (mode === 'calculate-clicks') {
        costGroup.style.display = 'block';
        rateGroup.style.display = 'block';
    }
}

function calculateCPC() {
    const mode = document.getElementById('cpc-mode').value;
    const resultDiv = document.getElementById('cpc-result');
    const resultContent = resultDiv.querySelector('.result-content');

    let cost, clicks, cpc, result;

    try {
        if (mode === 'calculate-cpc') {
            cost = parseFloat(document.getElementById('cpc-cost').value);
            clicks = parseFloat(document.getElementById('cpc-clicks').value);

            if (isNaN(cost) || isNaN(clicks) || cost < 0 || clicks <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            cpc = cost / clicks;

            result = `
                <p><strong>CPC (Cost Per Click): $${cpc.toFixed(2)}</strong></p>
                <p>Total Cost: $${cost.toFixed(2)}</p>
                <p>Total Clicks: ${clicks.toLocaleString()}</p>
                <p>Average cost per click: $${cpc.toFixed(2)}</p>
                <hr style="margin: 1rem 0; border: 0; border-top: 1px solid rgba(255,255,255,0.3);">
                <p><small>Each click on your ad costs an average of $${cpc.toFixed(2)}.</small></p>
            `;
        } else if (mode === 'calculate-cost') {
            cpc = parseFloat(document.getElementById('cpc-rate').value);
            clicks = parseFloat(document.getElementById('cpc-clicks').value);

            if (isNaN(cpc) || isNaN(clicks) || cpc < 0 || clicks <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            cost = cpc * clicks;

            result = `
                <p><strong>Total Cost: $${cost.toFixed(2)}</strong></p>
                <p>CPC Rate: $${cpc.toFixed(2)}</p>
                <p>Total Clicks: ${clicks.toLocaleString()}</p>
                <p>You will need to spend $${cost.toFixed(2)} to get ${clicks.toLocaleString()} clicks at a CPC of $${cpc.toFixed(2)}.</p>
            `;
        } else if (mode === 'calculate-clicks') {
            cost = parseFloat(document.getElementById('cpc-cost').value);
            cpc = parseFloat(document.getElementById('cpc-rate').value);

            if (isNaN(cost) || isNaN(cpc) || cost < 0 || cpc <= 0) {
                throw new Error('Please enter valid positive numbers');
            }

            clicks = cost / cpc;

            result = `
                <p><strong>Total Clicks: ${Math.round(clicks).toLocaleString()}</strong></p>
                <p>Total Cost: $${cost.toFixed(2)}</p>
                <p>CPC Rate: $${cpc.toFixed(2)}</p>
                <p>With a budget of $${cost.toFixed(2)} and a CPC of $${cpc.toFixed(2)}, you will get approximately ${Math.round(clicks).toLocaleString()} clicks.</p>
            `;
        }

        resultContent.innerHTML = result;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        alert(error.message);
    }
}

function resetCPC() {
    document.getElementById('cpc-cost').value = '';
    document.getElementById('cpc-clicks').value = '';
    document.getElementById('cpc-rate').value = '';
    document.getElementById('cpc-result').style.display = 'none';
}

// CTR Calculator Functions
function updateCTRFormVisibility(mode) {
    const clicksGroup = document.getElementById('ctr-clicks-group');
    const impressionsGroup = document.getElementById('ctr-impressions-group');
    const rateGroup = document.getElementById('ctr-rate-group');

    clicksGroup.style.display = 'none';
    impressionsGroup.style.display = 'none';
    rateGroup.style.display = 'none';

    if (mode === 'calculate-ctr') {
        clicksGroup.style.display = 'block';
        impressionsGroup.style.display = 'block';
    } else if (mode === 'calculate-clicks') {
        rateGroup.style.display = 'block';
        impressionsGroup.style.display = 'block';
    } else if (mode === 'calculate-impressions') {
        clicksGroup.style.display = 'block';
        rateGroup.style.display = 'block';
    }
}

function calculateCTR() {
    const mode = document.getElementById('ctr-mode').value;
    const resultDiv = document.getElementById('ctr-result');
    const resultContent = resultDiv.querySelector('.result-content');

    let clicks, impressions, ctr, result;

    try {
        if (mode === 'calculate-ctr') {
            clicks = parseFloat(document.getElementById('ctr-clicks').value);
            impressions = parseFloat(document.getElementById('ctr-impressions').value);

            if (isNaN(clicks) || isNaN(impressions) || clicks < 0 || impressions <= 0 || clicks > impressions) {
                throw new Error('Please enter valid numbers. Clicks cannot exceed impressions.');
            }

            ctr = (clicks / impressions) * 100;

            let performance = '';
            if (ctr < 1) {
                performance = 'Below average - consider improving your ad creative or targeting.';
            } else if (ctr >= 1 && ctr < 2) {
                performance = 'Average performance - there\'s room for optimization.';
            } else if (ctr >= 2 && ctr < 5) {
                performance = 'Good performance - your ads are engaging users well.';
            } else {
                performance = 'Excellent performance - your ads are highly effective!';
            }

            result = `
                <p><strong>CTR (Click-Through Rate): ${ctr.toFixed(2)}%</strong></p>
                <p>Total Clicks: ${clicks.toLocaleString()}</p>
                <p>Total Impressions: ${impressions.toLocaleString()}</p>
                <p>Out of ${impressions.toLocaleString()} people who saw your ad, ${clicks.toLocaleString()} clicked on it.</p>
                <hr style="margin: 1rem 0; border: 0; border-top: 1px solid rgba(255,255,255,0.3);">
                <p><small><strong>Performance:</strong> ${performance}</small></p>
            `;
        } else if (mode === 'calculate-clicks') {
            ctr = parseFloat(document.getElementById('ctr-rate').value);
            impressions = parseFloat(document.getElementById('ctr-impressions').value);

            if (isNaN(ctr) || isNaN(impressions) || ctr < 0 || ctr > 100 || impressions <= 0) {
                throw new Error('Please enter valid numbers. CTR must be between 0-100%.');
            }

            clicks = (ctr / 100) * impressions;

            result = `
                <p><strong>Expected Clicks: ${Math.round(clicks).toLocaleString()}</strong></p>
                <p>Target CTR: ${ctr.toFixed(2)}%</p>
                <p>Total Impressions: ${impressions.toLocaleString()}</p>
                <p>With ${impressions.toLocaleString()} impressions and a ${ctr.toFixed(2)}% CTR, you can expect approximately ${Math.round(clicks).toLocaleString()} clicks.</p>
            `;
        } else if (mode === 'calculate-impressions') {
            clicks = parseFloat(document.getElementById('ctr-clicks').value);
            ctr = parseFloat(document.getElementById('ctr-rate').value);

            if (isNaN(clicks) || isNaN(ctr) || clicks < 0 || ctr <= 0 || ctr > 100) {
                throw new Error('Please enter valid numbers. CTR must be between 0-100%.');
            }

            impressions = (clicks / ctr) * 100;

            result = `
                <p><strong>Required Impressions: ${Math.round(impressions).toLocaleString()}</strong></p>
                <p>Desired Clicks: ${clicks.toLocaleString()}</p>
                <p>Target CTR: ${ctr.toFixed(2)}%</p>
                <p>To get ${clicks.toLocaleString()} clicks with a ${ctr.toFixed(2)}% CTR, you need approximately ${Math.round(impressions).toLocaleString()} impressions.</p>
            `;
        }

        resultContent.innerHTML = result;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        alert(error.message);
    }
}

function resetCTR() {
    document.getElementById('ctr-clicks').value = '';
    document.getElementById('ctr-impressions').value = '';
    document.getElementById('ctr-rate').value = '';
    document.getElementById('ctr-result').style.display = 'none';
}

// ROI Calculator Functions
function calculateROI() {
    const resultDiv = document.getElementById('roi-result');
    const resultContent = resultDiv.querySelector('.result-content');

    try {
        const revenue = parseFloat(document.getElementById('roi-revenue').value);
        const cost = parseFloat(document.getElementById('roi-cost').value);

        if (isNaN(revenue) || isNaN(cost) || revenue < 0 || cost <= 0) {
            throw new Error('Please enter valid positive numbers');
        }

        const profit = revenue - cost;
        const roi = (profit / cost) * 100;
        const roas = revenue / cost;

        let performance = '';
        let color = '';
        if (roi < 0) {
            performance = 'Negative ROI - Your campaign is losing money. Consider pausing and optimizing.';
            color = '#ef4444';
        } else if (roi >= 0 && roi < 100) {
            performance = 'Positive but low ROI - Your campaign is profitable but has room for improvement.';
            color = '#f59e0b';
        } else if (roi >= 100 && roi < 300) {
            performance = 'Good ROI - Your campaign is performing well and generating solid returns.';
            color = '#10b981';
        } else {
            performance = 'Excellent ROI - Your campaign is highly profitable!';
            color = '#059669';
        }

        const result = `
            <p><strong>ROI (Return on Investment): ${roi.toFixed(2)}%</strong></p>
            <p><strong>ROAS (Return on Ad Spend): ${roas.toFixed(2)}x</strong></p>
            <hr style="margin: 1rem 0; border: 0; border-top: 1px solid rgba(255,255,255,0.3);">
            <p>Total Revenue: $${revenue.toFixed(2)}</p>
            <p>Total Cost: $${cost.toFixed(2)}</p>
            <p>Net Profit: $${profit.toFixed(2)}</p>
            <hr style="margin: 1rem 0; border: 0; border-top: 1px solid rgba(255,255,255,0.3);">
            <p><small><strong>Analysis:</strong> ${performance}</small></p>
            <p><small>For every $1 spent on advertising, you earned $${roas.toFixed(2)} in revenue and $${(profit/cost).toFixed(2)} in profit.</small></p>
        `;

        resultContent.innerHTML = result;
        resultDiv.style.display = 'block';
        resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (error) {
        alert(error.message);
    }
}

function resetROI() {
    document.getElementById('roi-revenue').value = '';
    document.getElementById('roi-cost').value = '';
    document.getElementById('roi-result').style.display = 'none';
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add input validation for number inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('keypress', function(e) {
        // Allow: backspace, delete, tab, escape, enter, decimal point
        if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
            // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
            (e.keyCode === 65 && e.ctrlKey === true) ||
            (e.keyCode === 67 && e.ctrlKey === true) ||
            (e.keyCode === 86 && e.ctrlKey === true) ||
            (e.keyCode === 88 && e.ctrlKey === true)) {
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
});

// Add Enter key support for calculations
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const activeTab = document.querySelector('.calculator-content.active');
        if (activeTab) {
            const tabId = activeTab.id;
            if (tabId === 'cpm' && document.activeElement.closest('#cpm')) {
                calculateCPM();
            } else if (tabId === 'cpc' && document.activeElement.closest('#cpc')) {
                calculateCPC();
            } else if (tabId === 'ctr' && document.activeElement.closest('#ctr')) {
                calculateCTR();
            } else if (tabId === 'roi' && document.activeElement.closest('#roi')) {
                calculateROI();
            }
        }
    }
});

