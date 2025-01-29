
  
  
      

      {/* Deposit Section */}
      <div>
        <h2>Add Task</h2>
        <Input
          type="text"
          placeholder="Enter amount to deposit (ETH)"
          value={addTask}
          onChange={(e) => setaddTask(e.target.value)}
        />
        <Button bgColor="#4CAF50" hoverColor="#45a049" onClick={handledeposit}>
          Deposit
        </Button>
      </div>

      <hr />

      {/* Withdraw Section */}
      <div>
        <h2>Withdraw</h2>
        <Input
          type="text"
          placeholder="Enter amount to withdraw (ETH)"
          value={deleteTask}
          onChange={(e) => setDeleteTask(e.target.value)}
        />
        <Button bgColor="#f44336" hoverColor="#e53935" onClick={handlewithdraw}>
          Withdraw
        </Button>
      </div>

      <hr />

      {/* Balance Section */}
      <div>
        <h2>Get List Of All Task</h2>
        <Button bgColor="#008CBA" hoverColor="#007B9E" onClick={getTask}>
          Get Balance
        </Button>
        <BalanceText>
          <strong>Balance:</strong> {getTasks || 0} ETH
        </BalanceText>
      </div>

      {/* Toast Container for Notifications */}
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
